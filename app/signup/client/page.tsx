"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { authService } from "@/services/auth.service";

export default function ClientSignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simple password strength logic for visualization
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 5) strength++;
    if (pass.length > 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.signup({
        email,
        password,
        role: "user",
        phoneNumber,
        firstName,
        lastName,
      });

      // Store session
      authService.setSession(data);

      router.push("/client/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#fff7ed] to-[#e3eeff] relative">
      <div
        className="fixed inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url('/assets/full_page_background.png')" }}
      />
      {/* Logo - Absolute Top Left */}

      <main className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-purple-200/50 overflow-hidden relative z-10">
        {/* Right Side - Form */}
        <div className="w-full p-6 sm:p-8 flex flex-col justify-center bg-white">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Logo />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Create your Account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Let's get you started on your property search.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-medium text-slate-500 mb-1"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                  id="first-name"
                  name="first-name"
                  placeholder="John"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium text-slate-500 mb-1"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                  id="last-name"
                  name="last-name"
                  placeholder="Doe"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-medium text-slate-500 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium text-slate-500 mb-1"
                htmlFor="phone-number"
              >
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                id="phone-number"
                name="phone-number"
                placeholder="0801 234 5678"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium text-slate-500 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-between mt-1.5">
                <span
                  className={`text-xs font-medium ${strength > 2 ? "text-green-500" : strength > 1 ? "text-yellow-500" : "text-slate-400"}`}
                >
                  {strength > 3 ? "Strong" : strength > 1 ? "Medium" : "Weak"}
                </span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-1 rounded-full transition-colors ${strength >= i ? (strength > 2 ? "bg-green-500" : "bg-[#F59E0B]") : "bg-slate-200"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-gray-300 text-[#F59E0B] focus:ring-[#F59E0B]"
                id="terms"
                name="terms"
                type="checkbox"
                required
              />
              <label
                className="ml-2 block text-xs text-slate-500"
                htmlFor="terms"
              >
                I agree to the{" "}
                <a
                  className="font-medium text-[#F59E0B] hover:text-[#D97706]"
                  href="#"
                >
                  Terms & Privacy
                </a>
              </label>
            </div>
            <div>
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-[#F59E0B] hover:bg-[#D97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account & Verify"}
              </button>
            </div>
            <p className="text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                className="font-medium text-[#F59E0B] hover:text-[#D97706]"
                href="/login"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
