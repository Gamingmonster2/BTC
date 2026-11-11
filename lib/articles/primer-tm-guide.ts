import type { Article } from "./types";

export const primerTmGuide: Article = {
  slug: "primer-tm-guide",
  date: "2026-11-11",
  readingMinutes: 7,
  tool: "primer-tm",
  content: {
    ar: {
      title: "دليل حاسبة درجة انصهار البادئات (Tm)",
      summary:
        "ما معنى Tm، ولماذا تعطي قاعدة 2+4 وصيغة تصحيح الملح رقمين مختلفين، وكيف تقرأ GC clamp، ومتى لا تكفي الأداة وحدها.",
      blocks: [
        {
          type: "p",
          text: "درجة الانصهار Tm هي الحرارة التي يفصل عندها نصف جزيئات البادئ عن الشريط المكمّل. في تفاعل PCR، الفرق بين Tm البادئ وحرارة الالتصاق (annealing) هو ما يحدد إن كان التفاعل سيعمل أم سيفشل.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "جرّب الآن",
          title: "حاسبة درجة انصهار البادئات",
          description:
            "أدخل البادئ لتحصل على الطول، ونسبة GC، وقيمتين لـ Tm، والمتمم العكسي، وقوة GC clamp.",
        },
        { type: "h2", text: "قاعدة 2+4 (Wallace)" },
        {
          type: "p",
          text: "أبسط تقدير لدرجة الانصهار: كل زوج A=T يسهم بـ 2°م، وكل زوج G≡C يسهم بـ 4°م. أي أن Tm ≈ 2×(A+T) + 4×(G+C).",
        },
        {
          type: "p",
          text: "هذه القاعدة سريعة وسهلة الحساب يدويًا، لكنها صالحة فقط للبادئات القصيرة بين 14 و20 قاعدة. خارج هذا المدى تصبح الأخطاء كبيرة، ولذلك تعرض الأداة تنبيهًا عندما يكون طول البادئ خارج هذا النطاق.",
        },
        { type: "h2", text: "صيغة تصحيح الملح" },
        {
          type: "p",
          text: "الصيغة الثانية تراعي طول البادئ ونسبة GC وتركيز أيونات الصوديوم في المحلول. الشكل المستخدم في الأداة هو شكل Howley/OligoCalc:",
        },
        {
          type: "code",
          label: "الصيغة",
          text: "Tm = 81.5 + 16.6 × log10([Na+] / (1 + 0.7[Na+]))\n     + 0.41 × (%GC) − 500 / N",
        },
        {
          type: "p",
          text: "حيث [Na+] هو التركيز بالمول/لتر (الافتراضي 50 mM أي 0.05)، وN هو طول البادئ. الحد 500/N خاص بالببتيدات القصيرة (oligonucleotides)؛ استخدام 675/N بدلًا منه يعطي تقديرًا منخفضًا بخمس أو ست درجات للبادئات القصيرة.",
        },
        { type: "h2", text: "لماذا يختلف الرقمان؟" },
        {
          type: "p",
          text: "لأن قاعدة 2+4 لا تعرف شيئًا عن طول البادئ ولا عن تركيز الملح، بينما صيغة تصحيح الملح تعرف. عند بادئ طوله 20 قاعدة ونسبة GC تساوي 50%، تعطي القاعدة 60.0°م بينما تعطي الصيغة المصححة نحو 55.2°م.",
        },
        {
          type: "note",
          title: "أي رقم تستخدم؟",
          text: "استخدم صيغة تصحيح الملح كتقدير أولي، واعتبر قاعدة 2+4 فحصًا سريعًا فقط. في العمل الحقيقي، تصميم البادئات يحتاج نموذج الجيران الأقرب (nearest-neighbor) وبرنامجًا مثل Primer3.",
        },
        { type: "h2", text: "GC clamp: نهاية 3'" },
        {
          type: "p",
          text: "يُفضّل أن ينتهي البادئ عند الطرف 3' بقاعدة G أو C، لأن زوج G≡C أقوى ويثبّت النهاية التي يبدأ منها إنزيم البوليميراز. لكن الإفراط مضر: أربع أو خمس قواعد G/C متتالية في النهاية قد تسبب ارتباطًا غير نوعي.",
        },
        {
          type: "p",
          text: "الأداة تعرض نعم/لا لوجود GC clamp، وتعرض أيضًا عدد قواعد G/C في آخر خمس قواعد. القيمة 1–3 عادة جيدة، والقيمة 4–5 تستحق إعادة النظر في التصميم.",
        },
        { type: "h2", text: "مثال كامل" },
        {
          type: "p",
          text: "لنأخذ البادئ CAGTGATGGATCTGGGCATT. الطول 20 قاعدة، والعدد: A=4 وT=6 وG=7 وC=3، إذن نسبة GC تساوي 50.0%.",
        },
        {
          type: "code",
          label: "النتائج",
          text: "الطول            : 20\nنسبة GC          : 50.0%\nTm (2+4)         : 60.0 °C\nTm (تصحيح الملح) : 55.2 °C\nالمتمم العكسي    : AATGCCCAGATCCATCACTG\nآخر خمس قواعد    : GCATT → 2 قواعد GC\nGC clamp         : لا (ينتهي بـ T)",
        },
        {
          type: "p",
          text: "لاحظ أن البادئ ينتهي بـ T، أي لا يوجد GC clamp. عمليًا قد يعمل، لكن إن أمكن استبدال القاعدة الأخيرة بـ G أو C فذلك أفضل. أيضًا لاحظ الفرق بين 60.0 و55.2: لو اعتمدت على قاعدة 2+4 وحدها لاخترت حرارة التصاق أعلى بخمس درجات تقريبًا.",
        },
        { type: "h2", text: "ما لا تحسبه الأداة" },
        {
          type: "ul",
          items: [
            "نموذج الجيران الأقرب (nearest-neighbor) الأدق لدرجة الانصهار.",
            "تأثير أيونات المغنيسيوم (Mg²⁺) أو إضافات مثل DMSO وBetaine.",
            "الارتباط الذاتي (self-dimer) وبنية الشعرية (hairpin).",
            "نوعية الارتباط بالمصفوفة الجينومية (specificity) واحتمال الارتباط بمواضع أخرى.",
            "كفاءة التضخيم أو وجود تعددات شكلية تحت البادئ.",
          ],
        },
        {
          type: "note",
          title: "قاعدة عملية",
          text: "اجعل Tm البادئ الأمامي والعكسي متقاربين (فرق لا يزيد على 2–3 درجات)، واستخدم حرارة التصاق أقل من Tm بنحو 3–5 درجات كبداية، ثم اضبطها تجريبيًا.",
        },
        { type: "h2", text: "كيف تستخدم الأداة" },
        {
          type: "ol",
          items: [
            "الصق تسلسل البادئ (بدون 5' أو 3') في الحقل.",
            "اضغط حساب، ثم اقرأ الطول ونسبة GC أولًا.",
            "قارن قيمتي Tm، واعتبر صيغة تصحيح الملح هي التقدير الأساسي.",
            "تحقق من GC clamp ومن آخر خمس قواعد.",
            "انسخ المتمم العكسي إن كنت تصمم البادئ العكسي.",
          ],
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "الأداة تعطيك تقديرًا سريعًا ومفهومًا، لا قرارًا نهائيًا. استخدمها للفرز الأولي ومقارنة الخيارات، ثم انتقل إلى Primer3 أو OligoCalc عندما تحتاج دقة تصميم حقيقية. وإن لاحظت فرقًا كبيرًا بين نتائجنا ونتائج برنامج آخر، أرسل لنا التسلسل عبر واتساب لنراجع الصيغة.",
        },
      ],
    },
    en: {
      title: "Primer melting temperature (Tm) guide",
      summary:
        "What Tm means, why the 2+4 rule and the salt-adjusted formula disagree, how to read a GC clamp, and when the tool alone is not enough.",
      blocks: [
        {
          type: "p",
          text: "The melting temperature Tm is the temperature at which half of the primer molecules separate from the complementary strand. In a PCR reaction, the gap between the primer Tm and the annealing temperature is what decides whether the reaction works or fails.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "Try it",
          title: "Primer melting temperature calculator",
          description:
            "Enter a primer to get its length, GC content, two Tm estimates, the reverse complement, and GC clamp strength.",
        },
        { type: "h2", text: "The 2+4 rule (Wallace)" },
        {
          type: "p",
          text: "The simplest Tm estimate: every A=T pair contributes 2°C and every G≡C pair contributes 4°C. So Tm ≈ 2×(A+T) + 4×(G+C).",
        },
        {
          type: "p",
          text: "The rule is fast and easy to compute by hand, but it is only valid for primers between 14 and 20 bases. Outside that range the error grows quickly, which is why the tool shows a warning when your primer is longer or shorter.",
        },
        { type: "h2", text: "The salt-adjusted formula" },
        {
          type: "p",
          text: "The second formula accounts for primer length, GC content and the sodium concentration in solution. The tool uses the Howley/OligoCalc form:",
        },
        {
          type: "code",
          label: "Formula",
          text: "Tm = 81.5 + 16.6 × log10([Na+] / (1 + 0.7[Na+]))\n     + 0.41 × (%GC) − 500 / N",
        },
        {
          type: "p",
          text: "Here [Na+] is the concentration in mol/L (50 mM by default, i.e. 0.05) and N is the primer length. The 500/N term is the oligonucleotide form; using 675/N instead underestimates short primers by five or six degrees.",
        },
        { type: "h2", text: "Why the two numbers differ" },
        {
          type: "p",
          text: "Because the 2+4 rule knows nothing about primer length or salt concentration, while the salt-adjusted formula knows both. For a 20-base primer with 50% GC, the rule gives 60.0°C while the corrected formula gives about 55.2°C.",
        },
        {
          type: "note",
          title: "Which number should you use?",
          text: "Use the salt-adjusted value as your working estimate and treat the 2+4 rule as a quick sanity check only. Real primer design needs a nearest-neighbor model and a tool such as Primer3.",
        },
        { type: "h2", text: "GC clamp at the 3' end" },
        {
          type: "p",
          text: "A primer should ideally end at its 3' end with G or C, because the G≡C pair is stronger and stabilises the end where the polymerase starts. Too much of it is harmful, though: four or five consecutive G/C bases at the end can cause non-specific binding.",
        },
        {
          type: "p",
          text: "The tool shows yes/no for the presence of a GC clamp, and also counts G/C bases in the last five bases. A value of 1–3 is usually good; 4–5 is worth redesigning.",
        },
        { type: "h2", text: "A complete example" },
        {
          type: "p",
          text: "Take the primer CAGTGATGGATCTGGGCATT. It is 20 bases long with A=4, T=6, G=7 and C=3, so GC content is 50.0%.",
        },
        {
          type: "code",
          label: "Results",
          text: "Length            : 20\nGC content        : 50.0%\nTm (2+4 rule)     : 60.0 °C\nTm (salt-adjusted): 55.2 °C\nReverse complement: AATGCCCAGATCCATCACTG\nLast five bases   : GCATT → 2 GC bases\nGC clamp          : No (ends with T)",
        },
        {
          type: "p",
          text: "Notice that the primer ends with T, so there is no GC clamp. It may still work in practice, but replacing the last base with G or C is better when possible. Also notice the gap between 60.0 and 55.2: relying on the 2+4 rule alone would have led you to pick an annealing temperature about five degrees too high.",
        },
        { type: "h2", text: "What the tool does not compute" },
        {
          type: "ul",
          items: [
            "The more accurate nearest-neighbor Tm model.",
            "The effect of magnesium (Mg²⁺) or additives such as DMSO and betaine.",
            "Self-dimers and hairpin structures.",
            "Genomic specificity and the chance of binding elsewhere.",
            "Amplification efficiency, or polymorphisms under the primer.",
          ],
        },
        {
          type: "note",
          title: "A practical rule",
          text: "Keep the forward and reverse primer Tm within 2–3 degrees of each other, and start with an annealing temperature 3–5 degrees below Tm, then adjust it experimentally.",
        },
        { type: "h2", text: "How to use the tool" },
        {
          type: "ol",
          items: [
            "Paste the primer sequence (without 5' or 3' labels) into the field.",
            "Press Calculate and read the length and GC content first.",
            "Compare the two Tm values and treat the salt-adjusted one as the primary estimate.",
            "Check the GC clamp and the last five bases.",
            "Copy the reverse complement when you are designing the reverse primer.",
          ],
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "The tool gives you a fast, understandable estimate, not a final decision. Use it for first-pass screening and comparing candidates, then move to Primer3 or OligoCalc when you need real design accuracy. If our result differs a lot from another program, send us the sequence on WhatsApp and we will review the formula.",
        },
      ],
    },
  },
};
