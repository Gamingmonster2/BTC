import type { Article } from "./types";

export const kmersAndMotifs: Article = {
  slug: "kmers-and-motifs",
  date: "2026-11-19",
  readingMinutes: 6,
  cover: {
    src: "/images/articles/kmers-and-motifs.webp",
    alt: {
      ar: "رسم مجرد ثلاثي الأبعاد لجزيء على خلفية داكنة",
      en: "Abstract 3D molecular structure on a dark background",
    },
  },
  content: {
    ar: {
      title: "الأنماط القصيرة: k-mers والنوافذ المنزلقة",
      summary:
        "كيف يبحث الحاسوب عن تكرار في تسلسل طويل؟ نافذة منزلقة، عدّاد بسيط، ومثال بتسلسل من ثمانية أحرف.",
      blocks: [
        {
          type: "p",
          text: "أبسط طريقة لاكتشاف الأنماط في تسلسل طويل هي أن تمرّر نافذة قصيرة فوقه وتحسب ما تراه. القطعة ذات الطول k تسمى k-mer. هذه الفكرة البسيطة تقف وراء تجميع الجينومات، ومقارنة التسلسلات، والبحث عن مواقع الربط.",
        },
        { type: "h2", text: "كم نافذة لدينا؟" },
        {
          type: "p",
          text: "في تسلسل طوله L، يوجد L − k + 1 موضع للنافذة ذات الطول k (بافتراض أن L ≥ k). النوافذ متداخلة: كل حرف جديد يدخل النافذة يدفع آخر حرف خارجها. لذلك عدد القطع ينمو خطيًا مع طول التسلسل، لا أُسّيًا.",
        },
        {
          type: "code",
          label: "مثال: ACGTACGT وk = 3",
          text: "ACG  CGT  GTA  TAC  ACG  CGT\n\n6 نوافذ، 4 أنواع مختلفة:\nACG = 2   CGT = 2   GTA = 1   TAC = 1",
        },
        { type: "h2", text: "اختيار k" },
        {
          type: "ul",
          items: [
            "k صغير (2–3): كثير من التطابقات العشوائية؛ النافذة لا تحمل معلومة كافية عن الموقع.",
            "k متوسط (5–7): غالبًا كافٍ للبحث عن نمط قصير مثل مواقع الربط.",
            "k كبير (31 مثلًا): شائع في تجميع الجينومات، لكن خطأً واحدًا في القراءة يفسد التطابق.",
            "عدد الاحتمالات النظرية لألفباء DNA هو 4^k؛ لذلك 31-mer له مساحة ضخمة وتكراره العشوائي نادر.",
          ],
        },
        {
          type: "note",
          title: "العدّ وحده لا يكفي",
          text: "تكرار k-mer لا يخبرك بالموقع ولا بالدلالة الإحصائية. منطقة غنية بالتكرارات قد ترفع العدّ دون أن تعني شيئًا. تحتاج خلفية إحصائية (مثل توزيع متوقع أو مقارنةبعينة عشوائية) قبل أن تسمي النمط «مهمًا».",
        },
        { type: "h2", text: "متى يفيد فعليًا؟" },
        {
          type: "ol",
          items: [
            "البحث السريع عن تكرار معروف في تسلسل جديد.",
            "بناء مؤشر للبحث دون قراءة التسلسل كاملًا في كل مرة.",
            "تجميع الجينومات عبر رسم بياني de Bruijn للـ k-mers.",
            "حساب تشابه تقريبي بين تسلسلين بمقارنة توزيع الـ k-mers بدل محاذاة كاملة.",
          ],
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "الـ k-mer هو مثال جيد على فلسفتنا: ابدأ بعدّ بسيط، افهم ما يعنيه، ثم قرّر إن كنت تحتاج نموذجًا أعقد. في كثير من المهام يكون العدّ وحده خط أساس قويًا جدًا.",
        },
      ],
    },
    en: {
      title: "Short patterns: k-mers and sliding windows",
      summary:
        "How does software find repeats in a long sequence? A sliding window, a simple counter, and an eight-letter worked example.",
      blocks: [
        {
          type: "p",
          text: "The simplest way to spot a pattern in a long sequence is to slide a short window over it and count what you see. A substring of length k is called a k-mer. This small idea underpins genome assembly, sequence comparison and binding-site searches.",
        },
        { type: "h2", text: "How many windows are there?" },
        {
          type: "p",
          text: "A sequence of length L contains L − k + 1 positions for a window of length k (when L ≥ k). The windows overlap: each new base entering pushes the oldest one out. The count therefore grows linearly with sequence length, not exponentially.",
        },
        {
          type: "code",
          label: "Example: ACGTACGT, k = 3",
          text: "ACG  CGT  GTA  TAC  ACG  CGT\n\n6 windows, 4 distinct types:\nACG = 2   CGT = 2   GTA = 1   TAC = 1",
        },
        { type: "h2", text: "Choosing k" },
        {
          type: "ul",
          items: [
            "Small k (2–3): many random matches; the window carries little positional information.",
            "Medium k (5–7): usually enough for a short motif such as a binding site.",
            "Large k (31 for example): standard in genome assembly, but a single sequencing error destroys the match.",
            "The theoretical space for DNA is 4^k, so a 31-mer rarely occurs by chance.",
          ],
        },
        {
          type: "note",
          title: "Counts alone are not enough",
          text: "A k-mer count says nothing about position or statistical significance. A repeat-rich region can inflate counts without meaning anything. Compare against a background model or a shuffled sequence before calling a pattern significant.",
        },
        { type: "h2", text: "Where it helps" },
        {
          type: "ol",
          items: [
            "Quickly finding a known repeat in a new sequence.",
            "Building an index so searches do not rescan the whole sequence.",
            "Genome assembly with a de Bruijn graph of k-mers.",
            "Approximate similarity between two sequences by comparing k-mer distributions instead of a full alignment.",
          ],
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "The k-mer is a good example of our philosophy: start with a simple count, understand what it means, then decide whether you need a more complex model. For many tasks the count alone is a surprisingly strong baseline.",
        },
      ],
    },
  },
};
