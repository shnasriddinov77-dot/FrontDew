/**
 * Nuxt 3 Composable: composables/useCourses.ts
 * Dynamic catalog and lesson definitions for FrontDev programming courses
 */

export interface LessonTheory {
  title: string;
  summary: string;
  explanation: string;
  codeExample: string;
  mascotTip: string;
  keyTakeaways: string[];
}

export interface LessonTask {
  title: string;
  summary: string;
  steps: string[];
  constraints: string[];
  starterCode: string;
  expectedResultSnippet: string;
  testFunction: string; // JavaScript validation code
  testCases: { call: string; expected: any }[];
}

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  lang: string;
  category: 'frontend' | 'backend' | 'systems' | 'database';
  color: string;
  price: number;
  formattedPrice: string;
  originalPrice: string;
  rating: number;
  lessonsCount: number;
  duration: string;
  desc: string;
  theory: LessonTheory;
  task: LessonTask;
}

export const ALL_COURSES: CourseData[] = [
  {
    id: 'javascript',
    slug: 'javascript',
    title: 'JavaScript Zamonaviy Dasturlash',
    lang: 'JavaScript',
    category: 'frontend',
    color: '#F59E0B',
    price: 249000,
    formattedPrice: "249,000 so'm",
    originalPrice: "499,000 so'm",
    rating: 4.95,
    lessonsCount: 42,
    duration: '28 soat',
    desc: 'ES6+ sintaksisi, DOM manipulyatsiyasi, Promise, async/await va real loyihalar.',
    theory: {
      title: "Funksiyalar va Arifmetik Operatorlar Asoslari",
      summary: "Dasturlashda funksiya — bu ma'lum bir vazifani bajarishga mo'ljallangan, qayta-qayta ishlatilishi mumkin bo'lgan mustaqil kod blokidir.",
      explanation: `JavaScript tilida funksiyalar 'function' kalit so'zi orqali e'lon qilinadi. U argument qabul qiladi va 'return' orqali natija qaytaradi.
      
Return operatoridan keyingi yozilgan kodlar hech qachon bajarilmaydi. Shuningdek, arifmetik amallarda turlarning mosligiga doimo e'tibor qaratish zarur.`,
      codeExample: `// Funksiya e'lon qilish:
function sum(a, b) {
  return a + b;
}

console.log(sum(5, 7)); // 12`,
      mascotTip: "Salom! Men robot ustozingizman. Funksiya yasayotganda return so'zini unutmang, aks holda funksiya bo'sh (undefined) qiymat qaytaradi!",
      keyTakeaways: [
        "Funksiya nomi uning vazifasini aniq ifodalashi lozim.",
        "'return' qiymat qaytarish uchun shart, natijasiz funksiya maqsadga muvofiq emas.",
        "Chegara holatlarini (manfiy sonlar, nol) doimo tekshirish zarur.",
      ],
    },
    task: {
      title: "Ikkita Sonning Yig'indisini Hisoblash Funksiyasi",
      summary: "Siz sum(a, b) nomli funksiya yaratishingiz kerak. Funksiya berilgan 2 ta sonni qo'shib, natijani qaytarishi lozim.",
      steps: [
        "1. Kod tahrirlagichida 'function sum(a, b)' deb boshlang.",
        "2. Funksiya tanasida a va b sonlarini qo'shing: 'return a + b;'.",
        "3. Funksiyani yopuvchi jingalak qavs '}' bilan tugating.",
        "4. 'Tekshirish' (Check Code) tugmasini bosing va barcha 3 ta testdan muvaffaqiyatli o'ting.",
      ],
      constraints: [
        "a va b butun yoki haqiqiy son bo'lishi mumkin (-1000 dan +1000 gacha).",
        "Funksiya albatta return orqali natija qaytarishi shart (console.log emas).",
      ],
      starterCode: `function sum(a, b) {\n  // Kodni shu yerga yozing\n  return a + b;\n}`,
      expectedResultSnippet: "sum(2, 3) === 5",
      testFunction: `return sum(2, 3) === 5 && sum(10, -4) === 6 && sum(0, 0) === 0;`,
      testCases: [
        { call: 'sum(2, 3)', expected: 5 },
        { call: 'sum(10, -4)', expected: 6 },
        { call: 'sum(0, 0)', expected: 0 },
      ],
    },
  },
  {
    id: 'python',
    slug: 'python',
    title: 'Python & Algoritmlar',
    lang: 'Python',
    category: 'backend',
    color: '#3776AB',
    price: 259000,
    formattedPrice: "259,000 so'm",
    originalPrice: "500,000 so'm",
    rating: 4.92,
    lessonsCount: 48,
    duration: '32 soat',
    desc: 'Algoritmlar, ma\'lumotlar tuzilmasi, OOP, avtomatlashtirish va AI asoslari.',
    theory: {
      title: "Python Funksiyalari va Ro'yxatlar (Lists) bilan Ishlash",
      summary: "Python sintaksisida indentatsiya (bo'shliqlar) orqali bloklar belgilanadi va 'def' kalit so'zi bilan funksiyalar yaratiladi.",
      explanation: `Python da kodning o'qilishi eng asosiy tamoyillardan biridir. Ro'yxatlarni saralash, elementlarni qidirish va filtrlash uchun o'rnatilgan metodlar mavjud.`,
      codeExample: `def kvadrat(son):\n    return son * son\n\nprint(kvadrat(5)) # 25`,
      mascotTip: "Python tilida qavslar o'rniga to'g'ri bo'shliq (4 space) qo'yishga diqqat qiling!",
      keyTakeaways: [
        "def orqali funksiya e'lon qilinadi.",
        "Bo'shliqlar sintaktik qat'iy talab hisoblanadi.",
        "O'zbekcha atamalarni kod ichida izoh qilib yozish mumkin.",
      ],
    },
    task: {
      title: "Sonning Kvadratini Hisoblash Algoritmi",
      summary: "kvadrat(x) funksiyasi berilgan sonning kvadratini hisoblab qaytarishi kerak.",
      steps: [
        "1. Funksiya argumenti x ni qabul qiling.",
        "2. x * x ko'paytmasini return qiling.",
      ],
      constraints: ["x istalgan butun son bo'lishi mumkin."],
      starterCode: `function kvadrat(x) {\n  return x * x;\n}`,
      expectedResultSnippet: "kvadrat(4) === 16",
      testFunction: `return kvadrat(4) === 16 && kvadrat(-3) === 9 && kvadrat(0) === 0;`,
      testCases: [
        { call: 'kvadrat(4)', expected: 16 },
        { call: 'kvadrat(-3)', expected: 9 },
        { call: 'kvadrat(0)', expected: 0 },
      ],
    },
  },
  {
    id: 'vue',
    slug: 'vue',
    title: 'Vue 3 & Composition API',
    lang: 'Vue.js',
    category: 'frontend',
    color: '#10B981',
    price: 269000,
    formattedPrice: "269,000 so'm",
    originalPrice: "520,000 so'm",
    rating: 4.98,
    lessonsCount: 36,
    duration: '24 soat',
    desc: 'Reaktivlik mexanizmi, Pinia state management va maxsus composable funksiyalar.',
    theory: {
      title: "Vue 3 Reaktivligi: ref va computed Funksiyalari",
      summary: "Vue 3 Composition API dasturchilarga kodni qulay guruhlash va reaktiv holatni boshqarish imkonini beradi.",
      explanation: `ref orqali primitiv qiymatlar reaktiv qilinadi. computed esa boshqa reaktiv o'zgaruvchilardan hosil bo'ladigan qiymatlarni keshlaydi.`,
      codeExample: `const count = ref(0);\nconst double = computed(() => count.value * 2);`,
      mascotTip: "Nuxt va Vue da .value ni JavaScript ichida yozishni, template da esa tashlab ketishni unutmang!",
      keyTakeaways: [
        "Reaktivlik orqali DOM avtomatik yangilanadi.",
        "Composition API kodni qayta ishlatishni yengillashtiradi.",
      ],
    },
    task: {
      title: "Reaktiv Hisoblagich Logikasini Yaratish",
      summary: "Ikkita raqamni qo'shib ikki barobarini qaytaruvchi doubleSum(a, b) funksiyasini yozing.",
      steps: [
        "1. a va b sonlarini qo'shing.",
        "2. Yig'indini 2 ga ko'paytiring va qaytaring.",
      ],
      constraints: ["a, b musbat sonlar"],
      starterCode: `function doubleSum(a, b) {\n  return (a + b) * 2;\n}`,
      expectedResultSnippet: "doubleSum(3, 4) === 14",
      testFunction: `return doubleSum(3, 4) === 14 && doubleSum(1, 1) === 4;`,
      testCases: [
        { call: 'doubleSum(3, 4)', expected: 14 },
        { call: 'doubleSum(1, 1)', expected: 4 },
      ],
    },
  },
  {
    id: 'nuxt',
    slug: 'nuxt',
    title: 'Nuxt 3 SSR & Fullstack Web',
    lang: 'Nuxt',
    category: 'frontend',
    color: '#00DC82',
    price: 299000,
    formattedPrice: "299,000 so'm",
    originalPrice: "599,000 so'm",
    rating: 4.96,
    lessonsCount: 32,
    duration: '22 soat',
    desc: 'Server-side rendering, Nitro dvigateli, file-based routing va SEO optimallashtirish.',
    theory: {
      title: "Nuxt 3 Nitro Server Handlers & SSR",
      summary: "Nuxt 3 server API lari server/api/ papkasida joylashadi va defineEventHandler orqali yoziladi.",
      explanation: `Nitro yordamida frontend va backend bitta loyihada birlashadi. SEO va yuklanish tezligi maksimal darajaga chiqadi.`,
      codeExample: `export default defineEventHandler(async (event) => {\n  return { status: 'ok', time: new Date() };\n});`,
      mascotTip: "Nuxt 3 da server API lar avtomatik ravishda /api/... endpointlariga aylanadi!",
      keyTakeaways: [
        "Fayl tizimiga asoslangan marshrutlash (pages/ va server/api/).",
        "SSR qidiruv tizimlari (SEO) uchun juda muhim.",
      ],
    },
    task: {
      title: "Server API Javob Formatlagichi",
      summary: "formatResponse(data, status) funksiyasini yozing. U { data, status, timestamp } obyektini qaytarsin.",
      steps: [
        "1. Obyekt yasab, berilgan argumentlarni unga joylashtiring.",
        "2. timestamp maydoniga '2026' stringini qo'shing.",
      ],
      constraints: ["status har doim son yoki string bo'ladi."],
      starterCode: `function formatResponse(data, status) {\n  return { data, status, timestamp: '2026' };\n}`,
      expectedResultSnippet: "formatResponse('Salom', 200).status === 200",
      testFunction: `const r = formatResponse('test', 200); return r.status === 200 && r.data === 'test';`,
      testCases: [
        { call: "formatResponse('OK', 200)", expected: "{ status: 200, data: 'OK' }" },
      ],
    },
  },
  {
    id: 'cpp',
    slug: 'cpp',
    title: 'C++ & Xotira Boshqaruvi',
    lang: 'C++',
    category: 'systems',
    color: '#00599C',
    price: 279000,
    formattedPrice: "279,000 so'm",
    originalPrice: "540,000 so'm",
    rating: 4.88,
    lessonsCount: 38,
    duration: '30 soat',
    desc: 'Pointers, xotira dinamikasi, STL konteynerlari va yuqori samaradorlikka ega hisoblash.',
    theory: {
      title: "C++ Ko'rsatkichlar (Pointers) va Dinamik Xotira",
      summary: "C++ dasturchiga kompyuter xotirasini to'g'ridan-to'g'ri boshqarish imkoniyatini beradi, bu esa dasturning maksimal tezligini ta'minlaydi.",
      explanation: `Xotiradagi har bir o'zgaruvchining adresi mavjud. Ko'rsatkich (*) ushbu adresni saqlaydi va tezkor almashish imkonini beradi.`,
      codeExample: `int a = 10;\nint* ptr = &a;\n*ptr = 25; // a endi 25 ga teng`,
      mascotTip: "C++ da xotirani ajratgach (new), uni tozalashni (delete) unutmang!",
      keyTakeaways: [
        "Pointers orqali ma'lumotlarni nusxalamasdan uzatish mumkin.",
        "Xotira tozalanishi xatoliklar (Memory Leak) ning oldini oladi.",
      ],
    },
    task: {
      title: "Maksimal Elementni Topish Funksiyasi",
      summary: "Ikkita sondan kattasini aniqlovchi maxVal(a, b) funksiyasini yozing.",
      steps: [
        "1. a va b sonlarini solishtiring.",
        "2. Agar a katta bo'lsa a ni, aks holda b ni qaytaring.",
      ],
      constraints: ["a va b sonlar"],
      starterCode: `function maxVal(a, b) {\n  return a > b ? a : b;\n}`,
      expectedResultSnippet: "maxVal(15, 8) === 15",
      testFunction: `return maxVal(15, 8) === 15 && maxVal(-5, -2) === -2 && maxVal(10, 10) === 10;`,
      testCases: [
        { call: 'maxVal(15, 8)', expected: 15 },
        { call: 'maxVal(-5, -2)', expected: -2 },
      ],
    },
  },
  {
    id: 'go',
    slug: 'go',
    title: 'Golang: Yuqori Tezlikdagi Backend',
    lang: 'Go',
    category: 'backend',
    color: '#00ADD8',
    price: 289000,
    formattedPrice: "289,000 so'm",
    originalPrice: "550,000 so'm",
    rating: 4.94,
    lessonsCount: 34,
    duration: '25 soat',
    desc: 'Goroutines, kanallar, mikroservislar va yuqori yuklamali REST API arxitekturasi.',
    theory: {
      title: "Go Goroutines va Parallel Hisoblash",
      summary: "Go tilining eng kuchli tomoni — bu engil vaznli oqimlar (goroutine) orqali millionlab parallel jarayonlarni oson boshqarishdir.",
      explanation: `'go' kalit so'zi orqali funksiya alohida oqimda ishga tushiriladi va kanallar (channels) orqali ma'lumot almashadi.`,
      codeExample: `go processOrder(id)\nch := make(chan int)`,
      mascotTip: "Go tilida soddalik eng muhim qoida! Murakkab o'ralashgan kod yozmang.",
      keyTakeaways: [
        "Goroutines OS oqimlariga nisbatan bir necha kilobayt xotira egallaydi.",
        "Xatoliklarni doimo tekshirish shart: if err != nil.",
      ],
    },
    task: {
      title: "Foydalanuvchi Holatini Tekshirish (Active Status)",
      summary: "isUserActive(user) funksiyasini yozing. Agar user.active === true bo'lsa true, aks holda false qaytarsin.",
      steps: [
        "1. user obyektining active kalitini tekshiring.",
        "2. Mantiqiy (boolean) qiymat qaytaring.",
      ],
      constraints: ["user obyekt ko'rinishida beriladi."],
      starterCode: `function isUserActive(user) {\n  return Boolean(user && user.active);\n}`,
      expectedResultSnippet: "isUserActive({ active: true }) === true",
      testFunction: `return isUserActive({ active: true }) === true && isUserActive({ active: false }) === false;`,
      testCases: [
        { call: "isUserActive({ active: true })", expected: true },
        { call: "isUserActive({ active: false })", expected: false },
      ],
    },
  },
  {
    id: 'java',
    slug: 'java',
    title: 'Java & Spring Boot Arxitekturasi',
    lang: 'Java',
    category: 'backend',
    color: '#EA2D2E',
    price: 299000,
    formattedPrice: "299,000 so'm",
    originalPrice: "590,000 so'm",
    rating: 4.91,
    lessonsCount: 44,
    duration: '34 soat',
    desc: 'Klassik OOP, Spring Boot, JPA/Hibernate va yirik bank tizimlari xavfsizligi.',
    theory: {
      title: "Java OOP: Inkapsulyatsiya va Merosxo'rlik",
      summary: "Java to'liq obyektga yo'naltirilgan dasturlash tili bo'lib, har bir kod klass ichida yoziladi.",
      explanation: `Sinf (Class) obyekt yaratish qolipi bo'lib, xususiyatlar va metodlarni o'z ichiga oladi. Inkapsulyatsiya private/public orqali ta'minlanadi.`,
      codeExample: `public class Foydalanuvchi {\n  private String ism;\n  public Foydalanuvchi(String ism) { this.ism = ism; }\n}`,
      mascotTip: "Java-da har bir klass nomi fayl nomi bilan bir xil bo'lishi shart!",
      keyTakeaways: [
        "Klasslar qayta ishlatiluvchanlikni oshiradi.",
        "Spring Boot orqali korporativ API lar tezkor yaratiladi.",
      ],
    },
    task: {
      title: "Foydalanuvchi Ismini Formatlash",
      summary: "formatName(first, last) funksiyasi berilgan ism va familiyani bitta satrga birlashtirsin: 'Last First'.",
      steps: [
        "1. last va first satrlarini oralarida bo'sh joy bilan birlashtiring.",
        "2. Yangi satrni qaytaring.",
      ],
      constraints: ["Satrlar bo'sh bo'lmagan matnlardir."],
      starterCode: `function formatName(first, last) {\n  return last + ' ' + first;\n}`,
      expectedResultSnippet: "formatName('Ali', 'Valiyev') === 'Valiyev Ali'",
      testFunction: `return formatName('Ali', 'Valiyev') === 'Valiyev Ali';`,
      testCases: [
        { call: "formatName('Ali', 'Valiyev')", expected: "Valiyev Ali" },
      ],
    },
  },
  {
    id: 'php',
    slug: 'php',
    title: 'PHP 8+ & Laravel Web Dasturlash',
    lang: 'PHP',
    category: 'backend',
    color: '#777BB4',
    price: 239000,
    formattedPrice: "239,000 so'm",
    originalPrice: "470,000 so'm",
    rating: 4.89,
    lessonsCount: 40,
    duration: '26 soat',
    desc: 'PHP 8.2 yangiliklari, Laravel MVC fremvorki va Eloquent ORM bilan tezkor loyihalar.',
    theory: {
      title: "Laravel Routing va Blade shablonlari",
      summary: "Laravel — dunyodagi eng mashhur PHP freymvorki bo'lib, qulay marshrutlash va toza kod arxitekturasini taqdim etadi.",
      explanation: `Route::get('/salom', function() { return view('welcome'); }); sintaksisi orqali veb-sahifalar tezkor bog'lanadi.`,
      codeExample: `Route::get('/users', [UserController::class, 'index']);`,
      mascotTip: "PHP o'zgaruvchilari har doim $ belgisi bilan boshlanadi!",
      keyTakeaways: [
        "Laravel MVC modelida Controller mantiqni, View ko'rinishni boshqaradi.",
        "Eloquent ORM SQL so'rovlarini avtomatlashtiradi.",
      ],
    },
    task: {
      title: "Slug Yaratuvchi Funksiya",
      summary: "slugify(title) funksiyasini yozing. Matndagi barcha harflarni kichik qilib, bo'shliqlarni '-' bilan almashtirsin.",
      steps: [
        "1. toLowerCase() orqali kichik harfga o'giring.",
        "2. replaceall(' ', '-') orqali bo'shliqlarni chiziqchaga almashtiring.",
      ],
      constraints: ["Faqat oddiy so'zlar va bo'shliqlar."],
      starterCode: `function slugify(title) {\n  return title.toLowerCase().replace(/\\s+/g, '-');\n}`,
      expectedResultSnippet: "slugify('Salom Dunyo') === 'salom-dunyo'",
      testFunction: `return slugify('Salom Dunyo') === 'salom-dunyo' && slugify('Nuxt 3 Dars') === 'nuxt-3-dars';`,
      testCases: [
        { call: "slugify('Salom Dunyo')", expected: "salom-dunyo" },
      ],
    },
  },
  {
    id: 'html-css',
    slug: 'html-css',
    title: 'HTML5, Modern CSS & Tailwind',
    lang: 'HTML/CSS',
    category: 'frontend',
    color: '#E44D26',
    price: 189000,
    formattedPrice: "189,000 so'm",
    originalPrice: "380,000 so'm",
    rating: 4.97,
    lessonsCount: 30,
    duration: '20 soat',
    desc: 'Semantik HTML, Flexbox, CSS Grid, zamonaviy Apple glassmorphism va Tailwind CSS.',
    theory: {
      title: "Flexbox va CSS Grid Bilan Zamonaviy Maketlash",
      summary: "CSS Flexbox bir o'lchamli (qator yoki ustun) joylashtirish uchun, CSS Grid esa to'liq ikki o'lchamli maketlar uchun mo'ljallangan.",
      explanation: `display: flex; justify-content: center; align-items: center; yordamida elementlarni osonlikcha markazlashtirish mumkin.`,
      codeExample: `.card {\n  display: flex;\n  justify-content: space-between;\n  backdrop-filter: blur(20px);\n}`,
      mascotTip: "Doimo semantik teglardan (header, main, footer, article) foydalaning!",
      keyTakeaways: [
        "Semantika qidiruv tizimlari (SEO) va qulaylik (accessibility) uchun zarur.",
        "Tailwind CSS tezkor inline stillar berishni osonlashtiradi.",
      ],
    },
    task: {
      title: "Klass Nomi Generatori",
      summary: "getButtonClass(variant) funksiyasini yozing. variant 'primary' bo'lsa 'bg-blue-600 text-white', aks holda 'bg-gray-100 text-black' qaytarsin.",
      steps: [
        "1. variant qiymatini tekshiring.",
        "2. Mos Tailwind klass satrini qaytaring.",
      ],
      constraints: ["variant ixtiyoriy string bo'lishi mumkin."],
      starterCode: `function getButtonClass(variant) {\n  return variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black';\n}`,
      expectedResultSnippet: "getButtonClass('primary') === 'bg-blue-600 text-white'",
      testFunction: `return getButtonClass('primary') === 'bg-blue-600 text-white' && getButtonClass('secondary') === 'bg-gray-100 text-black';`,
      testCases: [
        { call: "getButtonClass('primary')", expected: "bg-blue-600 text-white" },
      ],
    },
  },
  {
    id: 'sql',
    slug: 'sql',
    title: 'SQL & Relyatsion Ma\'lumotlar Ombori',
    lang: 'SQL',
    category: 'database',
    color: '#336791',
    price: 229000,
    formattedPrice: "229,000 so'm",
    originalPrice: "450,000 so'm",
    rating: 4.93,
    lessonsCount: 32,
    duration: '22 soat',
    desc: 'PostgreSQL, JOIN turlari, indekslar, optimallashtirish va ACID tranzaksiyalari.',
    theory: {
      title: "SQL SELECT, WHERE va JOIN So'rovlari",
      summary: "SQL relyatsion ma'lumotlar bazasidan ma'lumotlarni saralash, filtrlar va bog'lash orqali olish vositasidir.",
      explanation: `SELECT ism, yosh FROM foydalanuvchilar WHERE yosh >= 18; orqali belgilangan shartga mos yozuvlar olinadi.`,
      codeExample: `SELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.status = 'paid';`,
      mascotTip: "Jadvallarni bog'lashda birlamchi kalit (Primary Key) va tashqi kalit (Foreign Key) lar to'g'ri ko'rsatilganiga ishonch hosil qiling!",
      keyTakeaways: [
        "Indekslar millionlab qatorlar orasidan qidiruvni tezlashtiradi.",
        "ACID qoidalari moliyaviy tranzaksiyalar xavfsizligini kafolatlaydi.",
      ],
    },
    task: {
      title: "SQL So'rovi Generator Funksiyasi",
      summary: "buildSelectQuery(table, column, val) funksiyasini yozing. U `SELECT * FROM ${table} WHERE ${column} = '${val}'` shaklidagi satrni qaytarsin.",
      steps: [
        "1. Satr shablonidan (template literal) foydalaning.",
        "2. Parametrlarni SQL sintaksisiga moslashtiring.",
      ],
      constraints: ["Barcha parametrlar string."],
      starterCode: `function buildSelectQuery(table, column, val) {\n  return \`SELECT * FROM \${table} WHERE \${column} = '\${val}'\`;\n}`,
      expectedResultSnippet: "buildSelectQuery('users', 'id', '10') === \"SELECT * FROM users WHERE id = '10'\"",
      testFunction: `return buildSelectQuery('users', 'id', '10') === "SELECT * FROM users WHERE id = '10'";`,
      testCases: [
        { call: "buildSelectQuery('users', 'id', '10')", expected: "SELECT * FROM users WHERE id = '10'" },
      ],
    },
  },
];

export const useCourses = () => {
  const getCourseById = (id: string): CourseData => {
    const found = ALL_COURSES.find(c => c.id === id || c.slug === id);
    return found || ALL_COURSES[0];
  };

  return {
    courses: ALL_COURSES,
    getCourseById,
  };
};
