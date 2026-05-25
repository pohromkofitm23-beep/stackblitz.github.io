import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageWrapper from './components/layout/PageWrapper';
import { LanguageProvider } from './context/LanguageContext';
import { FocusProvider } from './context/FocusContext';

import Dashboard from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <LanguageProvider>
      <FocusProvider>
        {' '}
        {/* Оборачиваем тут */}
        <BrowserRouter>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </PageWrapper>
        </BrowserRouter>
      </FocusProvider>
    </LanguageProvider>
  );
}
