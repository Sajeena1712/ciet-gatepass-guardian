
import { useState } from "react";
import { getDatabaseState } from "@/services/gatePassService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DatabaseViewer = () => {
  const [dbState, setDbState] = useState(getDatabaseState());
  
  const refreshData = () => {
    setDbState(getDatabaseState());
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>LocalStorage Database State</CardTitle>
        <Button onClick={refreshData} size="sm">Refresh Data</Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
          <p className="font-medium text-yellow-800">Note: This application uses browser localStorage for data storage</p>
          <p>In a production environment, this would be replaced with a proper database like MySQL, PostgreSQL, or MongoDB.</p>
          <p className="mt-1">SMS messages are only simulated and not actually sent. Check the console logs to see simulated SMS activity.</p>
          <p className="font-medium mt-2">Test mobile number: 8778136006 is used for all students without a parent phone number.</p>
        </div>
        
        <Tabs defaultValue="students" className="mt-4">
          <TabsList>
            <TabsTrigger value="students">Student Credentials</TabsTrigger>
            <TabsTrigger value="passes">Gate Passes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="mt-4">
            <h3 className="text-lg font-medium mb-2">Student Credentials in Storage:</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Batch</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dbState.studentCredentials.length > 0 ? (
                    dbState.studentCredentials.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.password}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No student credentials found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="passes" className="mt-4">
            <h3 className="text-lg font-medium mb-2">Gate Passes in Storage:</h3>
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>From Date</TableHead>
                    <TableHead>To Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SMS Notification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dbState.gatePasses.length > 0 ? (
                    dbState.gatePasses.map((pass) => (
                      <TableRow key={pass.id}>
                        <TableCell className="font-medium">{pass.id}</TableCell>
                        <TableCell>{pass.studentName}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{pass.reason}</TableCell>
                        <TableCell>{new Date(pass.fromDate).toLocaleString()}</TableCell>
                        <TableCell>{new Date(pass.toDate).toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                            ${pass.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              pass.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {pass.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          SMS would be sent to: {pass.parentPhoneNumber || "8778136006 (default)"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No gate passes found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DatabaseViewer;
