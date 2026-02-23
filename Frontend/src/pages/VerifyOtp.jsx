import axios from "axios";
import { useEffect, useState } from "react";
import gsap from "gsap"
import {useNavigate} from "react-router-dom"

export function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const navigate=useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifyotp",
        { email, otp },
      );
      const status = response.status;
      if (status == 200) {
        setCode(status);
        setError("Done Successfully");
        localStorage.clear()
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",JSON.stringify(response.data.user))
        setTimeout(()=>{
          navigate("/home")
        },1500)
      } else {
        setCode(status);
        setError(response.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      setCode(err.response?.status || 500);
    }
  };

  useEffect(()=>{
    if(!error)return
    const tl=gsap.timeline()
      tl.to(".msg",{
          opacity:0,
          yoyo:true,
          duration:1.5
      },[error])
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-950 to-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute -top-40 -left-60 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

          {error && (
            <div
              className={`msg mb-6 p-2 w-[400px] text-center text-white rounded-lg transition-all duration-300
                                 ${code == 200 ? "bg-green-600" : "bg-red-600"}`}
            >
              {error}
            </div>
          )}
      <div className="relative w-full max-w-md z-10">
        <div className="rounded-3xl bg-gray-900/60 backdrop-blur-2xl border border-gray-800/80 shadow-2xl shadow-black/70 p-9 md:p-11">
          {/* Header */}
          <div className="text-center mb-9">
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Verify OTP
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Enter the OTP sent to your email
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-7"
            onSubmit={(e) => {
              HandleSubmit(e);
            }}
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>

            {/* OTP */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                className="w-full rounded-xl bg-gray-950/70 text-white placeholder-gray-500 border border-gray-700/80 px-5 py-3.5 focus:border-emerald-600/70 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-200"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-medium text-white
                       bg-gradient-to-r from-emerald-700 to-teal-700
                       hover:from-emerald-600 hover:to-teal-600
                       active:scale-[0.98]
                       shadow-lg shadow-emerald-950/40
                       transition-all duration-200"
            >
              Verify OTP
            </button>
          </form>

          {/* Footer text (no Link) */}
          <div className="mt-10 text-center text-sm text-gray-400">
            OTP valid for 5 minutes
          </div>
        </div>
      </div>
    </div>
  );
}
