import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit2, Trash2 } from 'lucide-react';

const ItemSetup = () => {
  const navigate = useNavigate();

  const items = [
    { id: '#10000001', name: 'Chicken Meal 1', stock: '119 items', category: 'Category 1', status: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000002', name: 'Chicken Meal 2', stock: '119 items', category: 'Category 1', status: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000003', name: 'Chicken Meal 3', stock: '119 items', category: 'Category 2', status: 'In Stock', color: 'text-green-500 bg-green-50' },
    { id: '#10000004', name: 'Chicken Meal 4', stock: '119 items', category: 'Category 2', status: 'Low Stock', color: 'text-orange-500 bg-orange-50' },
    { id: '#10000005', name: 'Chicken Meal 5', stock: '119 items', category: 'Category 3', status: 'No Stock', color: 'text-red-500 bg-red-50' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      {/* Top Navigation */}
      <button onClick={() => navigate(-1)} className="flex items-center text-red-600 font-semibold mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Item Setup</h1>
          <button className="bg-[#A31D1D] text-white px-4 py-2 rounded-lg flex items-center text-sm">
            <Plus size={18} className="mr-1" /> Add Item
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg border w-64">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <select className="border rounded-lg px-4 py-2 text-sm bg-white outline-none">
            <option>Category</option>
          </select>
          <select className="border rounded-lg px-4 py-2 text-sm bg-white outline-none">
            <option>Availability</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b">
              <th className="py-4 px-2">Receipt no.</th>
              <th className="py-4 px-2">Image</th>
              <th className="py-4 px-2">Name</th>
              <th className="py-4 px-2">Stock</th>
              <th className="py-4 px-2">Category</th>
              <th className="py-4 px-2">Availability</th>
              <th className="py-4 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 text-sm font-medium text-gray-600">{item.id}</td>
                <td className="py-4 px-2">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">IMAGE</div>
                </td>
                <td className="py-4 px-2 text-sm font-bold">{item.name}</td>
                <td className="py-4 px-2 text-sm text-gray-600">{item.stock}</td>
                <td className="py-4 px-2 text-sm text-gray-600">{item.category}</td>
                <td className="py-4 px-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item.color}`}>{item.status}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"><Edit2 size={14} /></button>
                    <button className="p-1.5 text-red-600 border border-red-600 rounded-md hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Actions */}
        <div className="mt-10 flex gap-4 justify-center">
          <button className="bg-gray-400 text-white px-10 py-3 rounded-xl font-bold">Print Z Reading</button>
          <button className="bg-[#A31D1D] text-white px-10 py-3 rounded-xl font-bold">Logout Terminal</button>
          <button className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold">Sync Now</button>
        </div>
      </div>
    </div>
  );
};

export default ItemSetup;