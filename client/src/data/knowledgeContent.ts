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

export interface KnowledgeContent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  sections: Section[];
  glossary?: { term: string; definition: string }[];
}

export const knowledgeContent: KnowledgeContent[] = [
  {
    id: "hypertrophy",
    slug: "hypertrophy",
    title: "Hypertrophy",
    tagline: "Muscle growth has three mechanisms — mechanical tension, metabolic stress, and muscle damage — and one matters far more than the others.",
    category: "Training",
    sections: [
      {
        heading: "The primary driver: mechanical tension",
        body: [
          "Mechanical tension — the force transmitted through muscle fibres during contraction — is the primary hypertrophic stimulus. This is why progressive overload (adding load, reps, or sets over time) is the foundational principle of muscle building.",
          "Metabolic stress (the 'pump') and muscle damage contribute to hypertrophy but are secondary. Training optimised purely for metabolic stress or soreness does not produce superior results to progressive overload when volume is equated.",
          "Practical implication: prioritise adding weight to the bar over training methods designed to maximise burn or soreness. A programme with consistent load progression across months outperforms any technique intended to 'confuse' the muscle.",
        ],
      },
      {
        heading: "Volume: sets per muscle group per week",
        body: [
          "Volume — total sets per muscle per week — is the main modifiable driver of hypertrophy when progressive overload is already in place. More weekly sets produce more growth up to a point (Maximum Recoverable Volume), after which additional sets reduce net adaptation.",
          "Minimum Effective Volume (MEV): the fewest sets per week to produce growth. For most muscles this is 8–10 sets/week. Training below this produces maintenance at best.",
          "Maximum Adaptive Volume (MAV): the volume that produces optimal results, typically 12–20 sets/muscle/week for experienced lifters. This is the target training volume during a hypertrophy phase.",
          "Maximum Recoverable Volume (MRV): the volume ceiling beyond which recovery is impaired and size is lost. Exceeding MRV without deloading causes overreaching.",
        ],
        metrics: [
          { label: "MEV (most muscles)", value: "8–10", unit: "sets/week" },
          { label: "MAV (most muscles)", value: "12–20", unit: "sets/week" },
          { label: "MRV (most muscles)", value: "20–30+", unit: "sets/week", note: "Highly individual; watch recovery markers" },
        ],
      },
      {
        heading: "Rep ranges and load",
        body: [
          "Hypertrophy occurs across a wide rep range — 6 to 30 reps — when sets are taken close to failure. The common belief that 8–12 reps are uniquely hypertrophic is not supported by current evidence when volume is equated.",
          "Lower rep ranges (5–8) allow heavier loads, which drives mechanical tension more directly. Higher rep ranges (15–30) are more metabolically demanding and equally effective for hypertrophy when sets end near failure.",
          "Practical approach: use a mix. Heavy compound work (5–8 reps) for main movements; moderate rep ranges (10–15) for secondary exercises; higher reps (15–25) for isolation and low-skill movements.",
        ],
        metrics: [
          { label: "Minimum effective load", value: "30–40", unit: "% 1RM", note: "Only if sets are taken to true failure at high reps" },
          { label: "Proximity to failure", value: "0–4", unit: "RIR", note: "Sets ending with >4 RIR produce minimal hypertrophy" },
        ],
      },
      {
        heading: "Frequency and muscle recovery",
        body: [
          "Muscle protein synthesis (MPS) peaks 24–48 hours after a training session and returns to baseline by 48–72 hours in trained individuals. Training a muscle group every 48–72 hours (2x/week minimum) is therefore more efficient than once-per-week frequency when total volume is equated.",
          "Higher frequencies (3–4x/week per muscle) can be productive when volume is spread across sessions to manage per-session fatigue, but do not produce dramatically superior results to twice-weekly at similar volumes.",
          "Split strategy for natural lifters: upper/lower (4 days) or push/pull/legs (6 days) provide 2x weekly frequency with manageable per-session volumes.",
        ],
        metrics: [
          { label: "Minimum frequency", value: "2", unit: "sessions/muscle/week" },
          { label: "MPS duration post-training", value: "24–48", unit: "hours", note: "Returns to baseline by 72 hours in trained individuals" },
        ],
      },
    ],
  },
  {
    id: "cardio",
    slug: "cardio",
    title: "Cardio",
    tagline: "Cardiovascular training and muscle building are compatible — but cardio volume, intensity, and timing all affect the degree of interference.",
    category: "Training",
    sections: [
      {
        heading: "The interference effect",
        body: [
          "Concurrent training (cardio + resistance) can blunt muscle and strength gains via the 'interference effect': endurance adaptations (AMPK signalling) suppress hypertrophic signalling (mTOR pathway). This is real but overstated in practice.",
          "The interference effect is primarily dose-dependent. 2–3 moderate cardio sessions per week show minimal interference with strength or hypertrophy outcomes. High-volume cardio (5+ sessions, high intensity) during a muscle-building phase measurably reduces gains.",
          "Mode matters: running shows greater interference than cycling, likely due to higher eccentric loading and greater residual muscle damage. Low-impact modalities (cycling, rowing, swimming) are preferable when hypertrophy is the primary goal.",
        ],
        metrics: [
          { label: "Cardio limit (muscle-building)", value: "2–3", unit: "sessions/week", note: "Minimal interference at this dose" },
          { label: "Session separation from lifting", value: "6+", unit: "hours", note: "Or on separate days; reduces acute interference" },
        ],
      },
      {
        heading: "LISS vs HIIT for body composition",
        body: [
          "LISS (Low-Intensity Steady State, 60–70% max HR, 30–60 min) burns fewer calories per session but causes minimal fatigue, allows higher total weekly volume, and is compatible with resistance training recovery.",
          "HIIT (High-Intensity Interval Training) burns more calories in less time and produces greater post-exercise oxygen consumption (EPOC). However, HIIT causes significant fatigue, interferes with leg training recovery when done in the same week, and has a higher injury rate.",
          "For fat loss: both are equivalent when total calorie expenditure is equated. The practical advantage of LISS is sustainability and recovery compatibility. The advantage of HIIT is time efficiency.",
        ],
        metrics: [
          { label: "LISS intensity", value: "60–70", unit: "% max HR" },
          { label: "LISS duration", value: "30–60", unit: "minutes" },
          { label: "HIIT session duration", value: "15–25", unit: "minutes", note: "Including warm-up" },
          { label: "EPOC (HIIT)", value: "6–15", unit: "% extra calories post-session", note: "Often overstated in marketing" },
        ],
      },
      {
        heading: "Cardio for health vs performance",
        body: [
          "VO2 max is the strongest predictor of all-cause mortality among modifiable fitness markers. Each 1 MET increase in cardiorespiratory fitness is associated with a 13–15% reduction in cardiovascular mortality.",
          "Target VO2 max: Zone 2 training (conversational pace, 60–75% max HR) for 150–180 minutes per week builds aerobic base. 1–2 weekly VO2 max intervals (4×4 min at 90–95% max HR) develop peak cardiorespiratory capacity.",
          "For non-athletes, 150 min/week of moderate or 75 min/week of vigorous cardiovascular activity meets minimum health thresholds and does not interfere with a standard 3–4 day resistance programme.",
        ],
        metrics: [
          { label: "Zone 2 target", value: "150–180", unit: "min/week" },
          { label: "VO2 max interval structure", value: "4×4 min at 90–95% max HR", note: "1–2 sessions/week maximum" },
          { label: "Mortality reduction per 1 MET increase", value: "13–15", unit: "%" },
        ],
      },
    ],
  },
  {
    id: "hormones",
    slug: "hormones",
    title: "Hormones",
    tagline: "Testosterone, cortisol, and insulin are the three hormones most relevant to body composition — each is significantly affected by training, sleep, and nutrition.",
    category: "Biology",
    sections: [
      {
        heading: "Testosterone and muscle",
        body: [
          "Testosterone drives muscle protein synthesis, red blood cell production, and bone density. In physiological ranges, higher free testosterone correlates with greater muscle mass and faster recovery.",
          "Training acutely raises testosterone, but the magnitude depends on exercise selection (compound > isolation), load (heavy > light), and volume (moderate > low). The post-workout testosterone spike (30–60 min) contributes to anabolic signalling but is not the primary driver of hypertrophy.",
          "Lifestyle factors with the largest proven effects on testosterone: sleep quality, body fat percentage, and dietary fat intake. Sleeping under 5 hours reduces testosterone by 10–15% the following day. Body fat above 25% (men) is associated with elevated aromatase activity, which converts testosterone to estradiol.",
        ],
        metrics: [
          { label: "Sleep <5h testosterone reduction", value: "10–15", unit: "% next-day drop" },
          { label: "Dietary fat minimum for testosterone", value: "0.5", unit: "g/kg bodyweight" },
          { label: "Male BF threshold for aromatase impact", value: ">25", unit: "% body fat" },
        ],
      },
      {
        heading: "Cortisol: acute vs chronic",
        body: [
          "Cortisol is catabolic — it breaks down muscle protein and mobilises glycogen for energy. This is not inherently bad: acute cortisol spikes during training are part of the adaptive stress response.",
          "Chronic cortisol elevation is the problem. Prolonged calorie restriction, overtraining, poor sleep, and psychological stress all elevate baseline cortisol. Chronically elevated cortisol directly opposes testosterone signalling and accelerates muscle protein breakdown.",
          "Practical management: cap training sessions at 60–75 minutes (cortisol rises steeply after this point for trained individuals), prioritise sleep, and do not maintain a calorie deficit longer than 8 weeks without a maintenance break.",
        ],
        metrics: [
          { label: "Training session cap", value: "60–75", unit: "minutes", note: "Before cortisol rise becomes significant" },
          { label: "Continuous deficit max (cortisol)", value: "6–8", unit: "weeks", note: "Diet breaks restore cortisol balance" },
        ],
      },
      {
        heading: "Insulin and nutrient partitioning",
        body: [
          "Insulin is a storage hormone — it drives glucose and amino acids into muscle and fat cells. Post-training, elevated insulin in the presence of dietary protein and carbohydrates creates an anabolic environment.",
          "Insulin resistance — where cells respond poorly to insulin — develops primarily through excess body fat (visceral in particular), inactivity, and poor sleep. Resistance training is one of the most effective interventions for improving insulin sensitivity, with effects lasting 24–72 hours per session.",
          "Practical implication: post-workout carbohydrates are most effective when muscles are insulin-sensitive (immediately after training). The 'anabolic window' is real but wide — 2 hours post-training, not the mythologised 30-minute window.",
        ],
        metrics: [
          { label: "Post-training insulin sensitivity window", value: "2", unit: "hours", note: "Optimal time for carbohydrate intake" },
          { label: "Resistance training insulin sensitivity effect", value: "24–72", unit: "hours post-session" },
        ],
      },
      {
        heading: "Sleep: the master hormonal regulator",
        body: [
          "Growth hormone (GH) is secreted primarily during slow-wave sleep, with the largest pulse occurring 60–90 minutes after sleep onset. GH drives fat oxidation and muscle protein synthesis overnight.",
          "A single night of poor sleep disrupts GH pulse amplitude, elevates fasting cortisol, reduces insulin sensitivity, and increases ghrelin. These changes collectively push body composition in the wrong direction.",
          "Sleep hygiene for body composition: target 7–9 hours, consistent sleep/wake times, room temperature 16–19°C (60–66°F), and no screens in the 30–60 minutes before bed (blue light delays melatonin onset by 1–1.5 hours).",
        ],
        metrics: [
          { label: "Target sleep duration", value: "7–9", unit: "hours" },
          { label: "GH pulse timing", value: "60–90", unit: "min after sleep onset" },
          { label: "Optimal room temperature", value: "16–19", unit: "°C" },
          { label: "Screen-off time before bed", value: "30–60", unit: "minutes", note: "Prevents melatonin delay" },
        ],
      },
    ],
  },
  {
    id: "glossary",
    slug: "glossary",
    title: "Glossary",
    tagline: "Precise definitions for the terms used throughout IndieFit — no filler, no vague explanations.",
    category: "Reference",
    sections: [
      {
        heading: "How to use this glossary",
        body: [
          "Terms are defined with the precision needed to apply them in practice. Where a term is used differently across different communities (e.g. 'toning'), the most mechanistically accurate definition is used.",
        ],
      },
    ],
    glossary: [
      { term: "1RM", definition: "One-repetition maximum — the maximum weight that can be lifted once with correct form. Used to prescribe training loads as percentages." },
      { term: "AMPK", definition: "AMP-activated protein kinase — an enzyme activated by energy depletion (cardio, fasting) that promotes fat oxidation. Antagonises mTOR signalling, hence the interference effect with hypertrophy." },
      { term: "Aromatase", definition: "An enzyme that converts testosterone to estradiol. Elevated in adipose tissue; higher body fat means higher aromatase activity and lower free testosterone." },
      { term: "BMR", definition: "Basal Metabolic Rate — energy expenditure at complete rest. The Mifflin-St Jeor equation is the most accurate non-laboratory estimate: (10 × weight kg) + (6.25 × height cm) − (5 × age) ± 5 (men add 5, women subtract 161)." },
      { term: "BV (Biological Value)", definition: "A measure of protein quality based on how efficiently the body uses the absorbed nitrogen. Whey has a BV >100; plant proteins have lower BVs. Practical relevance is low when total protein is adequate." },
      { term: "Calorie", definition: "A kilocalorie (kcal) — the amount of energy needed to raise 1 kg of water by 1°C. All 'calories' on food labels are kilocalories." },
      { term: "Creatine phosphate", definition: "The immediate energy substrate for maximal-effort contractions lasting 1–10 seconds. Creatine supplementation saturates muscle stores, increasing available creatine phosphate and improving performance in this energy system." },
      { term: "Deload", definition: "A planned reduction in training volume and/or intensity (typically 40–60% of normal load) for 1 week to allow systemic recovery and supercompensation." },
      { term: "DOMS", definition: "Delayed Onset Muscle Soreness — muscular pain appearing 24–72 hours after novel or high-volume eccentric training. Caused by inflammatory response to muscle fibre damage. Not a reliable indicator of training quality." },
      { term: "EPOC", definition: "Excess Post-exercise Oxygen Consumption — elevated metabolism following exercise as the body restores oxygen stores, clears lactate, and lowers core temperature. Often overstated as a fat-loss mechanism; contributes 6–15% of exercise calorie expenditure." },
      { term: "Glycogen", definition: "The form in which carbohydrates are stored in muscle and liver. Muscle glycogen is the primary fuel for high-intensity exercise. Each gram of glycogen is stored with approximately 2.7 g of water." },
      { term: "GH (Growth Hormone)", definition: "A peptide hormone secreted by the pituitary gland, primarily during slow-wave sleep. Promotes fat oxidation, muscle protein synthesis, and IGF-1 release. Training acutely raises GH but the effect is modest compared to overnight secretion." },
      { term: "IGF-1", definition: "Insulin-like Growth Factor 1 — released primarily from the liver in response to GH. Promotes muscle protein synthesis and satellite cell proliferation. Training and adequate protein intake both raise IGF-1." },
      { term: "Insulin sensitivity", definition: "How effectively cells respond to insulin's signal to take up glucose. High insulin sensitivity means less insulin is needed to shuttle the same amount of glucose. Resistance training and low body fat improve it; visceral fat and inactivity worsen it." },
      { term: "LISS", definition: "Low-Intensity Steady State cardio — sustained aerobic exercise at 60–70% of maximum heart rate for 30–60 minutes. Primarily fat-oxidising, low recovery cost, compatible with resistance training." },
      { term: "MAV", definition: "Maximum Adaptive Volume — the weekly training volume that produces optimal hypertrophic gains. Beyond MAV but below MRV, gains continue but recovery cost increases steeply." },
      { term: "MEV", definition: "Minimum Effective Volume — the fewest weekly sets that produce a training adaptation. Training below MEV maintains existing size at best." },
      { term: "mTOR", definition: "Mechanistic Target of Rapamycin — a kinase complex that integrates anabolic signals (amino acids, insulin, mechanical tension) and activates muscle protein synthesis. The key anabolic signalling pathway for hypertrophy." },
      { term: "MPS", definition: "Muscle Protein Synthesis — the process by which cells build new muscle proteins. Stimulated by resistance training and dietary leucine. Peaks 24–48 hours post-training in experienced lifters." },
      { term: "MRV", definition: "Maximum Recoverable Volume — the volume ceiling beyond which additional training produces recovery debt that reduces net muscle gain. Exceeding MRV without deloading leads to overreaching." },
      { term: "NEAT", definition: "Non-Exercise Activity Thermogenesis — calories burned through all movement that is not formal exercise: walking, fidgeting, posture, gestures. Can vary 300–700 kcal/day between individuals and is the primary driver of metabolic adaptation during overfeeding." },
      { term: "Overreaching", definition: "A short-term state of training excess where performance decreases. Functional overreaching (intentional) resolves in 1–2 weeks of reduced load. Non-functional overreaching takes weeks to months to resolve." },
      { term: "Progressive overload", definition: "The systematic increase of training stress over time — via added load, reps, sets, or reduced rest — to continuously provide a hypertrophic or strength stimulus above the current adaptation level." },
      { term: "RIR", definition: "Reps in Reserve — the number of additional reps that could be completed before failure. 2 RIR means 2 reps were left in the tank. Used to prescribe training proximity to failure without mandating failure-sets." },
      { term: "RPE", definition: "Rate of Perceived Exertion — a 1–10 subjective scale of effort. RPE 10 = maximum effort; RPE 8 = approximately 2 reps from failure. Correlates with RIR when calibrated properly." },
      { term: "TDEE", definition: "Total Daily Energy Expenditure — total calories burned in 24 hours including BMR, NEAT, exercise, and the thermic effect of food. The reference point for all calorie targets." },
      { term: "Thermic effect of food", definition: "The energy cost of digesting and metabolising food. Protein: 20–35% of its own calories. Carbohydrates: 5–10%. Fats: 0–3%. High-protein diets raise total daily calorie expenditure modestly through this mechanism." },
      { term: "VO2 max", definition: "The maximum rate of oxygen consumption during maximal exercise. The strongest predictor of cardiorespiratory fitness and all-cause mortality among modifiable fitness variables." },
    ],
  },
  {
    id: "measure",
    slug: "measure",
    title: "Measure",
    tagline: "Track the right variables at the right frequency — most common measurement mistakes add noise, not signal.",
    category: "Reference",
    sections: [
      {
        heading: "Bodyweight measurement",
        body: [
          "Scale weight fluctuates 1–3 kg day-to-day due to water retention, food volume, glycogen, and hormonal cycles. A single daily reading is meaningless as a progress indicator.",
          "Use a 7-day rolling average. Weigh every morning after using the toilet and before eating or drinking, naked or in consistent clothing. Add the last 7 readings and divide by 7. Compare rolling averages across weeks.",
          "Women experience larger weekly scale fluctuations (~1–3 kg) due to hormonal water retention across the menstrual cycle. Track across the same phase each month rather than week-to-week.",
        ],
        metrics: [
          { label: "Daily weight fluctuation", value: "1–3", unit: "kg", note: "Normal range; not body fat change" },
          { label: "Weekly fluctuation (women)", value: "1–3", unit: "kg", note: "Hormonal cycle effect" },
          { label: "Minimum review window", value: "4", unit: "weeks of rolling averages" },
        ],
      },
      {
        heading: "Body fat measurement",
        body: [
          "DEXA (Dual-Energy X-ray Absorptiometry) is the gold standard for body composition outside of clinical settings. Accurate to ±1–2% body fat, provides regional composition data. Cost: £50–150 per scan.",
          "Skinfold calipers: accurate to ±2–3% body fat in experienced hands with consistent technique. 7-site Jackson-Pollock protocol is more accurate than 3-site. Best for tracking change over time rather than absolute values.",
          "Bioelectrical impedance (BIA) — including consumer scales and InBody machines — is highly sensitive to hydration, food intake, and time of day. Errors of ±4–8% are common. Useful for trends, not point-in-time accuracy.",
          "Tape measurements (waist, hip, chest, arm, thigh) are free, reproducible when done correctly, and not confounded by hydration. Use a tape level with the floor, same tension, same time of day.",
        ],
        metrics: [
          { label: "DEXA accuracy", value: "±1–2", unit: "% body fat" },
          { label: "Skinfold accuracy", value: "±2–3", unit: "% body fat", note: "With consistent technique" },
          { label: "BIA error range", value: "±4–8", unit: "% body fat", note: "Highly state-dependent" },
        ],
      },
      {
        heading: "Strength tracking",
        body: [
          "Strength is the most reliable proxy for muscle mass during phases where body composition measurement is difficult. If your 5-rep working weights increase month-on-month, you are building contractile tissue.",
          "Track max working weight per set for 3–5 primary lifts each training session. Record in the same format: exercise / weight / sets × reps / RIR.",
          "Strength increases plateau naturally. Beginners gain strength rapidly (5–10% per month), intermediates more slowly (1–3% per month), and advanced lifters may need a full training cycle (8–16 weeks) to add meaningful weight to competition lifts.",
        ],
        metrics: [
          { label: "Beginner strength progression", value: "5–10", unit: "%/month" },
          { label: "Intermediate strength progression", value: "1–3", unit: "%/month" },
        ],
      },
      {
        heading: "Photos and circumference measurements",
        body: [
          "Progress photos taken every 4 weeks under identical conditions (same time of day, lighting, pose, clothing) are the most accessible visual progress marker. Lighting angle changes body appearance dramatically — standardise it.",
          "Waist circumference is the most clinically relevant circumference: >94 cm (men) and >80 cm (women) is associated with elevated metabolic risk independent of BMI.",
          "ARM circumference: measure mid-bicep at peak, same tension each time. Flexed arm circumference increases are a reliable indicator of muscle gain when body fat is stable.",
        ],
        metrics: [
          { label: "Photo frequency", value: "Every 4", unit: "weeks" },
          { label: "Elevated risk waist (men)", value: ">94", unit: "cm" },
          { label: "Elevated risk waist (women)", value: ">80", unit: "cm" },
        ],
      },
    ],
  },
  {
    id: "programs",
    slug: "programs",
    title: "Programs",
    tagline: "Programme quality matters — but adherence to any well-structured programme beats perfect adherence to a poorly-chosen one.",
    category: "Training",
    sections: [
      {
        heading: "What makes a programme effective",
        body: [
          "A training programme is effective when it includes: (1) progressive overload across time, (2) adequate volume per muscle group, (3) sufficient frequency per muscle group, (4) appropriate exercise selection, and (5) built-in recovery.",
          "Most commercially available programmes meet these criteria. The variance in outcome between decent programmes is small relative to the variance between consistent and inconsistent execution of any programme.",
          "Red flags in a programme: no way to track progress, no periodic deloads, identical volume every session and week, excessive isolation-first ordering, or frequency of less than 2x per muscle group per week.",
        ],
      },
      {
        heading: "Beginner programmes",
        body: [
          "StrongLifts 5×5 and Starting Strength: full-body 3x/week with compound lifts only. Linear progression — add weight every session — works for 3–6 months for untrained individuals. Simple and effective but volume is low.",
          "GZCLP: full-body 3x/week with Tier 1 (heavy compound), Tier 2 (secondary compound), Tier 3 (isolation) structure. More volume than 5×5, more sustainable for the intermediate transition.",
          "Reddit PPL (nSuns variant): 6-day push/pull/legs. Too much volume for true beginners but appropriate for intermediates who have outgrown full-body programmes.",
        ],
      },
      {
        heading: "Intermediate and advanced programming",
        body: [
          "5/3/1 (Jim Wendler): 4-day upper/lower split focused on 4 main lifts (squat, deadlift, bench, overhead press). Progressive loading across 4-week cycles. Add substantial accessory volume via AMRAP sets and 'boring but big' or 'first set last' supplemental schemes.",
          "PHUL (Power Hypertrophy Upper Lower): 4-day programme combining heavy power work (3–5 reps) and hypertrophy volume (8–12 reps). Well-suited for intermediate lifters prioritising both strength and size.",
          "Block periodisation: organise training into distinct accumulation (high volume, moderate load), intensification (moderate volume, high load), and realisation (low volume, peak load) phases of 4–6 weeks each. Standard practice for competitive powerlifters and Olympic weightlifters.",
        ],
      },
      {
        heading: "Programme selection principles",
        body: [
          "Match programme frequency to your life. A 6-day programme you attend 4 days is worse than a 4-day programme you complete consistently.",
          "Do not change programmes more frequently than every 8–12 weeks. Adaptation takes time; programme-hopping prevents tracking whether a given approach is working.",
          "Autoregulation: adjust planned loads based on daily readiness (sleep quality, stress, previous session performance) rather than rigid percentage-based loading. RPE/RIR-based programmes automate this.",
        ],
      },
    ],
  },
  {
    id: "rethink",
    slug: "rethink",
    title: "Rethink",
    tagline: "Several widely held fitness beliefs are contradicted by evidence — here are the most consequential ones to discard.",
    category: "Reference",
    sections: [
      {
        heading: "Soreness does not indicate muscle growth",
        body: [
          "DOMS (Delayed Onset Muscle Soreness) is caused by inflammatory response to unaccustomed eccentric loading. It is not a reliable marker of hypertrophic stimulus.",
          "Experienced lifters rarely get significantly sore from their normal training yet continue to build muscle. Chasing soreness by constantly varying exercises or adding excessive volume is counterproductive — it increases recovery time without adding adaptation.",
          "Novel exercises cause soreness due to unfamiliarity, not because they are superior for growth. After 2–4 sessions, soreness from a new exercise diminishes — this is the repeated bout effect, not a loss of training efficacy.",
        ],
      },
      {
        heading: "Muscle does not turn to fat when you stop training",
        body: [
          "Muscle tissue and fat tissue are biologically distinct cell types. One cannot convert to the other. When training ceases, muscle protein synthesis rates fall and muscle mass slowly decreases. If calorie intake remains unchanged, those unused calories are stored as fat.",
          "The perceived transformation from muscle to fat during detraining is concurrent muscle loss and fat gain — two separate processes appearing simultaneously, not a conversion.",
        ],
      },
      {
        heading: "Spot reduction does not exist",
        body: [
          "Fat cannot be removed from a specific area by exercising that area more. Lipolysis (fat breakdown) is systemically regulated by hormones — primarily catecholamines binding to fat cell receptors — and occurs across all stored fat, not preferentially near the working muscle.",
          "Genetics determine where fat is deposited and in what order it is mobilised during a deficit. The last areas to visually lean out are hormonally determined, not trainable. Abdominal exercises build abdominal muscle but have no specific effect on abdominal fat.",
        ],
      },
      {
        heading: "More protein than 2.2 g/kg provides no additional muscle benefit",
        body: [
          "Multiple meta-analyses confirm that protein intakes above 2.2 g/kg bodyweight produce no additional lean mass gain in natural athletes. The marginal benefit of extra protein above this threshold is zero for muscle growth.",
          "Higher protein intakes (3.0+ g/kg) may be useful during aggressive cuts to manage hunger and further offset muscle protein breakdown, but as a hypertrophy strategy, they provide no return above 2.2 g/kg.",
          "This does not mean high protein is harmful — excess dietary protein is simply oxidised for energy. But it means the marginal dollar spent on additional protein powder above this threshold has zero muscle-building return.",
        ],
        metrics: [
          { label: "Protein saturation point (muscle gain)", value: "2.2", unit: "g/kg bodyweight", note: "Above this, no added hypertrophic benefit" },
        ],
      },
      {
        heading: "Women do not get 'bulky' from lifting weights",
        body: [
          "Women have testosterone levels 15–20x lower than men. Testosterone is the primary anabolic hormone driving muscle mass accrual. At physiological female testosterone levels, gaining 0.5–1 kg of muscle per month requires significant consistent effort over months — the involuntary bulkiness feared by some women is not physiologically achievable without years of training or pharmacological assistance.",
          "What resistance training produces in women: increased strength, improved bone density, better insulin sensitivity, and modest lean mass gain that improves body composition (tighter appearance at the same weight, or lower body fat at the same scale weight).",
        ],
        metrics: [
          { label: "Female vs male testosterone ratio", value: "1:15–20", note: "Primary driver of different muscle gain rates" },
          { label: "Max natural female lean mass gain", value: "0.25–0.5", unit: "kg/month", note: "With consistent training and adequate calories" },
        ],
      },
    ],
  },
  {
    id: "wearables",
    slug: "wearables",
    title: "Wearables",
    tagline: "Wearables provide useful trends but their absolute accuracy is limited — know what each metric is actually measuring.",
    category: "Reference",
    sections: [
      {
        heading: "Heart rate monitoring",
        body: [
          "Optical heart rate sensors (PPG) in wrist-worn devices measure blood volume changes in capillaries to estimate heart rate. At rest and during steady-state cardio, accuracy is high: ±2–5 bpm.",
          "During high-intensity exercise, rapid arm movements and high heart rate variability cause optical sensors to lose signal. Accuracy degrades to ±10–20 bpm during HIIT, strength training, and interval work. For precision heart rate training zones, a chest strap (ECG-based) is significantly more accurate.",
          "Practical application: use wearable HR for zone 2 cardio guidance and resting HR trends. Use a chest strap for zone 4–5 interval training if precision matters.",
        ],
        metrics: [
          { label: "Optical HR accuracy (rest/steady cardio)", value: "±2–5", unit: "bpm" },
          { label: "Optical HR accuracy (HIIT/lifting)", value: "±10–20", unit: "bpm" },
        ],
      },
      {
        heading: "Calorie burn estimates",
        body: [
          "Wearable calorie estimates are frequently inaccurate by 20–40% for individual activities. Studies across Apple Watch, Garmin, Fitbit, and others show consistent overestimation of exercise calorie burn, particularly for resistance training (which is estimated from HR, a poor proxy for mechanical work during lifting).",
          "TDEE estimates from wearables accumulate these errors over 24 hours. The resulting number should be used as a rough directional guide, not a precise calorie target.",
          "Treat wearable calorie data as relative: if your device shows higher burn on training days vs rest days, that relative difference is meaningful. The absolute numbers are not.",
        ],
        metrics: [
          { label: "Wearable calorie error", value: "20–40", unit: "% inaccuracy", note: "Typically overestimates exercise calories" },
        ],
      },
      {
        heading: "Sleep tracking",
        body: [
          "Consumer wearables estimate sleep stages (light, deep, REM) using movement (actigraphy) and heart rate. Accuracy for total sleep duration is reasonable (±15–30 min). Accuracy for individual sleep stages is poor — studies comparing wearables to polysomnography (clinical gold standard) show stage classification accuracy of 65–70%.",
          "What wearables do well: tracking sleep duration trends, consistency of sleep timing, and resting heart rate during sleep (a useful recovery marker).",
          "Resting heart rate (RHR) elevation of 3–5 bpm above baseline is a reliable indicator of underrecovery from illness, overtraining, or accumulated fatigue. Many wearables track this well.",
        ],
        metrics: [
          { label: "Sleep duration accuracy", value: "±15–30", unit: "minutes" },
          { label: "Sleep stage classification accuracy", value: "65–70", unit: "%" },
          { label: "RHR elevation signalling underrecovery", value: "+3–5", unit: "bpm above baseline" },
        ],
      },
      {
        heading: "HRV and recovery scoring",
        body: [
          "Heart Rate Variability (HRV) — the variation in time between heartbeats — reflects autonomic nervous system balance. High HRV generally indicates good parasympathetic tone and recovery status. Low HRV indicates sympathetic dominance and elevated physiological stress.",
          "HRV is highly individual: a 'good' HRV number is relative to your own baseline, not population averages. Devices like WHOOP, Garmin, and Apple Watch all measure HRV using different algorithms and produce different absolute values — do not compare across devices.",
          "HRV trends over 1–2 weeks are meaningful; single-day readings are noisy. A 2-week declining trend in morning HRV warrants reducing training load.",
        ],
        metrics: [
          { label: "HRV trend window", value: "1–2", unit: "weeks", note: "Single-day readings are too noisy" },
        ],
      },
    ],
  },
  {
    id: "screen",
    slug: "screen",
    title: "Screen Time & Recovery",
    tagline: "Screen use affects sleep latency, cortisol, and next-day performance through specific biological mechanisms — not vague stress.",
    category: "Lifestyle",
    sections: [
      {
        heading: "Blue light and melatonin suppression",
        body: [
          "Blue light (wavelength 460–490 nm) suppresses melatonin synthesis via intrinsically photosensitive retinal ganglion cells (ipRGCs) that project to the suprachiasmatic nucleus. Even moderate exposure in the 2 hours before sleep delays melatonin onset by 1–1.5 hours.",
          "Melatonin does not cause sleep — it signals that it is dark and time to transition toward sleep. Suppressing it delays sleep onset and shifts sleep timing later, compressing total sleep duration in people with fixed wake times.",
          "Practical mitigation: blue-light filtering glasses (orange-tinted) reduce ipRGC activation by 60–80%. Screen night-mode (yellow shift) reduces blue light output but does not eliminate it. Eliminating screen use 60–90 minutes before sleep is more effective than any filter.",
        ],
        metrics: [
          { label: "Melatonin delay from evening screen use", value: "1–1.5", unit: "hours" },
          { label: "Blue light filtering glasses efficacy", value: "60–80", unit: "% reduction in ipRGC activation" },
          { label: "Screen-free period target", value: "60–90", unit: "minutes before sleep" },
        ],
      },
      {
        heading: "Cognitive load and cortisol",
        body: [
          "High cognitive stimulation from screens — news, social media, games — activates the HPA axis and raises cortisol before bed. Elevated cortisol at sleep onset delays slow-wave sleep and reduces GH secretion.",
          "Content type matters more than screen time duration. Passive, low-stimulation screen use (slow-paced shows, reading e-books) has less impact on cortisol than high-stimulation social media browsing or competitive gaming.",
          "Wind-down protocol: 30 minutes of non-stimulating activity (reading physical books, low-stimulation audio) reduces cortisol at sleep onset and improves sleep efficiency.",
        ],
        metrics: [
          { label: "Wind-down period target", value: "30–60", unit: "minutes of non-stimulating activity" },
        ],
      },
      {
        heading: "Morning screen use",
        body: [
          "Checking phones immediately upon waking activates the prefrontal cortex and raises cortisol before the natural cortisol awakening response (CAR) has completed its arc. The CAR peaks 30–45 minutes after waking and helps regulate alertness throughout the day.",
          "A 20–30 minute phone-free morning — combined with natural or bright artificial light exposure — aligns circadian timing, optimises CAR amplitude, and improves cognitive performance in the morning hours.",
          "Bright light exposure (1,000+ lux) in the first 30–60 minutes of waking advances circadian phase and counters evening melatonin delay, effectively shortening the lag between evening light use and next morning's sleep drive.",
        ],
        metrics: [
          { label: "Cortisol awakening response peak", value: "30–45", unit: "min after waking" },
          { label: "Phone-free morning target", value: "20–30", unit: "minutes" },
          { label: "Morning light target", value: "1,000+", unit: "lux", note: "Outdoors or bright light box" },
        ],
      },
      {
        heading: "Screen use and training performance",
        body: [
          "Sleep debt from screen-driven delayed sleep onset compounds over a training week. Losing 1 hour of sleep per night for 5 nights produces cognitive performance deficits equivalent to 24 hours of total sleep deprivation.",
          "Resistance training performance is acutely sensitive to sleep debt: even one night of poor sleep reduces maximal strength by 3–8% and time-to-failure at submaximal loads by 10–15%.",
          "The athlete's screen hygiene priority: treat the pre-sleep screen cutoff with the same compliance as training attendance. It is as large a performance variable.",
        ],
        metrics: [
          { label: "Maximal strength reduction (1 night poor sleep)", value: "3–8", unit: "%" },
          { label: "Submaximal endurance reduction (1 night poor sleep)", value: "10–15", unit: "%" },
          { label: "Cognitive debt equivalent (1 hr/night × 5 nights)", value: "~24 hours", unit: "total sleep deprivation equivalent" },
        ],
      },
    ],
  },
];
