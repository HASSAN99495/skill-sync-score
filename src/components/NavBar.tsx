
import React from 'react';
import { UserIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 text-white p-1.5 rounded">
            <SearchIcon size={20} />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            SkillSyncScore
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            Jobs
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            Analytics
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            Settings
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-600">
            <UserIcon size={16} className="mr-2" /> 
            Account
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
