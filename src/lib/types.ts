
export type UserRole = "student" | "tutor" | "warden" | "hod" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  batch?: string;
  phoneNumber?: string;
  parentPhoneNumber?: string;
}

export interface GatePass {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  batch: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
  tutorApproval: ApprovalStatus;
  wardenApproval: ApprovalStatus;
  hodApproval: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  parentNotified: boolean;
  qrCode?: string;
}

export interface ApprovalStatus {
  status: "pending" | "approved" | "rejected";
  timestamp?: string;
  comments?: string;
  approvedBy?: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
}
