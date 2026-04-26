export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-xl px-4 md:px-8">
      <div className="lg:hidden h-10 w-10" />
      <div className="text-sm text-[var(--muted-foreground)] hidden md:block">
        Admin Control Panel
      </div>
      <div className="flex items-center gap-2" />
    </header>
  );
}
