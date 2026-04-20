import React, { useState, useMemo } from 'react';
import { 
  Home, ShoppingCart, Clock, FileText, Settings, LogOut, 
  Search, Plus, Minus, Trash2, Ticket, X, Upload, Calendar, ChevronDown, Percent
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  variant?: string;
}

interface CartItem extends Product {
  cartId: string;
  qty: number;
  note?: string;
}

type ModifierType = 'Promo' | 'Discount' | 'Inhouse' | 'Loyalty' | 'Gift Card';

// --- Mock Data ---
const CATEGORIES = [
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'noodles', name: 'Noodles', icon: '🍜' },
  { id: 'rice', name: 'Rice Meals', icon: '🍚' },
];

const MODIFIERS = [
  { id: 'Promo', label: 'Promo', type: 'percentage', value: 0.10 }, 
  { id: 'Discount', label: 'Discount', type: 'percentage', value: 0.20 }, 
  { id: 'Inhouse', label: 'Inhouse', type: 'percentage', value: 0.50 }, 
  { id: 'Loyalty', label: 'Loyalty', type: 'fixed', value: 50.00 }, 
  { id: 'Gift Card', label: 'Gift Card', type: 'fixed', value: 100.00 }, 
];

const PRODUCTS: Product[] = [
  { id: 1, name: 'Fried Chicken', category: 'chicken', price: 100.00, variant: '1pc w/ Rice', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Chicken Wings', category: 'chicken', price: 180.00, variant: '6pcs', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'Chicken Fillet', category: 'chicken', price: 110.00, variant: 'Spicy', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=300' },
  { id: 4, name: 'Burger Overload', category: 'burgers', price: 120.00, variant: 'Double', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300' },
  { id: 5, name: 'Cheeseburger', category: 'burgers', price: 85.00, variant: 'Regular', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=300' },
  { id: 6, name: 'Spaghetti', category: 'noodles', price: 90.00, variant: 'Regular', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=300' },
  { id: 7, name: 'Pancit Palabok', category: 'noodles', price: 110.00, variant: 'Family', image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?auto=format&fit=crop&q=80&w=300' },
  { id: 8, name: 'Milk Fish (Bangus)', category: 'rice', price: 100.00, variant: 'Whole', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300' },
  { id: 9, name: 'Pork Sisig', category: 'rice', price: 130.00, variant: 'Solo', image: 'https://images.unsplash.com/photo-1604579278540-33621d1b3874?auto=format&fit=crop&q=80&w=300' },
];

export default function POSSystem() {
  const [activeCategory, setActiveCategory] = useState('chicken');
  const [searchQuery, setSearchQuery] = useState('');
  
  // -- Discount Modal States --
  const [activeModifier, setActiveModifier] = useState<ModifierType | null>(null);
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // -- Voucher Modal States --
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isVoucherSuccessOpen, setIsVoucherSuccessOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucherAmount, setAppliedVoucherAmount] = useState(0);

  // -- Cart State --
  const [cart, setCart] = useState<CartItem[]>([
    { id: 101, cartId: 'init-1', name: 'Fried Chicken', category: 'chicken', price: 100, qty: 1, note: 'Additional gravy', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=300' },
    { id: 102, cartId: 'init-2', name: 'Burger Overload', category: 'burgers', price: 120, qty: 1, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300' },
  ]);

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory, searchQuery]);

  // --- Cart Actions ---
  const addToCart = (product: Product) => {
    const newBaseItem = { ...product, cartId: Math.random().toString(36), qty: 1 };
    setCart([...cart, newBaseItem]);
  };

  const updateQty = (cartId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const removeItem = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  // --- Discount Handlers ---
  const handleModifierClick = (modId: ModifierType) => {
    if (activeModifier === modId) {
      setActiveModifier(null);
      return;
    }
    if (modId === 'Discount') {
      setIsDiscountFormOpen(true);
    } else {
      setActiveModifier(modId);
    }
  };

  const handleSubmitDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDiscountFormOpen(false); 
    setIsSuccessModalOpen(true); 
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    setActiveModifier('Discount'); 
  };

  // --- Voucher Handlers ---
  const handleApplyVoucher = () => {
    setIsVoucherModalOpen(false);
    // Simulate voucher logic: if they typed anything, give 50 off.
    if (voucherCode.length > 0) {
        setAppliedVoucherAmount(50);
    }
    setIsVoucherSuccessOpen(true);
  };

  // --- Math Logic ---
  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    let discountAmount = 0;
    
    // 1. Calculate Standard Modifiers (Buttons)
    if (activeModifier) {
      const config = MODIFIERS.find(m => m.id === activeModifier);
      if (config) {
        discountAmount = config.type === 'percentage' 
          ? subtotal * config.value 
          : Math.min(subtotal, config.value);
      }
    }

    // 2. Add Voucher Discount
    const totalDiscount = discountAmount + appliedVoucherAmount;

    const taxableBase = Math.max(0, subtotal - totalDiscount);
    const tax = taxableBase * 0.12;
    const finalTotal = taxableBase + tax;

    return { subtotal, discountAmount: totalDiscount, tax, finalTotal };
  }, [cart, activeModifier, appliedVoucherAmount]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden relative">
      
      {/* ================= MODAL 1: DISCOUNT FORM ================= */}
      {isDiscountFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">How can we help?</h3>
              <button onClick={() => setIsDiscountFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitDiscount} className="space-y-4">
              <div className="relative">
                <select className="w-full appearance-none bg-gray-600 text-white px-4 py-3 rounded-lg font-medium outline-none">
                  <option>Senior Citizen discount</option>
                  <option>PWD Discount</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={16} />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg outline-none hover:border-gray-400">
                  <option>Applying for special discount code</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Registered City <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Birthday <span className="text-red-500">*</span></label>
                <input required type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">ID Number <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-500" />
              </div>
              <div className="flex items-center gap-3 bg-gray-200/50 rounded-lg px-4 py-3 border border-gray-200 mt-2">
                <span className="text-sm text-gray-600 font-medium truncate flex-1">img_12354563245.png</span>
                <Upload size={18} className="text-gray-500" />
              </div>
              <button type="submit" className="w-full bg-red-700 text-white font-bold py-3.5 rounded-xl hover:bg-red-800 transition-colors shadow-lg shadow-red-100 mt-4">
                Apply discount
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: VOUCHER FORM ================= */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Vouchers & Offers</h3>
              <button onClick={() => setIsVoucherModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Input */}
            <div className="relative mb-6">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Enter a voucher code</label>
                <input 
                  type="text" 
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
            </div>

            {/* Apply Button */}
            <button 
                onClick={handleApplyVoucher}
                className="w-full bg-red-700 text-white font-bold py-3 rounded-lg hover:bg-red-800 transition-colors shadow-lg shadow-red-100 mb-8"
            >
                Apply
            </button>

            {/* Invalid List */}
            <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Not Valid for this order</h4>
                
                {/* Card Item */}
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600 font-medium">Lorem Ipsum - 150 off with your debit card</span>
                    </div>
                    <div className="text-gray-800 font-bold mt-1">150.00 <span className="text-xs font-normal text-gray-500">DEBIT</span></div>
                    
                    <div className="flex justify-between items-end mt-2">
                         <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Min. spend 399.00 • Used by 14 Sept. 2025</span>
                         <button className="text-xs font-bold text-gray-700 hover:underline">Details</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUCCESS MODALS ================= */}
      
      {/* Discount Success */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-80 p-6 flex flex-col items-center animate-in fade-in zoom-in duration-200">
             <button onClick={handleSuccessClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Discount applied!</h3>
            <button onClick={handleSuccessClose} className="w-full bg-red-700 text-white font-bold py-2.5 rounded-lg hover:bg-red-800 transition-colors">Okay</button>
          </div>
        </div>
      )}

      {/* Voucher Success */}
      {isVoucherSuccessOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-80 p-6 flex flex-col items-center animate-in fade-in zoom-in duration-200">
             <button onClick={() => setIsVoucherSuccessOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Voucher applied!</h3>
            <button onClick={() => setIsVoucherSuccessOpen(false)} className="w-full bg-red-700 text-white font-bold py-2.5 rounded-lg hover:bg-red-800 transition-colors">Okay</button>
          </div>
        </div>
      )}

      {/* 1. Main Content Area */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search food or drink..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="text-red-500 font-medium text-sm bg-red-50 px-4 py-2 rounded-lg">
            3 items are out of stocks
          </div>
        </header>

        <div className={`flex gap-4 mb-6 overflow-x-auto pb-2 transition-opacity ${searchQuery ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-sm border transition-all min-w-[140px] ${
                activeCategory === cat.id 
                ? 'bg-white border-red-600 ring-1 ring-red-600' 
                : 'bg-white border-transparent hover:border-gray-200'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className={`font-semibold ${activeCategory === cat.id ? 'text-red-700' : 'text-gray-600'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {filteredProducts.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Search size={48} className="mb-4 opacity-20" />
                <p>No items found for "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-red-600 font-medium hover:underline">
                  Clear search
                </button>
             </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 pb-20">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="w-full h-32 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{product.variant}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-orange-500 font-bold text-lg">P {product.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(product)} className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 transition-colors shadow-red-200 shadow-lg">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 2. Right Panel */}
      <aside className="w-96 bg-white shadow-xl flex flex-col h-full z-20">
        <div className="p-6 pb-2 border-b border-gray-100">
          <h2 className="text-2xl font-bold mb-1">Current Order</h2>
          <div className="flex justify-between items-end text-gray-500 text-sm mb-2">
            <span>Order ID #12312</span>
            <span className="text-xl font-bold text-gray-800">Table 1</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.map((item) => (
            <div key={item.cartId} className="flex gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                  <button onClick={() => removeItem(item.cartId)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                {item.note && <p className="text-gray-400 text-xs mb-2">Note: {item.note}</p>}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-orange-500">P {item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                    <button onClick={() => updateQty(item.cartId, -1)} className="w-6 h-6 rounded bg-white text-gray-600 flex items-center justify-center hover:bg-gray-200">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.cartId, 1)} className="w-6 h-6 rounded bg-white text-gray-600 flex items-center justify-center hover:bg-gray-200">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 mt-auto rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-wrap gap-2 mb-6">
            {MODIFIERS.map((mod) => (
              <button 
                key={mod.id} 
                onClick={() => handleModifierClick(mod.id as ModifierType)}
                className={`px-3 py-1 bg-white border rounded-full text-xs font-medium transition-colors ${
                  activeModifier === mod.id 
                  ? 'border-red-500 text-red-600 bg-red-50' 
                  : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">P {totals.subtotal.toFixed(2)}</span>
            </div>
            
            {/* Show Discount Amount */}
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-red-500 text-sm animate-pulse">
                <span>Discount / Voucher</span>
                <span className="font-medium">- P {totals.discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-500 text-sm">
              <span>Tax (12%)</span>
              <span className="font-medium text-gray-800">P {totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>P {totals.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsVoucherModalOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-6 hover:text-red-600 w-full"
          >
            <Ticket size={18} />
            Apply a voucher
          </button>

          <button className="w-full bg-red-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-colors shadow-lg shadow-red-200">
            Process Order
          </button>
        </div>
      </aside>
    </div>
  );
}