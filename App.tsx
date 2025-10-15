
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ChatWidget from './components/ChatWidget.tsx';

// Public pages
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

// Auth pages
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';

// Dashboard pages
import DashboardSidebar from './components/DashboardSidebar.tsx';
import DashboardHeader from './components/DashboardHeader.tsx';
import DashboardFooter from './components/DashboardFooter.tsx';
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

// Super Admin pages
import SuperAdminSidebar from './components/SuperAdminSidebar.tsx';
import SuperAdminHeader from './components/SuperAdminHeader.tsx';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage.tsx';
import SuperAdminUserManagementPage from './pages/SuperAdminUserManagementPage.tsx';
import SuperAdminSystemSettingsPage from './pages/SuperAdminSystemSettingsPage.tsx';
import SuperAdminWorkspacesPage from './pages/SuperAdminWorkspacesPage.tsx';
import SuperAdminFinancialsPage from './pages/SuperAdminFinancialsPage.tsx';
import SuperAdminAnalyticsPage from './pages/SuperAdminAnalyticsPage.tsx';
import SuperAdminLogsPage from './pages/SuperAdminLogsPage.tsx';
import SuperAdminAnnouncementsPage from './pages/SuperAdminAnnouncementsPage.tsx';

const PublicLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
        <ChatWidget />
    </div>
);

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
                    <Outlet />
                </main>
                <DashboardFooter />
            </div>
        </div>
    );
};

const SuperAdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <SuperAdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <SuperAdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// FIX: Changed JSX.Element to React.ReactElement to fix "Cannot find namespace 'JSX'" error.
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactElement, adminOnly?: boolean }) => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a proper spinner
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }
    
    // Simple role check for super admin
    if (adminOnly && session.user.email !== 'superadmin@example.com') {
         return <Navigate to="/dashboard" replace />;
    }

    return children;
};


// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
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
                        <Route path="/blog/post" element={<BlogPostPage />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/integrations" element={<IntegrationsPage />} />
                        <Route path="/updates" element={<UpdatesPage />} />
                    </Route>

                    {/* Auth Routes (no layout) */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    
                    {/* Dashboard Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="/dashboard/chats" replace />} />
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

                    {/* Super Admin Routes */}
                    <Route path="/superadmin" element={<ProtectedRoute adminOnly={true}><SuperAdminLayout /></ProtectedRoute>}>
                        <Route index element={<SuperAdminDashboardPage />} />
                        <Route path="users" element={<SuperAdminUserManagementPage />} />
                        <Route path="settings" element={<SuperAdminSystemSettingsPage />} />
                        <Route path="workspaces" element={<SuperAdminWorkspacesPage />} />
                        <Route path="financials" element={<SuperAdminFinancialsPage />} />
                        <Route path="analytics" element={<SuperAdminAnalyticsPage />} />
                        <Route path="logs" element={<SuperAdminLogsPage />} />
                        <Route path="announcements" element={<SuperAdminAnnouncementsPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
