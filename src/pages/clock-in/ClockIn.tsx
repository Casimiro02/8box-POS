import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const ClockIn = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState<'in' | 'out' | null>(null);
  const [formData, setFormData] = useState({ costCenter: '', site: '', shift: '' });
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  const attachStreamToVideo = useCallback((stream: MediaStream) => {
    
    if (videoRef.current) {
      console.log("[DEBUG] Video element rect:", videoRef.current.getBoundingClientRect());
      console.log("[DEBUG] Video element computed styles:", window.getComputedStyle(videoRef.current));

      try {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {
          setTimeout(() => {
            videoRef.current?.play().catch(console.warn);
          }, 0);
        });
        return;
      } catch (e) {
        console.error("Failed to attach stream immediately", e);
      }
    }

    const checkAndAttach = () => {
      if (videoRef.current) {
        try {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.warn);
          console.log("[DEBUG] Video attached successfully after polling.");
          return true; 
        } catch (e) {
          console.error("Final attach attempt failed", e);
        }
      }
      return false; 
    };

    if (!checkAndAttach()) {
      const id = setInterval(() => {
        if (checkAndAttach()) {
          clearInterval(id); 
        }
      }, 100);
      setTimeout(() => clearInterval(id), 2000);
    }
  }, []);

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null; 
      }
      streamRef.current = null; 
      setIsCameraActive(false);
      setCameraError(null);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("[DEBUG] Media stream acquired successfully.");
      streamRef.current = stream; 

      setTimeout(() => {
        console.log("[DEBUG] Attempting to attach stream to video element...");
        attachStreamToVideo(stream);
        setIsCameraActive(true); 
        setCameraError(null); 
      }, 50); 

    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera access denied. Please allow in browser permissions.'
          : err.name === 'NotFoundError'
          ? 'No camera detected.'
          : 'Camera unavailable. Try restarting your browser.'
      );
      setIsCameraActive(false);
    }
  };

  const handleTimeIn = () => {
    console.log("[DEBUG] Time In button clicked");
    setShowSuccess('in');
  };
  const handleTimeOut = () => {
    console.log("[DEBUG] Time Out button clicked");
    setShowSuccess('out');
  };
  const handleIconClick = () => {
    console.log("[DEBUG] Login Access icon clicked");
    setShowModal(true);
    setFormData({ costCenter: '', site: '', shift: '' });
  };
  const handleSave = () => {
    console.log('Saved:', { employeeId, ...formData });
    setShowModal(false);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("[DEBUG] Select changed:", name, value);
    setFormData(prev => ({ ...prev, [name as keyof typeof formData]: value }));
  };

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <h1 className="text-2xl font-bold text-red-600">Time In / Time Out</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left: Camera + Buttons */}
        <Card className="flex flex-col items-center justify-center p-8">
          {/* Camera Box */}
          <div 
            className="w-full max-w-xs border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center mb-6 relative overflow-hidden"
          
            style={{ backgroundColor: isCameraActive ? '#f0f9ff' : 'transparent' }}
          >
            {isCameraActive && videoRef.current ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
          
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#000', 
                }}
                key="camera-video"
              />
            ) : (
              <div className="text-center text-gray-500">
                {cameraError ? (
                  <div>
                    <p className="text-sm text-red-600 mb-2">{cameraError}</p>
                    <Button onClick={toggleCamera} size="sm" variant="outline">
                      Retry
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="size-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                      {isCameraActive ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 7H17a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm">Camera preview</p>
                    <Button
                      onClick={toggleCamera}
                      size="sm"
                      className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                      {isCameraActive ? 'Stop' : 'Open Camera'}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleTimeIn} className="bg-green-500 hover:bg-green-600 text-white w-32 h-32 rounded-xl flex flex-col items-center justify-center shadow-lg">
              <div className="size-10 bg-white rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold">Time In</span>
            </Button>

            <Button onClick={handleTimeOut} className="bg-red-500 hover:bg-red-600 text-white w-32 h-32 rounded-xl flex flex-col items-center justify-center shadow-lg">
              <div className="size-10 bg-white rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="font-semibold">Time Out</span>
            </Button>
          </div>
        </Card>

        {/* Right: Login Access */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Login Access</h2>

          <div className="mb-6">
            <Label htmlFor="employeeId">Employee ID *</Label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter your employee ID"
              className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring sm:text-sm bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <button key={`break-out-${i}`} onClick={handleIconClick} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <div className="size-12 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Break Out {i}</span>
              </button>
            ))}
            {[1, 2, 3].map(i => (
              <button key={`break-in-${i}`} onClick={handleIconClick} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <div className="size-12 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Break In {i}</span>
              </button>
            ))}
            <button onClick={handleIconClick} className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <div className="size-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-medium">Fieldwork In</span>
            </button>
            <button onClick={handleIconClick} className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <div className="size-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-medium">Fieldwork Out</span>
            </button>
            <button onClick={handleIconClick} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="size-12 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-xs text-center animate-fade-in-up">
            <div className={`size-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              showSuccess === 'in' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`size-6 ${
                showSuccess === 'in' ? 'text-green-500' : 'text-red-500'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">
              {showSuccess === 'in' ? 'Time In Successfully' : 'Time Out Successfully'}
            </h3>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Login Access</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="size-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="costCenter">Cost Center</Label>
                  <select
                    id="costCenter"
                    name="costCenter"
                    value={formData.costCenter}
                    onChange={handleSelectChange}
                    className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring sm:text-sm bg-background text-foreground"
                  >
                    <option value="">Please select</option>
                    <option value="house">House</option>
                    <option value="office">Office</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="site">Site</Label>
                  <select
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleSelectChange}
                    className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring sm:text-sm bg-background text-foreground"
                  >
                    <option value="">Please select</option>
                    <option value="on-site">On-Site</option>
                    <option value="work-from-home">Work From Home</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="shift">Shift</Label>
                  <select
                    id="shift"
                    name="shift"
                    value={formData.shift}
                    onChange={handleSelectChange}
                    className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring sm:text-sm bg-background text-foreground"
                  >
                    <option value="">Please select</option>
                    <option value="1st-shift">1st Shift</option>
                    <option value="2nd-shift">2nd Shift</option>
                  </select>
                </div>
                <Button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700 mt-4">
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClockIn;