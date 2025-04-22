
import React from 'react';
import NavBar from '@/components/NavBar';
import { 
  BriefcaseIcon, 
  PlusIcon, 
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  ArrowUpRightIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechSolutions Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    applicants: 18,
    status: "Active",
    matches: 5
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "New York, NY",
    type: "Full-time",
    posted: "1 week ago",
    applicants: 32,
    status: "Active",
    matches: 12
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateCorp",
    location: "Austin, TX",
    type: "Full-time",
    posted: "3 days ago",
    applicants: 24,
    status: "Active",
    matches: 8
  },
  {
    id: 4,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    posted: "5 days ago",
    applicants: 15,
    status: "Active",
    matches: 6
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "1 day ago",
    applicants: 9,
    status: "Active",
    matches: 3
  }
];

const Jobs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <main className="dashboard-container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <BriefcaseIcon className="inline-block mr-2 mb-1" />
              Job Listings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your job postings and view candidate matches</p>
          </div>
          
          <Button className="mt-4 md:mt-0 btn-gradient">
            <PlusIcon size={16} className="mr-1" />
            Post New Job
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">5</h3>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <BriefcaseIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">98</h3>
                  <p className="text-sm text-gray-500">Total Applicants</p>
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <UsersIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">34</h3>
                  <p className="text-sm text-gray-500">High Matches</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <ArrowUpRightIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md border-gray-100 dark:border-gray-800">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-850">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 flex space-x-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search jobs..." 
                    className="pl-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <Button variant="outline">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
              
              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList className="bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="all" className="text-xs">All Jobs</TabsTrigger>
                  <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                  <TabsTrigger value="closed" className="text-xs">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Posted</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Applicants</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Matches</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {jobsData.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>{job.company}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <MapPinIcon size={14} className="mr-1" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        {job.posted}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <UsersIcon size={14} className="mr-1" />
                        {job.applicants}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        {job.matches} High Matches
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm" className="text-primary">
                        View Details
                        <ChevronRightIcon size={16} className="ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Jobs;
