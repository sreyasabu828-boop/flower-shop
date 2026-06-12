import { Flower, Search, PlusCircle, Receipt } from 'lucide-react';

interface BottomNavBarProps {
  currentTab: 'boutique' | 'search' | 'add' | 'orders' | 'detail';
  onTabChange: (tab: 'boutique' | 'search' | 'add' | 'orders') => void;
}

export default function BottomNavBar({ currentTab, onTabChange }: BottomNavBarProps) {
  // Map "detail" to "boutique font active" visually
  const activeTabClass = (tab: string) => {
    const isActive = currentTab === tab || (tab === 'boutique' && currentTab === 'detail');
    if (isActive) {
      return "flex flex-col items-center justify-center bg-[#5b7d5b] text-[#f7fff2] rounded-full px-5 py-1.5 transition-all scale-105 shadow-sm cursor-pointer";
    }
    return "flex flex-col items-center justify-center text-[#424841] p-2 hover:bg-[#e4e2e2]/50 rounded-full transition-all active:scale-90 duration-150 cursor-pointer";
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#efeded] shadow-[0_-4px_12px_rgba(107,142,107,0.06)] rounded-t-2xl max-w-7xl mx-auto"
      id="bottom-navigation-bar"
    >
      {/* Boutique */}
      <button 
        onClick={() => onTabChange('boutique')}
        className={activeTabClass('boutique')}
        id="nav-tab-boutique"
        title="Boutique"
      >
        <Flower className="w-5 h-5 mb-0.5" />
        <span className="font-sans text-[11px] font-semibold tracking-wider">Boutique</span>
      </button>

      {/* Search */}
      <button 
        onClick={() => onTabChange('search')}
        className={activeTabClass('search')}
        id="nav-tab-search"
        title="Search"
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span className="font-sans text-[11px] font-semibold tracking-wider">Search</span>
      </button>

      {/* Add */}
      <button 
        onClick={() => onTabChange('add')}
        className={activeTabClass('add')}
        id="nav-tab-add"
        title="Add Specimen"
      >
        <PlusCircle className="w-5 h-5 mb-0.5" />
        <span className="font-sans text-[11px] font-semibold tracking-wider">Add</span>
      </button>

      {/* Orders */}
      <button 
        onClick={() => onTabChange('orders')}
        className={activeTabClass('orders')}
        id="nav-tab-orders"
        title="My Orders"
      >
        <Receipt className="w-5 h-5 mb-0.5" />
        <span className="font-sans text-[11px] font-semibold tracking-wider">Orders</span>
      </button>
    </nav>
  );
}
