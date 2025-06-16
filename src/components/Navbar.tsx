
import { useState } from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

const Navbar = ({ isAdminMode, setIsAdminMode }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PropFirmHub
              </span>
            </div>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#home" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#firms" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                All Firms
              </a>
              <a href="#reviews" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                Reviews
              </a>
              <a href="#compare" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                Compare
              </a>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="text-gray-300 hover:text-blue-400"
            >
              <User className="h-4 w-4 mr-2" />
              {isAdminMode ? 'User View' : 'Admin'}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Write Review
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-blue-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#firms" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              All Firms
            </a>
            <a href="#reviews" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Reviews
            </a>
            <a href="#compare" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
              Compare
            </a>
            <div className="border-t border-gray-700 pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="w-full text-left text-gray-300 hover:text-blue-400 justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                {isAdminMode ? 'User View' : 'Admin'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
