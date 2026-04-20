import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit2, Trash2 } from 'lucide-react';

const GiftCertificates: React.FC = () => {
  const navigate = useNavigate();

  const gcData = [
    { id: 'GCI-#5000001', code: 'CODE-#001231435', date: '13/05/2025', amount: '100.00', status: 'Active' },
    { id: 'GCI-#5000002', code: 'CODE-#001231346', date: '22/05/2025', amount: '100.00', status: 'Active' },
    { id: 'GCI-#5000003', code: 'CODE-#00123175', date: '15/06/2025', amount: '50.00', status: 'Active' },
    { id: 'GCI-#5000004', code: 'CODE-#001231236', date: '06/09/2025', amount: '50.00', status: 'Active' },
    { id: 'GCI-#5000005', code: 'CODE-#001231053', date: '25/09/2025', amount: '25.00', status: 'Active' },
    { id: 'GCI-#53000006', code: 'CODE-#001231190', date: '04/10/2025', amount: '25.00', status: 'Invalid' },
  ];

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-[#A31D1D] font-bold mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gift Certificate</h1>
          <button className="bg-[#A31D1D] text-white px-5 py-2.5 rounded-xl flex items-center font-bold">
            <Plus size={20} className="mr-2" /> Add New
          </button>
        </div>

        <div className="flex gap-4 mb-8 items-center text-sm text-gray-500">
          <span>Show <select className="border rounded p-1"><option>6</option></select> entries</span>
          <div className="flex items-center bg-gray-50 border px-3 py-2 rounded-xl w-64 ml-4">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-900 font-bold text-sm border-b">
              <th className="py-4">Gift Certificate Id</th>
              <th className="py-4">Gift Certificate Code</th>
              <th className="py-4">Date Created</th>
              <th className="py-4">Amount</th>
              <th className="py-4">Discount Type</th>
              <th className="py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {gcData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-red-50/20">
                <td className="py-5 text-sm text-gray-600">{row.id}</td>
                <td className="py-5 text-sm text-gray-600">{row.code}</td>
                <td className="py-5 text-sm text-gray-600">{row.date}</td>
                <td className="py-5 text-sm text-gray-600">{row.amount}</td>
                <td className="py-5">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${
                    row.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                  }`}>
                    {row.status}
                  </span>
                </td>
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

export default GiftCertificates;