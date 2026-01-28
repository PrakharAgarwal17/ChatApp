export default function AboutUs() {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden px-6 py-24">
      {/* ambient glows */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs tracking-widest uppercase text-blue-400/80 mb-3">About us</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Building products that actually matter
          </h1>
          <p className="mt-4 text-gray-400">
            We design and build clean, fast, and scalable digital experiences with a sharp focus on quality.
          </p>
        </div>

        {/* content grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-white">Who we are</h2>
            <p className="text-gray-400 leading-relaxed">
              We’re a small team of developers and designers obsessed with performance, usability, and modern UI.
              No fluff, no overengineering — just solid engineering and thoughtful design.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Every product we ship is crafted with attention to detail, scalability, and long-term maintainability.
            </p>
          </div>

          {/* right card */}
          <div className="rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-semibold text-white">10+</p>
                <p className="text-sm text-gray-400 mt-1">Projects shipped</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">2+</p>
                <p className="text-sm text-gray-400 mt-1">Years experience</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">100%</p>
                <p className="text-sm text-gray-400 mt-1">Client focus</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">24/7</p>
                <p className="text-sm text-gray-400 mt-1">Support mindset</p>
              </div>
            </div>
          </div>
        </div>

        {/* values */}
        <div className="mt-24">
          <h2 className="text-2xl font-medium text-white text-center">Our values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-8">
              <h3 className="text-lg font-medium text-white">Clarity</h3>
              <p className="mt-2 text-gray-400 text-sm">
                Clear decisions, clean code, and simple user experiences.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-8">
              <h3 className="text-lg font-medium text-white">Quality</h3>
              <p className="mt-2 text-gray-400 text-sm">
                We don’t ship half-baked products. Details matter.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-8">
              <h3 className="text-lg font-medium text-white">Ownership</h3>
              <p className="mt-2 text-gray-400 text-sm">
                We take responsibility from idea to execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
