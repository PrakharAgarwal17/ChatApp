import gsap from "gsap"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useRef } from "react"

export function Landing() {
  const title = "Converza"
  
  const reference=useRef(null)
  const hoverTl=useRef(null)
  
  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(".beginning", {
      opacity: 1,
      duration: 1.5,
      delay: 1,
      ease: "power3.out",
      color: "grey"
    })
    tl.to((".beginning span"), {
      color: "white",
      duration: 0.02,
      stagger: 0.08
    })
    tl.to(".start", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    })
    tl.to(".title span", {
      color: "#54FF64",
      duration: 0.02,
      stagger: 0.1
    })
    gsap.to(".heading", {
      opacity: 1,
      repeat: -1,
      delay: 1,
      duration: 1.3,
      ease: "power2.inOut",
      yoyo: true
    })
  }, [])

  useEffect(() => {
  hoverTl.current = gsap.timeline({ paused: true })
    .to(reference.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 0.4,
      ease: "power3.out"
    })
}, [])



  return (
    <div>
      <div className="start fixed top-0 w-full left-0 min-h-screen bg-black flex z-50 justify-center items-center">
        <h1 className="beginning text-white text-xl text-gray-800 font-roboto opacity-0 md:text-xl lg:text-4xl">{title.split("").map((element) => { return <span class="ele">{element}</span> })}</h1>
      </div>
      <div class="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black">

        <div class="flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-24 bg-gradient-to-br from-black via-gray-950 to-black text-white">

          <p class="text-sm uppercase opacity-0 heading tracking-widest text-gray-500 mb-6 font-medium">
            REAL-TIME COMMUNICATION
          </p>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
            Welcome to <span class="title text-emerald-300">{title.split("").map((element) => { return <span class="ele">{element}</span> })}</span>
          </h1>

          <p class="text-lg md:text-xl text-gray-300 mb-5 leading-relaxed max-w-xl">
            Your seamless chat app built for fast, secure, and real-time conversations.
          </p>

          <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            Create rooms, connect instantly, and keep every conversation flowing —
            without distractions.
          </p>

          <div class="mt-12 flex flex-wrap gap-5">
            <Link to="/signin">
            <button class="px-8 py-4 hover:bg-emerald-600 border border-emerald-500/90 text-white font-semibold rounded-xl flex  transition shadow-lg shadow-emerald-900/20">
              Get Started
              <svg className="ml-2 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="18"
                height="18"
                >
                <path
                  d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z"
                  fill="#fff"
                  />
              </svg>

            </button>
                  </Link>
            <Link to="/learnmore">
            <button class="px-8 py-4 bg-transparent border border-gray-700 hover:border-gray-400 text-gray-500 hover:text-white font-semibold rounded-xl transition">
              Learn More
            </button>
            </Link>
          </div>

        </div>

        <div class=" right-side bg-gradient-to-br from-black bg-cover m-10 opacity-[0.7] rounded-3xl  bg-center bg-[url('https://imgs.search.brave.com/li1SEhl_S2ToPKCpIg0QxlIt75-Ze5S5jrT_aHlYINM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjA4/MDQwNTM0OC9waG90/by9wb3J0cmFpdC1v/Zi1hbi1vbGRlci13/b21hbi1pbi1oZXIt/cGFqYW1hcy10ZXh0/aW5nLW9uLWhlci1t/b2JpbGUtcGhvbmUt/aW4tdGhlLW1vcm5p/bmcuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUZ4R3I0ZEJ0/enB3VUs3b1F0amw2/QlYzc1dWNVJsZkp5/cS14RkZtNFg5V0E9')] via-gray-950 to-emerald-950/30 hidden md:flex items-center justify-center relative overflow-hidden" ref={reference} onMouseEnter={()=>hoverTl.current.play()} onMouseLeave={()=>hoverTl.current.reverse()}>
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div class="absolute -left-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
          </div>

        </div>

      </div>

    </div>
  )
}
