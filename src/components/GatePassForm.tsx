
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
      // Submit the gate pass
      onSubmit(newGatePass);
      
      // Simulate SMS notification to parent
      if (user.parentPhoneNumber) {
        // Mock parent SMS notification
        toast.info(`SMS notification sent to parent at ${user.parentPhoneNumber}`);
      } else {
        toast.warning("Parent phone number not available. Cannot send SMS notification.");
      }
      
      // Reset form
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
          
          {user.parentPhoneNumber ? (
            <div className="bg-green-50 p-3 rounded-md text-sm border border-green-200">
              <p className="font-medium text-green-800">Parent Contact Information:</p>
              <p className="text-green-700 mt-1">Parent phone number: {user.parentPhoneNumber}</p>
              <p className="text-gray-500 mt-1">SMS notification will be sent to this number when you submit.</p>
            </div>
          ) : (
            <div className="bg-amber-50 p-3 rounded-md text-sm border border-amber-200">
              <p className="font-medium text-amber-800">No parent phone number registered</p>
              <p className="text-amber-700 mt-1">Please contact your tutor to update your parent's contact information.</p>
            </div>
          )}
          
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
