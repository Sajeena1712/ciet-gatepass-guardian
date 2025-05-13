
import { Facility, GatePass, User } from "./types";

export const mockUsers: User[] = [
  {
    id: "student1",
    name: "Rahul Sharma",
    email: "rahul@ciet.edu",
    role: "student",
    department: "CSE",
    batch: "2023",
    phoneNumber: "9876543210",
    parentPhoneNumber: "9876543211"
  },
  {
    id: "tutor1",
    name: "Dr. Priya Singh",
    email: "priya@ciet.edu",
    role: "tutor",
    department: "CSE"
  },
  {
    id: "warden1",
    name: "Dr. Anil Kumar",
    email: "anil@ciet.edu",
    role: "warden"
  },
  {
    id: "hod1",
    name: "Dr. Ramesh Patel",
    email: "ramesh@ciet.edu",
    role: "hod",
    department: "CSE"
  },
  {
    id: "admin1",
    name: "Suresh Menon",
    email: "suresh@ciet.edu",
    role: "admin"
  }
];

export const mockFacilities: Facility[] = [
  {
    id: 1,
    name: "24x7 Security",
    description: "Round-the-clock security personnel to ensure student safety",
    icon: "shield"
  },
  {
    id: 2,
    name: "Wi-Fi Enabled Campus",
    description: "High-speed internet connectivity throughout the campus",
    icon: "wifi"
  },
  {
    id: 3,
    name: "Hygienic Food",
    description: "Nutritious and hygienic meals prepared in modern kitchen",
    icon: "utensils"
  },
  {
    id: 4,
    name: "Medical Assistance",
    description: "On-campus medical facility with qualified staff",
    icon: "medical"
  },
  {
    id: 5,
    name: "Spacious Rooms",
    description: "Well-ventilated rooms with comfortable furnishings",
    icon: "bed"
  },
  {
    id: 6,
    name: "Clean Bathrooms",
    description: "Regularly maintained clean and hygienic bathrooms",
    icon: "shower"
  },
  {
    id: 7,
    name: "Study Hall",
    description: "Quiet study spaces for focused academic work",
    icon: "book"
  },
  {
    id: 8,
    name: "Laundry Services",
    description: "In-house laundry facility for student convenience",
    icon: "washing-machine"
  }
];

export const mockGatePasses: GatePass[] = [
  {
    id: "gp1",
    studentId: "student1",
    studentName: "Rahul Sharma",
    department: "CSE",
    batch: "2023",
    reason: "Family function",
    fromDate: "2023-05-12T10:00:00",
    toDate: "2023-05-15T18:00:00",
    status: "approved",
    tutorApproval: {
      status: "approved",
      timestamp: "2023-05-10T11:30:00",
      comments: "Approved",
      approvedBy: "Dr. Priya Singh"
    },
    wardenApproval: {
      status: "approved",
      timestamp: "2023-05-10T14:45:00",
      comments: "Approved",
      approvedBy: "Dr. Anil Kumar"
    },
    hodApproval: {
      status: "approved",
      timestamp: "2023-05-10T16:20:00",
      comments: "Approved",
      approvedBy: "Dr. Ramesh Patel"
    },
    createdAt: "2023-05-10T09:15:00",
    updatedAt: "2023-05-10T16:20:00",
    parentNotified: true,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAklEQVR4AewaftIAAAKzSURBVO3BQa7jSAwFwX6E7n/lHC+5KkCQ7ZkPZkT8g7XeYq23WOst1nqLtd5irbc"
  },
  {
    id: "gp2",
    studentId: "student1",
    studentName: "Rahul Sharma",
    department: "CSE",
    batch: "2023",
    reason: "Medical appointment",
    fromDate: "2023-04-25T09:00:00",
    toDate: "2023-04-25T18:00:00",
    status: "approved",
    tutorApproval: {
      status: "approved",
      timestamp: "2023-04-24T10:20:00",
      comments: "Medical reason",
      approvedBy: "Dr. Priya Singh"
    },
    wardenApproval: {
      status: "approved",
      timestamp: "2023-04-24T13:15:00",
      comments: "Approved",
      approvedBy: "Dr. Anil Kumar"
    },
    hodApproval: {
      status: "approved",
      timestamp: "2023-04-24T15:40:00",
      comments: "Approved",
      approvedBy: "Dr. Ramesh Patel"
    },
    createdAt: "2023-04-24T09:45:00",
    updatedAt: "2023-04-24T15:40:00",
    parentNotified: true
  },
  {
    id: "gp3",
    studentId: "student1",
    studentName: "Rahul Sharma",
    department: "CSE",
    batch: "2023",
    reason: "Personal work",
    fromDate: "2023-05-20T10:00:00",
    toDate: "2023-05-20T20:00:00",
    status: "pending",
    tutorApproval: {
      status: "approved",
      timestamp: "2023-05-19T11:10:00",
      comments: "Approved",
      approvedBy: "Dr. Priya Singh"
    },
    wardenApproval: {
      status: "pending"
    },
    hodApproval: {
      status: "pending"
    },
    createdAt: "2023-05-19T09:30:00",
    updatedAt: "2023-05-19T11:10:00",
    parentNotified: true
  }
];

export const bannerImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1589498718452-76b27accb076?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1588064719685-bd29437024f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1592950630581-03cb41342cc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1604468557868-ca78625918e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
];
