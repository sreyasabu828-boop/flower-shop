import { useState } from 'react';
import { Flower } from '../types';
import { Search, SlidersHorizontal, Heart, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchViewProps {
  flowers: Flower[];
  onProductSelect: (flower: Flower) => void;
  onAddToCartDirect: (flower: Flower) => void;
}

const COLOR_FILTERS = [
  { name: 'Red', hex: '#D32F2F', matchHexes: ['#D32F2F', '#800020', '#7B5455'] },
  { name: 'Yellow', hex: '#FBC02D', matchHexes: ['#FBC02D', '#FFD700', '#FFF44F'] },
  { name: 'White', hex: '#FFFFFF', matchHexes: ['#FFFFFF', '#FFFDF9', '#stone-50'] },
  { name: 'Pink', hex: '#F06292', matchHexes: ['#F06292', '#F5E6E8', '#FFCC99', '#F5C2C1'] },
  { name: 'Lavender', hex: '#9575CD', matchHexes: ['#9575CD', '#E6E6FA'] }
];

export default function SearchView({ flowers, onProductSelect, onAddToCartDirect }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter pipeline
  const filtered = flowers.filter(flower => {
    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      flower.name.toLowerCase().includes(query) || 
      flower.tags.toLowerCase().includes(query) ||
      flower.description.toLowerCase().includes(query);

    // Price query match
    const matchesPrice = flower.price <= maxPrice;

    // Color match 
    let matchesColor = true;
    if (selectedColorFilter) {
      const activeFilterObj = COLOR_FILTERS.find(f => f.name === selectedColorFilter);
      if (activeFilterObj) {
        // check if any of the flower's colors falls in the filter's match hex list, 
        // or check if selectedColorFilter name is present in colorNames
        const flowerColorNamesLower = flower.colorNames?.map(n => n.toLowerCase()) || [];
        const isNameMatched = flowerColorNamesLower.includes(selectedColorFilter.toLowerCase()) || 
          flowerColorNamesLower.some(n => n.includes(selectedColorFilter.toLowerCase()));
        
        const isHexMatched = flower.colors.some(c => 
          activeFilterObj.matchHexes.some(mh => mh.toLowerCase() === c.toLowerCase() || c.toLowerCase().includes(mh.toLowerCase()))
        );

        matchesColor = isNameMatched || isHexMatched;
      }
    }

    return matchesSearch && matchesPrice && matchesColor;
  });

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in text-[#1b1c1c]">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1b1c1c] mb-1 font-semibold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Botanical Search
        </h2>
        <p className="text-[#424841] text-sm md:text-base">
          Find your dream bouquet or filter by shade, price level, and theme.
        </p>
      </div>

      {/* Inputs box */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Heirloom Roses, Lilies, Sweet Peas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#efeded] focus:border-[#436444] rounded-full py-3.5 pl-12 pr-4 text-sm font-sans focus:ring-0 outline-hidden tracking-wide shadow-xs"
              id="search-input-field"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 rounded-full border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              showFilters || selectedColorFilter || maxPrice < 150
                ? 'bg-[#c6edc4]/40 border-[#436444] text-[#436444]'
                : 'bg-white border-gray-200 text-gray-500'
            }`}
            title="Toggle advanced filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Filters</span>
          </button>
        </div>

        {/* Advanced Filters box */}
        <AnimatePresence>
          {(showFilters || selectedColorFilter || maxPrice < 150) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-5 overflow-hidden text-sm"
            >
              {/* Filter color circles */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[#424841] uppercase tracking-wider">
                  <span>Filter by Shade Hue</span>
                  {selectedColorFilter && (
                    <button 
                      onClick={() => setSelectedColorFilter(null)}
                      className="text-red-500 hover:underline cursor-pointer lowercase"
                    >
                      clear shade
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_FILTERS.map((shade) => {
                    const isSelected = selectedColorFilter === shade.name;
                    return (
                      <button
                        key={shade.name}
                        type="button"
                        onClick={() => setSelectedColorFilter(isSelected ? null : shade.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#436444] text-white border-[#436444]'
                            : 'bg-stone-50 border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
                          style={{ backgroundColor: shade.hex }}
                        />
                        {shade.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#424841] uppercase tracking-wider">
                  <span>Maximum Budget</span>
                  <span className="text-[#436444] font-mono font-bold">${maxPrice} USD</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#436444] cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search results banner */}
      <div className="my-6 text-xs text-gray-500 font-semibold uppercase tracking-widest">
        Showing {filtered.length} botanical arrangement{filtered.length !== 1 && 's'}
      </div>

      {/* Grid view */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((flower) => (
            <motion.div
              layout
              key={flower.id}
              onClick={() => onProductSelect(flower)}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 flex gap-4 p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-lg overflow-hidden relative bg-gray-100">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col justify-between py-1 flex-grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif font-semibold text-lg text-[#1b1c1c] group-hover:text-[#436444] transition-colors leading-tight">
                      {flower.name}
                    </h3>
                    <span className="font-bold text-sm text-[#436444] shrink-0 ml-2">
                      ${flower.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    {flower.category} · {flower.tags}
                  </span>
                  <p className="text-xs text-[#424841] mt-2 line-clamp-2 leading-relaxed">
                    {flower.description}
                  </p>
                </div>

                <div className="flex gap-1 items-center mt-2">
                  {flower.colors.map((color) => (
                    <span 
                      key={color} 
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mt-6">
          <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-500 text-sm">No botanical specimens matched your exact query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedColorFilter(null);
              setMaxPrice(150);
            }}
            className="text-xs text-[#436444] font-bold underline mt-2 cursor-pointer hover:opacity-80 block mx-auto"
          >
            Clear searching states
          </button>
        </div>
      )}
    </div>
  );
}
