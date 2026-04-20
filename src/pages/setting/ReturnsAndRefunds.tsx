import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, RotateCcw } from 'lucide-react';

const ReturnsAndRefunds: React.FC = () => {
  const navigate = useNavigate();

  const refundData = [
    { no: 'TRN-#4000001', user: 'Juan Dela Cruz', date: '13/05/2025', center: 'Sample 1', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
    { no: 'TRN-#4000002', user: 'Juan Dela Cruz', date: '22/05/2025', center: 'Sample 1', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
    { no: 'TRN-#4000003', user: 'Juan Dela Cruz', date: '15/06/2025', center: 'Sample 1', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
    { no: 'TRN-#4000003', user: 'Juan Dela Cruz', date: '06/09/2025', center: 'Sample 2', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
    { no: 'TRN-#4000002', user: 'Juan Dela Cruz', date: '22/05/2025', center: 'Sample 1', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
    { no: 'TRN-#4000004', user: 'Juan Dela Cruz', date: '25/09/2025', center: 'Sample 3', status: 'Pending', itemQty: '13/05/2025', amount: 'Sample 1' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      {/* Navigation Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#A31D1D] font-bold mb-6 hover:opacity-80"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns and Refunds</h1>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 items-center text-sm">
          <div className="flex items-center text-gray-500">
            Show <select className="mx-2 border rounded p-1 bg-gray-50"><option>8</option></select> entries
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl w-64 ml-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>

          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[120px]"><option>Status</option></select>
          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[120px]"><option>Month</option></select>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-900 font-bold text-sm border-b">
                <th className="py-4">Request No.</th>
                <th className="py-4">Requested by</th>
                <th className="py-4">Date</th>
                <th className="py-4">Cost Center</th>
                <th className="py-4">Status</th>
                <th className="py-4">Item/Qty</th>
                <th className="py-4">Total Amount</th>
                <th className="py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {refundData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-red-50/20 transition-colors">
                  <td className="py-5 text-sm text-gray-600">{row.no}</td>
                  <td className="py-5 text-sm font-bold text-gray-800">{row.user}</td>
                  <td className="py-5 text-sm text-gray-600">{row.date}</td>
                  <td className="py-5 text-sm text-gray-600">{row.center}</td>
                  <td className="py-5">
                    <span className="bg-[#FFF4E5] text-[#D97706] px-4 py-1 rounded-full text-[11px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 text-sm text-gray-600">{row.itemQty}</td>
                  <td className="py-5 text-sm text-gray-600">{row.amount}</td>
                  <td className="py-5">
                    <div className="flex justify-center">
                      <button className="flex items-center gap-2 bg-[#A31D1D] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#8B1818] transition-colors">
                        <RotateCcw size={14} /> Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Navigation and Action Footer */}
        <div className="flex justify-center items-center mt-8 gap-2">
           <span className="text-gray-400 text-sm">Previous</span>
           <button className="w-8 h-8 flex items-center justify-center bg-[#A31D1D] text-white rounded-lg font-bold text-sm">1</button>
           <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg font-bold text-sm">2</button>
           <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg font-bold text-sm">3</button>
           <span className="text-gray-400 text-sm">Next</span>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button className="bg-[#94a3b8] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Print Z Reading</button>
          <button className="bg-[#A31D1D] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Logout Terminal</button>
          <button className="bg-[#22C55E] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Sync Now</button>
        </div>
      </div>
    </div>
  );
};

export default ReturnsAndRefunds;