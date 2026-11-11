# المساهمة في BTC / Contributing

شكراً لاهتمامك. المنصة مفتوحة المصدر وترحيب بالمساهمات الصغيرة والكبيرة: إصلاح خطأ،
تحسين ترجمة، إضافة أداة، أو مقال.

> المنصة منصة **برمجية**. لا نقبل ادعاءات بنتائج مخبرية أو بيانات مرضى.

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # فحص الأنواع
npm run lint       # ESLint
```

للتشغيل على محاكي Cloudflare (نفس بيئة الإنتاج تقريباً):

```bash
npm run preview    # بناء + wrangler على المنفذ 8787
```

## قواعد أساسية

1. **العربية والإنجليزية معاً.** أي نص جديد يُضاف إلى `messages/ar.json`
   و`messages/en.json` بنفس المفتاح. لا تُضف مفتاحاً في ملف واحد فقط.
2. **RTL وLTR.** جرّب الصفحة بالعربية والإنجليزية. اتجاه النصوص العلمية
   (DNA، بروتين، معادلات) يبقى LTR حتى داخل الصفحة العربية.
3. **الأرقام العلمية تُوثّق.** أي حساب جديد في `lib/bio/` يجب أن يذكر المصدر
   أو الصيغة في تعليق، وأن يُضاف شرحه إلى قسم *Accuracy notes* في `README.md`.
   لا تُخفِ التقريب: قل صراحة إن كانت القيمة تقديرية.
4. **لا اعتماديات ثقيلة.** الأدوات تعمل في المتصفح. لا تُضف مكتبة بحجم كبير
   لحساب يمكن كتابته في 30 سطراً.
5. **الخصوصية.** لا تُرسل بيانات المستخدم إلى أي خادم. لا تحليلات تتبّع،
   ولا نماذج تُخزَّن.

## إضافة أداة

1. المنطق الحسابي في `lib/bio/<tool>.ts` (دوال نقية، بلا React).
2. الواجهة في `components/tools/<tool>.tsx`.
3. الصفحة في `app/[locale]/tools/<tool>/page.tsx` مع `pageMetadata`.
4. أضفها إلى `PUBLIC_ROUTES` في `lib/site.ts` وإلى `messages/*.json` (قسم `tools.list`).
5. أضف مقالاً يشرحها في `lib/articles/` واربطه بالأداة.

## إضافة مقال

انظر قسم *Adding an article* في `README.md`. كل مقال يجب أن يرتبط داخلياً
بالأداة التي يشرحها (حقل `tool`).

## الالتزامات (Commits)

استخدم صيغة قصيرة وواضحة، مثل:

```
fix: correct salt-adjusted Tm formula
feat: add reverse complement copy button
content: add primer Tm guide (ar/en)
docs: document deployment steps
```

## قبل فتح PR

- [ ] `npx tsc --noEmit` و`npm run lint` يمرّان
- [ ] المفاتيح موجودة في اللغتين
- [ ] جرّبت الصفحة بالعربية والإنجليزية
- [ ] لا أسرار ولا بيانات شخصية

## التواصل

- سؤال سريع: واتساب من صفحة [التواصل](https://btc.org.ly/ar/contact)
- نقاش عام: [GitHub Discussions](https://github.com/Gamingmonster2/BTC/discussions)
- خطأ واضح: [فتح Issue](https://github.com/Gamingmonster2/BTC/issues/new/choose)

بالمشاركة أنت توافق على أن تُنشر مساهمتك تحت رخصة MIT الخاصة بالمشروع.
