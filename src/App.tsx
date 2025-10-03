import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import { MainLayout } from './layouts/main-layout';
import { AuthLayout } from './layouts/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout';

// Pages
import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/auth/login';
import { RegisterPage } from './pages/auth/register';
import { ElderlyDashboard } from './pages/elderly/dashboard';
import { ElderlyRequests } from './pages/elderly/requests';
import { ElderlyVolunteers } from './pages/elderly/volunteers';
import { ElderlyProfile } from './pages/elderly/profile';
import { VolunteerDashboard } from './pages/volunteer/dashboard';
import { VolunteerRequests } from './pages/volunteer/requests';
import { VolunteerProfile } from './pages/volunteer/profile';
import { NotFoundPage } from './pages/not-found';

// Context
import { AuthProvider } from './contexts/auth-context';
import { ThemeSwitcher } from './components/theme-switcher';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Switch>
          {/* Public routes */}
          <Route exact path="/">
            <MainLayout>
              <LandingPage />
            </MainLayout>
          </Route>
          
          {/* Auth routes */}
          <Route path="/login">
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </Route>
          <Route path="/register">
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          </Route>
          
          {/* Elderly user routes */}
          <Route path="/elderly/dashboard">
            <DashboardLayout userType="elderly">
              <ElderlyDashboard />
            </DashboardLayout>
          </Route>
          <Route path="/elderly/requests">
            <DashboardLayout userType="elderly">
              <ElderlyRequests />
            </DashboardLayout>
          </Route>
          <Route path="/elderly/volunteers">
            <DashboardLayout userType="elderly">
              <ElderlyVolunteers />
            </DashboardLayout>
          </Route>
          <Route path="/elderly/profile">
            <DashboardLayout userType="elderly">
              <ElderlyProfile />
            </DashboardLayout>
          </Route>
          
          {/* Volunteer routes */}
          <Route path="/volunteer/dashboard">
            <DashboardLayout userType="volunteer">
              <VolunteerDashboard />
            </DashboardLayout>
          </Route>
          <Route path="/volunteer/requests">
            <DashboardLayout userType="volunteer">
              <VolunteerRequests />
            </DashboardLayout>
          </Route>
          <Route path="/volunteer/profile">
            <DashboardLayout userType="volunteer">
              <VolunteerProfile />
            </DashboardLayout>
          </Route>
          
          {/* 404 route */}
          <Route path="/404">
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          </Route>
          
          {/* Redirect to 404 for any unknown routes */}
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </AnimatePresence>
      
      {/* Theme switcher - positioned fixed at the bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
    </AuthProvider>
  );
};

export default App;
