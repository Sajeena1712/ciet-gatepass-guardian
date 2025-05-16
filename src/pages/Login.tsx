
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
import { verifyStudentLogin, addStudentCredential } from "@/services/gatePassService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isRegistering, setIsRegistering] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === "student") {
      // Check student login against localStorage
      const student = verifyStudentLogin(username, password);
      
      if (student) {
        // Create user object with student details
        const user = {
          id: student.rollNo,
          name: student.name,
          email: `${student.rollNo}@ciet.edu`,
          role: "student",
          department: student.department,
          batch: student.batch
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Welcome, ${student.name}!`);
        navigate('/student-dashboard');
      } else {
        toast.error("Invalid student credentials. Please try again.");
      }
    } else {
      // For staff, use the mock data (existing implementation)
      const user = mockUsers.find(u => 
        u.email.split('@')[0].toLowerCase() === username.toLowerCase() && 
        u.role === role
      );
      
      if (user && password === username) { // For demo: password = username
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Welcome, ${user.name}!`);
        
        // Redirect based on role
        switch (user.role) {
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
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Register student in localStorage
      addStudentCredential({
        rollNo: username,
        password: password,
        name: studentName,
        department,
        batch
      });
      
      toast.success("Student registered successfully. You can now login.");
      setIsRegistering(false);
      // Clear registration form
      setStudentName("");
      setDepartment("");
      setBatch("");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
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
          
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => {
            setRole(value as UserRole);
            setIsRegistering(false);
          }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              {!isRegistering ? (
                <>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-username">Roll Number</Label>
                        <Input 
                          id="student-username" 
                          placeholder="Enter your roll number (e.g., 22bcs001)"
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
                    <CardFooter className="flex flex-col gap-2">
                      <Button type="submit" className="w-full bg-ciet-blue hover:bg-ciet-lightBlue">
                        Login as Student
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsRegistering(true)}
                      >
                        Register as Student
                      </Button>
                    </CardFooter>
                  </form>
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    <p>Demo login: 22bcs001 / 22bcs001</p>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-rollno">Roll Number</Label>
                        <Input 
                          id="register-rollno" 
                          placeholder="Enter your roll number (e.g., 22bcs001)"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input 
                          id="register-name" 
                          placeholder="Enter your full name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-department">Department</Label>
                        <Input 
                          id="register-department" 
                          placeholder="Enter your department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-batch">Batch (e.g. 2022-26)</Label>
                        <Input 
                          id="register-batch" 
                          placeholder="Enter your batch year"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button type="submit" className="w-full bg-ciet-blue hover:bg-ciet-lightBlue">
                        Register
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsRegistering(false)}
                      >
                        Back to Login
                      </Button>
                    </CardFooter>
                  </form>
                </>
              )}
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
