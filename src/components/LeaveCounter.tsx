
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GatePass } from "@/lib/types";
import { Calendar } from "lucide-react";

interface LeaveCounterProps {
  gatePasses: GatePass[];
}

const LeaveCounter = ({ gatePasses }: LeaveCounterProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Count leaves in current month
  const currentMonthLeaves = gatePasses.filter(pass => {
    const passDate = new Date(pass.fromDate);
    return passDate.getMonth() === currentMonth && 
           passDate.getFullYear() === currentYear;
  });
  
  // Total approved leaves
  const approvedLeaves = gatePasses.filter(pass => 
    pass.status === "approved"
  );
  
  // Pending leaves
  const pendingLeaves = gatePasses.filter(pass => 
    pass.status === "pending"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMonthLeaves.length}</div>
          <p className="text-xs text-muted-foreground">
            Leave requests in {new Date().toLocaleString('default', { month: 'long' })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Approved</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedLeaves.length}</div>
          <p className="text-xs text-muted-foreground">
            Total approved leaves
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingLeaves.length}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting approval
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveCounter;
