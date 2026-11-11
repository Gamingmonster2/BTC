import type { Article } from "./types";

export const dnaAnalyzerGuide: Article = {
  slug: "dna-analyzer-guide",
  date: "2026-11-11",
  readingMinutes: 8,
  tool: "dna-analyzer",
  content: {
    ar: {
      title: "دليل محلّل تسلسل DNA: ماذا يحسب ولماذا",
      summary:
        "شرح عملي لكل رقم تظهره الأداة: الطول، محتوى GC، المتمم العكسي، النسخ، الترجمة بإطاراتها الثلاثة، والوزن الجزيئي — مع مثال كامل وحدود واضحة.",
      blocks: [
        {
          type: "p",
          text: "هذه المقالة تشرح الأداة الأولى في المنصة خطوة بخطوة. الهدف ليس أن تحصل على نتيجة فقط، بل أن تعرف من أين جاء كل رقم ومتى لا يجوز الوثوق به.",
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "جرّب الآن",
          title: "محلّل تسلسل الحمض النووي",
          description:
            "افتح الأداة في تبويب آخر وطبّق الأمثلة الموجودة في هذه المقالة أثناء القراءة.",
        },
        { type: "h2", text: "المدخلات المقبولة" },
        {
          type: "p",
          text: "الأداة تقبل القواعد A وC وG وT، إضافة إلى رموز IUPAC الغامضة: R وY وS وW وK وM وB وD وH وV وN. كما تقبل U لأنها تُعامل كـ T، ما يسمح بلصق تسلسل RNA أيضًا.",
        },
        {
          type: "p",
          text: "المسافات والأسطر الجديدة والأرقام تُحذف تلقائيًا، لذلك يمكنك لصق تسلسل من NCBI أو من ملف FASTA بعد إزالة سطر العنوان. الحروف الصغيرة تُحوَّل إلى كبيرة.",
        },
        {
          type: "note",
          title: "تنبيه",
          text: "إذا كان النص يحتوي على رموز أخرى مثل النقاط أو الشرطات، سترفض الأداة التسلسل برسالة خطأ بدلًا من تجاهلها بصمت.",
        },
        { type: "h2", text: "الطول ومحتوى GC" },
        {
          type: "p",
          text: "الطول هو عدد القواعد بعد التنظيف. محتوى GC يُحسب كنسبة مئوية من الطول الكلي: (G + C) ÷ الطول × 100. أما نسبة AT/GC فتُعرض كعددين صحيحين لتسهيل المقارنة السريعة بين تسلسلين.",
        },
        {
          type: "p",
          text: "محتوى GC مؤشر على الاستقرار الحراري: كل زوج G≡C يرتبط بثلاث روابط هيدروجينية مقابل رابطتين في A=T. لذلك تميل التسلسلات الغنية بـ GC إلى امتلاك درجة انصهار أعلى، وهو ما يهم عند تصميم البادئات.",
        },
        {
          type: "note",
          text: "رموز N والرموز الغامضة الأخرى تُحسب في المقام (الطول الكلي) لكنها لا تُحسب ضمن G أو C. لذلك تسلسل يحتوي على N كثيرة سيظهر بمحتوى GC منخفضًا حتى لو كانت القواعد المعروفة كلها G أو C.",
        },
        { type: "h2", text: "المتمم العكسي" },
        {
          type: "p",
          text: "الـ DNA مزدوج الشريط، والشريطان متضادا الاتجاه: أحدهما 5'→3' والآخر 3'→5'. المتمم العكسي يعني قلب الترتيب ثم استبدال كل قاعدة بمتممها: A↔T وC↔G.",
        },
        {
          type: "code",
          label: "مثال",
          text: "الشريط الأصلي : 5'-ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG-3'\nالمتمم العكسي : 5'-CTATCGGGCACCCTTTCAGCGGCCCATTACAATGGCCAT-3'",
        },
        {
          type: "p",
          text: "هذا الحساب ضروري في كل مكان تقريبًا: تصميم بادئ عكسي، قراءة نتائج Sanger، والتعامل مع الجينات التي تُقرأ من الشريط المقابل.",
        },
        { type: "h2", text: "النسخ إلى mRNA" },
        {
          type: "p",
          text: "النسخ في الخلية ينتج RNA مكمّلًا لشريط القالب. لكن الأداة تفترض أنك أدخلت شريط الترميز (coding strand)، وهو الشريط الذي يطابق الـ mRNA مع استبدال T بـ U. لذلك العملية هنا هي استبدال بسيط: T → U.",
        },
        {
          type: "code",
          label: "مثال",
          text: "DNA  : ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG\nmRNA : AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG",
        },
        {
          type: "note",
          title: "إن أدخلت شريط القالب",
          text: "إذا كان تسلسلك هو شريط القالب (template strand) وليس شريط الترميز، فاحسب المتمم العكسي أولًا ثم انسخ الناتج. وإلا ستحصل على بروتين مختلف تمامًا.",
        },
        { type: "h2", text: "الترجمة إلى بروتين" },
        {
          type: "p",
          text: "الترجمة تقرأ الشيفرة ثلاثة قواعد في كل مرة (كودون) باستخدام الشيفرة الوراثية القياسية. تبدأ القراءة من أول قاعدة افتراضيًا، ويمكنك تغيير الإطار إلى +2 أو +3 من الأزرار أعلى النتيجة.",
        },
        {
          type: "ul",
          items: [
            "كل كودون يُترجم إلى حرف واحد يمثل الحمض الأميني.",
            "كودونات التوقف TAA وTAG وTGA تظهر بعلامة *.",
            "الكودونات غير المكتملة في نهاية التسلسل تُهمَل.",
            "الرموز الغامضة داخل الكودون تُترجم إلى X لأن الحمض الأميني غير محدد.",
          ],
        },
        {
          type: "code",
          label: "الإطارات الثلاثة لنفس التسلسل",
          text: "+1 : MAIVMGR*KGAR*\n+2 : WPL*WAAERVPD\n+3 : GHCNGPLKGCPI",
        },
        {
          type: "p",
          text: "لاحظ أن الإطار +1 وحده يبدأ بـ M (ميثيونين) وينتهي بكودون توقف، وهذا مؤشر قوي على أن الإطار الصحيح هو +1. أما الإطاران الآخران فينتجان بروتينًا بلا معنى بيولوجي، وهو ما يحدث عادة عند القراءة في الإطار الخطأ.",
        },
        { type: "h2", text: "الوزن الجزيئي" },
        {
          type: "p",
          text: "الرقم المعروض هو وزن الشريط الواحد (single-stranded DNA) بالغرام/مول، محسوبًا من كتل القواعد القياسية: A = 313.21 وT = 304.20 وG = 329.21 وC = 289.18، مطروحًا منها 61.96 لكتلة الفوسفات الطرفي.",
        },
        {
          type: "p",
          text: "الـ DNA المزدوج الشريط يزن تقريبًا ضعف هذا الرقم. أما الرموز الغامضة فلا تُسهم في الحساب، لذا قد يكون الوزن أقل من الحقيقي إذا كان التسلسل يحتوي على N كثيرة.",
        },
        { type: "h2", text: "حدود الأداة" },
        {
          type: "ul",
          items: [
            "لا تبحث عن إطارات القراءة المفتوحة (ORF) ولا عن الجينات.",
            "لا تُجري محاذاة (alignment) بين تسلسلين.",
            "لا تعالج التعديلات الكيميائية أو الميثيلة أو القواعد غير الطبيعية.",
            "لا تُراعي الشيفرة الوراثية للميتوكوندريا أو للبكتيريا باختلافاتها الخاصة.",
            "الأرقام تعليمية، ولا تصلح لاعتماد سريري أو قانوني.",
          ],
        },
        { type: "h2", text: "ماذا نفعل بعد ذلك" },
        {
          type: "p",
          text: "إن لاحظت نتيجة غير متوقعة، أرسل لنا التسلسل والرقم المتوقع عبر واتساب من صفحة التواصل. نختبر الحالة، ونصحّح المنطق إن كان فيه خطأ، ونضيف مثالًا جديدًا إلى المقال.",
        },
      ],
    },
    en: {
      title: "DNA analyzer guide: what it computes and why",
      summary:
        "A practical explanation of every number the tool shows: length, GC content, reverse complement, transcription, the three reading frames, and molecular weight — with a full worked example and clear limits.",
      blocks: [
        {
          type: "p",
          text: "This article walks through the platform's first tool step by step. The goal is not just to get an answer, but to know where each number comes from and when it should not be trusted.",
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "Try it",
          title: "DNA sequence analyzer",
          description:
            "Open the tool in another tab and run the examples in this article as you read.",
        },
        { type: "h2", text: "Accepted input" },
        {
          type: "p",
          text: "The tool accepts A, C, G and T, plus the IUPAC ambiguity codes R, Y, S, W, K, M, B, D, H, V and N. It also accepts U, which is treated as T, so you can paste an RNA sequence as well.",
        },
        {
          type: "p",
          text: "Spaces, line breaks and digits are stripped automatically, so you can paste a sequence from NCBI or the body of a FASTA file after removing the header line. Lowercase letters are converted to uppercase.",
        },
        {
          type: "note",
          title: "Heads up",
          text: "If the text contains other characters such as dots or hyphens, the tool rejects the sequence with an error instead of silently ignoring them.",
        },
        { type: "h2", text: "Length and GC content" },
        {
          type: "p",
          text: "Length is the number of bases after cleaning. GC content is the percentage of the total length: (G + C) ÷ length × 100. The AT/GC ratio is shown as two integers to make quick comparison between sequences easier.",
        },
        {
          type: "p",
          text: "GC content is a proxy for thermal stability: each G≡C pair has three hydrogen bonds versus two for A=T. GC-rich sequences therefore tend to have a higher melting temperature, which matters when designing primers.",
        },
        {
          type: "note",
          text: "N and other ambiguity codes count toward the denominator (total length) but not toward G or C. A sequence full of N will therefore show a low GC content even if every known base is G or C.",
        },
        { type: "h2", text: "Reverse complement" },
        {
          type: "p",
          text: "DNA is double-stranded and the two strands run in opposite directions: one is 5'→3' and the other 3'→5'. The reverse complement means reversing the order and then replacing each base with its complement: A↔T and C↔G.",
        },
        {
          type: "code",
          label: "Example",
          text: "Original           : 5'-ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG-3'\nReverse complement : 5'-CTATCGGGCACCCTTTCAGCGGCCCATTACAATGGCCAT-3'",
        },
        {
          type: "p",
          text: "This calculation is needed almost everywhere: designing a reverse primer, reading Sanger results, and working with genes that are read from the opposite strand.",
        },
        { type: "h2", text: "Transcription to mRNA" },
        {
          type: "p",
          text: "In the cell, transcription produces RNA complementary to the template strand. The tool assumes you entered the coding strand, which matches the mRNA except that T becomes U. The operation here is therefore a simple substitution: T → U.",
        },
        {
          type: "code",
          label: "Example",
          text: "DNA  : ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG\nmRNA : AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG",
        },
        {
          type: "note",
          title: "If you pasted the template strand",
          text: "If your sequence is the template strand rather than the coding strand, take the reverse complement first and then transcribe the result. Otherwise you will get a completely different protein.",
        },
        { type: "h2", text: "Translation to protein" },
        {
          type: "p",
          text: "Translation reads the code three bases at a time (a codon) using the standard genetic code. Reading starts at the first base by default, and you can switch the frame to +2 or +3 with the buttons above the result.",
        },
        {
          type: "ul",
          items: [
            "Each codon is translated to a one-letter amino acid code.",
            "Stop codons TAA, TAG and TGA appear as *.",
            "Incomplete codons at the end of the sequence are ignored.",
            "Codons containing ambiguity codes translate to X because the amino acid is unknown.",
          ],
        },
        {
          type: "code",
          label: "The three frames of the same sequence",
          text: "+1 : MAIVMGR*KGAR*\n+2 : WPL*WAAERVPD\n+3 : GHCNGPLKGCPI",
        },
        {
          type: "p",
          text: "Notice that frame +1 alone starts with M (methionine) and ends at a stop codon, a strong sign that +1 is the correct frame. The other two frames produce a protein with no biological meaning, which is what usually happens when you read the wrong frame.",
        },
        { type: "h2", text: "Molecular weight" },
        {
          type: "p",
          text: "The displayed number is the weight of a single strand of DNA in g/mol, computed from standard base masses: A = 313.21, T = 304.20, G = 329.21 and C = 289.18, minus 61.96 for the terminal phosphate.",
        },
        {
          type: "p",
          text: "Double-stranded DNA weighs roughly twice this value. Ambiguity codes do not contribute to the calculation, so the weight may be underestimated when the sequence contains many N bases.",
        },
        { type: "h2", text: "Limits of the tool" },
        {
          type: "ul",
          items: [
            "It does not search for open reading frames (ORFs) or genes.",
            "It does not align two sequences.",
            "It does not handle chemical modifications, methylation or non-standard bases.",
            "It does not apply mitochondrial or bacterial genetic code variations.",
            "The numbers are educational and are not suitable for clinical or legal use.",
          ],
        },
        { type: "h2", text: "What to do next" },
        {
          type: "p",
          text: "If you see an unexpected result, send us the sequence and the expected number on WhatsApp from the contact page. We test the case, fix the logic if it is wrong, and add the new example to this article.",
        },
      ],
    },
  },
};
