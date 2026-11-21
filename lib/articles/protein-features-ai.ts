import type { Article } from "./types";

export const proteinFeaturesAi: Article = {
  slug: "protein-features-ai",
  date: "2026-11-18",
  readingMinutes: 7,
  tool: "protein-features",
  cover: {
    src: "/images/articles/protein-features-ai.webp",
    alt: {
      ar: "بنية بروتين مطوي محاطة بعقد شبكة عصبية",
      en: "A folded protein structure surrounded by neural-network nodes",
    },
  },
  content: {
    ar: {
      title: "من التسلسل إلى الأرقام: خصائص البروتين التي تفهمها نماذج الذكاء الاصطناعي",
      summary:
        "لماذا لا يستطيع النموذج قراءة «MKTAYIAK…»، وكيف تتحول سلسلة بروتين إلى متجه من 31 رقمًا، وماذا تعني كل قيمة، ومتى تكون هذه الخصائص كافية ومتى لا تكون.",
      blocks: [
        {
          type: "p",
          text: "نموذج التعلّم الآلي لا يرى حروفًا. يرى مصفوفة أرقام، ويحتاج أن تكون كل عينة بنفس الطول مهما اختلفت التسلسلات. لهذا تُوصف البروتينات عادةً بـ«متجه خصائص»: مجموعة أرقام ثابتة الطول تُلخّص التسلسل، ثم يتعلم النموذج العلاقة بين هذا المتجه والنتيجة المطلوبة (وظيفة، استقرار، سمية، ارتباط).",
        },
        {
          type: "tool",
          href: "/tools/protein-features",
          label: "جرّب الآن",
          title: "مستخرج خصائص البروتين",
          description:
            "الصق تسلسلًا لتحصل على التركيب، والوزن الجزيئي، ونقطة التساوي الكهربائي، وGRAVY، ومتجه من 31 قيمة جاهز للنسخ أو التصدير.",
        },
        { type: "h2", text: "لماذا 31 قيمة؟" },
        {
          type: "p",
          text: "عشرون قيمة لترددات الأحماض الأمينية العشرين (كل واحدة بين 0 و1، ومجموعها 1)، ثم إحدى عشرة قيمة فيزيائية كيميائية. المجموع 31. هذا التمثيل بسيط، قابل للتفسير، ولا يحتاج تدريبًا مسبقًا، ولهذا يُستخدم كخط أساس (baseline) قبل الانتقال إلى النماذج اللغوية البروتينية الكبيرة.",
        },
        { type: "h2", text: "الخصائص الإحدى عشرة" },
        {
          type: "ul",
          items: [
            "الوزن الجزيئي: مجموع متوسط كتل البقايا زائد جزيء ماء واحد. يفيد في التحقق من هوية البروتين وفي مطيافية الكتلة.",
            "نقطة التساوي الكهربائي pI: الرقم الهيدروجيني الذي تكون عنده الشحنة الصافية صفرًا. تحدد سلوك البروتين في التنقية الكهربائية (IEF).",
            "GRAVY: متوسط كراهية الماء بجدول Kyte-Doolittle. القيم الموجبة تدل على بروتين كاره للماء غالبًا، والسلبية على بروتين محب للماء.",
            "نسبة العطرية: (F + W + Y) / الطول. ترتبط بالتفاعلات التراصفية (stacking) وبامتصاص الأشعة فوق البنفسجية.",
            "المؤشر الأليفاتي: يقيس وفرة A وV وI وL وP، ويرتبط بثبات البروتين الحراري.",
            "معامل الامتصاص عند 280nm: يعتمد على W وY وC، ويُستخدم لتقدير تركيز البروتين دون منحنى قياسي.",
            "الإنتروبيا: مقياس تنوع التركيب بالبِت. التسلسل المتكرر جدًا له إنتروبيا منخفضة.",
            "نسبة البقايا الكارهة للماء، ونسبة المشحونة، والإنتروبيا المعيارية، والشحنة الصافية عند pH 7.",
          ],
        },
        {
          type: "note",
          title: "حدود نموذج pI",
          text: "قيمة pI هنا تُحسب بنموذج شحنات تكراري على قيم pKa قياسية، وليست قياسًا تجريبيًا. الفرق عن القيمة الحقيقية قد يصل إلى عدة أعشار، خصوصًا في البروتينات ذات البقايا المدفونة أو المعدّلة. استخدمها للمقارنة والفرز، لا للتصميم النهائي لـ IEF.",
        },
        { type: "h2", text: "مثال كامل: سلسلة الأنسولين A" },
        {
          type: "code",
          label: "GIVEQCCTSICSLYQLENYCN",
          text: "الطول            : 21 aa\nالوزن الجزيئي    : 2383.71 Da\npI               : 3.72\nالشحنة عند pH 7  : −2.18\nGRAVY            : 0.214\nنسبة العطرية     : 0.095\nالمؤشر الأليفاتي : 88.1\nمعامل الامتصاص   : 3480 M⁻¹·cm⁻¹  (A0.1% = 1.460)\nالإنتروبيا       : 3.345 bit  (معيارية 0.774)",
        },
        {
          type: "p",
          text: "لاحظ أن pI منخفض (3.72) لأن السلسلة لا تحتوي أي حمض أميني قاعدي (لا K ولا R ولا H)، بينما تحتوي Glu وAsp. هذه النتيجة متوقعة بيولوجيًا، وهي اختبار جيد على أن الحساب يعمل: لو أعطت الأداة pI قريبًا من 7 لسلسلة كهذه، فالمشكلة في النموذج لا في البروتين.",
        },
        { type: "h2", text: "كيف تستخدم المتجه في نموذج؟" },
        {
          type: "ol",
          items: [
            "صدّر CSV لمجموعة البروتينات (كل صف = بروتين، كل عمود = خاصية).",
            "طبّع الأعمدة ذات المقاييس الكبيرة (الوزن الجزيئي، معامل الامتصاص) قبل أي نموذج يعتمد على المسافات.",
            "احتفظ بخط أساس بسيط (انحدار لوجستي أو شجرة قرار) قبل تجربة نموذج معقد — إن لم يتفوق النموذج المعقد، فالمشكلة في الخصائص لا في النموذج.",
            "افحص أهمية الخصائص: غالبًا تكون GRAVY وpI والترددات هي الأكثر تأثيرًا في مهام التصنيف.",
            "تذكّر أن هذه الخصائص تفقد ترتيب التسلسل: بروتينان بتركيب متطابق لكن بترتيب مختلف لهما المتجه نفسه. للمهام التي تعتمد على الترتيب استخدم تمثيلًا تسلسليًا (k-mers أو نموذجًا لغويًا).",
          ],
        },
        { type: "h2", text: "ما لا تحسبه الأداة" },
        {
          type: "ul",
          items: [
            "البنية الثانوية أو الثالثية: لا تنبؤ بالحلزونات أو الصفائح.",
            "مؤشر عدم الاستقرار (instability index): يحتاج جدول 400 زوجًا من الأحماض، ولم نُضمّنه بعد.",
            "تعديلات ما بعد الترجمة: الفسفرة والغلايكوزيل والأسيتلة لا تُرى في التسلسل الأولي.",
            "الببتيدات الإشارية أو انقسام الإشارة: تُحسب كما هي في التسلسل المُدخل.",
            "الثبات الحراري الفعلي: المؤشر الأليفاتي ارتباط إحصائي، وليس قياسًا.",
          ],
        },
        { type: "h2", text: "الخلاصة" },
        {
          type: "p",
          text: "الخصائص الفيزيائية الكيميائية ليست بديلًا عن النماذج الحديثة، لكنها تجعل المشكلة قابلة للفهم والقياس. ابدأ بها، اعرف ما تعنيه، ثم قرّر إن كنت تحتاج تمثيلًا أغنى. وإذا أردت إضافة خاصية جديدة — k-mer، أو مؤشر عدم الاستقرار — أرسل اقتراحك عبر واتساب أو Issues.",
        },
      ],
    },
    en: {
      title:
        "From sequence to numbers: protein features that AI models can actually use",
      summary:
        "Why a model cannot read “MKTAYIAK…”, how a protein chain becomes a 31-value vector, what each value means, and when these descriptors are enough — and when they are not.",
      blocks: [
        {
          type: "p",
          text: "A machine-learning model does not see letters. It sees a matrix of numbers, and every sample must have the same length no matter how the sequences differ. That is why proteins are usually described by a feature vector: a fixed-length set of numbers that summarises the sequence, which the model then maps to a target (function, stability, toxicity, binding).",
        },
        {
          type: "tool",
          href: "/tools/protein-features",
          label: "Try it",
          title: "Protein feature extractor",
          description:
            "Paste a sequence to get composition, molecular weight, isoelectric point, GRAVY, and a 31-value vector ready to copy or export.",
        },
        { type: "h2", text: "Why 31 values?" },
        {
          type: "p",
          text: "Twenty values are the frequencies of the twenty amino acids (each between 0 and 1, summing to 1), plus eleven physicochemical values. That makes 31. The representation is simple, interpretable and needs no pretraining, which is why it is still used as a baseline before reaching for large protein language models.",
        },
        { type: "h2", text: "The eleven descriptors" },
        {
          type: "ul",
          items: [
            "Molecular weight: the sum of average residue masses plus one water molecule. Useful for identity checks and mass spectrometry.",
            "Isoelectric point (pI): the pH at which net charge is zero. It governs behaviour in isoelectric focusing.",
            "GRAVY: grand average of hydropathy from Kyte-Doolittle. Positive values suggest a hydrophobic protein, negative values a hydrophilic one.",
            "Aromaticity: (F + W + Y) / length. Linked to stacking interactions and UV absorbance.",
            "Aliphatic index: the abundance of A, V, I, L and P, associated with thermal stability.",
            "Extinction coefficient at 280 nm: driven by W, Y and C, and used to estimate concentration without a standard curve.",
            "Entropy: how diverse the composition is, in bits. A highly repetitive sequence has low entropy.",
            "Hydrophobic fraction, charged fraction, normalised entropy, and net charge at pH 7.",
          ],
        },
        {
          type: "note",
          title: "Limits of the pI model",
          text: "The pI here comes from an iterative charge model using standard pKa values; it is not a measurement. The gap from the experimental value can reach several tenths, especially for proteins with buried or modified residues. Use it for ranking and comparison, not as the final word for IEF design.",
        },
        { type: "h2", text: "A worked example: insulin A chain" },
        {
          type: "code",
          label: "GIVEQCCTSICSLYQLENYCN",
          text: "Length          : 21 aa\nMolecular weight: 2383.71 Da\npI              : 3.72\nNet charge pH 7 : −2.18\nGRAVY           : 0.214\nAromaticity     : 0.095\nAliphatic index : 88.1\nExtinction      : 3480 M⁻¹·cm⁻¹  (A0.1% = 1.460)\nEntropy         : 3.345 bit  (normalised 0.774)",
        },
        {
          type: "p",
          text: "The pI is low (3.72) because the chain contains no basic residue at all (no K, R or H) while it does contain Glu and Asp. That is biologically expected, and it is a good sanity check on the calculation: if the tool returned a pI near 7 for this chain, the problem would be in the model, not the protein.",
        },
        { type: "h2", text: "Using the vector in a model" },
        {
          type: "ol",
          items: [
            "Export the CSV for a protein set (one row per protein, one column per feature).",
            "Scale the large-magnitude columns (molecular weight, extinction coefficient) before any distance-based model.",
            "Keep a simple baseline (logistic regression or a decision tree) before trying something complex — if the complex model does not win, the features are the bottleneck, not the model.",
            "Inspect feature importance: GRAVY, pI and the frequencies usually dominate classification tasks.",
            "Remember that these descriptors discard order: two proteins with identical composition but different arrangement share the same vector. For order-dependent tasks use a sequence representation (k-mers or a language model).",
          ],
        },
        { type: "h2", text: "What the tool does not compute" },
        {
          type: "ul",
          items: [
            "Secondary or tertiary structure: no helix or sheet prediction.",
            "Instability index: it needs the 400-entry dipeptide table, which is not included yet.",
            "Post-translational modifications: phosphorylation, glycosylation and acetylation are invisible in the primary sequence.",
            "Signal peptides or cleavage: the sequence is analysed exactly as entered.",
            "Real thermal stability: the aliphatic index is a statistical association, not a measurement.",
          ],
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "Physicochemical descriptors are not a replacement for modern models, but they make the problem measurable and explainable. Start there, understand what each number means, then decide whether you need a richer representation. If you want a new feature — k-mers, or an instability index — send the suggestion on WhatsApp or open an issue.",
        },
      ],
    },
  },
};
