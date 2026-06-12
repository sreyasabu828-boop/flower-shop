import { useState } from 'react';
import { Flower } from '../types';
import { ArrowLeft, Check, Sparkles, ShoppingBag, Leaf, HelpCircle, Shield, Sparkle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface DetailViewProps {
  flower: Flower;
  onBack: () => void;
  onAddToCart: (flower: Flower, selectedColor: string) => void;
}

export default function DetailView({ flower, onBack, onAddToCart }: DetailViewProps) {
  const [selectedColor, setSelectedColor] = useState<string>(flower.colors[0] || '#436444');
  const [addingToCartState, setAddingToCartState] = useState<'idle' | 'adding' | 'added'>('idle');

  // Find English Name for the selected HEX
  const getSelectedColorName = () => {
    const idx = flower.colors.indexOf(selectedColor);
    return flower.colorNames?.[idx] || 'Curated Shade';
  };

  const handleAddToCartClick = () => {
    setAddingToCartState('adding');
    setTimeout(() => {
      onAddToCart(flower, selectedColor);
      setAddingToCartState('added');
      setTimeout(() => {
        setAddingToCartState('idle');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in text-[#1b1c1c]">
      {/* Back Header navigation inline */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-[#436444] font-medium hover:opacity-80 transition-opacity cursor-pointer group"
        id="detail-back-button"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-sans font-semibold tracking-wider uppercase">Back to Boutique</span>
      </button>

      {/* Main layout */}
      <div className="bg-white rounded-3xl overflow-hidden border border-[#efeded] shadow-inner-lg">
        {/* Cover visual banner aspect portrait to land perfectly */}
        <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-[#e4e2e2]">
          <img 
            className="w-full h-full object-cover"
            src={flower.image}
            alt={flower.name}
            referrerPolicy="no-referrer"
          />
          
          {/* Glass floating card overlay for botanical luxury */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="backdrop-blur-md bg-white/75 p-6 rounded-2xl shadow-lg border border-white/30 inline-block max-w-sm md:max-w-md animate-fade-in-up">
              <span className="text-xs font-bold text-[#436444] uppercase tracking-widest mb-1.5 block">
                Exquisite Selection
              </span>
              <h2 className="text-3xl font-serif text-[#1b1c1c] font-semibold mb-1 leading-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {flower.name}
              </h2>
              <p className="text-xl font-sans font-bold text-[#436444]">
                ${flower.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Contents */}
        <div className="p-6 md:p-8 space-y-10">
          
          {/* Color Selection Hue */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#424841] uppercase tracking-widest">
              Select Hue
            </h4>
            <div className="flex flex-wrap gap-4 items-center">
              {flower.colors.map((color, idx) => {
                const isSelected = selectedColor === color;
                const nameOption = flower.colorNames?.[idx] || 'Aesthetic';
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="flex flex-col items-center gap-2 focus:outline-hidden group cursor-pointer"
                    id={`hue-btn-${idx}`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full border-4 border-white shadow-md transition-all duration-300 relative ${
                        isSelected 
                          ? 'ring-2 ring-[#436444] scale-110 shadow-lg' 
                          : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {isSelected && (
                        <span className="absolute inset-x-0 bottom-0 top-0 m-auto w-4 h-4 bg-[#436444] text-white rounded-full flex items-center justify-center p-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-sans transition-all tracking-wide ${
                      isSelected ? 'text-[#436444] font-bold' : 'text-gray-500'
                    }`}>
                      {nameOption}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Left page: The Story */}
            <div className="space-y-4">
              <h3 
                className="text-2xl font-serif text-[#1b1c1c]"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                The Story
              </h3>
              <div className="text-[#424841] text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {flower.description}
              </div>
            </div>

            {/* Right page: Highlight cards */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#424841] uppercase tracking-widest mb-4">
                  Conservatory Hallmarks
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col items-center text-center space-y-2 border border-stone-100">
                    <Leaf className="w-5 h-5 text-[#436444]" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#424841]">Sustainable</span>
                    <span className="text-[10px] text-gray-400">100% Organically Farmed</span>
                  </div>

                  <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col items-center text-center space-y-2 border border-stone-100">
                    <Sparkles className="w-5 h-5 text-[#436444]" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#424841]">Same Day</span>
                    <span className="text-[10px] text-gray-400">Locally Crafted & Shipped</span>
                  </div>

                  <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col items-center text-center space-y-2 border border-stone-100">
                    <Shield className="w-5 h-5 text-[#436444]" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#424841]">Stay Fresh</span>
                    <span className="text-[10px] text-gray-400">7-Day Botanical Shield</span>
                  </div>

                  <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col items-center text-center space-y-2 border border-stone-100">
                    <ShoppingBag className="w-5 h-5 text-[#436444]" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#424841]">Gift Box</span>
                    <span className="text-[10px] text-gray-400">Classic Linen Dressing</span>
                  </div>
                </div>
              </div>

              {/* Action Area CTA */}
              <div className="pt-6 border-t border-[#efeded]">
                <button
                  onClick={handleAddToCartClick}
                  disabled={addingToCartState !== 'idle'}
                  className={`w-full h-14 rounded-full font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    addingToCartState === 'added'
                      ? 'bg-[#5b7d5b] text-white shadow-sm'
                      : addingToCartState === 'adding'
                      ? 'bg-[#436444]/60 text-white cursor-not-allowed'
                      : 'bg-[#436444] text-white hover:bg-[#2e4e30] active:scale-95 shadow-md shadow-gray-100'
                  }`}
                  id="add-to-cart-cta-button"
                >
                  {addingToCartState === 'added' ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added into Bag
                    </>
                  ) : addingToCartState === 'adding' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Securing Arrangement...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart — ${(flower.price).toFixed(2)}
                    </>
                  )}
                </button>
                
                <p className="text-center font-sans text-xs italic text-gray-500 mt-4 leading-normal">
                  Includes complementary premium floral nutrients, a glass envelope with custom gold-foil botanical stationery, and temperature-controlled shipping box.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
