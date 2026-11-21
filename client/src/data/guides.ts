// Guides seed data
export interface Guide {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: 'recomposition' | 'bulk' | 'cut' | 'peaking' | 'beginner';
}

export const guides: Guide[] = [
  {
    id: 'body-recomposition',
    title: 'Body Recomposition',
    description: 'Build muscle and lose fat simultaneously. Works best for beginners and those returning after a break.',
    slug: 'body-recomposition',
    category: 'recomposition',
  },
  {
    id: 'lean-bulk',
    title: 'Lean Bulk',
    description: 'Controlled caloric surplus (200–300 kcal) with progressive overload to maximize muscle gain while minimizing fat.',
    slug: 'lean-bulk',
    category: 'bulk',
  },
  {
    id: 'cutting',
    title: 'Cutting',
    description: 'Systematic caloric deficit with high protein to strip fat while retaining muscle mass earned during the bulk.',
    slug: 'cutting',
    category: 'cut',
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'Sustainable fat loss without the strict periodization of a powerlifting cut. Scales for all training levels.',
    slug: 'weight-loss',
    category: 'cut',
  },
  {
    id: 'peak-week',
    title: 'Peak Week',
    description: 'The final 7 days before a physique competition or photoshoot — carb manipulation, water, and sodium management.',
    slug: 'peak-week',
    category: 'peaking',
  },
  {
    id: 'underweight-bulk',
    title: 'Underweight Bulk',
    description: 'High-calorie protocol for ectomorphs and hard gainers starting well below target bodyweight.',
    slug: 'underweight-bulk',
    category: 'beginner',
  },
];
