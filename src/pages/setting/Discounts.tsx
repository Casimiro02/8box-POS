import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Discounts: React.FC = () => {
  const navigate = useNavigate();

  const discountData = [
    { id: 'REQ-#3000001', name: 'New Discount 1', date: '13/05/2025', amount: '100.00', type: 'Custom' },
    { id: 'REQ-#3000002', name: 'Senior Discount', date: '22/05/2025', amount: '20%', type: 'Percentage' },
    { id: 'REQ-#3000003', name: 'New Discount 2', date: '15/06/2025', amount: '50.00', type: 'Custom' },
    { id: 'REQ-#3000004', name: 'PWD Discount', date: '06/09/2025', amount: '20%', type: 'Percentage' },
    { id: 'REQ-#3000005', name: 'New Discount 3', date: '25/09/2025', amount: '25.00', type: 'Custom' },
    { id: 'REQ-#3000006', name: 'Birthday Discount', date: '04/10/2025', amount: '20%', type: 'Percentage' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-[#A31D1D] font-bold mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discounts</h1>
          <button className="bg-[#A31D1D] text-white px-5 py-2.5 rounded-xl flex items-center font-bold">
            <Plus size={20} className="mr-2" /> Add New
          </button>
        </div>

        <div className="flex gap-4 mb-8 items-center text-sm">
          <div className="text-gray-500">Show <select className="border rounded p-1"><option>6</option></select> entries</div>
          <div className="flex items-center bg-gray-50 border px-3 py-2 rounded-xl w-64 ml-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>
          <select className="border rounded-xl px-4 py-2 bg-white text-gray-500"><option>Discount Type</option></select>
          <select className="border rounded-xl px-4 py-2 bg-white text-gray-500"><option>Month</option></select>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-900 font-bold text-sm border-b">
              <th className="py-4">Request No.</th>
              <th className="py-4">Discount Name</th>
              <th className="py-4">Date Created</th>
              <th className="py-4">Amount/Percentage</th>
              <th className="py-4">Discount Type</th>
              <th className="py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {discountData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-red-50/20 transition-colors">
                <td className="py-5 text-sm text-gray-600">{row.id}</td>
                <td className="py-5 text-sm font-bold text-gray-800">{row.name}</td>
                <td className="py-5 text-sm text-gray-600">{row.date}</td>
                <td className="py-5 text-sm text-gray-600">{row.amount}</td>
                <td className="py-5 text-sm text-gray-600">{row.type}</td>
                <td className="py-5 flex justify-center gap-3">
                  <button className="p-2 text-indigo-600 border border-indigo-100 rounded-lg"><Edit2 size={16} /></button>
                  <button className="p-2 text-red-600 border border-red-100 rounded-lg"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discounts;