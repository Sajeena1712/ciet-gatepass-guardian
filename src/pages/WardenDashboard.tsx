
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { GatePass, User } from "@/lib/types";
import ApprovalQueue from "@/components/ApprovalQueue";
import LeaveHistory from "@/components/LeaveHistory";
import { LogOut, User as UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAllGatePasses, getPendingApprovalsByRole, updateGatePass } from "@/services/gatePassService";

const WardenDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [gatePasses, setGatePasses] = useState<GatePass[]>([]);
  const [selectedPass, setSelectedPass] = useState<GatePass | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [comments, setComments] = useState("");
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
    if (userData.role !== "warden") {
      toast.error("Unauthorized access");
      navigate('/login');
      return;
    }
    
    setUser(userData);
    
    // Load all gate passes
    const allPasses = getAllGatePasses();
    setGatePasses(allPasses);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login');
  };
  
  const handleApprove = (gatePassId: string) => {
    const passToUpdate = gatePasses.find(pass => pass.id === gatePassId);
    
    if (passToUpdate) {
      const updatedPass = {
        ...passToUpdate,
        wardenApproval: {
          status: "approved",
          timestamp: new Date().toISOString(),
          comments: comments || "Approved",
          approvedBy: user?.name || ""
        },
        updatedAt: new Date().toISOString()
      };
      
      // Update in localStorage
      updateGatePass(updatedPass);
      
      // Update local state
      setGatePasses(prevPasses => 
        prevPasses.map(pass => pass.id === gatePassId ? updatedPass : pass)
      );
      
      toast.success("Gate pass approved successfully");
      setShowViewDialog(false);
      setComments("");
    }
  };
  
  const handleReject = (gatePassId: string) => {
    const passToUpdate = gatePasses.find(pass => pass.id === gatePassId);
    
    if (passToUpdate) {
      const updatedPass = {
        ...passToUpdate,
        status: "rejected",
        wardenApproval: {
          status: "rejected",
          timestamp: new Date().toISOString(),
          comments: comments || "Rejected",
          approvedBy: user?.name || ""
        },
        updatedAt: new Date().toISOString()
      };
      
      // Update in localStorage
      updateGatePass(updatedPass);
      
      // Update local state
      setGatePasses(prevPasses => 
        prevPasses.map(pass => pass.id === gatePassId ? updatedPass : pass)
      );
      
      toast.success("Gate pass rejected");
      setShowViewDialog(false);
      setComments("");
    }
  };
  
  const handleViewPass = (pass: GatePass) => {
    setSelectedPass(pass);
    setShowViewDialog(true);
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
              <span>{user.name} (Warden)</span>
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
            Warden Dashboard
          </p>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="approvals" className="space-y-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="history">Leave History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Gate Pass Approvals</CardTitle>
                <CardDescription>
                  Review and approve gate pass requests from students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApprovalQueue 
                  gatePasses={gatePasses} 
                  userRole="warden"
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onView={handleViewPass}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>
                  View all gate pass requests and their statuses
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
      
      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gate Pass Request</DialogTitle>
            <DialogDescription>
              Review the details and approve or reject
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Student Name</p>
                <p className="text-sm">{selectedPass?.studentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm">{selectedPass?.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium">From Date</p>
                <p className="text-sm">{new Date(selectedPass?.fromDate || "").toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">To Date</p>
                <p className="text-sm">{new Date(selectedPass?.toDate || "").toLocaleString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Reason</p>
              <p className="text-sm">{selectedPass?.reason}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Tutor Approval</p>
              <p className="text-sm capitalize">{selectedPass?.tutorApproval.status} by {selectedPass?.tutorApproval.approvedBy}</p>
              {selectedPass?.tutorApproval.comments && (
                <p className="text-xs text-muted-foreground">"{selectedPass?.tutorApproval.comments}"</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea 
                id="comments" 
                placeholder="Add your comments here"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => selectedPass && handleReject(selectedPass.id)}
              variant="destructive"
            >
              Reject
            </Button>
            <Button 
              onClick={() => selectedPass && handleApprove(selectedPass.id)}
              className="bg-ciet-green hover:bg-ciet-green/90"
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WardenDashboard;
