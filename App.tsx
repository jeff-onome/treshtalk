import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import UpdatesPage from './pages/UpdatesPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import ChatsPage from './pages/ChatsPage';
import ChatDetailPage from './pages/ChatDetailPage';
import AccountPage from './pages/AccountPage';
import InstallationPage from './pages/InstallationPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import VisitorsPage from './pages/VisitorsPage';
import AutomationsPage from './pages/AutomationsPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import TeamPage from './pages/TeamPage';
import IntegrationsDashboardPage from './pages/IntegrationsDashboardPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-light overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/post" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="chats" element={<ChatsPage />} />
            <Route path="chats/:chatId" element={<ChatDetailPage />} />
            <Route path="visitors" element={<VisitorsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="automations" element={<AutomationsPage />} />
            <Route path="kb" element={<KnowledgeBasePage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="integrations" element={<IntegrationsDashboardPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="account" element={<AccountPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;