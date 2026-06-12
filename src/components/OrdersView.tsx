import { useState, FormEvent } from 'react';
import { CartItem, Order } from '../types';
import { ShoppingBag, ChevronRight, MapPin, Tag, Heart, Trash2, Calendar, FileText, CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';

interface OrdersViewProps {
  cart: CartItem[];
  placedOrders: Order[];
  onUpdateCartQuantity: (index: number, delta: number) => void;
  onRemoveCartItem: (index: number) => void;
  onCheckout: (customerName: string, address: string) => void;
}

export default function OrdersView({
  cart,
  placedOrders,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onCheckout
}: OrdersViewProps) {
  // Checkout form states
  const [customerName, setCustomerName] = useState('Sreyas Abu');
  const [address, setAddress] = useState('123 Botanical Avenue, Suite 101');
  const [giftNotes, setGiftNotes] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState<'cart' | 'placed_success'>('cart');

  // Compute values
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.flower.price * item.quantity), 0);
  const floralNutrientsFee = cartSubtotal > 0 ? 0.00 : 0; // complementary
  const deliverySurcharge = cartSubtotal > 100 || cartSubtotal === 0 ? 0.00 : 15.00; // free over $100
  const grandTotal = cartSubtotal + floralNutrientsFee + deliverySurcharge;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    onCheckout(customerName, address);
    setCheckoutStatus('placed_success');
    setGiftNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in text-[#1b1c1c]">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1b1c1c] mb-1 font-semibold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Orders & Shopping Bag
        </h2>
        <p className="text-[#424841] text-sm md:text-base">
          Track active boutique delivery stems, fulfill checkout requests, or view past arrangements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Cart & Checkout OR Placed Success Panel */}
        <div className="lg:col-span-7 space-y-6">
          {checkoutStatus === 'placed_success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#c6edc4]/45 border border-[#436444] p-8 rounded-2xl text-center space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-[#436444] mx-auto animate-bounce" />
              <h3 className="text-2xl font-serif font-bold text-[#1b1c1c]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Order Form Placed!
              </h3>
              <p className="text-sm text-[#424841] leading-relaxed max-w-md mx-auto">
                Our master florists have secured your botanical specimens and are currently hand-crafting your custom box arrangement.
              </p>
              <div className="bg-white p-4 rounded-xl text-left border border-stone-100 text-xs space-y-1 inline-block">
                <p><strong>Deliver To:</strong> {customerName}</p>
                <p><strong>Shipping Address:</strong> {address}</p>
                <p><strong>Fulfillment Time:</strong> Within 24 Hours</p>
              </div>
              <div>
                <button
                  onClick={() => setCheckoutStatus('cart')}
                  className="px-6 py-2 bg-[#436444] text-white hover:bg-[#2e4e30] rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Return to Cart View
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Actual Cart list */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <h3 className="font-serif font-bold text-lg" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    Your Selected Stems ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                  {cart.length > 0 && <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Fully Secure</span>}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Your shopping bag is empty.</p>
                    <p className="text-xs text-gray-400 mt-1">Select arrangements from the Boutique to start.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-4 pt-4 first:pt-0 group">
                        <img 
                          src={item.flower.image} 
                          alt={item.flower.name} 
                          className="w-16 h-20 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm text-[#1b1c1c]">{item.flower.name}</h4>
                              <button
                                onClick={() => onRemoveCartItem(index)}
                                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                title="Remove piece"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex gap-2 items-center text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                              <span>Selected Hue:</span>
                              <span 
                                className="w-3 h-3 rounded-full border border-gray-200" 
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-[#436444]">${item.flower.price.toFixed(2)} ea</span>
                            <div className="flex items-center border border-gray-200 rounded-full bg-stone-50 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(index, -1)}
                                className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 font-bold text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2.5 text-xs font-sans font-bold text-gray-800">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(index, 1)}
                                className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 font-bold text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Secure Checkout Form Panel */}
              {cart.length > 0 && (
                <form onSubmit={handleCheckoutSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="font-serif font-bold text-lg" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    Fulfillment & Delivery Details
                  </h3>
                  
                  <div className="space-y-3 text-xs md:text-sm">
                    {/* Customer Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500" htmlFor="custName">
                        Recipient Hand-Delivery Name
                      </label>
                      <input
                        id="custName"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 rounded-lg p-2.5 border border-transparent focus:bg-white focus:border-[#436444] outline-hidden focus:ring-0 font-medium"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500" htmlFor="shipAddr">
                        Stewardship / Delivery Address
                      </label>
                      <input
                        id="shipAddr"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-50 rounded-lg p-2.5 border border-transparent focus:bg-white focus:border-[#436444] outline-hidden focus:ring-0 font-medium"
                        required
                      />
                    </div>

                    {/* Gift note */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500" htmlFor="giftNote">
                        Complementary Card Message (On gold-foil stationery)
                      </label>
                      <textarea
                        id="giftNote"
                        rows={2}
                        value={giftNotes}
                        onChange={(e) => setGiftNotes(e.target.value)}
                        placeholder="e.g. Wishing you tranquil serenity during this special season..."
                        className="w-full bg-slate-50 rounded-lg p-2.5 border border-transparent focus:bg-white focus:border-[#436444] outline-hidden focus:ring-0 resize-none font-medium text-xs placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#436444] text-white hover:bg-[#2e4e30] py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer text-center"
                    >
                      Authorize Florist Assembly — ${grandTotal.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Ledger / Accounting Summary & Past Orders Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Summary receipt details */}
          {cart.length > 0 && (
            <div className="bg-[#f5f3f3] p-5 rounded-2xl border border-gray-100 text-xs space-y-3.5">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-gray-700">Subtotal Sheet</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Fresh Arrangements Selected</span>
                  <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Macro-Nutrient Botanical Food</span>
                  <span className="font-semibold text-emerald-600">Complementary</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Temperature-Controlled Courier</span>
                  <span className="font-semibold">
                    {deliverySurcharge === 0 ? (
                      <span className="text-emerald-600">Free Stewardship</span>
                    ) : (
                      `$${deliverySurcharge.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-sans text-sm font-bold text-[#1b1c1c]">
                <span>Grand Total (USD)</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Past Order Logs */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="font-serif font-bold text-base border-b border-gray-50 pb-2 flex items-center gap-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              <Package className="w-5 h-5 text-[#436444]" />
              Active Delivery Logs ({placedOrders.length})
            </h3>
            
            {placedOrders.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-xs">
                <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                <p>No historic or processing orders logged.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {placedOrders.map((order) => {
                  const itemsCount = order.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <div key={order.id} className="bg-stone-50/50 p-4 rounded-xl border border-stone-100 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-gray-400 text-[10px]">Order ID: {order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'Processing' 
                            ? 'bg-orange-50 text-orange-600' 
                            : order.status === 'Shipped'
                            ? 'bg-[#c6edc4] text-[#2e4e30]'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="text-slate-600 space-y-1">
                        <p><strong>Recipient:</strong> {order.customerName}</p>
                        <p><strong>Arrives At:</strong> {order.address}</p>
                        <p><strong>Arrangements:</strong> {itemsCount} spec.{itemsCount > 1 ? 's' : ''}</p>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-[11px] font-bold text-[#436444]">
                        <span>Stewardship Sum</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
