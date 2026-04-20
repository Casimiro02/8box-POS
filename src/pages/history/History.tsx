import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown,
  Printer,
  X 
} from 'lucide-react';

// --- Types ---
interface OrderItem {
  name: string;
  price: number;
}

interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  subtotal: number;
  tax: number;
  voucher: number;
  total: number;
  paymentMethod: 'GCash' | 'Cash';
  refNumber?: string;
  items: OrderItem[];
}

// --- Mock Data ---
const HISTORY_DATA: OrderRecord[] = [
  { 
    id: '1', 
    orderNumber: '#12334', 
    date: 'November 23, 2022', 
    time: '1:36 PM', 
    subtotal: 300, tax: 30, voucher: 0, total: 360.00, 
    paymentMethod: 'GCash',
    items: [
      { name: 'Chicken Fillet', price: 100 },
      { name: 'Chocolate Sundae', price: 100 },
      { name: 'Burger Overload', price: 100 },
    ]
  },
  { 
    id: '2', 
    orderNumber: '#12335', 
    date: 'November 23, 2022', 
    time: '2:15 PM', 
    subtotal: 1100, tax: 132, voucher: 0, total: 1232.00, 
    paymentMethod: 'Cash',
    items: [
      { name: 'Family Meal A', price: 800 },
      { name: 'Spaghetti Platter', price: 300 },
    ]
  },
  { 
    id: '3', 
    orderNumber: '#12336', 
    date: 'December 01, 2022', 
    time: '12:00 PM', 
    subtotal: 400, tax: 48, voucher: 50, total: 398.00, 
    paymentMethod: 'GCash', 
    refNumber: '231587894564',
    items: [
      { name: 'Fried Chicken 6pcs', price: 400 },
    ]
  },
  { 
    id: '4', 
    orderNumber: '#12337', 
    date: 'December 05, 2022', 
    time: '6:30 PM', 
    subtotal: 150, tax: 18, voucher: 0, total: 168.00, 
    paymentMethod: 'Cash',
    items: [
      { name: 'Burger Solo', price: 150 },
    ]
  },
  { 
    id: '5', 
    orderNumber: '#12338', 
    date: 'January 10, 2023', 
    time: '1:36 PM', 
    subtotal: 1160.71, tax: 139.29, voucher: 0, total: 1300.00, 
    paymentMethod: 'GCash',
    items: [
      { name: 'Party Package', price: 1300 },
    ]
  },
];

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // --- Filtering Logic ---
  const filteredOrders = useMemo(() => {
    return HISTORY_DATA.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPayment = paymentFilter === 'All' || order.paymentMethod === paymentFilter;
      const orderMonth = order.date.split(' ')[0]; 
      const matchesMonth = monthFilter === 'All' || orderMonth === monthFilter;
      return matchesSearch && matchesPayment && matchesMonth;
    });
  }, [searchQuery, paymentFilter, monthFilter]);

  const selectedOrder = HISTORY_DATA.find(o => o.id === selectedOrderId);
  const uniqueMonths = Array.from(new Set(HISTORY_DATA.map(o => o.date.split(' ')[0])));

  // --- Print Function ---
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full bg-gray-50 font-sans text-gray-800 overflow-hidden flex flex-col">
      
      {/* --- Print Styles --- */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-summary, #printable-summary * {
            visibility: visible;
          }
          #printable-summary {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: white;
            padding: 20px;
            z-index: 9999;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Content (Sidebar removed) */}
      <main className="flex-1 flex flex-col p-8 overflow-hidden">
        
        {/* Filters Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order no." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white shadow-sm border-none outline-none placeholder:text-gray-300 text-gray-600 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          <div className="relative">
            <select 
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="appearance-none w-48 bg-white border border-red-200 rounded-2xl px-5 py-3 text-sm text-gray-600 outline-none cursor-pointer hover:bg-red-50 transition-colors"
            >
              <option value="All">Mode of payment</option>
              <option value="Cash">Cash</option>
              <option value="GCash">GCash</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
          </div>

          <div className="relative">
             <select 
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="appearance-none w-40 bg-white border border-red-200 rounded-2xl px-5 py-3 text-sm text-gray-600 outline-none cursor-pointer hover:bg-red-50 transition-colors"
            >
              <option value="All">Month</option>
              {uniqueMonths.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
          </div>
        </div>

        {/* Content Split View */}
        <div className="flex gap-6 flex-1 overflow-hidden">
          
          {/* LEFT: Order List */}
          <div className={`bg-white rounded-[2rem] shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${selectedOrderId ? 'w-3/5' : 'w-full'}`}>
            <div className="overflow-y-auto p-2 flex-1 scrollbar-hide">
              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p>No orders found.</p>
                </div>
              ) : (
                filteredOrders.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedOrderId(item.id)}
                    className={`flex justify-between items-center py-6 border-b border-gray-100 last:border-0 hover:bg-red-50/50 transition-colors cursor-pointer px-6 rounded-xl mx-2
                      ${selectedOrderId === item.id ? 'bg-red-50' : ''}
                    `}
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Order {item.orderNumber}</h3>
                      <p className="text-gray-400 text-sm mt-1 font-medium">{item.date}, {item.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-red-800 font-bold text-lg">P {item.total.toFixed(2)}</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">Paid via {item.paymentMethod}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          {selectedOrder && (
            <div id="printable-summary" className="w-2/5 bg-white rounded-[2rem] shadow-sm flex flex-col p-8 animate-in slide-in-from-right-4 duration-300 relative">
              
              {/* Actions Header */}
              <div className="flex justify-between items-start mb-8 no-print">
                 {/* Close Button (Left side relative to content) */}
                <div className="flex-1">
                   <h2 className="text-xl font-bold text-gray-900">Order {selectedOrder.orderNumber}</h2>
                   <p className="text-sm font-bold text-gray-800 mt-1">Order Summary</p>
                </div>
                
                <div className="flex items-center gap-2">
                   {/* Print Button */}
                  <button 
                    onClick={handlePrint}
                    className="bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-red-900 transition-colors shadow-md shadow-red-200"
                  >
                    Print <Printer size={14} />
                  </button>

                  {/* Close / X Button */}
                  <button 
                    onClick={() => setSelectedOrderId(null)}
                    className="bg-gray-100 text-gray-500 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Printable Content Header */}
              <div className="hidden print:block mb-6">
                 <h1 className="text-2xl font-bold">RECEIPT</h1>
                 <p>Order {selectedOrder.orderNumber}</p>
                 <p className="text-sm">{selectedOrder.date} {selectedOrder.time}</p>
                 <hr className="my-4"/>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto mb-6 pr-2">
                <div className="space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{item.name}</span>
                      <span>P {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Section */}
              <div className="border-t border-gray-100 pt-6 space-y-2">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>P {selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Tax (12%)</span>
                  <span>P {selectedOrder.tax.toFixed(2)}</span>
                </div>
                {selectedOrder.voucher > 0 && (
                   <div className="flex justify-between text-red-500 text-sm">
                    <span>Voucher</span>
                    <span>- {selectedOrder.voucher.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
                  <span>Total</span>
                  <span>P {selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6">
                <p className="text-gray-400 text-xs">Paid via {selectedOrder.paymentMethod}</p>
                {selectedOrder.refNumber && (
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-800 text-xs font-bold">Reference no.</span>
                    <span className="text-gray-800 text-xs font-bold">{selectedOrder.refNumber}</span>
                  </div>
                )}
              </div>
                
            </div>
          )}

        </div>
      </main>
    </div>
  );
}