
import { GatePass, User } from "@/lib/types";
import { mockGatePasses } from "@/lib/mockData";

const GATE_PASSES_KEY = "gate_passes";
const STUDENT_CREDENTIALS_KEY = "student_credentials";

// Initialize localStorage with mock data if empty
const initializeStorage = (): void => {
  const storedPasses = localStorage.getItem(GATE_PASSES_KEY);
  
  if (!storedPasses) {
    localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(mockGatePasses));
  }
  
  // Initialize student credentials with a sample student
  const storedCredentials = localStorage.getItem(STUDENT_CREDENTIALS_KEY);
  
  if (!storedCredentials) {
    const sampleCredentials = [
      { rollNo: "22bcs001", password: "22bcs001", name: "Sample Student", department: "Computer Science", batch: "2022-26" }
    ];
    localStorage.setItem(STUDENT_CREDENTIALS_KEY, JSON.stringify(sampleCredentials));
  }
};

// Get all gate passes
export const getAllGatePasses = (): GatePass[] => {
  initializeStorage();
  const passes = localStorage.getItem(GATE_PASSES_KEY);
  return passes ? JSON.parse(passes) : [];
};

// Add a new gate pass
export const addGatePass = (newPass: GatePass): GatePass => {
  const passes = getAllGatePasses();
  passes.unshift(newPass); // Add to beginning of array
  localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(passes));
  return newPass;
};

// Update a gate pass
export const updateGatePass = (updatedPass: GatePass): GatePass => {
  const passes = getAllGatePasses();
  const updatedPasses = passes.map(pass => 
    pass.id === updatedPass.id ? updatedPass : pass
  );
  localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(updatedPasses));
  return updatedPass;
};

// Get gate passes by student ID
export const getPassesByStudentId = (studentId: string): GatePass[] => {
  const passes = getAllGatePasses();
  return passes.filter(pass => pass.studentId === studentId);
};

// Get gate passes filtered by approval status and role
export const getPendingApprovalsByRole = (role: "tutor" | "warden" | "hod"): GatePass[] => {
  const passes = getAllGatePasses();
  
  if (role === "tutor") {
    return passes.filter(pass => pass.tutorApproval.status === "pending");
  } else if (role === "warden") {
    return passes.filter(pass => 
      pass.tutorApproval.status === "approved" && pass.wardenApproval.status === "pending"
    );
  } else if (role === "hod") {
    return passes.filter(pass => 
      pass.tutorApproval.status === "approved" && 
      pass.wardenApproval.status === "approved" && 
      pass.hodApproval.status === "pending"
    );
  }
  
  return [];
};

// Student credentials management
interface StudentCredential {
  rollNo: string;
  password: string;
  name: string;
  department: string;
  batch: string;
}

// Get all student credentials
export const getAllStudentCredentials = (): StudentCredential[] => {
  initializeStorage();
  const credentials = localStorage.getItem(STUDENT_CREDENTIALS_KEY);
  return credentials ? JSON.parse(credentials) : [];
};

// Add a new student credential
export const addStudentCredential = (credential: StudentCredential): StudentCredential => {
  const credentials = getAllStudentCredentials();
  // Check if the roll number already exists
  const exists = credentials.some(cred => cred.rollNo === credential.rollNo);
  
  if (exists) {
    throw new Error("Roll number already exists");
  }
  
  credentials.push(credential);
  localStorage.setItem(STUDENT_CREDENTIALS_KEY, JSON.stringify(credentials));
  return credential;
};

// Verify student login
export const verifyStudentLogin = (rollNo: string, password: string): StudentCredential | null => {
  const credentials = getAllStudentCredentials();
  const student = credentials.find(cred => cred.rollNo === rollNo && cred.password === password);
  return student || null;
};
