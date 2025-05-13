
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
  const [users, setUsers] = useState<User[]>(initialUsers);
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
  };
  
  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="rounded-md border">
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
                    user.parentPhoneNumber || "-"
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
