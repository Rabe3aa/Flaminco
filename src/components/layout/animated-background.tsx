// Static decorative background. Previously this morphed 4 SVG paths via an
// infinite Framer Motion animation, which ran continuously and drained mobile
// CPU (causing jank across the whole page). It's purely decorative, so it is
// now rendered statically — no JS, no per-frame work.
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-brand-bg">
      {/* Refined Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(#949599 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 10%, transparent 80%)'
        }}
      />

      {/* Subtle Glow Ambient Lighting */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-primary/5 rounded-full blur-[120px] mix-blend-multiply" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-brand-neutral/5 rounded-full blur-[120px] mix-blend-multiply" />

      {/* Elegant Wavy Lines SVG (static) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400C240 300 480 300 720 400C960 500 1200 500 1440 400"
            stroke="#0072BB"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M0 450C240 350 480 350 720 450C960 550 1200 550 1440 450"
            stroke="#949599"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M-200 600C200 800 600 200 1000 600S1600 800 2000 600"
            stroke="#0072BB"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M-200 200C200 100 600 500 1000 200S1600 100 2000 200"
            stroke="#949599"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
