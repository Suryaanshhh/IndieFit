// Knowledge topics seed data
export interface KnowledgeTopic {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: 'physiology' | 'programming' | 'monitoring' | 'nutrition';
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: 'hypertrophy',
    title: 'Hypertrophy',
    description: 'Mechanisms of muscle growth: mechanical tension, metabolic stress, and muscle damage — ranked by evidence.',
    slug: 'hypertrophy',
    category: 'physiology',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    description: 'How aerobic work affects muscle growth, recovery, and body composition. Minimum effective dose by goal.',
    slug: 'cardio',
    category: 'programming',
  },
  {
    id: 'hormones',
    title: 'Hormones',
    description: 'Testosterone, cortisol, insulin, and IGF-1 — what actually moves the needle and what is marketing.',
    slug: 'hormones',
    category: 'physiology',
  },
  {
    id: 'glossary',
    title: 'Glossary',
    description: '1RM, RPE, RIR, MEV, MRV, progressive overload — every term defined without filler.',
    slug: 'glossary',
    category: 'programming',
  },
  {
    id: 'measure',
    title: 'How to Measure Progress',
    description: 'Scale weight, photos, tape measurements, and performance — which signals matter and when.',
    slug: 'measure',
    category: 'monitoring',
  },
  {
    id: 'programs',
    title: 'Programs',
    description: 'Evidence-based training programs ranked by goal. When to run them, when to swap, and how to progress.',
    slug: 'programs',
    category: 'programming',
  },
  {
    id: 'rethink',
    title: 'Rethink Nutrition',
    description: 'Protein timing, meal frequency, and "clean eating" — separating evidence from gym mythology.',
    slug: 'rethink',
    category: 'nutrition',
  },
  {
    id: 'wearables',
    title: 'Wearables',
    description: 'What fitness trackers measure accurately, what they guess badly, and how to use the data.',
    slug: 'wearables',
    category: 'monitoring',
  },
  {
    id: 'screen',
    title: 'Screen Time & Sleep',
    description: 'Sleep quality, blue light, and recovery — how evening habits affect adaptation.',
    slug: 'screen',
    category: 'monitoring',
  },
];
