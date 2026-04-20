import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Download, 
  ClipboardCheck, 
  RefreshCcw, 
  SlidersHorizontal, 
  FileText, 
  RotateCcw, 
  Percent, 
  Gift 
} from 'lucide-react';

interface SettingItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string; // Added path for navigation
}

const Setting: React.FC = () => {
  const navigate = useNavigate();

  const inventoryItems: SettingItem[] = [
    { title: 'Item Setup', description: 'Manage stock, transfers, and adjustments', icon: <Box size={22} />, path: '/item-setup' },
    { title: 'Transfer Request', description: 'Request and manage inventory transfers between locations', icon: <RefreshCcw size={22} />, path: '/transfer-request' },
    { title: 'Receiving', description: 'Record and confirm incoming inventory items', icon: <Download size={22} />, path: '/receiving' },
    { title: 'Stock Adjustment', description: 'Adjust stock quantities to correct inventory discrepancies', icon: <SlidersHorizontal size={22} />, path: '/stock-adjustment' },
    { title: 'Inventory Count', description: 'Count physical stock and reconcile system records', icon: <ClipboardCheck size={22} />, path: '/inventory-count' },
  ];

  const salesItems: SettingItem[] = [
    { title: 'Receipt Journal', description: 'View and track completed sales transactions', icon: <FileText size={22} />, path: '/receipt-journal' },
    { title: 'Returns and Refunds', description: 'Process returned items and issue customer refunds', icon: <RotateCcw size={22} />, path: '/returns' },
    { title: 'Discount', description: 'Create and organize POS discounts and promotions', icon: <Percent size={22} />, path: '/discounts' },
    { title: 'Gift Certificate', description: 'Manage gift certificates for POS transactions', icon: <Gift size={22} />, path: '/gift-certificates' },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-[50%] bg-[#FDE2E4] -z-10 clip-path-wave" 
           style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)' }}>
      </div>

      <div className="p-10 relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-black italic">SETTINGS</h1>
        </header>
        
        <div className="max-w-7xl space-y-12">
          {/* Inventory Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Inventory</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inventoryItems.map((item, i) => (
                <SettingCard key={i} {...item} onClick={() => navigate(item.path)} />
              ))}
            </div>
          </section>

          {/* Sales and Receipt Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sales and Receipt</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {salesItems.map((item, i) => (
                <SettingCard key={i} {...item} onClick={() => navigate(item.path)} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

interface CardProps extends SettingItem {
  onClick: () => void;
}

const SettingCard: React.FC<CardProps> = ({ title, description, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-transparent hover:border-red-200 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
  >
    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-[#A31D1D] text-white rounded-full shadow-inner group-hover:rotate-6 transition-transform">
      {icon}
    </div>
    <div className="ml-6">
      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#A31D1D] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 leading-snug max-w-xs">
        {description}
      </p>
    </div>
  </div>
);

export default Setting;