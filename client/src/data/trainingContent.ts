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

export interface TrainingContent {
  id: string;
  slug: string;
  title: string;
  lift: string;
  targetKg: number;
  timelineWeeks: number;
  prerequisites: string[];
  tagline: string;
  sections: Section[];
}

export const trainingContent: TrainingContent[] = [
  {
    id: 'bench-100kg',
    slug: 'bench-100kg',
    title: 'Benching 100 kg',
    lift: 'Bench Press',
    targetKg: 100,
    timelineWeeks: 24,
    prerequisites: [
      'Current 1RM baseline between 75 kg and 85 kg with controlled touch.',
      'Stable arch and unshakeable five-point contact (head, upper back, glutes, left foot, right foot).',
      'Zero chronic anterior shoulder impingement during horizontal pressing.',
      'Consistent training history of at least 9–12 months of structured barbell work.'
    ],
    tagline: 'The universal benchmark of upper-body strength: programming, technical mechanics, and periodization to break 100 kg.',
    sections: [
      {
        heading: 'Technical Architecture & Bar Path',
        body: [
          'A 100 kg bench press is rarely missed due to lack of raw chest muscle; it is missed because of a straight vertical bar path that increases the moment arm to the shoulder joint.',
          'The optimal raw bar path forms a J-curve: descend to the lower sternum/xiphoid process, then drive the bar backwards towards the rack and over the glenohumeral joint in the first third of the concentric phase.',
          'Grip width should position the forearms completely vertical (perpendicular to the floor) at the exact bottom touch point. For most lifters, this is 1.5 to 1.7 times biacromial shoulder width.',
          'Leg drive is not a push upward; it is an active isometric leg extension driving the traps back into the bench pad before the bar leaves the rack.'
        ],
        metrics: [
          { label: 'Grip Width Target', value: '1.5–1.7x', unit: 'biacromial width', note: 'Forearms vertical at bottom touch' },
          { label: 'Optimal Bar Path Arc', value: 'J-curve', note: 'Back toward rack immediately off chest' },
          { label: 'Touch Point', value: 'Lower Sternum', note: 'Below nipple line to keep elbows at 45–70°' }
        ]
      },
      {
        heading: 'Frequency & Volume Landmarks',
        body: [
          'Horizontal pressing responds best to high frequency due to rapid neuromuscular motor pattern recovery compared to squats and deadlifts.',
          'Bench press frequency should be set at 2 to 3 sessions per week. A proven setup is Day 1 heavy competition bench (strength focus), Day 2 close-grip or tempo bench (hypertrophy/triceps), and Day 3 paused bench (rate of force development off the chest).',
          'Aim for 12 to 16 total hard working sets per week between 1 and 3 RIR. Sets above 4 RIR provide negligible stimulus for strength realization.'
        ],
        metrics: [
          { label: 'Optimal Weekly Frequency', value: '2–3', unit: 'sessions/week' },
          { label: 'Weekly Volume Landmark', value: '12–16', unit: 'hard sets/week', note: 'RPE 7–9 (1–3 RIR)' },
          { label: 'Working Set Rep Ranges', value: '3–6 reps', note: 'Primary compound working sets' }
        ]
      },
      {
        heading: 'Primary Accessory Selection',
        body: [
          'Close-Grip Barbell Bench Press: Grip placed 1–2 hand-widths inside normal competition grip. Builds lockout force in the triceps and reinforces tucked elbow positioning.',
          'Long Pause Bench Press (2–3 second pause on chest): Eliminates the stretch-shortening cycle (SSC) elastic rebound and forces maximal active motor unit recruitment off the sternum.',
          'Chest-Supported T-Bar or Dumbbell Row: Equal volume of horizontal pulling stabilizes the scapular retractors, creating a broader, more rigid platform on the bench pad.',
          'Standing Overhead Press: Strengthens anterior deltoids and clavicular head while training scapular upward rotation under load.'
        ],
        metrics: [
          { label: 'Close-Grip Load', value: '80–85', unit: '% of normal bench' },
          { label: 'Pause Duration at Chest', value: '2.0–3.0', unit: 'seconds', note: 'Zero bounce, dead stop' },
          { label: 'Pull-to-Push Volume Ratio', value: '1:1', note: 'Matches horizontal pressing sets' }
        ]
      },
      {
        heading: '12-Week Peaking & Realization Block',
        body: [
          'Weeks 1–4 (Volume Base): 4 sets of 6 reps at 72.5% to 77.5% 1RM. Emphasize bar speed and hypertrophy of prime movers.',
          'Weeks 5–8 (Strength Transmutation): 5 sets of 4 reps at 80% to 85% 1RM. Introduction of heavy top singles at RPE 8 (approx 90% 1RM) prior to working sets.',
          'Weeks 9–11 (Realization & Peaking): 3 sets of 2–3 reps at 87.5% to 92.5% 1RM. Accessories taper down by 50% to clear systemic neuromuscular fatigue.',
          'Week 12 (Taper & 100 kg Attempt): Deload Monday (3x3 at 60%), complete rest until Thursday/Friday, then warm up to 100 kg attempt.'
        ],
        metrics: [
          { label: 'Accumulation Load', value: '72.5–77.5', unit: '% 1RM', note: 'Weeks 1–4' },
          { label: 'Transmutation Load', value: '80.0–85.0', unit: '% 1RM', note: 'Weeks 5–8' },
          { label: 'Realization Peak', value: '90.0–92.5', unit: '% 1RM', note: 'Weeks 9–11' }
        ]
      },
      {
        heading: 'Fatigue Management & Shoulder Longevity',
        body: [
          'Biceps tendon and anterior shoulder irritation typically result from loose scapular retraction or over-flaring elbows early in the press.',
          'Prescribe 3–4 sets of band face pulls or external rotations at the end of every pressing session to keep the infraspinatus and teres minor strong.',
          'If sternal pec tenderness emerges, switch competition pressing to neutral-grip dumbbell presses for 7–10 days before reintroducing the straight barbell.'
        ],
        metrics: [
          { label: 'Face Pull Frequency', value: 'Post-press', note: '3–4 sets of 15–20 reps' },
          { label: 'Elbow Flare Angle', value: '45–70', unit: 'degrees', note: 'Never 90° abduction' }
        ]
      }
    ]
  },
  {
    id: 'bench-200kg',
    slug: 'bench-200kg',
    title: 'Benching 200 kg+',
    lift: 'Bench Press',
    targetKg: 200,
    timelineWeeks: 104,
    prerequisites: [
      'Documented, paused bench press of at least 160 kg–170 kg with competition commands.',
      'Minimum of 4–6 years of continuous, periodized heavy strength training.',
      'Sufficient muscular cross-sectional area (typically 90 kg+ bodyweight class for raw lifters).',
      'Advanced understanding of RPE, velocity thresholds, and autoregulation.'
    ],
    tagline: 'The elite strength threshold: biomechanics of extreme loading, accommodating resistance, and tendon management.',
    sections: [
      {
        heading: 'The Biomechanics of 200 kg Loading',
        body: [
          'At 200 kg (441 lbs), minor technical errors that go unpunished at 100 kg cause catastrophic bar deceleration or tendon injury.',
          'Touch position must be strictly repeatable within millimeters. As the bar reaches the chest, the ribcage must be elevated to meet the bar, shortening the total range of motion while maintaining maximum pec stretch.',
          'The tuck-to-flare transition is the defining technical skill: elbows stay tucked at ~45° through the bottom 3 inches off the chest, then violently flare outward once the bar clears the sticking region (usually 2–4 inches above sternum) to engage the triceps and front delts.',
          'Concentric bar velocity at 1RM for elite lifters drops as low as 0.12–0.15 m/s. Grinding ability under maximum neurological output must be trained without frying the central nervous system.'
        ],
        metrics: [
          { label: 'Min 1RM Concentric Velocity', value: '0.12–0.15', unit: 'm/s', note: 'Zero-stalling grind speed' },
          { label: 'Range of Motion Reduction', value: '15–25', unit: '% via arch & leg drive' },
          { label: 'Sticking Region Height', value: '5–10', unit: 'cm off chest' }
        ]
      },
      {
        heading: 'Advanced Undulating Periodization (DUP)',
        body: [
          'Linear progression is useless at this level. Progress requires Daily Undulating Periodization (DUP) combined with autoregulated velocity or RIR baselines.',
          'Day 1 (Hypertrophy / Work Capacity): 4 sets of 8 reps at 68%–72% 1RM or Spoto Press variations.',
          'Day 2 (Power / Rate of Force Development): 6–8 doubles at 60%–65% 1RM plus accommodating resistance (chains or reverse bands), focusing on acceleration >0.75 m/s.',
          'Day 3 (Maximal Strength Realization): Heavy single at RPE 8 (88%–92%), followed by 3 sets of 3 reps at 82.5%–85%.'
        ],
        metrics: [
          { label: 'Speed Day Velocity', value: '>0.75', unit: 'm/s', note: 'Maximal compensatory acceleration' },
          { label: 'Weekly Volume', value: '14–20', unit: 'sets across all variations' },
          { label: 'Top Single Frequency', value: '1x/week', note: 'RPE 8 baseline single' }
        ]
      },
      {
        heading: 'Accommodating Resistance & Supramaximal Overload',
        body: [
          'Chain training adds 20 kg–40 kg of dynamic resistance at the top of the stroke while deloading at the chest, allowing neurological acclimation to 200 kg+ in the hands without overloading the pectoral insertion.',
          'Board Pressing (2-Board & 3-Board): Overloads the triceps lockout phase and central nervous system with 102%–107% of raw 1RM.',
          'Dead-Stop Pin Presses from chest height: Eliminates all stretch reflex and develops starting strength at zero velocity.'
        ],
        metrics: [
          { label: 'Chain Weight on Bar', value: '15–20', unit: '% of total bar weight' },
          { label: 'Board Overload Range', value: '102–108', unit: '% 1RM on 2-board' },
          { label: 'Overload Exposure', value: 'Every 2–3 weeks', note: 'Rotate variations to avoid tendon exhaustion' }
        ]
      },
      {
        heading: 'Pectoral & Tricep Hypertrophy Requirements',
        body: [
          'A 200 kg bench requires dense muscle mass in the sternal head of the pectoralis major, lateral and long heads of the triceps, and the upper back.',
          'Dumbbell bench press with deep deficit stretches the pectoral fascia under tension, promoting sarcomerogenesis (addition of sarcomeres in series).',
          'Heavy JM Presses and skull crushers with an EZ-bar build the tricep tendon thickness required to withstand 200 kg lockout stresses.'
        ],
        metrics: [
          { label: 'Dumbbell Deficit Sets', value: '3–4 sets', unit: '8–12 reps', note: 'Full active stretch at bottom' },
          { label: 'JM Press Load Target', value: '60–70', unit: '% of bench press' }
        ]
      },
      {
        heading: 'Tendon Health & Peaking Protocol',
        body: [
          'At 200 kg, tendon adaptation lags muscle adaptation by months. Pec major tears occur during sudden rapid loading changes or when fatigued pec tendons attempt to compensate for fatigued triceps.',
          'High-rep band pushdowns (100 daily reps with light resistance) increase blood flow and collagen synthesis in avascular tendon areas.',
          'Deloading must occur every 4th or 5th week: cut volume by 50% and top intensity by 15% to allow collagen matrix remodeling.'
        ],
        metrics: [
          { label: 'Deload Frequency', value: 'Every 4–5 wks', note: '50% volume, 70% intensity' },
          { label: 'Daily Band Flush', value: '100', unit: 'reps light band pushdown' }
        ]
      }
    ]
  }
];

export const trainingContents = trainingContent;
