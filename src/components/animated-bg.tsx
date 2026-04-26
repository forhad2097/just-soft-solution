export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--primary)_45%,_transparent),_transparent)] blur-3xl animate-aurora" />
      <div className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--accent-2)_40%,_transparent),_transparent)] blur-3xl animate-aurora-2" />
      <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--accent)_40%,_transparent),_transparent)] blur-3xl animate-aurora" />
    </div>
  );
}
