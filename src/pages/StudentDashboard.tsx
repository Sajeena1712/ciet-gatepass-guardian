
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { GatePass, User } from "@/lib/types";
import GatePassForm from "@/components/GatePassForm";
import LeaveHistory from "@/components/LeaveHistory";
import LeaveCounter from "@/components/LeaveCounter";
import { LogOut, QrCode, User as UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addGatePass, getPassesByStudentId } from "@/services/gatePassService";

const StudentDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [gatePasses, setGatePasses] = useState<GatePass[]>([]);
  const [selectedPass, setSelectedPass] = useState<GatePass | null>(null);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user from local storage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error("Please login first");
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser) as User;
    if (userData.role !== "student") {
      toast.error("Unauthorized access");
      navigate('/login');
      return;
    }
    
    setUser(userData);
    
    // Get gate passes for this student from localStorage
    const studentPasses = getPassesByStudentId(userData.id);
    setGatePasses(studentPasses);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login');
  };
  
  const handleGatePassSubmit = (newPass: Partial<GatePass>) => {
    // Create a complete gate pass with ID
    const gatePassWithId: GatePass = {
      ...newPass as GatePass,
      id: `gp${Math.floor(Math.random() * 10000)}`
    };
    
    // Add to localStorage
    const savedPass = addGatePass(gatePassWithId);
    
    // Update local state
    setGatePasses([savedPass, ...gatePasses]);
  };
  
  const handleViewPass = (pass: GatePass) => {
    setSelectedPass(pass);
    
    // Show QR dialog if the pass is approved
    if (pass.status === "approved") {
      setShowQrDialog(true);
    }
  };
  
  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      {/* Header */}
      <header className="bg-ciet-blue text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="https://placeholder.svg" 
              alt="CIET Logo" 
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h1 className="font-bold text-lg md:text-xl">CIET Hostel</h1>
              <p className="text-xs md:text-sm">Gate Pass Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>{user.name}</span>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-blue-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <p className="text-muted-foreground">
            Student Dashboard | Department: {user.department} | Batch: {user.batch}
          </p>
        </div>

        {/* Leave Counter */}
        <section className="mb-6">
          <LeaveCounter gatePasses={gatePasses} />
        </section>
        
        {/* Tabs */}
        <Tabs defaultValue="apply" className="space-y-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="apply">Apply for Gate Pass</TabsTrigger>
            <TabsTrigger value="history">Leave History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apply" className="space-y-4">
            <GatePassForm user={user} onSubmit={handleGatePassSubmit} />
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>
                  View all your past and pending gate pass requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveHistory 
                  gatePasses={gatePasses} 
                  showActions={true}
                  onView={handleViewPass}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="bg-ciet-blue text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} CIET Hostel Gate Pass Management System</p>
        </div>
      </footer>
      
      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gate Pass QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code to the security personnel when leaving the campus
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {selectedPass?.qrCode ? (
              <img 
                src={selectedPass.qrCode} 
                alt="Gate Pass QR Code" 
                className="w-48 h-48 object-cover mb-4"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md mb-4">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="text-center space-y-2">
              <p className="font-bold">{selectedPass?.studentName}</p>
              <p>Valid from: {new Date(selectedPass?.fromDate || "").toLocaleString()}</p>
              <p>Valid until: {new Date(selectedPass?.toDate || "").toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Gate pass ID: {selectedPass?.id}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
