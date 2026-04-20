import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
} from 'lucide-react';

const Receiving: React.FC = () => {
  const navigate = useNavigate();

  const receivingData = [
    { id: 'REQ-#3000001', user: 'Juan Dela Cruz', date: '13/05/2025', center: 'Sample 1', status: 'Pending' },
    { id: 'REQ-#3000002', user: 'Juan Dela Cruz', date: '22/05/2025', center: 'Sample 1', status: 'Pending' },
    { id: 'REQ-#3000003', user: 'Juan Dela Cruz', date: '15/06/2025', center: 'Sample 1', status: 'Pending' },
    { id: 'REQ-#3000004', user: 'Juan Dela Cruz', date: '06/09/2025', center: 'Sample 2', status: 'Pending' },
    { id: 'REQ-#3000005', user: 'Juan Dela Cruz', date: '25/09/2025', center: 'Sample 3', status: 'Pending' },
    { id: 'REQ-#3000006', user: 'Juan Dela Cruz', date: '04/10/2025', center: 'Sample 4', status: 'Pending' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen font-sans">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#A31D1D] font-bold mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Receiving</h1>
          <button className="bg-[#A31D1D] text-white px-5 py-2.5 rounded-xl flex items-center font-bold shadow-md hover:bg-[#8B1818] transition-colors">
            <Plus size={20} className="mr-2" /> Add New
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-8 items-center text-sm">
          <div className="flex items-center text-gray-500">
            Show 
            <select className="mx-2 border rounded p-1 bg-gray-50">
              <option>8</option>
            </select>
            entries
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl w-64 ml-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>

          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[120px]">
            <option>Status</option>
          </select>

          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[120px]">
            <option>Month</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-0">
            <thead>
              <tr className="text-gray-900 font-bold text-sm border-b">
                <th className="py-4 border-b">Request No.</th>
                <th className="py-4 border-b">Requested by</th>
                <th className="py-4 border-b">Date</th>
                <th className="py-4 border-b">Cost Center</th>
                <th className="py-4 border-b">Status</th>
                <th className="py-4 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {receivingData.map((row, idx) => (
                <tr key={idx} className="group hover:bg-red-50/30 transition-colors">
                  <td className="py-5 text-sm text-gray-600 border-b border-gray-50">{row.id}</td>
                  <td className="py-5 text-sm font-bold text-gray-800 border-b border-gray-50">{row.user}</td>
                  <td className="py-5 text-sm text-gray-600 border-b border-gray-50">{row.date}</td>
                  <td className="py-5 text-sm text-gray-600 border-b border-gray-50">{row.center}</td>
                  <td className="py-5 border-b border-gray-50">
                    <span className="bg-[#FFF4E5] text-[#D97706] px-4 py-1 rounded-full text-[11px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 border-b border-gray-50">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button className="text-gray-400 text-sm font-medium mr-2">Previous</button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#A31D1D] text-white rounded-lg font-bold text-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg font-bold text-sm">2</button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg font-bold text-sm">3</button>
          <button className="text-gray-400 text-sm font-medium ml-2">Next</button>
        </div>

        {/* Footer Action Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button className="bg-[#94a3b8] text-white px-12 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-[#64748b] transition-all">
            Print Z Reading
          </button>
          <button className="bg-[#A31D1D] text-white px-12 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-[#8B1818] transition-all">
            Logout Terminal
          </button>
          <button className="bg-[#22C55E] text-white px-12 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-[#16a34a] transition-all">
            Sync Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receiving;