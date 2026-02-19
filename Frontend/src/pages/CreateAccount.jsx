import {  useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

 async function HandleSubmit(e) {
    e.preventDefault();
    console.log("Clicked")
    if(password!=confirmPassword){
      setError("Password doesnt match");
      return;
    }

    try{
      const response = await axios.post("http://localhost:3000/api/auth/signup",{name,email,password,confirmPassword})
      navigate('/verifyotp')
      console.log(response)
    }
    catch(err){
      setError(err.response?.data?.message || "Something went wrong");
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-950 to-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      <div className="relative w-full max-w-md z-10">
        <div className="rounded-3xl bg-gray-900/60 backdrop-blur-2xl border border-gray-800/80 shadow-2xl shadow-black/70 p-9 md:p-11">
          {/* Header */}
          <div className="text-center mb-9">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Create Account
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Start your journey with us
            </p>
          </div>

          <form className="space-y-7" onSubmit={HandleSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 text-base focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 text-base focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 text-base focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  if (value === "") {
                    setError("");
                  } else if (password !== value) {
                    setError("Password doesn't match");
                  } else {
                    setError("");
                  }
                }}
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 text-base focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>
            <div className="text-red-600">{error}</div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 mt-3 rounded-xl font-medium text-white
                       bg-gradient-to-r from-emerald-700 to-teal-700
                       hover:from-emerald-600 hover:to-teal-600
                       active:scale-[0.98]
                       shadow-lg shadow-emerald-950/40
                       transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
