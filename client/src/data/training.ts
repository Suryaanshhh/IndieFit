// Training benchmarks seed data
export interface TrainingBenchmark {
  id: string;
  title: string;
  description: string;
  slug: string;
  lift: string;
  targetKg: number;
  timelineWeeks: number;
}

export const trainingBenchmarks: TrainingBenchmark[] = [
  {
    id: 'bench-100kg',
    title: 'Benching 100 kg',
    description: 'Programming, technique cues, and periodization for hitting your first 100 kg bench press.',
    slug: 'bench-100kg',
    lift: 'Bench Press',
    targetKg: 100,
    timelineWeeks: 24,
  },
  {
    id: 'bench-200kg',
    title: 'Benching 200 kg+',
    description: 'Advanced periodization, competition prep, and equipment choices for the 200 kg bench milestone.',
    slug: 'bench-200kg',
    lift: 'Bench Press',
    targetKg: 200,
    timelineWeeks: 104,
  },
];

// Tools seed data
export interface Tool {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  comingSoon: boolean;
}

export const tools: Tool[] = [
  {
    id: '1rm-calculator',
    title: '1RM & Working Weight',
    description: 'Calculate your one-rep max from any rep range and get training percentages across all major lifts.',
    slug: '1rm',
    icon: 'Dumbbell',
    comingSoon: false,
  },
  {
    id: 'tdee-calculator',
    title: 'TDEE & Macro Targets',
    description: 'Total daily energy expenditure with macro splits for your goal — bulk, cut, or recomposition.',
    slug: 'tdee',
    icon: 'Calculator',
    comingSoon: false,
  },
  {
    id: 'volume-tracker',
    title: 'Weekly Volume Tracker',
    description: 'Track sets per muscle group against MEV and MRV thresholds. Know when to push and when to deload.',
    slug: 'volume',
    icon: 'BarChart3',
    comingSoon: false,
  },
];
