
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-ciet-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="https://placeholder.svg" 
            alt="CIET Logo" 
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h1 className="font-bold text-xl md:text-2xl">CIET Hostel</h1>
            <p className="text-xs md:text-sm">Gate Pass Management System</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-ciet-accent transition-colors">Home</Link>
          <Link to="/login" className="hover:text-ciet-accent transition-colors">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-ciet-blue">Login</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-ciet-blue">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
