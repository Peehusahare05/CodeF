import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import Layout from "./layouts/Layout";
import "./App.css";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const TrackPage = lazy(() => import("./pages/TrackPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisorPage"));
const SimulatorPage = lazy(() => import("./pages/SimulatorPage"));
const SuggestionsPage = lazy(() => import("./pages/SuggestionsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ReduceCarbonPage = lazy(() => import("./pages/ReduceCarbonPage"));
const SustainabilityPracticesPage = lazy(() => import("./pages/SustainabilityPracticesPage"));
const AIClimatePage = lazy(() => import("./pages/AIClimatePage"));
const SEOHubPage = lazy(() => import("./pages/SEOHubPage"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-slate-500">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-to-reduce-carbon-footprint" element={<ReduceCarbonPage />} />
            <Route path="/best-sustainability-practices" element={<SustainabilityPracticesPage />} />
            <Route path="/ai-for-climate-change" element={<AIClimatePage />} />
            <Route path="/seo-hub" element={<SEOHubPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
            <Route path="/reduction-simulator" element={<SimulatorPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
