
import React from 'react';
import NavBar from '@/components/NavBar';
import { SettingsIcon, UserIcon, BellIcon, ShieldIcon, DatabaseIcon, KeyIcon, HelpCircleIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <main className="dashboard-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <SettingsIcon className="inline-block mr-2 mb-1" />
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col w-full bg-transparent h-auto space-y-1">
                <TabsTrigger value="profile" className="justify-start px-3 py-2 h-auto">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="account" className="justify-start px-3 py-2 h-auto">
                  <ShieldIcon className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="api" className="justify-start px-3 py-2 h-auto">
                  <KeyIcon className="mr-2 h-4 w-4" />
                  API Settings
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start px-3 py-2 h-auto">
                  <BellIcon className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="integration" className="justify-start px-3 py-2 h-auto">
                  <DatabaseIcon className="mr-2 h-4 w-4" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="help" className="justify-start px-3 py-2 h-auto">
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  Help & Support
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 pb-6 border-b">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                          <UserIcon className="h-12 w-12 text-gray-500" />
                        </div>
                        <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </Button>
                      </div>
                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <h3 className="font-medium">Profile Picture</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Upload a professional photo for your profile</p>
                        <div className="space-x-2 mt-3">
                          <Button size="sm">Upload</Button>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" value="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" value="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" value="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="(123) 456-7890" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about yourself" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Company" value="TechCorp Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Job Title</Label>
                        <Input id="role" placeholder="Job Title" value="HR Manager" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div></div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                      <Button>Update Password</Button>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Use an authentication app</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Use an authentication app to generate one-time security codes.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Sessions</h3>
                      <div>
                        <p className="font-medium">Active Sessions</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          These are the devices that are currently logged in to your account.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                                  <rect width="14" height="8" x="5" y="2" rx="2"/>
                                  <rect width="20" height="8" x="2" y="14" rx="2"/>
                                  <path d="M6 18h2"/>
                                  <path d="M12 18h6"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Current Session (Desktop)</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, CA • Last active just now</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                Logout
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                                  <path d="M12 18h.01"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Mobile Device</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">New York, NY • Last active 2 days ago</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                Logout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Customize how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New match notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails when new high-matching candidates are found</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Job application updates</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new applicants for your job postings</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Weekly reports</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly summaries of your recruitment activity</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing emails</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about new features and promotions</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable push notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Allow browser notifications for important alerts</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Notification Frequency</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="emailFrequency">Email digest frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="emailFrequency" className="w-full md:w-[240px]">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="real-time">Real-time</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Reset to Default</Button>
                      <Button>Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Manage your API keys and integrations for accessing the data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Keys</h3>
                      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-medium">Production API Key</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use this key for live applications</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input value="sk_prod_********************" readOnly className="font-mono" />
                            <Button size="sm" variant="outline">Show</Button>
                            <Button size="sm" variant="outline">Copy</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="font-medium">Development API Key</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use this key for testing in development</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input value="sk_dev_********************" readOnly className="font-mono" />
                            <Button size="sm" variant="outline">Show</Button>
                            <Button size="sm" variant="outline">Copy</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        <KeyIcon className="h-4 w-4 mr-2" />
                        Regenerate Keys
                      </Button>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">API Documentation</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Access our comprehensive API documentation to integrate with our AI model for resume analysis.
                      </p>
                      <Button variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        View Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integration" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect to other apps and services to enhance your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Slack</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications and updates in Slack</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <path d="m22 6-10 7L2 6"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Email Service</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Connect your email service for outreach</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect width="4" height="12" x="2" y="9"/>
                                <circle cx="4" cy="4" r="2"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">LinkedIn</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Import candidate profiles from LinkedIn</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                                <path d="M20 7h-9"/>
                                <path d="M14 17H5"/>
                                <circle cx="17" cy="17" r="3"/>
                                <circle cx="7" cy="7" r="3"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Google Drive</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Import resumes from Google Drive</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <Button variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M12 5v14"/>
                          <path d="M5 12h14"/>
                        </svg>
                        Add New Integration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="help" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>
                      Get help and access support resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-6 border rounded-lg hover:shadow-md transition-shadow text-center">
                        <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <path d="M12 17h.01"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Documentation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Browse our comprehensive guides and documentation to learn how to use all features.
                        </p>
                        <Button variant="outline">View Documentation</Button>
                      </div>
                      
                      <div className="p-6 border rounded-lg hover:shadow-md transition-shadow text-center">
                        <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Get in touch with our customer support team for personalized assistance.
                        </p>
                        <Button variant="outline">Contact Support</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                          <h4 className="font-medium">How accurate is the AI resume scoring?</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Our AI model is continuously trained on real-world data and achieves over 90% accuracy in matching candidates to job requirements.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                          <h4 className="font-medium">Can I customize the scoring criteria?</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Yes, you can adjust the weights for different criteria like skills, experience, and education to match your specific recruitment needs.
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                          <h4 className="font-medium">How do I export candidate data?</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            You can export candidate data in CSV or PDF format from the Candidates page using the export button in the top right.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
