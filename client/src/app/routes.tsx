import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HomePage } from '../features/home/HomePage';
import { ToolsPage } from '../features/tools/ToolsPage';
import { GuidesPage } from '../features/guides/GuidesPage';
import { GuideDetailPage } from '../features/guides/GuideDetailPage';
import { KnowledgePage } from '../features/knowledge/KnowledgePage';
import { KnowledgeDetailPage } from '../features/knowledge/KnowledgeDetailPage';
import { TrainingPage } from '../features/training/TrainingPage';
import { TrainingDetailPage } from '../features/training/TrainingDetailPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-base)' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/training/:slug" element={<TrainingDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
