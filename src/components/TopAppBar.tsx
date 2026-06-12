import { Menu, ShoppingBag } from 'lucide-react';

interface TopAppBarProps {
  onCartClick: () => void;
  cartCount: number;
}

export default function TopAppBar({ onCartClick, cartCount }: TopAppBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f8] border-b border-[#efeded] flex justify-between items-center px-6 h-16 max-w-7xl mx-auto">
      <button 
        className="hover:opacity-80 transition-opacity active:scale-95 duration-200 text-[#436444] p-1 rounded-full cursor-pointer"
        id="menu-btn"
        title="Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 
        className="font-headline font-semibold text-xl md:text-2xl text-[#436444] cursor-pointer tracking-tight"
        id="app-logo"
        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
      >
        Digital Conservatory
      </h1>

      <button 
        onClick={onCartClick}
        className="relative hover:opacity-80 transition-opacity active:scale-95 duration-200 text-[#436444] p-1 rounded-full cursor-pointer"
        id="cart-toggle-btn"
        title="Shopping Bag"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span 
            id="cart-badge-count"
            className="absolute -top-1 -right-1 bg-[#7b5455] text-white font-sans text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce"
          >
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
