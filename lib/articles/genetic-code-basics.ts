import type { Article } from "./types";

export const geneticCodeBasics: Article = {
  slug: "genetic-code-basics",
  date: "2026-11-21",
  readingMinutes: 6,
  cover: {
    src: "/images/articles/genetic-code-basics.webp",
    alt: {
      ar: "نموذج جزيئي مجرد يوضح بنية الجزيئات وارتباطاتها",
      en: "Abstract molecular model showing connected spheres and bonds",
    },
  },
  content: {
    ar: {
      title: "الشيفرة الوراثية: كيف تقرأ الآلة 64 كودونًا و20 حمضًا",
      summary:
        "لماذا الكودون ثلاثي؟ وما الفرق بين 61 كودونًا يُشفّر أحماضًا وثلاثة كودونات للتوقف؟ دليل حسابي بسيط يبدأ من 4² و4³.",
      blocks: [
        {
          type: "p",
          text: "الشيفرة الوراثية ليست غموضًا بيولوجيًا، بل جدول تحويل صغير يمكن لأي برنامج تنفيذه: تقرأ الحاسوب ثلاثة أحرف متجاورة، وتحوّلها إلى حمض أميني واحد أو إلى إشارة توقف. الفكرة كلها تكمن في اختيار طول الكلمة: ثلاثة أحرف.",
        },
        { type: "h2", text: "لماذا ثلاثة أحرف بالضبط؟" },
        {
          type: "p",
          text: "لدينا أربعة أحرف (A وC وG وT). لو قرأنا حرفًا واحدًا لكانت لدينا 4 كلمات فقط، ولو قرأنا حرفين لكانت 16 كلمة — أقل من 20 حمضًا أمينيًا يجب تمثيلها. أول عدد صحيح يكفي هو 4³ = 64 كلمة. هذا يستوعب العشرين حمضًا ويترك مساحة لكودونات التوقف ولتكرار بعض الأحماض.",
        },
        {
          type: "ul",
          items: [
            "64 كودونًا محتملًا (4 × 4 × 4).",
            "61 كودونًا يُشفّر أحد الأحماض الأمينية العشرين.",
            "3 كودونات للتوقف: TAA وTAG وTGA.",
            "ATG يخدم كبداية للترجمة ويُشفّر الميثيونين في الوقت نفسه.",
            "العديد من الأحماض لها أكثر من كودون (تسمى الشيفرة المتدهورة أو degenerate)، لكن لا كودون يُشفّر أكثر من حمض واحد في Shيفرة القياسية.",
          ],
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "جرّب الآن",
          title: "مكتشف إطارات القراءة",
          description: "يترجم التسلسل في الإطارات الستة ويوقف عند أول كودون توقف في كل إطار.",
        },
        { type: "h2", text: "مثال قابل للتحقق" },
        {
          type: "code",
          label: "تسلسل قصير",
          text: "ATG GCT TAA\nMet Ala Stop\nM    A    *",
        },
        {
          type: "p",
          text: "لو بدأنا القراءة من الحرف الثاني بدلًا من الأول، سيتغير التجميع بالكامل: TGG CTT AA… أي Trp ثم Leu ثم جزء ناقص. لذلك «الإطار» أهم من عدد الكودونات نفسها؛ أي تغيير في موضع البداية يغيّر الرسالة كلها.",
        },
        {
          type: "note",
          title: "الشيفرة القياسية فقط",
          text: "الحاسبة هنا تستخدم الشيفرة القياسية. في المتقدرات البشرية تختلف بعض القواعد: AGA وAGG تصبحان توقفًا، وATA تُشفّر ميثيونين، وTGA تُشفّر تربتوفان. إذا كنت تحلل تسلسلًا متقدريًا فلا تطبّق الجدول القياسي دون تعديل.",
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "الشيفرة الوراثية جدول، والإطار هو طريقة قراءة الجدول. بمجرد أن تفهم الاثنين، يصبح مكتشف ORF ومحلل DNA أداتين بسيطتين: تقسيم إلى ثلاثيات، وتحويل كل ثلاثية عبر جدول، والتوقف عند إشارة التوقف.",
        },
      ],
    },
    en: {
      title: "The genetic code: how software reads 64 codons and 20 amino acids",
      summary:
        "Why is a codon three bases long? What separates the 61 sense codons from the three stop signals? A short counting exercise starting at 4² and 4³.",
      blocks: [
        {
          type: "p",
          text: "The genetic code is not biological mystery; it is a small lookup table any program can implement. Read three adjacent letters, map them to one amino acid or to a stop signal. The only real design choice is the word length: three.",
        },
        { type: "h2", text: "Why exactly three letters?" },
        {
          type: "p",
          text: "There are four letters (A, C, G, T). Single letters give only 4 words; pairs give 16, still fewer than the 20 amino acids that need a label. The first workable power is 4³ = 64 words. That covers all twenty acids and leaves room for stop signals and redundancy.",
        },
        {
          type: "ul",
          items: [
            "64 possible codons (4 × 4 × 4).",
            "61 codons specify one of the twenty amino acids.",
            "Three stop codons: TAA, TAG and TGA.",
            "ATG doubles as the translation start and as the codon for methionine.",
            "Many amino acids have several codons (the code is degenerate), but in the standard code no codon encodes two different amino acids.",
          ],
        },
        {
          type: "tool",
          href: "/tools/orf-finder",
          label: "Try it",
          title: "ORF finder",
          description: "Translates all six frames and halts each one at its first in-frame stop codon.",
        },
        { type: "h2", text: "A checkable example" },
        {
          type: "code",
          label: "Short sequence",
          text: "ATG GCT TAA\nMet Ala Stop\nM    A    *",
        },
        {
          type: "p",
          text: "Start reading at the second letter instead and the grouping changes completely: TGG CTT AA… — Trp, then Leu, then an incomplete codon. The frame matters more than the codon count; shifting the start by one base rewrites the whole message.",
        },
        {
          type: "note",
          title: "Standard code only",
          text: "These tools use the standard code. In human mitochondria AGA and AGG become stops, ATA encodes methionine, and TGA encodes tryptophan. Do not apply the standard table to mitochondrial sequence without adjusting it.",
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "The code is a table and the frame is how you read it. Once both are clear, an ORF finder and a DNA analyser become simple operations: split into triplets, look each one up, and stop at a stop codon.",
        },
      ],
    },
  },
};
