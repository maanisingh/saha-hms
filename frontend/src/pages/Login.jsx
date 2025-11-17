


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { Activity } from "../lib/icons";
import { Button } from "../components/common/Button";
// import logo from "../components/assets/logo.png"

export function Login() {
  const { t } = useTranslation('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  function quickLogin(demoEmail, demoPassword) {
    setEmail(demoEmail);
    setPassword(demoPassword);
  }

  async function autoLogin(demoEmail, demoPassword) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setLoading(true);
    try {
      await login(demoEmail, demoPassword);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hospital-purple/20 via-white to-teal-500/20 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-glass p-6 sm:p-8 w-full max-w-5xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-hospital-purple rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div> */}
          {/* <img src={logo} alt="Hospital Logo" className="mx-auto w-52 h-30 sm:w-56 mb-1"/> */}
          <h1 className="text-2xl sm:text-3xl font-display font-semi-bold text-gray-900">
            {t('title')}
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {t('subtitle')}
          </p>
          <div className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
            {t('demoMode')}
          </div>
        </div>

        {/* Login + Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Login Form */}
          <div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-400 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('emailLabel')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-purple focus:border-transparent text-sm sm:text-base"
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('passwordLabel')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hospital-purple focus:border-transparent text-sm sm:text-base"
                  placeholder={t('passwordPlaceholder')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? t('signingIn') : t('signInButton')}
              </Button>
            </form>
          </div>

          {/* Right: Quick Login Cards */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              {t('quickLoginTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              {t('quickLoginInstructions')}
            </p>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 sm:pr-2">
              {[
                { email: "admin@hospital.com", password: "admin123", role: "Admin", deptKey: "allDepartments", color: "bg-purple-100 border-purple-300 text-purple-700" },
                { email: "drsarah.johnson@hospital.com", password: "Test@123", role: "Dr. Sarah Johnson", deptKey: "cardiology", color: "bg-blue-100 border-blue-300 text-blue-700" },
                { email: "drmichael.chen@hospital.com", password: "Test@123", role: "Dr. Michael Chen", deptKey: "neurology", color: "bg-blue-100 border-blue-300 text-blue-700" },
                { email: "dremily.rodriguez@hospital.com", password: "Test@123", role: "Dr. Emily Rodriguez", deptKey: "doctor", color: "bg-blue-100 border-blue-300 text-blue-700" },
                { email: "nurseemma.wilson@hospital.com", password: "Test@123", role: "Nurse Emma Wilson", deptKey: "nursing", color: "bg-teal-100 border-teal-300 text-teal-700" },
                { email: "nursejames.davis@hospital.com", password: "Test@123", role: "Nurse James Davis", deptKey: "nursing", color: "bg-teal-100 border-teal-300 text-teal-700" },
                { email: "robert.anderson@hospital.com", password: "Test@123", role: "Robert Anderson", deptKey: "pharmacist", color: "bg-orange-100 border-orange-300 text-orange-700" },
                { email: "laura.thompson@hospital.com", password: "Test@123", role: "Laura Thompson", deptKey: "labTechnician", color: "bg-cyan-100 border-cyan-300 text-cyan-700" },
                { email: "david.garcia@hospital.com", password: "Test@123", role: "David Garcia", deptKey: "radiologist", color: "bg-indigo-100 border-indigo-300 text-indigo-700" },
                { email: "jennifer.lee@hospital.com", password: "Test@123", role: "Jennifer Lee", deptKey: "finance", color: "bg-emerald-100 border-emerald-300 text-emerald-700" },
                { email: "patricia.white@hospital.com", password: "Test@123", role: "Patricia White", deptKey: "hrManager", color: "bg-rose-100 border-rose-300 text-rose-700" },
              ].map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => quickLogin(account.email, account.password)}
                  onDoubleClick={() => autoLogin(account.email, account.password)}
                  className={`w-full p-3 rounded-lg border-2 text-left hover:shadow-lg hover:scale-[1.02] transition-all ${account.color} relative group`}
                  disabled={loading}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-base">{account.role}</div>
                      <div className="text-xs opacity-80 mt-0.5">{t(account.deptKey)}</div>
                      <div className="text-xs sm:text-sm opacity-70 mt-1">{account.email}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs bg-white/50 px-2 py-1 rounded">
                        {t('doubleClick')}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-900">{t('howToUse')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              <span><strong>{t('singleClick')}</strong> {t('singleClickDesc')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span><strong>{t('doubleClick')}</strong> {t('doubleClickDesc')}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('testInfo')}
          </p>
        </div>
      </div>
    </div>
  );
}
