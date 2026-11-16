export interface PlaygroundExecutionResult {
  ok: boolean;
  logs: string[];
  error: string | null;
}

/**
 * Strips light TypeScript annotations and Vue script-setup helpers so
 * educational snippets execute cleanly inside a sandboxed Function evaluator.
 */
export function prepareEducationalJs(source: string): string {
  return source
    .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
    .replace(/export\s+default\s+/g, 'const __defaultExport = ')
    .replace(/export\s+(?=(const|let|function|type|interface))/g, '')
    .replace(/<script[^>]*>|<\/script>/g, '')
    .replace(/\btype\s+\w+(?:<[^>]+>)?\s*=\s*[\s\S]*?;/g, '')
    .replace(/function\s+(\w+)\s*<[^>]+>\s*\(/g, 'function $1(')
    .replace(/(\w+)\s*:\s*(?:number|string|boolean|void|any|unknown|\(\)\s*=>\s*void|T\[K\]|T|K)(?=[,)=;])/g, '$1')
    .replace(/\bref<[^>]+>\(/g, 'ref(')
    .replace(/\bdefineModel<[^>]+>\(/g, 'defineModel(')
    .replace(/\bdefineProps<[^>]+>\(\);?/g, '');
}

function formatLoggedValue(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

export function executeEducationalCode(source: string): PlaygroundExecutionResult {
  const logs: string[] = [];
  const trimmed = source.trim();

  if (!trimmed) {
    return {
      ok: false,
      logs: [],
      error: 'Empty code buffer',
    };
  }

  // Pure HTML / CSS snippets don't run through JS evaluator
  if (trimmed.startsWith('<') || /^\s*\.[a-zA-Z_-]+\s*\{/.test(trimmed)) {
    return {
      ok: true,
      logs: ['CSS / HTML rendered in live preview stage.'],
      error: null,
    };
  }

  // Provide minimal Vue Composition API educational shims for interactive execution
  const refShim = <T>(initial: T) => ({ value: initial });
  const computedShim = <T>(getter: () => T) => ({
    get value() {
      return getter();
    },
  });
  const reactiveShim = <T extends object>(obj: T) => obj;
  const onMountedShim = (fn: () => void) => {
    try {
      fn();
    } catch {
      // Ignore DOM listeners outside browser mount
    }
  };
  const onUnmountedShim = (_fn: () => void) => {};
  const defineModelShim = <T>(initial?: T) => ({ value: initial });
  const defineStoreShim = (_id: string, setupFn: () => unknown) => setupFn;
  const defineEventHandlerShim = (fn: unknown) => fn;
  const useFetchShim = (url: string) => Promise.resolve({ data: refShim([url]) });
  const gsapShim = {
    from: (target: string, vars: Record<string, unknown>) => {
      logs.push(`gsap.from("${target}", ${JSON.stringify(vars)})`);
    },
    to: (target: string, vars: Record<string, unknown>) => {
      logs.push(`gsap.to("${target}", ${JSON.stringify(vars)})`);
    },
  };

  const sandboxConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map(formatLoggedValue).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push(`[warn] ${args.map(formatLoggedValue).join(' ')}`);
    },
    error: (...args: unknown[]) => {
      logs.push(`[error] ${args.map(formatLoggedValue).join(' ')}`);
    },
  };

  try {
    const jsBody = prepareEducationalJs(trimmed);
    const runner = new Function(
      'console',
      'ref',
      'computed',
      'reactive',
      'onMounted',
      'onUnmounted',
      'defineModel',
      'defineStore',
      'defineEventHandler',
      'useFetch',
      'gsap',
      `"use strict";\n${jsBody}`
    );

    runner(
      sandboxConsole,
      refShim,
      computedShim,
      reactiveShim,
      onMountedShim,
      onUnmountedShim,
      defineModelShim,
      defineStoreShim,
      defineEventHandlerShim,
      useFetchShim,
      gsapShim
    );

    if (logs.length === 0) {
      logs.push('Code executed cleanly (add console.log(...) to inspect values).');
    }

    return {
      ok: true,
      logs,
      error: null,
    };
  } catch (err) {
    return {
      ok: false,
      logs,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function buildCssPreviewSrcdoc(snippet: string): string {
  const safeBase = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: #F4F4F0;
        color: #0D0D0F;
        padding: 16px;
        font-size: 13px;
      }
    </style>
  `;
  if (snippet.includes('<')) {
    return `${safeBase}${snippet}`;
  }
  return `${safeBase}<style>${snippet}</style><div class="gallery bento-grid price-value action-button btn metric"><div style="padding:12px;background:#141418;color:#fff;border-radius:8px;">Box 01</div><div style="padding:12px;background:#FF3B1D;color:#fff;border-radius:8px;">Box 02</div><div style="padding:12px;background:#141418;color:#fff;border-radius:8px;">Box 03</div></div>`;
}
