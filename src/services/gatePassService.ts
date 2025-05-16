
import { GatePass } from "@/lib/types";
import { mockGatePasses } from "@/lib/mockData";

const LOCAL_STORAGE_KEY = "gate_passes";

// Initialize localStorage with mock data if empty
const initializeStorage = (): void => {
  const storedPasses = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (!storedPasses) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockGatePasses));
  }
};

// Get all gate passes
export const getAllGatePasses = (): GatePass[] => {
  initializeStorage();
  const passes = localStorage.getItem(LOCAL_STORAGE_KEY);
  return passes ? JSON.parse(passes) : [];
};

// Add a new gate pass
export const addGatePass = (newPass: GatePass): GatePass => {
  const passes = getAllGatePasses();
  passes.unshift(newPass); // Add to beginning of array
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(passes));
  return newPass;
};

// Update a gate pass
export const updateGatePass = (updatedPass: GatePass): GatePass => {
  const passes = getAllGatePasses();
  const updatedPasses = passes.map(pass => 
    pass.id === updatedPass.id ? updatedPass : pass
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPasses));
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
