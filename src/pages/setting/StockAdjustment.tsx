import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit2, Trash2 } from 'lucide-react';

const StockAdjustment: React.FC = () => {
  const navigate = useNavigate();

  const stockData = [
    { id: '#10000001', name: 'Chicken Meal 1', stock: '119 items', category: 'Category 1', availability: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000002', name: 'Chicken Meal 2', stock: '119 items', category: 'Category 1', availability: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000003', name: 'Chicken Meal 3', stock: '119 items', category: 'Category 2', availability: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000004', name: 'Chicken Meal 4', stock: '119 items', category: 'Category 2', availability: 'Low Stock', color: 'text-orange-500 bg-orange-50' },
    { id: '#10000005', name: 'Chicken Meal 5', stock: '119 items', category: 'Category 3', availability: 'No Stock', color: 'text-red-500 bg-red-50' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      {/* Navigation Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#A31D1D] font-bold mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        {/* Title and Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Adjust</h1>
          <button className="bg-[#A31D1D] text-white px-5 py-2.5 rounded-xl flex items-center font-bold shadow-md hover:bg-[#8B1818] transition-colors">
            <Plus size={20} className="mr-2" /> Add Item
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 items-center text-sm">
          <div className="flex items-center text-gray-500">
            Show <select className="mx-2 border rounded p-1 bg-gray-50"><option>8</option></select> entries
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl w-64 ml-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>

          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[140px]">
            <option>Category</option>
          </select>

          <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-gray-500 min-w-[140px]">
            <option>Availability</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-900 font-bold text-sm border-b">
                <th className="py-4">Receipt no.</th>
                <th className="py-4">Image</th>
                <th className="py-4">Name</th>
                <th className="py-4">Stock</th>
                <th className="py-4">Category</th>
                <th className="py-4">Availability</th>
                <th className="py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-red-50/20 transition-colors">
                  <td className="py-4 text-sm text-gray-600">{row.id}</td>
                  <td className="py-4">
                    <div className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                       <span className="text-[10px] text-gray-400">IMAGE</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-bold text-gray-800">{row.name}</td>
                  <td className="py-4 text-sm text-gray-600">{row.stock}</td>
                  <td className="py-4 text-sm text-gray-600">{row.category}</td>
                  <td className="py-4">
                    <span className={`px-4 py-1 rounded-full text-[11px] font-bold ${row.color}`}>
                      {row.availability}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-red-600 border border-red-100 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <button className="bg-[#94a3b8] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Print Z Reading</button>
          <button className="bg-[#A31D1D] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Logout Terminal</button>
          <button className="bg-[#22C55E] text-white px-10 py-3 rounded-2xl font-bold shadow-sm">Sync Now</button>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustment;