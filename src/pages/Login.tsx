
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { mockUsers } from "@/lib/mockData";
import { UserRole } from "@/lib/types";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication for demo purposes
    const user = mockUsers.find(u => 
      u.email.split('@')[0].toLowerCase() === username.toLowerCase() && 
      u.role === role
    );
    
    if (user && password === username) { // For demo: password = username
      // In a real app, you would set authenticated user in context/store
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success(`Welcome, ${user.name}!`);
      
      // Redirect based on role
      switch (user.role) {
        case "student":
          navigate('/student-dashboard');
          break;
        case "tutor":
          navigate('/tutor-dashboard');
          break;
        case "warden":
          navigate('/warden-dashboard');
          break;
        case "hod":
          navigate('/hod-dashboard');
          break;
        case "admin":
          navigate('/admin-dashboard');
          break;
      }
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to CIET Hostel</CardTitle>
            <CardDescription>
              Enter your credentials to access the gate pass system
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-username">Username</Label>
                    <Input 
                      id="student-username" 
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input 
                      id="student-password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-ciet-blue hover:bg-ciet-lightBlue">
                    Login as Student
                  </Button>
                </CardFooter>
              </form>
              <div className="p-4 text-center text-sm text-muted-foreground">
                <p>Demo login: rahul / rahul</p>
              </div>
            </TabsContent>
            
            <TabsContent value="staff">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff-username">Username</Label>
                    <Input 
                      id="staff-username" 
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staff-password">Password</Label>
                    <Input 
                      id="staff-password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <select
                      id="role"
                      className="w-full p-2 border rounded"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      required
                    >
                      <option value="tutor">Tutor</option>
                      <option value="warden">Warden</option>
                      <option value="hod">HOD</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-ciet-blue hover:bg-ciet-lightBlue">
                    Login as Staff
                  </Button>
                </CardFooter>
              </form>
              <div className="p-4 text-center text-sm text-muted-foreground">
                <p>Demo logins:</p>
                <p>Tutor: priya / priya</p>
                <p>Warden: anil / anil</p>
                <p>HOD: ramesh / ramesh</p>
                <p>Admin: suresh / suresh</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-ciet-blue text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CIET Hostel Gate Pass Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
