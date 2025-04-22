
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  SearchIcon, 
  BriefcaseIcon, 
  LayoutDashboardIcon, 
  BarChartIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-black/90 shadow-md border-b border-violet-900/20 sticky top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-1.5 rounded-md">
              <SearchIcon size={20} />
            </div>
            <span className="text-xl font-semibold gradient-heading">
              ResumeAI
            </span>
            <Badge variant="outline" className="ml-2 text-violet-400 border-violet-500 text-[10px] font-normal">
              AI-Powered
            </Badge>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="nav-link nav-link-active">
              <LayoutDashboardIcon size={18} className="mr-1 inline-block" />
              Dashboard
            </Link>
            <Link to="/jobs" className="nav-link">
              <BriefcaseIcon size={18} className="mr-1 inline-block" />
              Jobs
            </Link>
            <Link to="/analytics" className="nav-link">
              <BarChartIcon size={18} className="mr-1 inline-block" />
              Analytics
            </Link>
            <Link to="/settings" className="nav-link">
              <SettingsIcon size={18} className="mr-1 inline-block" />
              Settings
            </Link>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-violet-400 hover:text-violet-300 hover:bg-violet-900/20" 
              onClick={toggleTheme}
            >
              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-violet-400 hover:text-violet-300 hover:bg-violet-900/20 relative">
                  <BellIcon size={18} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-violet-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-violet-900/20 text-gray-200">
                <DropdownMenuLabel className="text-violet-400">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-violet-900/20" />
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-3 hover:bg-violet-900/20 cursor-pointer">
                    <p className="font-medium text-sm text-white">New match found</p>
                    <p className="text-xs text-gray-400">A new candidate matches your Senior Developer role at 85%</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-violet-900/20 cursor-pointer">
                    <p className="font-medium text-sm text-white">Resume analysis complete</p>
                    <p className="text-xs text-gray-400">10 resumes have been analyzed for Product Manager role</p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 border-violet-900/30 bg-black text-violet-300 hover:bg-violet-900/20 hover:border-violet-900/50">
                  <UserIcon size={16} className="mr-2" /> 
                  Account
                  <ChevronDownIcon size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-violet-900/20 text-gray-200">
                <DropdownMenuLabel className="text-violet-400">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-violet-900/20" />
                <DropdownMenuItem className="focus:bg-violet-900/20 cursor-pointer">
                  <UserIcon size={14} className="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-violet-900/20 cursor-pointer">
                  <SettingsIcon size={14} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-violet-900/20" />
                <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-400 cursor-pointer">
                  <LogOutIcon size={14} className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full md:hidden text-violet-400 hover:text-violet-300 hover:bg-violet-900/20" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-violet-900/20 mt-3 space-y-1">
            <Link to="/" className="nav-link nav-link-active block">
              <LayoutDashboardIcon size={18} className="mr-1 inline-block" />
              Dashboard
            </Link>
            <Link to="/jobs" className="nav-link block">
              <BriefcaseIcon size={18} className="mr-1 inline-block" />
              Jobs
            </Link>
            <Link to="/analytics" className="nav-link block">
              <BarChartIcon size={18} className="mr-1 inline-block" />
              Analytics
            </Link>
            <Link to="/settings" className="nav-link block">
              <SettingsIcon size={18} className="mr-1 inline-block" />
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
