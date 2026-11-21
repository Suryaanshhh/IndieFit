export interface Metric {
  label: string;
  value: string;
  unit?: string;
  note?: string;
}

export interface Section {
  heading: string;
  body: string[];
  metrics?: Metric[];
}

export interface GuideContent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  sections: Section[];
}

export const guidesContent: GuideContent[] = [
  {
    id: "body-recomposition",
    slug: "body-recomposition",
    title: "Body Recomposition",
    tagline: "Lose fat and build muscle simultaneously — it works, but only under specific conditions.",
    category: "Nutrition",
    sections: [
      {
        heading: "Who recomposition actually works for",
        body: [
          "Recomposition produces measurable results in three populations: untrained beginners, people returning after a long layoff, and individuals with high body fat (20%+ for men, 30%+ for women). Advanced lifters with low body fat will see slower or negligible simultaneous changes.",
          "The mechanism is straightforward: a mild calorie deficit pulls energy from fat stores while sufficient protein and training stimulus drives muscle protein synthesis. The two processes run concurrently rather than sequentially.",
          "Expect 0.5–1 lb of fat loss per week alongside 0.25–0.5 lb of lean mass gain per month in the early months. Results taper as training age increases and body composition improves.",
        ],
        metrics: [
          { label: "Calorie target", value: "−200 to −300", unit: "kcal below TDEE", note: "Deeper cuts stall muscle gain" },
          { label: "Protein", value: "2.2–2.6", unit: "g/kg bodyweight", note: "Upper range supports both goals" },
          { label: "Weekly fat loss rate", value: "0.5–1", unit: "lb/week", note: "Faster rates sacrifice muscle" },
          { label: "Lean mass gain", value: "0.25–0.5", unit: "lb/month", note: "Beginner rate; tapers with experience" },
        ],
      },
      {
        heading: "Calorie and macro setup",
        body: [
          "Set calories 200–300 kcal below your TDEE. Deeper deficits suppress anabolic signalling (mTOR, IGF-1) and elevate cortisol, which shifts the net balance toward catabolism.",
          "Protein at 2.2–2.6 g/kg of bodyweight is non-negotiable. It raises muscle protein synthesis, blunts muscle protein breakdown, and increases satiety — all relevant when calories are restricted.",
          "Fill remaining calories with carbohydrates around training (glycogen supports heavy lifting) and fats to cover hormonal needs (minimum 0.5 g/kg). Carb-cycling is optional and adds complexity without clear benefit for most people.",
        ],
        metrics: [
          { label: "Fat minimum", value: "0.5", unit: "g/kg bodyweight", note: "Below this, testosterone production drops" },
          { label: "Carbs", value: "Remaining calories after protein + fat", note: "Prioritise around training sessions" },
        ],
      },
      {
        heading: "Training adjustments",
        body: [
          "Train with the same progressive overload intent as a bulk. Recomposition does not mean switching to 'toning' circuits. Heavy compound lifts (squat, deadlift, press, row) done in the 6–12 rep range with 2–4 RIR provide the stimulus for muscle protein synthesis.",
          "Frequency: train each muscle group 2x per week minimum. Volume should sit at or slightly above your Minimum Effective Volume (MEV). Do not add extra cardio expecting it to accelerate fat loss — it increases recovery demand and can blunt muscle gain if not offset by additional calories.",
          "Sleep is a primary lever. 7–9 hours optimises growth hormone pulse amplitude and cortisol regulation. Consistently sleeping under 6 hours accelerates muscle loss in a deficit.",
        ],
      },
      {
        heading: "Progress tracking and benchmarks",
        body: [
          "Scale weight is a poor recomposition metric because fat loss and muscle gain can mask each other. Use DEXA, skinfold calipers, or circumference measurements at 4-week intervals.",
          "Strength progression is a reliable proxy. If your working weights increase or stay constant on main lifts while calories are restricted, you are preserving or building muscle.",
          "Expect visible body composition changes in 8–12 weeks when conditions are right. Photographs under consistent lighting at 4-week intervals are more informative than the scale.",
        ],
        metrics: [
          { label: "Minimum review interval", value: "4", unit: "weeks", note: "Weekly measurements add noise, not signal" },
          { label: "Expected visible change", value: "8–12", unit: "weeks", note: "Assuming consistent execution" },
        ],
      },
    ],
  },
  {
    id: "cutting",
    slug: "cutting",
    title: "Cutting",
    tagline: "Lose fat at the fastest rate that still preserves muscle — 0.5–1% of bodyweight per week.",
    category: "Nutrition",
    sections: [
      {
        heading: "The rate question",
        body: [
          "0.5–1% of bodyweight per week is the proven fat-loss rate that preserves muscle. Faster cuts accelerate muscle loss, not fat loss. At a 1,000 kcal/day deficit, the body increases muscle protein breakdown to meet energy needs — the extra 500 kcal deficit over the optimal range buys very little additional fat loss.",
          "For a 90 kg individual: 450–900 g of fat loss per week is optimal. A 1 kg/week rate is achievable in obese individuals where fat oxidation capacity is high; for lean athletes it is too aggressive.",
          "Calorie deficit needed: 1 g of fat ≈ 7.7 kcal, so 500 g/week requires a ~550 kcal/day deficit after accounting for metabolic adaptation.",
        ],
        metrics: [
          { label: "Target rate", value: "0.5–1", unit: "% bodyweight/week" },
          { label: "Daily deficit", value: "500–700", unit: "kcal below TDEE", note: "Hits 0.5–1% rate for most starting BF levels" },
          { label: "Minimum calories (men)", value: "1,600", unit: "kcal/day", note: "Below this, micronutrient deficits compound" },
          { label: "Minimum calories (women)", value: "1,300", unit: "kcal/day", note: "Below this, hormonal disruption risk rises sharply" },
        ],
      },
      {
        heading: "Protein and muscle retention",
        body: [
          "In a calorie deficit, dietary protein is used for energy before it reaches muscle. This means protein requirements increase during a cut compared to maintenance.",
          "Target 2.3–3.1 g/kg of lean body mass during aggressive cuts. If body fat percentage is unknown, using total bodyweight at 2.2 g/kg is a safe approximation.",
          "Protein timing matters more during a cut: spreading intake across 4–5 meals with 30–50 g per meal maximises 24-hour muscle protein synthesis.",
        ],
        metrics: [
          { label: "Protein target (cut)", value: "2.3–3.1", unit: "g/kg lean mass" },
          { label: "Protein meals", value: "4–5", unit: "per day", note: "30–50 g per meal for MPS optimisation" },
        ],
      },
      {
        heading: "Calorie cycling and diet breaks",
        body: [
          "Metabolic adaptation — the reduction in TDEE beyond what is explained by weight loss — begins within 2 weeks of a deficit. The body down-regulates non-exercise activity thermogenesis (NEAT) and thyroid hormone output.",
          "Diet breaks: 1–2 weeks at maintenance every 6–8 weeks of cutting partially restores leptin, reduces cortisol, and maintains training performance. They do not undo fat loss.",
          "Refeed days (1 day at maintenance or slight surplus) primarily restore glycogen and improve acute training performance. Their effect on metabolic adaptation is minor compared to full diet breaks.",
        ],
        metrics: [
          { label: "Continuous cut max", value: "6–8", unit: "weeks", note: "Before adding a diet break" },
          { label: "Diet break duration", value: "1–2", unit: "weeks at maintenance" },
          { label: "Refeed day frequency", value: "1–2", unit: "per week (optional)", note: "More relevant closer to competition leanness" },
        ],
      },
      {
        heading: "Training during a cut",
        body: [
          "Volume should decrease by 20–30% from your peak training volume. Maintaining every set from a mass phase while in a deficit is a recovery drain that accelerates strength loss.",
          "Intensity (load on the bar) should stay as high as possible. Switching to high-rep 'toning' work does not burn significantly more calories and reduces the stimulus for muscle retention.",
          "Cardio: add 2–3 sessions of low-intensity steady-state (LISS) cardio (30–45 min walk, bike) rather than cutting food further. LISS does not meaningfully suppress muscle protein synthesis and preserves training recovery.",
        ],
        metrics: [
          { label: "Volume reduction", value: "20–30", unit: "%", note: "Relative to your peak hypertrophy volume" },
          { label: "Cardio (optional)", value: "2–3", unit: "sessions/week", note: "LISS preferred; 30–45 min" },
        ],
      },
    ],
  },
  {
    id: "lean-bulk",
    slug: "lean-bulk",
    title: "Lean Bulk",
    tagline: "Maximise muscle gain while keeping fat accumulation slow enough to avoid a long corrective cut.",
    category: "Nutrition",
    sections: [
      {
        heading: "What lean bulking actually means",
        body: [
          "A lean bulk is a controlled calorie surplus kept small enough that the ratio of muscle:fat gained stays favourable. The physiological limit on muscle gain rate is roughly 0.5–2 lbs per month depending on training age — calories above what is needed for that rate convert to fat.",
          "Beginner rate: ~0.9–1.4 kg/month lean mass gain. Intermediate: ~0.45–0.9 kg/month. Advanced: ~0.2–0.45 kg/month. These caps mean very large surpluses are wasteful even for beginners.",
          "Surplus size: 200–300 kcal/day above TDEE is optimal for intermediates. Beginners can handle 300–500 kcal above TDEE because muscle protein synthesis rates are higher in novice tissue.",
        ],
        metrics: [
          { label: "Calorie surplus (beginner)", value: "+300 to +500", unit: "kcal/day" },
          { label: "Calorie surplus (intermediate)", value: "+200 to +300", unit: "kcal/day" },
          { label: "Lean mass gain (beginner)", value: "0.9–1.4", unit: "kg/month" },
          { label: "Lean mass gain (intermediate)", value: "0.45–0.9", unit: "kg/month" },
          { label: "Acceptable fat gain rate", value: "0.5–1", unit: "lb/month", note: "More than this and your surplus is too large" },
        ],
      },
      {
        heading: "Calorie and macro targets",
        body: [
          "Set protein at 1.6–2.2 g/kg bodyweight. The lower end is sufficient when calories are adequate; the upper end adds a small margin of benefit for some individuals and is harmless.",
          "Fats at 0.7–1.0 g/kg bodyweight keeps testosterone and hormonal function optimal. Below 0.5 g/kg, free testosterone falls measurably within 4–6 weeks.",
          "Carbohydrates fill the remaining calorie budget. They are not fat-gain culprits — excess total calories cause fat gain. High carb intake around training sessions maximises glycogen availability, training performance, and mTOR signalling.",
        ],
        metrics: [
          { label: "Protein", value: "1.6–2.2", unit: "g/kg bodyweight" },
          { label: "Fat", value: "0.7–1.0", unit: "g/kg bodyweight" },
          { label: "Carbs", value: "Remaining calories", note: "Prioritise around training" },
        ],
      },
      {
        heading: "Tracking and adjusting the surplus",
        body: [
          "Weigh daily and use a 7-day rolling average to remove noise from water fluctuations. If your 4-week average gain rate exceeds 1.5 lb/week, reduce calories by 100–150 kcal.",
          "If scale weight does not move in 2 weeks and strength is stalling, increase calories by 100–150 kcal. Stalled weight with increasing strength indicates recomposition — do not reflexively eat more.",
          "Adjust in 100–150 kcal increments. Larger adjustments overshoot in both directions.",
        ],
        metrics: [
          { label: "Review interval", value: "4", unit: "weeks", note: "Weekly data is too noisy for calorie decisions" },
          { label: "Adjustment size", value: "100–150", unit: "kcal/day", note: "Smaller changes are easier to interpret" },
        ],
      },
      {
        heading: "Training volume and progression",
        body: [
          "In a surplus, recovery capacity increases. This is the time to push training volume toward your Maximum Adaptive Volume (MAV): 15–20 sets per muscle group per week for most muscles.",
          "Progressive overload should be the primary goal: add weight, reps, or sets each training block. Without a clear progression scheme, extra calories become fat, not muscle.",
          "Prioritise compound movements (squat, deadlift, bench, overhead press, row). They drive the most muscle protein synthesis per unit of recovery cost and allow the most weight to be moved.",
        ],
        metrics: [
          { label: "Target weekly volume", value: "15–20", unit: "sets/muscle/week", note: "During a surplus; individual MAV varies" },
          { label: "Progressive overload check", value: "Every 1–2", unit: "weeks", note: "Strength should trend upward" },
        ],
      },
    ],
  },
  {
    id: "peak-week",
    slug: "peak-week",
    title: "Peak Week",
    tagline: "Manipulate water, glycogen, and sodium in the final 7 days to look your best on a specific date.",
    category: "Nutrition",
    sections: [
      {
        heading: "What peak week changes — and what it doesn't",
        body: [
          "Peak week does not create muscle or burn fat. It shifts subcutaneous water and glycogen stores to make existing muscle definition more visible. The difference between a good peak and a bad one is 2–4 lbs of water placement.",
          "Peak week only works if body fat is already low enough — roughly sub-10% for men, sub-18% for women. Attempting to peak at higher body fat percentages will not create visible abs, only dehydration.",
          "Starting conditions matter more than peak week protocols. If pre-peak body fat is not low enough, no amount of water or carb manipulation produces a dramatic result.",
        ],
        metrics: [
          { label: "Men's target BF for effective peak", value: "<10", unit: "%" },
          { label: "Women's target BF for effective peak", value: "<18", unit: "%" },
          { label: "Visible water shift", value: "2–4", unit: "lbs", note: "What peak week actually manipulates" },
        ],
      },
      {
        heading: "Days 7–5: Depletion phase",
        body: [
          "Reduce carbohydrates to 0.5–1 g/kg bodyweight for 2–3 days. This depletes muscle glycogen stores, which pulls intracellular water with it, reducing overall water retention.",
          "Protein stays high: 2.5+ g/kg to spare muscle tissue during glycogen depletion.",
          "Moderate water intake: do not restrict water yet. Dehydration at this stage causes flat muscles, not improved definition.",
          "Light training with higher rep ranges (12–20) depletes glycogen more efficiently than heavy work. Avoid heavy loading — DOMS during peak week ruins stage presence.",
        ],
        metrics: [
          { label: "Carbs (days 7–5)", value: "0.5–1", unit: "g/kg bodyweight" },
          { label: "Protein (all peak week)", value: "2.5+", unit: "g/kg bodyweight" },
          { label: "Rep range (depletion workouts)", value: "12–20", unit: "reps" },
        ],
      },
      {
        heading: "Days 4–2: Carbohydrate loading",
        body: [
          "Increase carbohydrates to 8–12 g/kg bodyweight for 1–3 days. Depleted muscle glycogen supercompensates — muscles fill with glycogen plus the water it binds (~2.7 g water per gram of glycogen).",
          "This is the mechanism behind the 'full' look in bodybuilding. Glycogen-saturated muscle bellies appear larger and rounder.",
          "Fat intake drops to near zero during the carb load — dietary fat does not blunt glycogen storage but adds unnecessary calories.",
          "Sodium: keep moderate (2,000–3,000 mg/day). Severe sodium restriction before this phase causes rebound retention; a consistent moderate intake avoids this.",
        ],
        metrics: [
          { label: "Carbs (days 4–2)", value: "8–12", unit: "g/kg bodyweight" },
          { label: "Water bound per gram glycogen", value: "2.7", unit: "g water/g glycogen", note: "Mechanism for muscle fullness" },
          { label: "Sodium (loading phase)", value: "2,000–3,000", unit: "mg/day" },
        ],
      },
      {
        heading: "Day 1: Show day",
        body: [
          "Water intake: sip small amounts throughout the day — severe restriction causes thirst-driven cortisol rise and muscle flatness.",
          "Sodium on the day: moderate (1,500–2,500 mg). Dramatic reductions cause vasodilation and watery appearance in some individuals.",
          "Carbohydrates: continue moderate carb intake (3–5 g/kg). Pre-stage pump work (10–15 minutes of moderate resistance exercise) increases blood flow and muscle fullness acutely for 20–30 minutes.",
          "Avoid experimenting with new foods, diuretics, or supplements on show day. The risk of GI distress, cramping, or unexpected water shifts outweighs any potential benefit.",
        ],
        metrics: [
          { label: "Carbs (show day)", value: "3–5", unit: "g/kg bodyweight" },
          { label: "Pump-up duration", value: "10–15", unit: "minutes", note: "Before stage call; moderate resistance only" },
          { label: "Effect duration of pump", value: "20–30", unit: "minutes" },
        ],
      },
    ],
  },
  {
    id: "underweight-bulk",
    slug: "underweight-bulk",
    title: "Underweight Bulk",
    tagline: "Build the calorie surplus needed to gain weight when appetite and digestion are the limiting factors.",
    category: "Nutrition",
    sections: [
      {
        heading: "Why underweight individuals struggle to gain weight",
        body: [
          "Being underweight is frequently a result of a genuinely low appetite, high NEAT (non-exercise activity thermogenesis), or poor calorie tracking rather than a metabolic anomaly. True 'hard gainers' do exist but are rarer than self-reported.",
          "NEAT is the main variable: underweight individuals tend to unconsciously move more, fidget, and use more energy in incidental activity when calories increase. This can burn an extra 300–700 kcal/day above what they expect.",
          "Before increasing calories further, accurately track intake for 7 days using a food scale. Most underweight individuals who believe they 'eat a lot' are significantly under-reporting portion sizes.",
        ],
        metrics: [
          { label: "NEAT increase from overfeeding", value: "300–700", unit: "kcal/day", note: "Explains why some need very large surpluses" },
          { label: "Tracking period before adjusting", value: "7", unit: "days with food scale", note: "Establishes true baseline" },
        ],
      },
      {
        heading: "Calorie targets for underweight individuals",
        body: [
          "Start at TDEE +500 kcal/day. If no weight gain occurs after 2 weeks, increase by 200–300 kcal. Repeat until the scale moves 0.5–1 kg/week.",
          "Some underweight individuals require 4,000–5,000+ kcal/day to gain weight due to high NEAT and fast gastric emptying. This is achievable with calorie-dense foods but takes deliberate planning.",
          "Target 0.5–1 kg per week of scale weight gain. At this rate, the majority will be lean mass plus glycogen and water in the early weeks. After 4–6 weeks, true tissue composition of gain becomes apparent.",
        ],
        metrics: [
          { label: "Starting surplus", value: "+500", unit: "kcal/day above TDEE" },
          { label: "Adjustment step", value: "+200 to +300", unit: "kcal/day", note: "If no gain after 2 weeks" },
          { label: "Target gain rate", value: "0.5–1", unit: "kg/week" },
        ],
      },
      {
        heading: "Calorie density strategies",
        body: [
          "Liquid calories are more tolerable than solid food for low-appetite individuals. A 500–700 kcal shake (oats, milk, banana, peanut butter, protein powder) takes 2 minutes to consume versus 25 minutes to eat the same calories as whole food.",
          "Calorie-dense foods: olive oil (120 kcal/tbsp), nuts (170–200 kcal/oz), nut butters, full-fat dairy, dried fruit, avocado. Add these to existing meals to increase calorie density without increasing meal volume.",
          "Eating frequency: 5–6 meals per day prevents individual meals from being too large to finish. Gastric stretch limits meal size — more frequent smaller meals bypass this more effectively than 3 large meals.",
        ],
        metrics: [
          { label: "Liquid meal calorie target", value: "500–700", unit: "kcal", note: "One daily gainer shake" },
          { label: "Olive oil calorie density", value: "120", unit: "kcal/tablespoon" },
          { label: "Target meal frequency", value: "5–6", unit: "meals/day" },
        ],
      },
      {
        heading: "Training for underweight individuals",
        body: [
          "Resistance training creates the stimulus that directs added calories toward muscle rather than fat. Without a training programme, weight gain will primarily be fat.",
          "Start with compound movements 3x/week full-body (squat, deadlift, bench, overhead press, row). Volume should be moderate: 10–15 sets per muscle group per week. Underweight individuals are often undertrained and their MEV is lower than average.",
          "Cardio should be minimised during an underweight bulk. It increases caloric requirements further and adds recovery load. 1–2 short sessions of 20–30 min low-intensity cardio per week is acceptable for cardiovascular health without significantly impeding weight gain.",
        ],
        metrics: [
          { label: "Training frequency", value: "3", unit: "days/week (full-body)", note: "While gaining weight" },
          { label: "Weekly sets per muscle", value: "10–15", note: "Start conservative; adjust over 4–6 weeks" },
          { label: "Cardio limit (bulk phase)", value: "1–2", unit: "sessions/week", note: "20–30 min LISS maximum" },
        ],
      },
    ],
  },
  {
    id: "weight-loss",
    slug: "weight-loss",
    title: "Weight Loss",
    tagline: "Create a consistent calorie deficit through diet and behaviour change — no protocol required, only adherence.",
    category: "Nutrition",
    sections: [
      {
        heading: "Energy balance is the mechanism",
        body: [
          "Every diet that produces weight loss works through the same mechanism: a calorie deficit. Low-carb, fasting, keto, and high-protein diets all reduce weight because they help adherent individuals eat less, not because of any metabolic magic.",
          "Individual variation in TDEE can be 20–30% between people of similar size. This means two people following the same 'standard' 1,500 kcal plan can have very different results.",
          "The best diet for weight loss is the one you will follow for 6–12 months. Protocol adherence consistently predicts outcome better than the specific dietary approach chosen.",
        ],
        metrics: [
          { label: "TDEE individual variation", value: "20–30", unit: "%", note: "Between similar-sized people" },
          { label: "Target deficit", value: "500–750", unit: "kcal/day", note: "Hits 0.5–0.75 kg/week loss rate" },
          { label: "Minimum timeline for meaningful results", value: "12–16", unit: "weeks" },
        ],
      },
      {
        heading: "Protein's role in weight loss",
        body: [
          "Protein's thermic effect is 20–35% of its own calories — eating 100 kcal of protein costs 20–35 kcal to digest, versus 5–10% for carbs and 0–3% for fat. This is not dramatic but it compounds over months.",
          "Protein is the most satiating macronutrient per calorie. High-protein diets (1.6+ g/kg) consistently show lower total calorie intake in ad libitum eating studies.",
          "Target 1.6–2.2 g/kg bodyweight during weight loss. This range preserves muscle mass, keeps hunger manageable, and costs fewer adherence compromises than aggressive restriction.",
        ],
        metrics: [
          { label: "Protein thermic effect", value: "20–35", unit: "% of protein calories", note: "vs 5–10% for carbs" },
          { label: "Protein target (weight loss)", value: "1.6–2.2", unit: "g/kg bodyweight" },
        ],
      },
      {
        heading: "Practical strategies that work",
        body: [
          "Food environment design: remove high-calorie foods from immediate sight and reach. Studies show bowl placement and cabinet visibility predict consumption independently of hunger or willpower.",
          "Volume eating: low-calorie-density foods (vegetables, lean proteins, broth soups) allow larger meal volumes for fewer calories, maintaining satiety without deprivation.",
          "Sleep: sleeping under 6 hours/night increases ghrelin (hunger hormone) by 24% and decreases leptin (satiety hormone). Poor sleep reliably increases calorie intake the next day by 300–500 kcal in controlled studies.",
          "Protein-first plating: eat protein before carbohydrates at each meal. This modestly reduces total meal intake and improves post-meal glucose response.",
        ],
        metrics: [
          { label: "Sleep ghrelin effect", value: "+24", unit: "% ghrelin increase", note: "With <6 hours vs 8 hours sleep" },
          { label: "Extra calories from poor sleep", value: "300–500", unit: "kcal/day", note: "Controlled study data" },
        ],
      },
      {
        heading: "Plateaus and metabolic adaptation",
        body: [
          "Weight loss plateaus are a consequence of metabolic adaptation, not a failure of willpower. As body weight decreases, TDEE decreases — the same deficit that produced weight loss no longer maintains it.",
          "After 10% body weight loss, metabolic rate can drop 15–25% below what size alone predicts, primarily due to reduced NEAT and decreased thyroid output.",
          "To restart loss: either reduce calories by 100–200 kcal, increase activity by 1,500–2,000 steps/day, or take a 1–2 week maintenance break to restore leptin and reduce cortisol before resuming the deficit.",
        ],
        metrics: [
          { label: "Metabolic adaptation (10% BW loss)", value: "15–25", unit: "% below predicted TDEE" },
          { label: "Restart options", value: "−100 to −200 kcal OR +1,500–2,000 steps", note: "Either is equivalent in practice" },
        ],
      },
    ],
  },
];


export const guideContents = guidesContent;
