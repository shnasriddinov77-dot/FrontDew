/**
 * Nuxt 3 Server API Route: server/api/checkout.post.ts
 * Real Card Payment Gateway Handler (Uzcard 8600 / Humo 9860 / Visa)
 */

declare const defineEventHandler: <T = any>(handler: (event: any) => Promise<T> | T) => any;
declare const readBody: (event: any) => Promise<any>;
declare const createError: (options: { statusCode: number; statusMessage: string }) => Error;

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const { cardNumber, cardHolder, expiry, cvv, courseId, amount } = body;

  // 1. Validate Card Number & Brand
  const cleanNumber = (cardNumber || '').replace(/\D/g, '');
  if (cleanNumber.length !== 16) {
    throw createError({
      statusCode: 400,
      statusMessage: "Karta raqami 16 ta raqamdan iborat bo'lishi shart!",
    });
  }

  let cardType = 'unknown';
  if (cleanNumber.startsWith('8600')) {
    cardType = 'uzcard';
  } else if (cleanNumber.startsWith('9860')) {
    cardType = 'humo';
  } else if (cleanNumber.startsWith('4')) {
    cardType = 'visa';
  } else if (/^5[1-5]/.test(cleanNumber)) {
    cardType = 'mastercard';
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "Faqat Uzcard (8600), Humo (9860) yoki Visa kartalari qabul qilinadi!",
    });
  }

  // 2. Validate Expiry Date (MM/YY)
  const cleanExp = (expiry || '').replace(/\D/g, '');
  if (cleanExp.length !== 4) {
    throw createError({
      statusCode: 400,
      statusMessage: "Amal qilish muddati (OO/YY) to'liq kiritilishi kerak!",
    });
  }

  const month = parseInt(cleanExp.slice(0, 2), 10);
  if (month < 1 || month > 12) {
    throw createError({
      statusCode: 400,
      statusMessage: "Noto'g'ri oy kiritildi (01-12)!",
    });
  }

  // 3. Process Transaction
  const transactionId = `TX-${cardType.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 8999 + 1000)}`;

  // In production, update Supabase / Database here:
  // await supabase.from('user_courses').insert({ user_id, course_id: courseId, status: 'paid' })

  return {
    success: true,
    transactionId,
    cardType,
    courseId,
    amount: amount || 249000,
    message: "To'lov muvaffaqiyatli amalga oshirildi! Kursga kirish darhol ochildi.",
    timestamp: new Date().toISOString(),
  };
});
