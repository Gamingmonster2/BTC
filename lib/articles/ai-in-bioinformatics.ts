import type { Article } from "./types";

export const aiInBioinformatics: Article = {
  slug: "ai-in-bioinformatics",
  date: "2026-11-18",
  readingMinutes: 7,
  cover: {
    src: "/images/articles/ai-in-bioinformatics.webp",
    alt: {
      ar: "رسم مجرد لشبكة عصبية رقمية وتدفق بيانات",
      en: "Abstract rendering of a digital neural network and data flow",
    },
  },
  content: {
    ar: {
      title: "الذكاء الاصطناعي في المعلوماتية الحيوية: ثلاث مهام واقعية",
      summary:
        "تمثيل، تصنيف، وتوليد — ثلاث وظائف يؤديها الذكاء الاصطناعي فعلًا مع التسلسلات، وحدود واضحة لكل واحدة.",
      blocks: [
        {
          type: "p",
          text: "عندما نقول «الذكاء الاصطناعي في المعلوماتية الحيوية» فنحن لا نتحدث عن مختبر ولا عن تجربة، بل عن برمجيات تتعلم نمطًا من بيانات تسلسلية. ثلاث مهام تغطي أغلب الاستخدامات العملية اليوم، ولكل منها سقف معروف.",
        },
        { type: "h2", text: "١. التمثيل: تحويل التسلسل إلى أرقام" },
        {
          type: "p",
          text: "النموذج لا يقرأ الحروف؛ يحتاج متجه أرقام بطول ثابت. لهذا نحسب تركيب الأحماض، والوزن الجزيئي، وGRAVY، وغيرها من الخصائص قبل التدريب. هذه الخطوة ليست «ذكاءً» بحد ذاتها، لكنها تحدد ما ستراه الخوارزمية.",
        },
        {
          type: "tool",
          href: "/tools/protein-features",
          label: "جرّب الآن",
          title: "مستخرج خصائص البروتين",
          description: "يحوّل أي تسلسل بروتين إلى 31 قيمة رقمية يمكن نسخها أو تنزيلها كـ CSV.",
        },
        { type: "h2", text: "٢. التصنيف: اختيار تسمية لعينة" },
        {
          type: "p",
          text: "هل هذا البروتين إنزيم أم لا؟ هل التسلسل ينتمي لعائلة معروفة؟ هنا يتعلم النموذج حدودًا من أمثلة مُسمّاة. المشكلة ليست في تعقيد النموذج غالبًا، بل في جودة التسميات وتسريب البيانات بين التدريب والاختبار.",
        },
        { type: "h2", text: "٣. التوليد: اقتراح تسلسلات جديدة" },
        {
          type: "p",
          text: "نماذج اللغوية البروتينية تقترح تسلسلات لم تكن موجودة في بيانات التدريب. هذه أقوى المهام الثلاث وأكثرها إغراءً، لكن المخرج مجرد فرضية حسابية: لا يصبح بروتينًا صالحًا إلا بعد تحقّق فيزيائي أو تجريبي خارج نطاق هذه المنصة.",
        },
        {
          type: "note",
          title: "ما لا تفعله المنصة",
          text: "لا نجري تجارب، ولا نتنبأ بالبنية ثلاثية الأبعاد، ولا نصدّر نتائج طبية. الأرقام التي نعرضها قابلة للتحقق يدويًا، وتلك ميزة مقصودة: نفضّل أداة تشرح نفسها على صندوق أسود.",
        },
        { type: "h2", text: "قواعد عملية قبل التدريب" },
        {
          type: "ol",
          items: [
            "ابدأ بخط أساس بسيط قبل الشبكات العميقة.",
            "افصل بيانات الاختبار قبل أي تنظيف أو موازنة، وإلا تسربت المعلومة.",
            "وحّد مقاييس الأعمدة ذات القيم الكبيرة مثل الوزن الجزيئي.",
            "اسأل دائمًا: هل الخصائص تحتفظ بترتيب التسلسل؟ متجه التركيب لا يحتفظ به.",
            "سجّل إصدار الجدول أو النموذج المستخدم، فالنتائج تتغير بتغيّر المرجع.",
          ],
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "الذكاء الاصطناعي هنا أداة للاستنتاج من أرقام نفهمها، لا بديل عن الفهم. ابدأ بالخصائص البسيطة، واعرف حدودها، ثم انتقل إلى نموذج أعقد فقط إن أثبت تفوقه على خط الأساس.",
        },
      ],
    },
    en: {
      title: "AI in bioinformatics: three realistic jobs",
      summary:
        "Representation, classification and generation — what AI actually does with sequences today, and the limit of each one.",
      blocks: [
        {
          type: "p",
          text: "When we say 'AI in bioinformatics' we are not describing a laboratory or an experiment. We mean software that learns a pattern from sequence data. Three jobs cover most practical use today, and each has a known ceiling.",
        },
        { type: "h2", text: "1. Representation: turning a sequence into numbers" },
        {
          type: "p",
          text: "A model cannot read letters; it needs a fixed-length numeric vector. That is why we compute composition, molecular weight, GRAVY and related descriptors before training. This step is not 'intelligence' by itself, but it decides what the algorithm gets to see.",
        },
        {
          type: "tool",
          href: "/tools/protein-features",
          label: "Try it",
          title: "Protein feature extractor",
          description: "Turns any protein sequence into 31 numeric values you can copy or download as CSV.",
        },
        { type: "h2", text: "2. Classification: attaching a label" },
        {
          type: "p",
          text: "Is this protein an enzyme? Does the sequence belong to a known family? The model learns boundaries from labelled examples. The bottleneck is rarely model complexity; it is label quality and leakage between training and test sets.",
        },
        { type: "h2", text: "3. Generation: proposing new sequences" },
        {
          type: "p",
          text: "Protein language models suggest sequences absent from their training data. This is the most powerful and most tempting of the three, yet the output is still a computational hypothesis: it becomes a usable protein only after physical or experimental validation outside this platform.",
        },
        {
          type: "note",
          title: "What this platform does not do",
          text: "We run no experiments, predict no 3D structure, and return no medical results. Every number we display can be checked by hand — deliberately. We prefer a tool that explains itself to a black box.",
        },
        { type: "h2", text: "Practical rules before training" },
        {
          type: "ol",
          items: [
            "Start with a simple baseline before reaching for deep networks.",
            "Split off the test set before cleaning or balancing, or information leaks in.",
            "Scale columns with large magnitudes such as molecular weight.",
            "Ask whether the features preserve sequence order: composition vectors do not.",
            "Record the reference table or model version; results change when the reference changes.",
          ],
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "AI here is a way to reason about numbers we understand, not a substitute for understanding. Start with simple descriptors, know their limits, and move to a more complex model only when it beats the baseline.",
        },
      ],
    },
  },
};
