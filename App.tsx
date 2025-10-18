import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';

// Layouts and Components
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import DashboardSidebar from './components/DashboardSidebar.tsx';
import DashboardHeader from './components/DashboardHeader.tsx';
import SuperAdminSidebar from './components/SuperAdminSidebar.tsx';
import SuperAdminHeader from './components/SuperAdminHeader.tsx';

// Public Pages
import HomePage from './pages/HomePage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import FeaturesPage from './pages/FeaturesPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import CareersPage from './pages/CareersPage.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import IntegrationsPage from './pages/IntegrationsPage.tsx';
import UpdatesPage from './pages/UpdatesPage.tsx';

// Auth Pages
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage.tsx';

// Dashboard Pages
import ChatsPage from './pages/ChatsPage.tsx';
import ChatDetailPage from './pages/ChatDetailPage.tsx';
import VisitorsPage from './pages/VisitorsPage.tsx';
import ReportsPage from './pages/ReportsPage.tsx';
import AutomationsPage from './pages/AutomationsPage.tsx';
import KnowledgeBasePage from './pages/KnowledgeBasePage.tsx';
import TeamPage from './pages/TeamPage.tsx';
import IntegrationsDashboardPage from './pages/IntegrationsDashboardPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import InstallationPage from './pages/InstallationPage.tsx';
import AccountPage from './pages/AccountPage.tsx';

// Super Admin Pages
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage.tsx';
import SuperAdminUserManagementPage from './pages/SuperAdminUserManagementPage.tsx';
import SuperAdminWorkspacesPage from './pages/SuperAdminWorkspacesPage.tsx';
import SuperAdminFinancialsPage from './pages/SuperAdminFinancialsPage.tsx';
import SuperAdminAnalyticsPage from './pages/SuperAdminAnalyticsPage.tsx';
import SuperAdminLogsPage from './pages/SuperAdminLogsPage.tsx';
import SuperAdminAnnouncementsPage from './pages/SuperAdminAnnouncementsPage.tsx';
import SuperAdminSystemSettingsPage from './pages/SuperAdminSystemSettingsPage.tsx';

const PublicLayout: React.FC = () => (
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
        <div className="flex h-screen bg-light dark:bg-dark text-gray-800 dark:text-gray-200">
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light dark:bg-dark p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const SuperAdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-light dark:bg-dark text-gray-800 dark:text-gray-200">
            <SuperAdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <SuperAdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light dark:bg-dark p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

const ProtectedRoute: React.FC<{ role?: 'superadmin' }> = ({ role }) => {
    const { session, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // Super admin check
    if (role === 'superadmin' && user?.email !== 'superadmin@example.com') {
         return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/integrations" element={<IntegrationsPage />} />
                        <Route path="/updates" element={<UpdatesPage />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/registration-success" element={<RegistrationSuccessPage />} />

                    {/* Protected Dashboard Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Navigate to="chats" replace />} />
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
                    </Route>
                    
                     {/* Protected Super Admin Routes */}
                     <Route element={<ProtectedRoute role="superadmin" />}>
                        <Route path="/superadmin" element={<SuperAdminLayout />}>
                            <Route index element={<SuperAdminDashboardPage />} />
                            <Route path="users" element={<SuperAdminUserManagementPage />} />
                            <Route path="workspaces" element={<SuperAdminWorkspacesPage />} />
                            <Route path="financials" element={<SuperAdminFinancialsPage />} />
                            <Route path="analytics" element={<SuperAdminAnalyticsPage />} />
                            <Route path="logs" element={<SuperAdminLogsPage />} />
                            <Route path="announcements" element={<SuperAdminAnnouncementsPage />} />
                            <Route path="settings" element={<SuperAdminSystemSettingsPage />} />
                        </Route>
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;