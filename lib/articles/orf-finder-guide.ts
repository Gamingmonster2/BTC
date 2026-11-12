import type { Article } from "./types";

export const orfFinderGuide: Article = {
  slug: "orf-finder-guide",
  date: "2026-11-12",
  readingMinutes: 6,
  tool: "orf-finder",
  content: {
    ar: {
      title: "دليل إطارات القراءة المفتوحة (ORF): من ATG إلى codon التوقف",
      summary:
        "ما هو إطار القراءة المفتوح، ولماذا نفحص ستة إطارات، وكيف تقرأ الإحداثيات على الشريط السالب، ومتى تكون نتيجة الأداة مجرد بداية لا حكمًا نهائيًا.",
      blocks: [
        {
          type: "p",
          text: "إطار القراءة المفتوح (Open Reading Frame، ORF) هو امتداد من القواعد يبدأ بـ codon بداية وينتهي بـ codon توقف، دون أن يتخلله توقف. في البكتيريا والكائنات البسيطة، غالبًا ما يقابل ORF واحد جينًا واحدًا، ولهذا يُستخدم البحث عن ORFs كخطوة أولى في قراءة جينوم جديد.",
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "جرّب الآن",
          title: "مكتشف إطارات القراءة المفتوحة",
          description:
            "الصق تسلسل DNA واختر أقل طول للبروتين، لتحصل على كل ORFs على الشريطين مع الإحداثيات والبروتين.",
        },
        { type: "h2", text: "لماذا ستة إطارات؟" },
        {
          type: "p",
          text: "الحمض النووي يُقرأ بثلاثات (codons). في الشريط الواحد يمكن أن تبدأ القراءة من القاعدة الأولى أو الثانية أو الثالثة، وهذا يعطي ثلاثة إطارات. ولأن الجين قد يكون مكتوبًا على الشريط المقابل، نفحص أيضًا الشريط المكمّل العكسي بثلاثة إطارات أخرى. المجموع ستة.",
        },
        {
          type: "code",
          label: "مثال: التسلسل نفسه بثلاثة إطارات",
          text: "التسلسل: ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG\n\nالإطار +1: ATG GCC ATT GTA ATG GGC CGC TGA\n           M   A   I   V   M   G   R   *\n\nالإطار +2: TGG CCA TTG TAA\n            W   P   L   *\n\nالإطار +3: GGC CAT TGT AAT GGG CCG CTG AAA GGG TGC CCG ATA G\n            G   H   C   N   G   P   L   K   G   C   P   I",
        },
        {
          type: "p",
          text: "لاحظ أن الإطار +1 يعطي بروتينًا من سبعة أحماض أمينية ثم يتوقف عند TGA. أما الإطار +2 فيتوقف مبكرًا عند TAA، والإطار +3 لا يجد توقفًا في هذا المقطع. الأداة تعرض هذه النتائج الثلاثة مع الإحداثيات.",
        },
        { type: "h2", text: "الـ ORFs المتداخلة" },
        {
          type: "p",
          text: "في المثال السابق يوجد ATG ثانٍ داخل الإطار +1 عند codon الخامس. هذا يعني أن هناك ORF أقصر يبدأ من هناك وينتهي عند نفس التوقف. الأداة تعرضه أيضًا لأنه قد يكون جينًا منفصلًا صغيرًا أو مجرد أثر عابر.",
        },
        {
          type: "note",
          title: "قاعدة عملية",
          text: "كلما كان الـ ORF أقصر زاد احتمال أن يكون صدفة إحصائية. في البكتيريا يُعدّ الحد 100 حمض أميني مرشحًا معقولًا، وفي حقيقيات النوى غالبًا تحتاج 200 أو أكثر مع البحث عن splice sites.",
        },
        { type: "h2", text: "كيف تقرأ الإحداثيات؟" },
        {
          type: "p",
          text: "الموقع المعروض هو موضع البداية والنهاية على الشريط الموجب (1-based)، أي أن أول قاعدة في التسلسل هي 1 وليس 0. عندما يكون الشريط سالبًا، يكون رقم البداية أصغر من رقم النهاية، والبروتين المعروض هو ترجمة الشريط السالب باتجاه 5' إلى 3'.",
        },
        {
          type: "code",
          label: "مثال على الشريط السالب",
          text: "تسلسل: TTATACAATGGCCAT\n\nنتيجة على الشريط −1:\n  الموقع : 4–15\n  البروتين: MAIV\n  الطول  : 12 nt / 4 aa (بدون التوقف)",
        },
        {
          type: "p",
          text: "المقصود أن جين الشريط السالب يبدأ عند القاعدة 15 (طرفه 5') وينتهي عند القاعدة 4 (طرفه 3')، والأداة تعرض المدى 4–15 على الشريط الموجب، والبروتين مكتوب بالاتجاه الصحيح للقراءة. هذا الترميز هو نفسه المستخدم في NCBI ORFfinder، ويسهّل نقل الإحداثيات بين الأدوات.",
        },
        { type: "h2", text: "ما لا تفعله الأداة" },
        {
          type: "ul",
          items: [
            "لا تعالج الـ splicing ولا الإكسونات والإنترونات — تُقرأ التسلسل كما هو.",
            "لا تدعم codons بداية بديلة مثل GTG أو TTG الشائعة في البكتيريا.",
            "لا تدعم الشفرة الميتوكوندرية أو الشفرات المعدّلة الأخرى.",
            "لا تكتشف انزياح الإطار (frameshift) أو أخطاء التسلسل.",
            "لا تبحث عن نطاقات بروتينية أو تشابه مع قواعد بيانات — هذه خطوة لاحقة.",
          ],
        },
        {
          type: "p",
          text: "للجينومات الكاملة استخدم أدوات متخصصة مثل Prodigal أو NCBI ORFfinder، وللجينومات حقيقية النوى تحتاج أدوات تتنبأ بالإنترونات. أداتنا هنا للفحص السريع، وللتعليم، ولمراجعة البلازميدات والمنتجات الصغيرة.",
        },
        { type: "h2", text: "خطوات الاستخدام" },
        {
          type: "ol",
          items: [
            "الصق التسلسل (A، C، G، T فقط؛ المسافات والأرقام تُحذف تلقائيًا).",
            "اختر أقل طول للبروتين — 30 افتراضيًا، و100 للجينومات البكتيرية.",
            "اضغط بحث، ثم رتّب النتائج بالطول (الأداة تفعل ذلك تلقائيًا).",
            "اقرأ الشريط والإطار والموقع، وانسخ البروتين للمقارنة.",
            "تحقق من وجود codon توقف: النتيجة التي تحمل «بدون توقف» قد تكون تسلسلًا مقتطعًا.",
          ],
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "البحث عن ORFs ليس إثباتًا لوجود جين، بل فرضية أولى. استخدمه لتضييق المنطقة، ثم تحقق يدويًا من codon البداية والسياق (مثل تسلسل Shine-Dalgarno في البكتيريا)، وقارن مع قواعد البيانات. وإذا وجدت نتيجة غير متوقعة، أرسل لنا التسلسل عبر واتساب لنراجعها.",
        },
      ],
    },
    en: {
      title: "Open reading frames (ORFs): from ATG to the stop codon",
      summary:
        "What an open reading frame is, why six frames are scanned, how to read coordinates on the minus strand, and when the tool's output is a first hypothesis rather than a verdict.",
      blocks: [
        {
          type: "p",
          text: "An open reading frame (ORF) is a stretch of bases that starts with a start codon and ends with a stop codon, with no stop codon in between. In bacteria and other compact genomes, one ORF often corresponds to one gene, which is why ORF finding is a first step when reading a new genome.",
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "Try it",
          title: "ORF Finder",
          description:
            "Paste a DNA sequence and choose a minimum protein length to get every ORF on both strands, with coordinates and protein.",
        },
        { type: "h2", text: "Why six frames?" },
        {
          type: "p",
          text: "DNA is read in triplets (codons). On a single strand, reading can start at the first, second or third base, which gives three frames. Because a gene may be written on the opposite strand, we also scan the reverse complement in three frames. That makes six.",
        },
        {
          type: "code",
          label: "Example: one sequence, three frames",
          text: "Sequence: ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG\n\nFrame +1: ATG GCC ATT GTA ATG GGC CGC TGA\n          M   A   I   V   M   G   R   *\n\nFrame +2: TGG CCA TTG TAA\n          W   P   L   *\n\nFrame +3: GGC CAT TGT AAT GGG CCG CTG AAA GGG TGC CCG ATA G\n          G   H   C   N   G   P   L   K   G   C   P   I",
        },
        {
          type: "p",
          text: "Frame +1 yields a seven-amino-acid protein and then stops at TGA. Frame +2 stops early at TAA, and frame +3 finds no stop in this window. The tool reports all three with their coordinates.",
        },
        { type: "h2", text: "Nested ORFs" },
        {
          type: "p",
          text: "The example above contains a second ATG inside frame +1 at the fifth codon. That means a shorter ORF starts there and ends at the same stop. The tool reports it too, because it may be a separate small gene or just a chance occurrence.",
        },
        {
          type: "note",
          title: "A practical rule",
          text: "The shorter the ORF, the more likely it is statistical noise. In bacteria, 100 amino acids is a reasonable candidate threshold; in eukaryotes you usually need 200 or more, plus splice-site prediction.",
        },
        { type: "h2", text: "How to read the coordinates" },
        {
          type: "p",
          text: "The reported position is the start and end on the plus strand, 1-based, so the first base of the sequence is 1 rather than 0. When the strand is minus, the start number is smaller than the end number, and the displayed protein is the translation of the minus strand in its 5' to 3' direction.",
        },
        {
          type: "code",
          label: "Minus-strand example",
          text: "Sequence: TTATACAATGGCCAT\n\nResult on strand −1:\n  Position: 4–15\n  Protein : MAIV\n  Length  : 12 nt / 4 aa (stop excluded)",
        },
        {
          type: "p",
          text: "In other words, the minus-strand gene starts at base 15 (its 5' end) and ends at base 4 (its 3' end); the tool reports the plus-strand span 4–15, and the protein is written in the correct reading direction. This is the same convention NCBI ORFfinder uses, which makes coordinates easy to move between tools.",
        },
        { type: "h2", text: "What the tool does not do" },
        {
          type: "ul",
          items: [
            "It does not handle splicing, exons or introns — the sequence is read as-is.",
            "It does not support alternative start codons such as GTG or TTG, which are common in bacteria.",
            "It does not support the mitochondrial code or other modified codes.",
            "It does not detect frameshifts or sequencing errors.",
            "It does not search protein domains or database similarity — that is a later step.",
          ],
        },
        {
          type: "p",
          text: "For whole genomes use dedicated tools such as Prodigal or NCBI ORFfinder; for eukaryotic genomes you need intron-aware prediction. Our tool is for quick checks, teaching, and reviewing plasmids or small products.",
        },
        { type: "h2", text: "How to use it" },
        {
          type: "ol",
          items: [
            "Paste the sequence (A, C, G, T only; spaces and digits are removed automatically).",
            "Choose the minimum protein length — 30 by default, 100 for bacterial genomes.",
            "Press Find ORFs; results are sorted by length automatically.",
            "Read the strand, frame and position, and copy the protein for comparison.",
            "Check whether a stop codon was found: a hit marked “no stop” may be a truncated sequence.",
          ],
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "ORF finding is not proof that a gene exists; it is a first hypothesis. Use it to narrow the region, then verify the start codon and context by hand (for example the Shine-Dalgarno sequence in bacteria) and compare against databases. If a result looks wrong, send us the sequence on WhatsApp and we will review it.",
        },
      ],
    },
  },
};
