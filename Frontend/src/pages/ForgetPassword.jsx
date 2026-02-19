import { useState } from "react";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Reset link for:", email);

    // future: API call yahan lagegi
    setMsg("If this email exists, a reset link has been sent.");
    setEmail("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-950 to-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* Background glow */}
      <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      <div className="relative w-full max-w-md z-10">
        <div className="rounded-3xl bg-gray-900/60 backdrop-blur-2xl border border-gray-800/80 shadow-2xl shadow-black/70 p-9 md:p-11">
          
          {/* Header */}
          <div className="text-center mb-9">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Forgot Password
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Enter your email to receive a reset link
            </p>
          </div>

          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 text-base focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="relative w-full py-4 mt-3 rounded-xl font-medium text-white
                       bg-gradient-to-r from-emerald-700 to-teal-700
                       hover:from-emerald-600 hover:to-teal-600
                       active:scale-[0.98]
                       shadow-lg shadow-emerald-950/40
                       transition-all duration-200"
            >
              Send Reset Link
            </button>
          </form>

          {/* Message */}
          {msg && (
            <p className="text-center text-emerald-400 text-sm mt-5">
              {msg}
            </p>
          )}

          {/* Back to SignIn */}
          <div className="mt-10 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}