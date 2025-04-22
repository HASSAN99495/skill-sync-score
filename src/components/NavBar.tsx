
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

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary text-white p-1.5 rounded-md">
              <SearchIcon size={20} />
            </div>
            <span className="text-xl font-semibold gradient-heading">
              SkillSyncScore
            </span>
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
              className="rounded-full" 
              onClick={toggleTheme}
            >
              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <BellIcon size={18} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <p className="font-medium text-sm">New match found</p>
                    <p className="text-xs text-muted-foreground">A new candidate matches your Senior Developer role at 85%</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-muted/50 cursor-pointer">
                    <p className="font-medium text-sm">Resume analysis complete</p>
                    <p className="text-xs text-muted-foreground">10 resumes have been analyzed for Product Manager role</p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 border-gray-300 dark:border-gray-700">
                  <UserIcon size={16} className="mr-2" /> 
                  Account
                  <ChevronDownIcon size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon size={14} className="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon size={14} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOutIcon size={14} className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 dark:border-gray-800 mt-3 space-y-1">
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
