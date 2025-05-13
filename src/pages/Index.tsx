
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import FacilityCard from "@/components/FacilityCard";
import { mockFacilities } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ciet-blue to-ciet-lightBlue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to CIET Hostel</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Coimbatore Institute of Engineering and Technology provides excellent hostel facilities 
            with proper gate pass management system.
          </p>
          <Button asChild size="lg" className="bg-white text-ciet-blue hover:bg-ciet-accent hover:text-white">
            <Link to="/login">Student Login</Link>
          </Button>
        </div>
      </div>
      
      {/* Image Banner */}
      <div className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Our Campus & Facilities</h2>
          <Banner />
        </div>
      </div>
      
      {/* Facilities Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Hostel Facilities</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            CIET provides world-class hostel facilities to ensure students have a comfortable and productive stay.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Address Section */}
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Location</h2>
          <address className="not-italic mb-6">
            <p className="text-lg font-medium">Coimbatore Institute of Engineering and Technology</p>
            <p>Vellimalai Pattinam, Narasipuram Post,</p>
            <p>Thondamuthur via, Coimbatore,</p>
            <p>Tamil Nadu – 641109</p>
          </address>
          <div className="mt-6">
            <Button asChild variant="outline">
              <a 
                href="https://maps.google.com/?q=Coimbatore+Institute+of+Engineering+and+Technology" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-ciet-blue text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CIET Hostel Gate Pass Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
