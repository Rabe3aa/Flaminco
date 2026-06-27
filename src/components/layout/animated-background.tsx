// Static decorative background.
//
// Previously this used two `blur-[120px]` circles, which force the browser to
// allocate very large offscreen GPU buffers. On a fixed, full-screen layer
// present on every page, that was enough to exhaust GPU memory on phones and
// crash the tab ("can't open this page"). The glows are now plain radial
// gradients — visually similar, but essentially free (no filter, no per-frame
// work).
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-brand-bg">
      {/* Soft ambient glows (gradients, no blur filter) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(45vw 45vw at 88% -5%, rgba(0, 114, 187, 0.06), transparent 70%),
            radial-gradient(55vw 55vw at 5% 105%, rgba(148, 149, 153, 0.06), transparent 70%)
          `,
        }}
      />

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
