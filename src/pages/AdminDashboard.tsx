
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { mockGatePasses, mockUsers } from "@/lib/mockData";
import { GatePass, User } from "@/lib/types";
import LeaveHistory from "@/components/LeaveHistory";
import UserManagement from "@/components/UserManagement";
import { LogOut, User as UserIcon } from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [gatePasses, setGatePasses] = useState<GatePass[]>([...mockGatePasses]);
  const [users, setUsers] = useState<User[]>([...mockUsers]);
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
    if (userData.role !== "admin") {
      toast.error("Unauthorized access");
      navigate('/login');
      return;
    }
    
    setUser(userData);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login');
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
              <span>{user.name} (Admin)</span>
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
            Admin Dashboard
          </p>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.role === "student").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.role !== "student").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Gate Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gatePasses.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {gatePasses.filter(p => p.status === "approved").length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="passes">Gate Passes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage students, tutors, wardens, and administrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement users={users} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="passes">
            <Card>
              <CardHeader>
                <CardTitle>All Gate Passes</CardTitle>
                <CardDescription>
                  View all gate pass requests across the hostel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveHistory gatePasses={gatePasses} />
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
    </div>
  );
};

export default AdminDashboard;
