
import React from 'react';
import NavBar from '@/components/NavBar';
import {
  BarChartIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  DownloadIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', applicants: 65, matches: 40, hires: 12 },
  { month: 'Feb', applicants: 78, matches: 45, hires: 15 },
  { month: 'Mar', applicants: 90, matches: 55, hires: 18 },
  { month: 'Apr', applicants: 81, matches: 50, hires: 20 },
  { month: 'May', applicants: 100, matches: 65, hires: 25 },
  { month: 'Jun', applicants: 110, matches: 70, hires: 28 },
];

const skillsData = [
  { name: 'JavaScript', value: 85 },
  { name: 'React', value: 78 },
  { name: 'Python', value: 65 },
  { name: 'Node.js', value: 60 },
  { name: 'Data Science', value: 55 },
  { name: 'UI/UX', value: 48 },
  { name: 'SQL', value: 45 },
  { name: 'AWS', value: 40 },
];

const scoreDistribution = [
  { score: '90-100', count: 15 },
  { score: '80-89', count: 30 },
  { score: '70-79', count: 45 },
  { score: '60-69', count: 25 },
  { score: '50-59', count: 20 },
  { score: '< 50', count: 10 },
];

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <main className="dashboard-container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <BarChartIcon className="inline-block mr-2 mb-1" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track your recruitment metrics and insights</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
              <CalendarIcon size={16} className="mr-1" />
              Last 30 days
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
              <DownloadIcon size={16} className="mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Applicants</p>
                  <h3 className="text-2xl font-bold mt-1">524</h3>
                  <div className="flex items-center text-green-500 mt-1">
                    <ArrowUpIcon size={14} />
                    <span className="text-xs font-medium ml-1">15% vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <TrendingUpIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Match Rate</p>
                  <h3 className="text-2xl font-bold mt-1">68%</h3>
                  <div className="flex items-center text-green-500 mt-1">
                    <ArrowUpIcon size={14} />
                    <span className="text-xs font-medium ml-1">8% vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <BarChartIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Score</p>
                  <h3 className="text-2xl font-bold mt-1">75.3</h3>
                  <div className="flex items-center text-green-500 mt-1">
                    <ArrowUpIcon size={14} />
                    <span className="text-xs font-medium ml-1">3.2 points vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hire Rate</p>
                  <h3 className="text-2xl font-bold mt-1">23%</h3>
                  <div className="flex items-center text-red-500 mt-1">
                    <ArrowDownIcon size={14} />
                    <span className="text-xs font-medium ml-1">2% vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <BarChartIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Applicant & Match Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="applicants" stackId="1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="matches" stackId="2" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="hires" stackId="3" stroke="#34d399" fill="#34d399" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDistribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="score" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" name="Candidates" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Skills Analysis</CardTitle>
            <Tabs defaultValue="demand">
              <TabsList className="bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="demand" className="text-xs">In Demand</TabsTrigger>
                <TabsTrigger value="trending" className="text-xs">Trending</TabsTrigger>
                <TabsTrigger value="rare" className="text-xs">Rare</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={skillsData}
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" name="Demand Score" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
