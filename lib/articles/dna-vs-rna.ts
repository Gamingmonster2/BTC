import type { Article } from "./types";

export const dnaVsRna: Article = {
  slug: "dna-vs-rna",
  date: "2026-11-20",
  readingMinutes: 5,
  cover: {
    src: "/images/articles/dna-vs-rna.webp",
    alt: {
      ar: "حلزون DNA ذهبي مجرد على خلفية داكنة",
      en: "Abstract golden DNA helix on a dark background",
    },
  },
  content: {
    ar: {
      title: "DNA أم RNA؟ ما الذي يتغيّر فعليًا في التحليل الحسابي",
      summary:
        "فرق كيميائي صغير بين T وU يغيّر الطريقة التي تكتب بها التسلسل. متى تحوّل U إلى T، ومتى لا يصح ذلك؟",
      blocks: [
        {
          type: "p",
          text: "أغلب أدواتنا تتعامل مع لغة DNA: أربعة أحرف A وC وG وT. أما RNA فيستخدم A وC وG وU. الفرق بين T وU كيميائي بسيط — الثيميدين هو يوراسيل مضافًا إليه مجموعة ميثيل — لكنه يغيّر طريقة إدخال التسلسل إلى أي أداة حسابية.",
        },
        { type: "h2", text: "ثلاثة فروق تهم الحاسوب" },
        {
          type: "ul",
          items: [
            "الحروف: DNA يكتب T حيث يكتب RNA الحرف U.",
            "السكر: ديوكسي ريبوز في DNA مقابل ريبوز في RNA؛ وجود مجموعة OH على الكربون 2 يجعل RNA أكثر قابلية للتحلل الكيميائي.",
            "النسخة المقابلة (template): عند تحويل mRNA إلى cDNA بواسطة النسخ العكسي نحصل على تسلسل DNA، فيعود الحرف T للظهور.",
          ],
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "جرّب الآن",
          title: "محلّل تسلسل DNA",
          description: "ينظّف التسلسل ويحسب الطول ومحتوى GC والمتمم العكسي والنسخ والترجمة.",
        },
        { type: "h2", text: "قاعدة عملية عند الإدخال" },
        {
          type: "p",
          text: "إذا كان لديك تسلسل RNA وتريد استخدام أدوات DNA، استبدل كل U بـ T قبل الإدخال. العكس ليس صحيحًا دائمًا: استبدال T بـ U في تسلسل DNA يعطي «نسخة تشبه mRNA»، لكنه لا يخبرك بشيء عن التضفير (splicing) أو التعديلات التي تطرأ على mRNA الناضج.",
        },
        {
          type: "code",
          label: "تحويل بسيط",
          text: "RNA : AUGCCUUAA\ncDNA: ATGCCTTAA\n",
        },
        {
          type: "note",
          title: "ما لا تفعله الأداة",
          text: "التحويل الحرفي لا يحاكي النسخ العكسي الحقيقي، ولا يضيف كودونات التوقف أو يزيل الإنترونات. كما أن تحرير RNA وتعديلات مثل ميثيل A لا تظهر في التسلسل النصي مهما فعلنا بالأحرف.",
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "تعامل مع T وU كترجمة بين لغتين متقاربتين: التبديل سهل، لكن المعنى البيولوجي لا ينتقل كاملًا. اذكر دائمًا في نتائجك أي ألفباء استخدمتها حتى لا يخلط قارئ بين تسلسل جينومي ونسخة mRNA.",
        },
      ],
    },
    en: {
      title: "DNA or RNA? What actually changes for sequence analysis",
      summary:
        "A tiny chemical difference between T and U changes how you type a sequence into a tool. When should you replace U with T — and when is that wrong?",
      blocks: [
        {
          type: "p",
          text: "Most of our tools speak DNA: four letters, A C G T. RNA uses A C G U instead. The chemistry behind T versus U is small — thymine is uracil with an added methyl group — but it changes how you feed a sequence into any computational tool.",
        },
        { type: "h2", text: "Three differences that matter to software" },
        {
          type: "ul",
          items: [
            "Alphabet: DNA writes T where RNA writes U.",
            "Sugar: deoxyribose in DNA versus ribose in RNA; the 2'-OH group makes RNA more chemically labile.",
            "Complementary copy: reverse transcription of mRNA into cDNA produces a DNA sequence, so T returns.",
          ],
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "Try it",
          title: "DNA analyser",
          description: "Cleans the sequence and reports length, GC content, reverse complement, transcript and translation.",
        },
        { type: "h2", text: "A practical input rule" },
        {
          type: "p",
          text: "If you have an RNA sequence and want to use a DNA tool, replace every U with T first. The reverse is not always honest: turning T into U gives an mRNA-like string, but it tells you nothing about splicing or the modifications a mature mRNA carries.",
        },
        {
          type: "code",
          label: "Simple conversion",
          text: "RNA : AUGCCUUAA\ncDNA: ATGCCTTAA\n",
        },
        {
          type: "note",
          title: "What the tool does not do",
          text: "The letter swap is not a simulation of reverse transcription. It adds no stop codons and removes no introns. RNA editing and modifications such as m6A never appear in a plain text sequence.",
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "Treat T and U as a translation between two close languages: the swap is easy, but the biology does not transfer intact. Always state which alphabet you used so readers do not confuse a genomic sequence with an mRNA copy.",
        },
      ],
    },
  },
};
