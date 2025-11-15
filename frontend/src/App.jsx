

import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { lazyImport } from "./utils/lazyImport";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import './i18n'; // Initialize i18n



//  Login + Layout
const Login = lazyImport(() => import("./pages/Login"));
const DashboardLayout = lazyImport(() => import("./components/layouts/DashboardLayout"));

//  Role-based Dashboards
const dashboards = {
  ADMIN: lazyImport(() => import("./pages/dashboard/AdminDashboard")),
  DOCTOR: lazyImport(() => import("./pages/dashboard/DoctorDashboard")),
  NURSE: lazyImport(() => import("./pages/dashboard/NurseDashboard")),
  RECEPTIONIST: lazyImport(() => import("./pages/dashboard/ReceptionistDashboard")),
  PHARMACIST: lazyImport(() => import("./pages/dashboard/PharmacistDashboard")),
  LAB_TECH: lazyImport(() => import("./pages/dashboard/LabTechDashboard")),
  RADIOLOGIST: lazyImport(() => import("./pages/dashboard/RadiologistDashboard")),
  FINANCE: lazyImport(() => import("./pages/dashboard/FinanceDashboard")),
  HR: lazyImport(() => import("./pages/dashboard/HRDashboard")),
  PATIENT: lazyImport(() => import("./pages/dashboard/PatientPortal")),
  AUDITOR: lazyImport(() => import("./pages/dashboard/AuditorDashboard")),
  // ATTENDANCE: lazyImport(() => import("./pages/dashboard/AttendanceDash")),
};

//  Common Pages
const Patients = lazyImport(() => import("./pages/Patients"));
const Appointments = lazyImport(() => import("./pages/Appointments"));
const Prescriptions = lazyImport(() => import("./pages/Prescriptions"));
const Pharmacy = lazyImport(() => import("./pages/Pharmacy"));
const Laboratory = lazyImport(() => import("./pages/Laboratory"));
const Radiology = lazyImport(() => import("./pages/Radiology"));
const Billing = lazyImport(() => import("./pages/Billing"));
const Staff = lazyImport(() => import("./pages/Staff"));
const Reports = lazyImport(() => import("./pages/Reports"));
const LocationTracker = lazyImport(() => import("./pages/LocationTracker"));
const Attendance = lazyImport(() => import("./pages/Attendance"));
const BeaconManager = lazyImport(() => import("./pages/BeaconManager"));
const UserManagement = lazyImport(() => import("./pages/UserManagement"));
const Help = lazyImport(() => import("./pages/Help"));


/* ------------------ Loader ------------------ */
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-hospital-purple/20 via-white to-teal-500/20 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-hospital-purple mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
);

/* ------------------ Protected Route ------------------ */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
};

/* ------------------ Dashboard Router (Dynamic) ------------------ */
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const Component = dashboards[user.role];

  if (!Component) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to HMS</h2>
        <p className="text-gray-600">
          Dashboard for <strong>{user.role}</strong> is under development.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

/* ------------------ Main App ------------------ */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
            {/* ✅ Login */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <ErrorBoundary>
                    <Login />
                  </ErrorBoundary>
                </Suspense>
              }
            />

            {/* ✅ Protected Dashboard */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <ErrorBoundary>
                      <DashboardLayout />
                    </ErrorBoundary>
                  </Suspense>
                </ProtectedRoute>
              }
            >
              {/* Default dashboard route */}
              <Route
                index
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ErrorBoundary>
                      <DashboardRouter />
                    </ErrorBoundary>
                  </Suspense>
                }
              />

              {/* ✅ Nested Pages */}
              {[
                { path: "patients", Component: Patients },
                { path: "appointments", Component: Appointments },
                { path: "prescriptions", Component: Prescriptions },
                { path: "pharmacy", Component: Pharmacy },
                { path: "laboratory", Component: Laboratory },
                { path: "radiology", Component: Radiology },
                { path: "billing", Component: Billing },
                { path: "staff", Component: Staff },
                { path: "attendance", Component: Attendance },
                { path: "reports", Component: Reports },
                { path: "locationtracker", Component: LocationTracker },
                { path: "beaconmanager", Component: BeaconManager },
                { path: "users", Component: UserManagement },
                { path: "help", Component: Help },

              ].map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ErrorBoundary>
                        <Component />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
              ))}
            </Route>

            {/* ✅ Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
