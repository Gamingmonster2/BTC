import type { Article } from "./types";

export const whatIsBtc: Article = {
  slug: "what-is-btc",
  date: "2026-11-11",
  readingMinutes: 6,
  content: {
    ar: {
      title: "ما هي منصة BTC؟ ولماذا وُجدت؟",
      summary:
        "مقدمة صريحة عن المنصة: ما هي، وما الذي تقدّمه اليوم، وما الذي لا تقدّمه، ولمن كُتبت.",
      blocks: [
        {
          type: "p",
          text: "منصة BTC مبادرة برمجية مستقلة تعمل عند تقاطع المعلوماتية الحيوية والذكاء الاصطناعي. نبني أدوات تحليل حيوي تعمل داخل المتصفح دون تثبيت، وننشر شروحات عربية مكتوبة بعناية في المعلوماتية الحيوية والبيولوجيا الحاسوبية.",
        },
        {
          type: "p",
          text: "هذه المقالة الأولى على المنصة، وهي أيضًا أكثرها صراحة. الهدف منها أن تعرف بالضبط ماذا تنتظر منا قبل أن تستخدم أي أداة أو تعتمد على أي رقم يظهر على الشاشة.",
        },
        { type: "h2", text: "المشكلة التي نعالجها" },
        {
          type: "p",
          text: "طالب البيولوجيا في العالم العربي يجد كمًا هائلًا من الأدوات الإنجليزية الجيدة، لكنه يجد محتوى عربيًا قليلًا يشرح ما تفعله هذه الأدوات ولماذا تعمل بهذه الطريقة. النتيجة أن الأدوات تُستخدم كصناديق سوداء: تُدخل تسلسلًا، تحصل على رقم، ولا تعرف إن كان الرقم صحيحًا أو متى يكون مضللًا.",
        },
        {
          type: "ul",
          items: [
            "أدوات مبعثرة في مواقع قديمة، بعضها لا يعمل على الهاتف.",
            "شروحات عربية قليلة، وكثير منها ترجمات آلية غير مراجعة.",
            "فجوة بين المفهوم النظري في المحاضرة والتطبيق العملي على تسلسل حقيقي.",
          ],
        },
        { type: "h2", text: "ماذا تجد هنا اليوم" },
        {
          type: "p",
          text: "المنصة في بدايتها، ولا نحاول أن نبدو أكبر مما نحن عليه. المتوفر حاليًا أداتان مكتملتان، ومقالات تشرحهما، وهذا كل شيء.",
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "أداة",
          title: "محلّل تسلسل الحمض النووي",
          description:
            "إحصاءات القواعد، محتوى GC، المتمم العكسي، النسخ إلى mRNA، والترجمة إلى بروتين مع اختيار إطار القراءة.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "أداة",
          title: "حاسبة درجة انصهار البادئات",
          description:
            "طول البادئ، نسبة GC، Tm بقاعدة 2+4 وبصيغة تصحيح الملح، والمتمم العكسي، وقوة GC clamp.",
        },
        { type: "h2", text: "ما لا تجده هنا" },
        {
          type: "p",
          text: "هذا الجزء مهم بقدر الجزء السابق. نحن لسنا مختبرًا حيويًا رطبًا (wet lab)، ولا نجري تجارب معملية، ولا نملك بيانات تجريبية خاصة بنا. نحن فريق برمجي يبني أدوات ويشرحها.",
        },
        {
          type: "ul",
          items: [
            "لا نقدّم تشخيصًا طبيًا ولا استشارات سريرية، ولا يجوز استخدام مخرجات الأدوات في قرارات علاجية.",
            "لا ندّعي أن أرقامنا معتمدة معمليًا؛ هي تقديرات تعليمية مبنية على صيغ منشورة.",
            "لا نبيع بيانات. التحليلات تجري في متصفحك ولا تُرسل تسلسلاتك إلى أي خادم.",
          ],
        },
        {
          type: "note",
          title: "ملاحظة عن الخصوصية",
          text: "كل الحسابات في أدواتنا تُنفَّذ داخل صفحة المتصفح باستخدام JavaScript. لا يوجد طلب شبكة يحمل تسلسلك، حتى لو كان تسلسلًا غير منشور.",
        },
        { type: "h2", text: "لمن كُتبت هذه المنصة" },
        {
          type: "ul",
          items: [
            "لطالب البكالوريوس الذي يريد أن يفهم ما يفعله البرنامج لا أن ينسخ نتيجته فقط.",
            "للباحث الذي يحتاج حسابًا سريعًا دون فتح بيئة برمجية كاملة.",
            "للمطوّر الذي يريد قراءة تنفيذ واضح لخوارزميات أساسية مثل الترجمة أو المتمم العكسي.",
            "للمعلّم الذي يبحث عن مثال عربي يمكن عرضه داخل القاعة.",
          ],
        },
        { type: "h2", text: "كيف نعمل" },
        {
          type: "p",
          text: "نكتب الأدوات بمنطق منفصل عن الواجهة: كل حساب حيوي موجود في ملف مستقل قابل للاختبار، والواجهة تستدعيه فقط. هذا يجعل تصحيح الأخطاء أسهل، ويسمح لاحقًا بإعادة استخدام المنطق نفسه في أدوات أخرى. الكود منشور على GitHub، والمقالات تخضع لمراجعة قبل النشر.",
        },
        { type: "h2", text: "ما القادم" },
        {
          type: "ul",
          items: [
            "أدوات إضافية: إيجاد إطارات القراءة المفتوحة (ORF)، تحويل الصيغ، ومقارنة تسلسلات بسيطة.",
            "توسيع قسم التعلّم بسلاسل مترابطة بدلًا من مقالات متفرقة.",
            "تحسين دقة تقدير Tm عبر نموذج الجيران الأقرب (nearest-neighbor) بدلًا من الصيغ التقريبية.",
          ],
        },
        { type: "h2", text: "كيف تتواصل معنا" },
        {
          type: "p",
          text: "أسرع طريقة هي واتساب من صفحة التواصل: ملاحظة على أداة، خطأ لاحظته، اقتراح مقال، أو رغبة في المساهمة. نقرأ كل رسالة، ونصحّح الأخطاء المبلّغ عنها في المقالات والأدوات.",
        },
      ],
    },
    en: {
      title: "What is BTC, and why does it exist?",
      summary:
        "An honest introduction: what the platform is, what it offers today, what it does not offer, and who it is written for.",
      blocks: [
        {
          type: "p",
          text: "BTC is an independent software initiative working at the intersection of bioinformatics and artificial intelligence. We build biological analysis tools that run in the browser with no installation, and we publish carefully written educational material in bioinformatics and computational biology.",
        },
        {
          type: "p",
          text: "This is the first article on the platform, and the most candid one. Its purpose is to tell you exactly what to expect before you use a tool or trust a number on the screen.",
        },
        { type: "h2", text: "The problem we are addressing" },
        {
          type: "p",
          text: "A biology student finds an enormous supply of good English-language tools, but very little Arabic material explaining what those tools do and why they work the way they do. The result is that tools become black boxes: you paste a sequence, you get a number, and you cannot tell whether the number is right or when it is misleading.",
        },
        {
          type: "ul",
          items: [
            "Tools scattered across old websites, some of which do not work on a phone.",
            "Very little explanatory content, much of it unedited machine translation.",
            "A gap between the theory taught in class and the practice of running it on a real sequence.",
          ],
        },
        { type: "h2", text: "What is available today" },
        {
          type: "p",
          text: "The platform is at the beginning, and we do not pretend to be larger than we are. There are two complete tools and articles explaining them. That is all.",
        },
        {
          type: "tool",
          href: "/tools/dna-analyzer",
          label: "Tool",
          title: "DNA sequence analyzer",
          description:
            "Base counts, GC content, reverse complement, transcription to mRNA, and translation to protein with selectable reading frames.",
        },
        {
          type: "tool",
          href: "/tools/primer-tm",
          label: "Tool",
          title: "Primer melting temperature calculator",
          description:
            "Primer length, GC content, Tm using the 2+4 rule and a salt-adjusted formula, reverse complement, and GC clamp strength.",
        },
        { type: "h2", text: "What you will not find here" },
        {
          type: "p",
          text: "This part matters as much as the previous one. We are not a wet lab. We do not run laboratory experiments and we do not own experimental data. We are a software team that builds tools and explains them.",
        },
        {
          type: "ul",
          items: [
            "We do not provide medical diagnosis or clinical advice, and tool output must not be used for treatment decisions.",
            "We do not claim laboratory certification for our numbers; they are educational estimates based on published formulas.",
            "We do not sell data. Analysis runs in your browser and your sequences are never sent to a server.",
          ],
        },
        {
          type: "note",
          title: "A note on privacy",
          text: "Every calculation in our tools runs inside the browser page using JavaScript. No network request carries your sequence, even if it is unpublished.",
        },
        { type: "h2", text: "Who this is for" },
        {
          type: "ul",
          items: [
            "Undergraduate students who want to understand what the program does, not just copy its output.",
            "Researchers who need a quick calculation without opening a full programming environment.",
            "Developers who want a readable implementation of core algorithms such as translation or reverse complement.",
            "Teachers looking for a worked example they can show in class.",
          ],
        },
        { type: "h2", text: "How we work" },
        {
          type: "p",
          text: "We keep biological logic separate from the interface: every calculation lives in its own testable module and the UI only calls it. This makes bugs easier to fix and lets us reuse the same logic in future tools. The code is published on GitHub, and articles are reviewed before publication.",
        },
        { type: "h2", text: "What comes next" },
        {
          type: "ul",
          items: [
            "More tools: open reading frame (ORF) finding, format conversion, and simple sequence comparison.",
            "A more connected Learn section instead of isolated articles.",
            "More accurate Tm estimation using a nearest-neighbor model instead of simple formulas.",
          ],
        },
        { type: "h2", text: "How to reach us" },
        {
          type: "p",
          text: "The fastest route is WhatsApp from the contact page: feedback on a tool, a bug you found, an article suggestion, or an offer to contribute. We read every message, and we fix reported errors in both articles and tools.",
        },
      ],
    },
  },
};
