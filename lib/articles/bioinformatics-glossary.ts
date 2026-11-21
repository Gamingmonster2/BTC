import type { Article } from "./types";

export const bioinformaticsGlossary: Article = {
  slug: "bioinformatics-glossary",
  date: "2026-11-17",
  readingMinutes: 8,
  cover: {
    src: "/images/articles/bioinformatics-glossary.webp",
    alt: {
      ar: "نموذج جزيئي بنفسجي على شبكة سداسية مجردة",
      en: "Purple molecular model on an abstract hexagonal grid",
    },
  },
  content: {
    ar: {
      title: "معجم المعلوماتية الحيوية: ١٢ مصطلحًا تحتاجها قبل أي أداة",
      summary:
        "تعريفات قصيرة وعملية لأكثر الكلمات تكرارًا في تحليل التسلسلات: من القاعدة إلى الـ contig، ومن الـ Tm إلى التعليق الوظيفي.",
      blocks: [
        {
          type: "p",
          text: "نصف صعوبة أي أداة معلوماتية حيوية هي فهم المصطلحات التي تظهر في واجهتها. هذا المعجم لا يشرح نظريات، بل يعرّف الكلمات بالطريقة التي تستخدمها الأدوات فعليًا.",
        },
        { type: "h2", text: "التسلسل والألفباء" },
        {
          type: "ul",
          items: [
            "تسلسل (sequence): سلسلة من الحروف تمثّل قواعد DNA أو RNA أو أحماض بروتين. ترتيب الحروف هو المعلومة.",
            "قاعدة (base): أحد أحرف A وC وG وT (أو U في RNA).",
            "كودون (codon): ثلاث قواعد متجاورة تُقرأ معًا أثناء الترجمة.",
            "إطار قراءة (reading frame): إحدى ثلاث طرق لتجميع التسلسل إلى ثلاثيات. للـ DNA شريطان وستة إطارات محتملة.",
            "محتوى GC (GC content): نسبة G+C من إجمالي القواعد. يقيس ببساطة كم من التسلسل «أقوى» ارتباطًا بين شريطيه.",
          ],
        },
        { type: "h2", text: "الوحدات والنتائج" },
        {
          type: "ul",
          items: [
            "بادئ (primer): قطعة قصيرة من DNA تُستخدم كنقطة بداية للاستنساخ أو التسلسل.",
            "درجة الانصهار (Tm): حرارة التي يفقد عندها نصف البادئات ارتباطها بالقالب.",
            "متمم عكسي (reverse complement): التسلسل المكمل للشريط الآخر باتجاه معكوس.",
            "إطار مفتوح للقراءة (ORF): امتداد يبدأ بـ ATG وينتهي بأول كودون توقف في نفس الإطار.",
            "k-mer: قطعة من طول k تُستخدم للعدّ والبحث عن الأنماط.",
          ],
        },
        { type: "h2", text: "بيانات التسلسل" },
        {
          type: "ul",
          items: [
            "قراءة (read): تسلسل قصير ينتجه جهاز التسلسل؛ قد يحتوي أخطاء.",
            "قطعة متصلة (contig): تسلسل متصل يُنتج بدمج قراءات متداخلة.",
            "هيكل تجميعي (scaffold): تجميع أكبر يربط عدة قطع متصلة بمسافات ومعلومات توجيه.",
            "تعليق (annotation): إضافة معنى بيولوجي للمناطق في التسلسل، مثل «هذا جين» أو «هذا موقع ربط».",
          ],
        },
        {
          type: "note",
          title: "كيف تستخدم المعجم",
          text: "عند قراءة نتيجة أي أداة، حوّل كل مصطلح إلى سؤال قابل للقياس: كم؟ في أي موضع؟ وفق أي جدول؟ إن لم تستطع الإجابة، فالرقم الذي أمامك ليس جاهزًا للاستخدام.",
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "المصطلحات ليست حفظًا؛ هي عقد صغيرة تربط الرقم بالمعنى. احفظ هذا المعجم بجانب الأدوات، وستقرأ النتائج أسرع وتكتشف الأخطاء مبكرًا.",
        },
      ],
    },
    en: {
      title: "A bioinformatics glossary: 12 terms to know before any tool",
      summary:
        "Short, practical definitions for the words that keep appearing in sequence analysis — from base to contig and from Tm to annotation.",
      blocks: [
        {
          type: "p",
          text: "Half the difficulty of any bioinformatics tool is understanding the words in its interface. This glossary does not explain theories; it defines terms the way the tools actually use them.",
        },
        { type: "h2", text: "Sequence and alphabet" },
        {
          type: "ul",
          items: [
            "Sequence: a string of letters representing DNA, RNA or protein. The order is the information.",
            "Base: one of A, C, G and T (or U in RNA).",
            "Codon: three adjacent bases read together during translation.",
            "Reading frame: one of three ways to group a sequence into triplets. Double-stranded DNA has six possible frames.",
            "GC content: the fraction of G+C bases in a sequence — a simple measure of how strongly the strands pair.",
          ],
        },
        { type: "h2", text: "Units and results" },
        {
          type: "ul",
          items: [
            "Primer: a short DNA oligonucleotide that provides a starting point for amplification or sequencing.",
            "Melting temperature (Tm): the temperature at which half of the primer–template duplexes dissociate.",
            "Reverse complement: the complement of the opposite strand, written in the reverse direction.",
            "Open reading frame (ORF): a stretch beginning with ATG and ending at the first in-frame stop codon.",
            "k-mer: a substring of length k, used for counting and pattern searches.",
          ],
        },
        { type: "h2", text: "Sequence data" },
        {
          type: "ul",
          items: [
            "Read: a short sequence produced by a sequencer; it may contain errors.",
            "Contig: a continuous sequence built by merging overlapping reads.",
            "Scaffold: a larger arrangement that orders contigs with gaps and orientation.",
            "Annotation: adding biological meaning to regions of a sequence, such as 'this is a gene' or 'this is a binding site'.",
          ],
        },
        {
          type: "note",
          title: "How to use this glossary",
          text: "When reading any tool result, turn each term into a measurable question: how many? at which position? using which reference table? If you cannot answer, the number in front of you is not ready to use.",
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "Terms are not memorisation; they are small links between a number and its meaning. Keep this glossary next to the tools and you will read results faster and catch mistakes earlier.",
        },
      ],
    },
  },
};
