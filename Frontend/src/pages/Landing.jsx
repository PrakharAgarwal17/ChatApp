import gsap from "gsap"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {ScrollTrigger} from "gsap/ScrollTrigger"

export function Landing() {
  const title = "Converza"

  const features=[
  {
    title: "Instant Rooms",
    desc: "Create and join rooms in seconds with zero friction."
  },
  {
    title: "Real-time Sync",
    desc: "Messages delivered instantly with no refresh needed."
  },
  {
    title: "Clean Experience",
    desc: "No clutter, just pure conversation flow."
  },
  {
    title: "Secure Chats",
    desc: "Your conversations stay private and protected."
  },
  {
    title: "Fast Performance",
    desc: "Optimized for speed with minimal latency."
  },
  {
    title: "Multi-device Support",
    desc: "Access your chats from any device seamlessly."
  }
]

  const reference = useRef(null)
  const hoverTl = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
     document.body.style.overflow = "hidden"
    const tl = gsap.timeline({
      onComplete:()=>{
        document.body.style.overflow="auto"
      }
    })
    tl.to(".beginning", {
      opacity: 1,
      duration: 1.5,
      delay: 1,
      ease: "power3.out",
      color: "#9ca3af"
    })
    tl.to(".beginning span", {
      color: "#ffffff",
      duration: 0.02,
      stagger: 0.08
    })
    tl.to(".start", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    })
    tl.to(".title span", {
      color: "#4ade80",
      duration: 0.04,
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

    gsap.from(".description",{
      x:-150,
      opacity:0,
      duration:0.3,
      delay:0.2,
      scrollTrigger:{
        trigger:".description",
        scroller:"body",
        start:"top 70%",
        toggleActions:"play reverse play reverse"
      }

    })
    
  }, [])

  useEffect(() => {
    hoverTl.current = gsap.timeline({ paused: true }).to(reference.current, {
      scale: 1.03,
      duration: 0.4,
      ease: "power3.out"
    })
  }, [])

  return (
    <div className="bg-[#0b0b0c] text-white relative"> 
       <div className="start fixed top-0 w-full left-0 min-h-screen bg-black flex z-50 justify-center items-center">
        <h1 className="beginning text-white text-xl opacity-0 md:text-xl lg:text-4xl">
          {title.split("").map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </h1>
      </div> 

      {/* FULL BACKGROUND CHAT (BLUR) */}
      <div
        ref={reference}
        onMouseEnter={() => hoverTl.current.play()}
        onMouseLeave={() => hoverTl.current.reverse()}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="w-full max-w-4xl opacity-60 blur-sm">
          <div className="space-y-6 text-left">
            <div className="bg-white/10 p-4 rounded-xl w-fit">Hey bro, room bana liya?</div>
            <div className="bg-emerald-500/20 p-4 rounded-xl w-fit ml-auto">Haan, join code bhej raha 🔥</div>
            <div className="bg-white/10 p-4 rounded-xl w-fit">Smooth lag raha 👌</div>
          </div>
        </div>
      </div>

      {/* HERO CONTENT (ABOVE) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <p className="heading text-xs tracking-[0.4em] text-gray-500 mb-6 opacity-0">
          REAL-TIME CHAT PLATFORM
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight max-w-3xl">
          Connect instantly with
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-green-300 title">
            {title.split("").map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-xl">
          Minimal, fast and distraction-free chat built for seamless real-time communication.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">

          <Link to="/signin">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:scale-105 transition">
              Get Started
            </button>
          </Link>

          <Link to="/learnmore">
            <button className="px-8 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">
              Learn More
            </button>
          </Link>

        </div>

      </section>
        <h1 className="flex justify-center text-5xl font-roboto">Some of Our features</h1>

      {/* FEATURES */}
      <section className="features relative z-10 py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


        {features.map((f, i) => (
          <div key={i} className="description one p-6 rounded-2xl bg-white/5 border border-white/10 hover:scale-110 hover:border-emerald-400/40 transition">
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}

      </section>

    </div>
  )
}
