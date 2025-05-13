
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GatePass, UserRole } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ApprovalQueueProps {
  gatePasses: GatePass[];
  userRole: UserRole;
  onApprove: (gatePassId: string) => void;
  onReject: (gatePassId: string) => void;
  onView: (gatePass: GatePass) => void;
}

const ApprovalQueue = ({ 
  gatePasses, 
  userRole, 
  onApprove, 
  onReject,
  onView 
}: ApprovalQueueProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter gate passes based on user role and approval status
  const filteredPasses = gatePasses.filter(pass => {
    if (userRole === "tutor") {
      return pass.tutorApproval.status === "pending";
    } else if (userRole === "warden") {
      return pass.tutorApproval.status === "approved" && 
             pass.wardenApproval.status === "pending";
    } else if (userRole === "hod") {
      return pass.tutorApproval.status === "approved" && 
             pass.wardenApproval.status === "approved" && 
             pass.hodApproval.status === "pending";
    }
    return false;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>From Date</TableHead>
            <TableHead>To Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPasses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No pending approvals found
              </TableCell>
            </TableRow>
          ) : (
            filteredPasses.map((gatePass) => (
              <TableRow key={gatePass.id}>
                <TableCell className="font-medium">{gatePass.studentName}</TableCell>
                <TableCell>{gatePass.department}</TableCell>
                <TableCell>{formatDate(gatePass.fromDate)}</TableCell>
                <TableCell>{formatDate(gatePass.toDate)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{gatePass.reason}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-ciet-green text-ciet-green hover:bg-ciet-green hover:text-white"
                      onClick={() => onApprove(gatePass.id)}
                    >
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-ciet-red text-ciet-red hover:bg-ciet-red hover:text-white"
                      onClick={() => onReject(gatePass.id)}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onView(gatePass)}
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApprovalQueue;
