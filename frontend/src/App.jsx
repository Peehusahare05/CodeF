import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <TrackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggestions"
            element={
              <ProtectedRoute>
                <SuggestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulator"
            element={
              <ProtectedRoute>
                <SimulatorPage />
              </ProtectedRoute>
            }
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-advisor"
            element={
              <ProtectedRoute>
                <AIAdvisorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reduction-simulator"
            element={
              <ProtectedRoute>
                <SimulatorPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
