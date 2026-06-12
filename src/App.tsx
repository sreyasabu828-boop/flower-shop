import { useState, useEffect } from 'react';
import { Flower, CartItem, Order } from './types';
import { INITIAL_FLOWERS } from './data';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import BoutiqueView from './components/BoutiqueView';
import SearchView from './components/SearchView';
import AddInventoryView from './components/AddInventoryView';
import DetailView from './components/DetailView';
import OrdersView from './components/OrdersView';

export default function App() {
  // Flowers catalog state
  const [flowers, setFlowers] = useState<Flower[]>(() => {
    try {
      const saved = localStorage.getItem('digital_conservatory_flowers');
      return saved ? JSON.parse(saved) : INITIAL_FLOWERS;
    } catch {
      return INITIAL_FLOWERS;
    }
  });

  // Shopping Bag Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('digital_conservatory_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Placed delivery orders logs state
  const [placedOrders, setPlacedOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('digital_conservatory_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState<'boutique' | 'search' | 'add' | 'orders' | 'detail'>('boutique');
  const [selectedProduct, setSelectedProduct] = useState<Flower | null>(null);

  // Sync to local storage on adjustments
  useEffect(() => {
    localStorage.setItem('digital_conservatory_flowers', JSON.stringify(flowers));
  }, [flowers]);

  useEffect(() => {
    localStorage.setItem('digital_conservatory_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('digital_conservatory_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  // Navigate selection
  const handleTabChange = (tab: 'boutique' | 'search' | 'add' | 'orders') => {
    setActiveTab(tab);
    if (tab !== 'boutique') {
      setSelectedProduct(null);
    }
  };

  const handleProductSelect = (flower: Flower) => {
    setSelectedProduct(flower);
    setActiveTab('detail');
  };

  // Add Item actions
  const handleAddToCart = (flower: Flower, selectedColor: string) => {
    setCart((prevCart) => {
      // Check if item with exact color selection exists
      const existingIdx = prevCart.findIndex(
        (item) => item.flower.id === flower.id && item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      } else {
        return [...prevCart, { flower, quantity: 1, selectedColor }];
      }
    });
  };

  const handleAddToCartDirect = (flower: Flower) => {
    // Pick first color as default
    const color = flower.colors[0] || '#FFFFFF';
    handleAddToCart(flower, color);
    
    // Quick notification feel by briefly bouncing the header shopping bag count
    const cartBtn = document.getElementById('cart-toggle-btn');
    if (cartBtn) {
      cartBtn.classList.add('scale-125', 'text-[#7b5455]');
      setTimeout(() => {
        cartBtn.classList.remove('scale-125', 'text-[#7b5455]');
      }, 300);
    }
  };

  // Remove or update cart quantites
  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      const nextQty = nextCart[index].quantity + delta;
      
      if (nextQty <= 0) {
        nextCart.splice(index, 1);
      } else {
        nextCart[index].quantity = nextQty;
      }
      return nextCart;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      nextCart.splice(index, 1);
      return nextCart;
    });
  };

  // Place custom delivery orders
  const handleCheckout = (customerName: string, address: string) => {
    if (cart.length === 0) return;

    const cartSubtotal = cart.reduce((acc, item) => acc + (item.flower.price * item.quantity), 0);
    const deliverySurcharge = cartSubtotal > 100 ? 0.00 : 15.00;
    const finalBillTotal = cartSubtotal + deliverySurcharge;

    const newOrder: Order = {
      id: 'BOT-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: finalBillTotal,
      status: 'Processing',
      customerName,
      address
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear shopping bag
  };

  // Add new flower specimen
  const handleAddFlower = (newFlower: Flower) => {
    setFlowers((prev) => [newFlower, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans flex flex-col selection:bg-[#436444]/10 selection:text-[#436444]">
      {/* Global Brand Navigation Header */}
      <TopAppBar 
        onCartClick={() => setActiveTab('orders')} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />

      {/* Main Content Stage */}
      <div className="flex-grow pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
        {activeTab === 'boutique' && (
          <BoutiqueView 
            flowers={flowers} 
            onProductSelect={handleProductSelect} 
            onAddToCartDirect={handleAddToCartDirect} 
          />
        )}

        {activeTab === 'search' && (
          <SearchView 
            flowers={flowers} 
            onProductSelect={handleProductSelect} 
            onAddToCartDirect={handleAddToCartDirect} 
          />
        )}

        {activeTab === 'add' && (
          <AddInventoryView 
            onAddFlower={handleAddFlower} 
            onSuccessRedirect={() => setActiveTab('boutique')} 
          />
        )}

        {activeTab === 'detail' && selectedProduct && (
          <DetailView 
            flower={selectedProduct} 
            onBack={() => setActiveTab('boutique')} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {activeTab === 'orders' && (
          <OrdersView 
            cart={cart}
            placedOrders={placedOrders}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveCartItem={handleRemoveCartItem}
            onCheckout={handleCheckout}
          />
        )}
      </div>

      {/* Persistent Bottom Bar Buttons */}
      <BottomNavBar currentTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
