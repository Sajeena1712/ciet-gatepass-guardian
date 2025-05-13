
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { GatePass, User } from "@/lib/types";

interface GatePassFormProps {
  user: User;
  onSubmit: (gatePass: Partial<GatePass>) => void;
}

const GatePassForm = ({ user, onSubmit }: GatePassFormProps) => {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  
  const validateDates = () => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const now = new Date();
    
    if (from < now) {
      toast.error("From date must be in the future");
      return false;
    }
    
    if (to < from) {
      toast.error("To date must be after from date");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }
    
    setLoading(true);
    
    const newGatePass: Partial<GatePass> = {
      studentId: user.id,
      studentName: user.name,
      department: user.department || "",
      batch: user.batch || "",
      reason,
      fromDate,
      toDate,
      status: "pending",
      tutorApproval: {
        status: "pending"
      },
      wardenApproval: {
        status: "pending"
      },
      hodApproval: {
        status: "pending"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentNotified: false
    };
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(newGatePass);
      setReason("");
      setFromDate("");
      setToDate("");
      setLoading(false);
      toast.success("Gate pass application submitted successfully!");
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for Gate Pass</CardTitle>
        <CardDescription>
          Fill in the details below to request a new gate pass
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Leave</Label>
            <Textarea 
              id="reason" 
              placeholder="Enter detailed reason for your leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Input 
                id="from-date" 
                type="datetime-local" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input 
                id="to-date" 
                type="datetime-local" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="font-medium">Note:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Parent will be notified once you submit this form</li>
              <li>Approval process: Tutor → Warden → HOD</li>
              <li>QR code will be generated after final approval</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-ciet-blue hover:bg-ciet-lightBlue"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Gate Pass Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GatePassForm;
