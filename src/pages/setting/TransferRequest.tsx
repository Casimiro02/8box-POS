import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

const TransferRequest = () => {
  const navigate = useNavigate();

  const requests = Array(6).fill({
    no: 'REQ-#2000001',
    user: 'Juan Dela Cruz',
    date: '13/05/2025',
    center: 'Sample 1',
    status: 'Pending'
  });

  return (
    <div className="p-8 bg-[#F5F5F5] min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-red-600 font-semibold mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transfer Request</h1>
          <button className="bg-[#A31D1D] text-white px-4 py-2 rounded-lg flex items-center text-sm">
            <Plus size={18} className="mr-1" /> Add New
          </button>
        </div>

        {/* Table logic same as above, just change columns */}
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b uppercase tracking-wider">
              <th className="py-4">Request No.</th>
              <th className="py-4">Requested by</th>
              <th className="py-4">Date</th>
              <th className="py-4">Cost Center</th>
              <th className="py-4">Status</th>
              <th className="py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-pink-50/30">
                <td className="py-5 text-sm text-gray-600">{req.no}</td>
                <td className="py-5 text-sm font-bold">{req.user}</td>
                <td className="py-5 text-sm text-gray-600">{req.date}</td>
                <td className="py-5 text-sm text-gray-600">{req.center}</td>
                <td className="py-5">
                   <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold">Pending</span>
                </td>
                <td className="py-5 flex justify-center gap-2">
                   <button className="p-1.5 text-blue-600 border border-blue-600 rounded-md"><Edit2 size={14} /></button>
                   <button className="p-1.5 text-red-600 border border-red-600 rounded-md"><Trash2 size={14} /></button>
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

export default TransferRequest;