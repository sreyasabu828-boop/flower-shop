import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Flower } from '../types';
import { Save, Plus, AlertCircle, Sparkles, Check, Loader2 } from 'lucide-react';
import { PRESET_FLOWERS_IMAGES } from '../data';

interface AddInventoryViewProps {
  onAddFlower: (flower: Flower) => void;
  onSuccessRedirect: () => void;
}

const PRESET_COLORS = [
  { name: 'Red', hex: '#D32F2F' },
  { name: 'Yellow', hex: '#FBC02D' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Pink', hex: '#F06292' },
  { name: 'Lavender', hex: '#9575CD' }
];

export default function AddInventoryView({ onAddFlower, onSuccessRedirect }: AddInventoryViewProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Sympathy' | 'Romance' | 'Celebration' | 'Housewarming'>('Romance');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  // Custom image options
  const [imageType, setImageType] = useState<'preset' | 'url'>('preset');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(PRESET_FLOWERS_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  // States for interaction
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle color selection
  const handleColorToggle = (colorHex: string) => {
    if (selectedColors.includes(colorHex)) {
      setSelectedColors(selectedColors.filter(c => c !== colorHex));
    } else {
      setSelectedColors([...selectedColors, colorHex]);
    }
  };

  // Convert uploaded file to base64
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
        setImageType('url'); // Switch type to custom URL pathway but loaded locally
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter a flower name.');
      setStatus('error');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMessage('Please enter a valid price greater than $0.');
      setStatus('error');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Please provide a description.');
      setStatus('error');
      return;
    }

    if (selectedColors.length === 0) {
      setErrorMessage('Please select at least one color option.');
      setStatus('error');
      return;
    }

    setStatus('processing');
    setErrorMessage('');

    // Determine final image URL
    let finalImageUrl = selectedPresetUrl;
    if (imageType === 'url') {
      if (fileBase64) {
        finalImageUrl = fileBase64;
      } else if (customImageUrl.trim()) {
        finalImageUrl = customImageUrl.trim();
      } else {
        // Fallback to random picsum
        finalImageUrl = 'https://picsum.photos/seed/' + encodeURIComponent(name) + '/600/800';
      }
    }

    // Auto generate tag line if empty
    const colorNamesSelected = PRESET_COLORS.filter(c => selectedColors.includes(c.hex)).map(c => c.name);
    const finalTags = tags.trim() || colorNamesSelected.join(' & ');

    const newFlower: Flower = {
      id: 'custom-' + Date.now(),
      name,
      price: priceNum,
      tags: finalTags,
      description,
      image: finalImageUrl,
      colors: selectedColors,
      colorNames: colorNamesSelected,
      category,
      isCustom: true
    };

    setTimeout(() => {
      onAddFlower(newFlower);
      setStatus('success');
      
      // Redirect after success state
      setTimeout(() => {
        onSuccessRedirect();
      }, 1500);
    }, 1200);
  };

  return (
    <main className="max-w-2xl mx-auto pb-12 animate-fade-in text-[#1b1c1c]">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1b1c1c] mb-1 font-semibold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          New Inventory
        </h2>
        <p className="text-[#424841] text-sm md:text-base">
          Add a new botanical specimen to the boutique catalogue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-[#efeded] shadow-inner-lg">
        
        {/* Error Panel */}
        {status === 'error' && (
          <div className="flex items-center gap-3 bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Dynamic Image Selection Component */}
        <div className="space-y-3">
          <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block">
            Floral Imagery Selection
          </label>
          
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-4">
            <button
              type="button"
              onClick={() => { setImageType('preset'); setFileBase64(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                imageType === 'preset' ? 'bg-[#436444] text-white shadow-xs' : 'text-[#424841] hover:bg-gray-200'
              }`}
            >
              Choose Boutique Preset
            </button>
            <button
              type="button"
              onClick={() => setImageType('url')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                imageType === 'url' ? 'bg-[#436444] text-white shadow-xs' : 'text-[#424841] hover:bg-gray-200'
              }`}
            >
              Custom File / URL
            </button>
          </div>

          {/* Preset Images Scroll Box */}
          {imageType === 'preset' ? (
            <div className="space-y-3">
              <span className="text-xs text-gray-500 block">Select a curated conservatory layout:</span>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_FLOWERS_IMAGES.map((preset) => {
                  const isSelected = selectedPresetUrl === preset.url;
                  return (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setSelectedPresetUrl(preset.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-[#436444] scale-105 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={preset.url} 
                        alt={preset.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#436444]/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white bg-[#436444] rounded-full p-0.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* File Upload Option */}
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold hover:border-[#436444] hover:text-[#436444] transition-all cursor-pointer bg-gray-50"
                >
                  {fileBase64 ? '✓ Image Loaded' : 'Upload Floral File'}
                </button>
                <span className="text-xs text-gray-500">or paste a custom image URL:</span>
              </div>

              <input
                type="text"
                placeholder="https://images.unsplash.com/... or leave empty for dynamic generated layout"
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                  setFileBase64(null); // URL takes priority
                }}
                className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 text-sm placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Combined Image Design Preview */}
          <div className="relative aspect-[4/3] w-full rounded-xl bg-[#efeded] overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-[#c2c8be] mt-4">
            {imageType === 'preset' ? (
              <img
                src={selectedPresetUrl}
                alt="Selected preset"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : fileBase64 ? (
              <img
                src={fileBase64}
                alt="Custom file"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : customImageUrl.trim() ? (
              <img
                src={customImageUrl}
                alt="Custom url preview"
                className="w-full h-full object-cover"
                onError={() => console.log('bad preview')}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-6 pointer-events-none">
                <Sparkles className="w-8 h-8 text-[#737970] mx-auto mb-2" />
                <p className="font-semibold text-xs text-[#424841]">Upload / Input Floral Imagery</p>
                <p className="text-[11px] text-gray-400 mt-1">Preset choice will be used as background if blank</p>
              </div>
            )}
          </div>
        </div>

        {/* Flower Name Input */}
        <div className="space-y-1">
          <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block" htmlFor="flowerName">
            Flower Arrangement Name
          </label>
          <input
            id="flowerName"
            type="text"
            placeholder="e.g. Heirloom English Rose"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 font-medium"
            required
          />
        </div>

        {/* Price & Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block" htmlFor="flowerPrice">
              Price per Stem / Arrangement (USD)
            </label>
            <input
              id="flowerPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block" htmlFor="flowerCategory">
              Conservatory Theme / Category
            </label>
            <select
              id="flowerCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 text-sm font-semibold text-[#436444]"
            >
              <option value="Romance">Romance & Passion</option>
              <option value="Sympathy">Sympathy & Serenity</option>
              <option value="Celebration">Celebration & Joy</option>
              <option value="Housewarming">Housewarming & Cheer</option>
            </select>
          </div>
        </div>

        {/* Tagline custom info */}
        <div className="space-y-1">
          <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block" htmlFor="flowerTags">
            Color Pairing / Tagline (Optional)
          </label>
          <input
            id="flowerTags"
            type="text"
            placeholder="e.g. Dusty Pink & Cream (Auto-generated if empty)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block" htmlFor="flowerDescription">
            Description / Botanical Pedigree
          </label>
          <textarea
            id="flowerDescription"
            rows={4}
            placeholder="Describe the fragrance, bloom cycle, care instructions, and organic background..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent border-b border-[#c2c8be] focus:border-[#436444] outline-hidden focus:ring-0 transition-colors py-2 text-sm resize-none"
            required
          />
        </div>

        {/* Multi-select Colors */}
        <div className="space-y-3">
          <label className="text-xs uppercase text-[#424841] tracking-wider font-bold block">
            Available Colors
          </label>
          <div className="flex flex-wrap gap-2.5">
            {PRESET_COLORS.map((color) => {
              const isSelected = selectedColors.includes(color.hex);
              return (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => handleColorToggle(color.hex)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#436444] bg-[#c6edc4]'
                      : 'border-gray-200 bg-gray-50 text-[#1b1c1c] opacity-80 hover:opacity-100'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button with interactive states */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={status === 'processing' || status === 'success'}
            className={`w-full text-white font-semibold text-lg py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              status === 'success'
                ? 'bg-emerald-600 shadow-emerald-100'
                : status === 'processing'
                ? 'bg-[#436444]/60 cursor-not-allowed'
                : 'bg-[#436444] hover:bg-[#2e4e30] active:scale-[0.98]'
            }`}
          >
            {status === 'success' ? (
              <>
                <Check className="w-5 h-5 animate-scale-up" />
                Saved to Inventory!
              </>
            ) : status === 'processing' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Specimen...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Flower
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
