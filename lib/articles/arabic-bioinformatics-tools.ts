import type { Article } from "./types";

export const arabicBioinformaticsTools: Article = {
  slug: "arabic-bioinformatics-tools",
  date: "2026-11-12",
  readingMinutes: 5,
  content: {
    ar: {
      title: "أدوات المعلوماتية الحيوية بالعربية: دليل البداية",
      summary:
        "كيف تختار أداة معلوماتية حيوية موثوقة تعمل في المتصفح دون رفع بياناتك، وما الأدوات المتاحة على المنصة الآن، وما الذي نبنيه بعدها.",
      blocks: [
        {
          type: "p",
          text: "معظم أدوات المعلوماتية الحيوية مكتوبة بالإنجليزية، وكثير منها يحتاج تثبيتًا أو حسابًا أو رفع الملفات إلى خادم. هذا ليس عائقًا للباحث المحترف، لكنه عائق حقيقي للطالب العربي الذي يريد فهم ما يفعله قبل أن يحفظ خطوات برنامج.",
        },
        {
          type: "p",
          text: "الهدف هنا ليس ترجمة واجهات فقط، بل بناء أدوات صغيرة مفهومة، تعرض الصيغة التي تستخدمها، وتقول بصراحة ما لا تحسبه. الأداة الجيدة تعليم قبل أن تكون نتيجة.",
        },
        { type: "h2", text: "ما الذي يجعل الأداة جديرة بالثقة؟" },
        {
          type: "ul",
          items: [
            "تعمل بالكامل في المتصفح: التسلسل لا يغادر جهازك.",
            "تذكر الصيغة أو المرجع الذي بنيت عليه، لا «نتيجة سحرية».",
            "تعرض حدودها: ماذا لا تحسب، ومتى تحتاج برنامجًا متخصصًا.",
            "تعطي أرقامًا قابلة للتحقق، لا صورة واحدة نهائية.",
            "تسمح بنسخ النتيجة، وتعمل على الهاتف، وتدعم العربية وRTL.",
          ],
        },
        { type: "h2", text: "الأدوات المتاحة الآن" },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "افتح الأداة",
          title: "محلّل تسلسل DNA",
          description:
            "الطول، ومحتوى GC، وعدّ القواعد، والمتمم العكسي، والنسخ إلى RNA، والترجمة إلى بروتين، والوزن الجزيئي.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "افتح الأداة",
          title: "حاسبة درجة انصهار البادئات (Tm)",
          description:
            "تقديران لـ Tm (قاعدة 2+4 وصيغة تصحيح الملح)، ونسبة GC، وقوة GC clamp، والمتمم العكسي.",
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "افتح الأداة",
          title: "مكتشف إطارات القراءة المفتوحة (ORF)",
          description:
            "ستة إطارات على الشريطين، من ATG إلى codon التوقف، مع الإحداثيات والبروتين.",
        },
        { type: "h2", text: "أي أداة تستخدم؟" },
        {
          type: "ul",
          items: [
            "تريد فهم تكوين تسلسل أو تحويله؟ ابدأ بمحلّل DNA.",
            "تصمم بادئًا لـ PCR؟ ابدأ بحاسبة Tm، ثم انتقل إلى Primer3 للتصميم الجاد.",
            "تقرأ جينومًا بكتيريًا أو بلازميدًا وتبحث عن جينات محتملة؟ ابدأ بمكتشف ORF.",
            "تحتاج مقارنة تسلسلات أو محاذاة؟ هذه ليست متاحة بعد — استخدم BLAST أو Clustal حاليًا.",
          ],
        },
        { type: "h2", text: "ما الذي نبنيه بعد ذلك" },
        {
          type: "ol",
          items: [
            "نموذج الجيران الأقرب (nearest-neighbor) لدرجة انصهار البادئات.",
            "خريطة مواقع القطع لأنزيمات الاقتطاع الشائعة.",
            "عدّ استخدام الـ codons ومؤشرات التكيّف.",
            "تحويل صيغ التسلسلات (FASTA وGenBank) قبل التحليل.",
            "محاذاة تسلسلين (pairwise alignment) مع مصفوفة بسيطة موثّقة.",
          ],
        },
        { type: "h2", text: "كيف تساهم" },
        {
          type: "ul",
          items: [
            "جرّب أداة وأرسل لنا تسلسلًا أعطى نتيجة غير متوقعة.",
            "اقترح أداة أو موضوع مقال عبر Issues أو Discussions.",
            "أضف ترجمة أو صحّح مصطلحًا عربيًا — المصطلحات العلمية تحتاج مراجعة مستمرة.",
            "شارك المقال مع طالب أو باحث يحتاجه.",
          ],
        },
        {
          type: "note",
          title: "قبل أن تلصق تسلسلًا",
          text: "لا تضع تسلسلات مرضى أو بيانات غير منشورة في أي أداة على الإنترنت، بما فيها أدواتنا. أدواتنا تعمل في المتصفح ولا ترسل شيئًا، لكن تبقى القاعدة: لا تلصق ما لا تملك حق مشاركته.",
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "ابدأ بالأداة الأصغر التي تجيب عن سؤالك، واقرأ حدودها قبل نتيجتها. وإذا احتجت مسارًا كاملًا — من التسلسل الخام إلى تفسير بيولوجي — فالأدوات هنا نقطة بداية، لا نهاية.",
        },
      ],
    },
    en: {
      title: "Arabic-first bioinformatics tools: a starter guide",
      summary:
        "How to choose a trustworthy browser-based bioinformatics tool that never uploads your data, what is available on the platform now, and what comes next.",
      blocks: [
        {
          type: "p",
          text: "Most bioinformatics tools are written in English, and many require an install, an account, or uploading files to a server. That is not a barrier for a professional researcher, but it is a real barrier for an Arabic-speaking student who wants to understand what is happening before memorising a program's menus.",
        },
        {
          type: "p",
          text: "The goal here is not just translated interfaces. It is small, understandable tools that show the formula they use and state plainly what they do not compute. A good tool teaches before it answers.",
        },
        { type: "h2", text: "What makes a tool trustworthy?" },
        {
          type: "ul",
          items: [
            "It runs entirely in the browser: the sequence never leaves your device.",
            "It names the formula or reference behind the result instead of offering magic.",
            "It states its limits: what it does not compute, and when you need specialised software.",
            "It gives numbers you can verify, not a single final verdict.",
            "It lets you copy results, works on a phone, and supports Arabic and RTL.",
          ],
        },
        { type: "h2", text: "What is available now" },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "Open the tool",
          title: "DNA sequence analyzer",
          description:
            "Length, GC content, base counts, reverse complement, transcription to RNA, translation to protein, and molecular weight.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "Open the tool",
          title: "Primer melting temperature (Tm) calculator",
          description:
            "Two Tm estimates (the 2+4 rule and the salt-adjusted formula), GC content, GC clamp strength, and the reverse complement.",
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "Open the tool",
          title: "ORF Finder",
          description:
            "Six frames on both strands, from ATG to the stop codon, with coordinates and protein.",
        },
        { type: "h2", text: "Which tool should you use?" },
        {
          type: "ul",
          items: [
            "Need to understand or convert a sequence? Start with the DNA analyzer.",
            "Designing a PCR primer? Start with the Tm calculator, then move to Primer3 for serious design.",
            "Reading a bacterial genome or a plasmid and looking for candidate genes? Start with the ORF finder.",
            "Need alignment or sequence comparison? Not available yet — use BLAST or Clustal for now.",
          ],
        },
        { type: "h2", text: "What we are building next" },
        {
          type: "ol",
          items: [
            "A nearest-neighbor model for primer Tm.",
            "A restriction-site map for common enzymes.",
            "Codon usage counting and adaptation indices.",
            "Sequence format conversion (FASTA and GenBank) before analysis.",
            "Pairwise alignment with a simple, documented scoring scheme.",
          ],
        },
        { type: "h2", text: "How to contribute" },
        {
          type: "ul",
          items: [
            "Try a tool and send us a sequence that gave an unexpected result.",
            "Suggest a tool or an article topic through Issues or Discussions.",
            "Add a translation or fix an Arabic term — scientific terminology needs continuous review.",
            "Share the article with a student or researcher who needs it.",
          ],
        },
        {
          type: "note",
          title: "Before you paste a sequence",
          text: "Do not put patient sequences or unpublished data into any online tool, including ours. Our tools run in the browser and send nothing, but the rule still holds: do not paste what you have no right to share.",
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "Start with the smallest tool that answers your question, and read its limits before its result. If you need a full path — from raw sequence to biological interpretation — these tools are a starting point, not the end.",
        },
      ],
    },
  },
};
