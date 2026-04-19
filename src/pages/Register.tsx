import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.employeeId && formData.username && formData.password) {
      // API logic here
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-rose-100 to-rose-200"
          style={{ clipPath: 'polygon(0 50%, 100% 38%, 100% 100%, 0 100%)' }}
        ></div>
        <div
          className="absolute right-0 w-60 h-9 bg-pink-100 transform -rotate-3"
          style={{ top: '250px' }}
        ></div>
        <div
          className="absolute left-0 w-50 h-9 bg-red-900 transform -rotate-6"
          style={{ top: '340px' }}
        ></div>
        <div
          className="absolute left-18 w-45 h-9 bg-red-800 transform -rotate-7 translate-y-2"
          style={{ top: '350px' }}
        ></div>
      </div>

      {/* Point of Sale Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-3xl font-bold text-red-600">Point of Sale</h1>
      </div>

      {/* Register Card */}
      <Card className="w-full max-w-md mx-4 shadow-lg relative z-10 mt-16 bg-white">
        <CardHeader className="text-left pb-4">
          <CardTitle className="text-xl font-bold">Register</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Create an account using your employee id, username, and a passcode.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full bg-[#b91c1c] hover:bg-red-800 text-white font-medium">
                Create Account
              </Button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center text-sm text-gray-600 mt-6 pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-[#b91c1c] hover:underline font-bold">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;