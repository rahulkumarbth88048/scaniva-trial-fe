export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-4 border-b">

      {/* Logo */}
      <div className="text-2xl font-bold">
        Scaniva Smart Trial Room
      </div>

      {/* Navigation */}
      {/*<nav className="flex gap-8 text-sm font-medium">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">New Arrivals</a>
        <a href="#">Sale</a>
      </nav>*/}

      {/* Icons */}
      <div className="flex gap-6 text-xl">
        <span>🔍︎</span>
        <span>👤</span>
        <span>🛒</span>
      </div>

    </header>
  );
}