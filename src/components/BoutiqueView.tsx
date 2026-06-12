import { useState } from 'react';
import { Flower } from '../types';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BoutiqueViewProps {
  flowers: Flower[];
  onProductSelect: (flower: Flower) => void;
  onAddToCartDirect: (flower: Flower) => void;
}

const CATEGORIES = ['All', 'Sympathy', 'Romance', 'Celebration', 'Housewarming'];

export default function BoutiqueView({ flowers, onProductSelect, onAddToCartDirect }: BoutiqueViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter logic
  const filteredFlowers = selectedCategory === 'All'
    ? flowers
    : flowers.filter(f => f.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="animate-fade-in pb-12">
      {/* Hero Branding */}
      <section className="mb-8 text-center md:text-left py-6">
        <motion.h2 
          className="text-4xl md:text-5xl text-[#1b1c1c] mb-3 italic tracking-tight font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Seasonal Curations
        </motion.h2>
        <motion.p 
          className="text-lg text-[#424841] max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hand-picked botanical treasures, arranged by master florists to evoke the tranquility of a private garden.
        </motion.p>
      </section>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
        {CATEGORIES.map((cat, idx) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#436444] text-[#ffffff] shadow-sm transform scale-105'
                  : 'bg-[#fecbcb]/40 text-[#7a5354] hover:bg-[#7b5455] hover:text-white'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {cat === 'All' ? 'All Florals' : cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredFlowers.map((flower, idx) => (
            <motion.article
              layout
              key={flower.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(107,142,107,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
            >
              {/* Image box */}
              <div 
                onClick={() => onProductSelect(flower)}
                className="aspect-[4/5] overflow-hidden bg-[#e4e2e2] cursor-pointer relative"
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  src={flower.image}
                  alt={flower.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#ffffff]/95 px-3 py-1 rounded-full text-[11px] font-semibold text-[#436444] tracking-wider uppercase backdrop-blur-xs">
                  {flower.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex flex-col flex-grow">
                <div 
                  onClick={() => onProductSelect(flower)}
                  className="flex justify-between items-start mb-2 cursor-pointer"
                >
                  <h3 
                    className="text-xl md:text-2xl font-serif text-[#1b1c1c] tracking-tight group-hover:text-[#436444] transition-colors"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    {flower.name}
                  </h3>
                  <span className="text-base font-bold text-[#436444] font-sans">
                    ${flower.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-[#424841]/80 uppercase tracking-wider mb-4 font-semibold">
                  {flower.tags}
                </p>

                {/* Colors dots & Direct cart button */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                  <div className="flex gap-1.5 items-center">
                    {flower.colors.map((color, cIdx) => (
                      <span
                        key={color}
                        className="w-4 h-4 rounded-full border border-[#c2c8be] shadow-inner shrink-0"
                        style={{ backgroundColor: color }}
                        title={flower.colorNames?.[cIdx] || 'Color Option'}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => onAddToCartDirect(flower)}
                    className="p-2.5 bg-[#436444]/10 hover:bg-[#436444] text-[#436444] hover:text-white rounded-full transition-all duration-300 cursor-pointer active:scale-95"
                    title="Directly Add to Cart"
                    id={`add-direct-btn-${flower.id}`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
