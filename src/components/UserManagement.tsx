
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit, Key, Phone, Save, User as UserIcon, X } from "lucide-react";

interface UserManagementProps {
  users: User[];
}

const UserManagement = ({ users: initialUsers }: UserManagementProps) => {
  // Add the test phone number as default when empty
  const usersWithDefaultPhones = initialUsers.map(user => {
    if (user.role === "student" && !user.parentPhoneNumber) {
      return { ...user, parentPhoneNumber: "8778136006" };
    }
    return user;
  });
  
  const [users, setUsers] = useState<User[]>(usersWithDefaultPhones);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const handleEdit = (userId: string, currentPhone?: string) => {
    setEditingUser(userId);
    setPhoneNumber(currentPhone || "");
  };
  
  const handleSave = (userId: string) => {
    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Update user
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, parentPhoneNumber: phoneNumber };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setEditingUser(null);
    toast.success("Parent phone number updated successfully");
    
    // Mock SMS notification to parent
    toast.info(`SMS notification sent to ${phoneNumber} about the update`);
    console.log(`SIMULATED: SMS notification would be sent to ${phoneNumber} about contact update`);
  };
  
  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="rounded-md border">
      <div className="bg-yellow-50 p-3 border-b border-yellow-200">
        <p className="font-medium text-yellow-800">Phone Number Information</p>
        <p className="text-sm text-yellow-700">
          Default test number: <span className="font-medium">8778136006</span> is used for all students without a parent phone number.
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          Note: SMS messages are only simulated and not actually sent. Check console logs for simulated SMS activity.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Parent Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground capitalize">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.department || "-"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {editingUser === user.id ? (
                    <Input 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="max-w-[150px]"
                    />
                  ) : (
                    <span className={user.role === "student" ? "font-medium" : ""}>
                      {user.parentPhoneNumber || (user.role === "student" ? "8778136006 (default)" : "-")}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {editingUser === user.id ? (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSave(user.id)}
                      >
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      {user.role === "student" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(user.id, user.parentPhoneNumber)}
                        >
                          <Phone className="h-4 w-4 mr-1" /> Edit Phone
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Key className="h-4 w-4 mr-1" /> Reset Password
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
