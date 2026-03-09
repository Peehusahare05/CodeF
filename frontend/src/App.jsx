import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import TrackPage from "./pages/TrackPage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import SimulatorPage from "./pages/SimulatorPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
