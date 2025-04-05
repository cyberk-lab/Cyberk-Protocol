import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/portfolio" className="flex items-center">
          <img
            src="/logo-1.png"
            alt="Cyberk Logo"
            className="h-8 w-auto"
            onError={(e) => {
              console.error("Logo failed to load");
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-1 rounded-lg cursor-pointer">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#3D88CF] text-white text-xs">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-gray-800 text-sm font-medium hidden sm:inline-block">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-gray-500 text-xs hidden sm:inline-block">
                  {user?.email}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-1 bg-white shadow-lg border-gray-200 text-gray-800">
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" asChild>
              <Link to="/portfolio">Portfolio</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" asChild>
              <Link to="/portfolio-details">Portfolio Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" asChild>
              <Link to="/swap">Swap $CBK</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" asChild>
              <Link to="/admin">Admin Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-gray-100 cursor-pointer text-[#E53935]"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
