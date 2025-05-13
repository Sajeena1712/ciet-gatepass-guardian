
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GatePass } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeaveHistoryProps {
  gatePasses: GatePass[];
  showActions?: boolean;
  onView?: (gatePass: GatePass) => void;
}

const LeaveHistory = ({ gatePasses, showActions = false, onView }: LeaveHistoryProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-ciet-green">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-ciet-red">Rejected</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request Date</TableHead>
            <TableHead>From Date</TableHead>
            <TableHead>To Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {gatePasses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 6 : 5} className="text-center">
                No gate pass records found
              </TableCell>
            </TableRow>
          ) : (
            gatePasses.map((gatePass) => (
              <TableRow key={gatePass.id}>
                <TableCell>{formatDate(gatePass.createdAt)}</TableCell>
                <TableCell>{formatDate(gatePass.fromDate)}</TableCell>
                <TableCell>{formatDate(gatePass.toDate)}</TableCell>
                <TableCell>{gatePass.reason}</TableCell>
                <TableCell>{getStatusBadge(gatePass.status)}</TableCell>
                {showActions && (
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onView && onView(gatePass)}
                    >
                      View
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveHistory;
