
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import ResumeUploader from '@/components/ResumeUploader';
import JobDescription from '@/components/JobDescription';
import CandidateList from '@/components/CandidateList';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import SkillsMatch from '@/components/SkillsMatch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import { analyzeResumeWithOnlineModel } from '@/utils/onlineModelService';
import { Candidate, JobDescription as JobDescriptionType, ParsedResume } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [jobDescription, setJobDescription] = useState<JobDescriptionType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Effect to select the first candidate when the list changes
  useEffect(() => {
    if (candidates.length > 0 && !selectedCandidate) {
      setSelectedCandidate(candidates[0]);
    }
  }, [candidates, selectedCandidate]);

  const handleJobDescriptionChange = (newJobDescription: JobDescriptionType) => {
    setJobDescription(newJobDescription);
    toast({
      title: 'Job Description Saved',
      description: 'Job description has been saved successfully.',
    });
    
    // Re-analyze existing candidates with new job description
    if (candidates.length > 0) {
      analyzeExistingCandidates(newJobDescription);
    }
  };

  const analyzeExistingCandidates = async (jd: JobDescriptionType) => {
    setIsAnalyzing(true);
    
    try {
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const parsedResume: ParsedResume = {
            text: candidate.resumeText,
            skills: candidate.skills.map(s => s.name),
            experience: candidate.experience,
            education: candidate.education
          };
          
          const analysis = await analyzeResumeWithOnlineModel(parsedResume, jd);
          
          return {
            ...candidate,
            score: analysis.score,
            scoreBreakdown: analysis.scoreBreakdown,
            skills: analysis.skills,
            lastUpdated: new Date()
          };
        })
      );
      
      setCandidates(updatedCandidates);
      
      if (selectedCandidate) {
        const updatedSelected = updatedCandidates.find(c => c.id === selectedCandidate.id) || null;
        setSelectedCandidate(updatedSelected);
      }
      
      toast({
        title: 'Analysis Complete',
        description: `${updatedCandidates.length} resumes have been analyzed against the new job description.`,
      });
    } catch (error) {
      console.error('Error analyzing candidates:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Failed to analyze resumes against job description.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResumesParsed = async (
    results: { file: File; parsed: ParsedResume }[]
  ) => {
    if (!jobDescription) {
      toast({
        title: 'Job Description Required',
        description: 'Please add a job description before uploading resumes.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      toast({
        title: 'AI Analysis Started',
        description: 'Using online AI model to analyze resumes...',
      });
      
      const newCandidates = await Promise.all(
        results.map(async ({ file, parsed }) => {
          // Analyze resume against job description with online AI model
          const analysis = await analyzeResumeWithOnlineModel(parsed, jobDescription);
          
          // Create candidate object
          return {
            id: uuidv4(),
            name: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
            email: `candidate${Math.floor(Math.random() * 1000)}@example.com`,
            resumeText: parsed.text,
            resumeFile: file,
            resumeUrl: URL.createObjectURL(file),
            score: analysis.score,
            scoreBreakdown: analysis.scoreBreakdown,
            skills: analysis.skills,
            experience: parsed.experience,
            education: parsed.education,
            lastUpdated: new Date()
          };
        })
      );
      
      setCandidates(prev => [...prev, ...newCandidates]);
      
      toast({
        title: 'AI Analysis Complete',
        description: `${newCandidates.length} resumes have been analyzed successfully.`,
      });
    } catch (error) {
      console.error('Error processing resumes:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Failed to analyze one or more resumes.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="dashboard-container">
          <h1 className="text-2xl font-bold mb-6 gradient-heading">Resume AI Screening Dashboard</h1>
          
          {!jobDescription ? (
            <div className="mb-6">
              <Card className="glass-card overflow-hidden border-violet-500/20">
                <CardHeader className="bg-gradient-to-r from-violet-900/30 to-indigo-900/30 pb-2">
                  <CardTitle className="text-lg gradient-heading">Define Job Description</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <JobDescription onJobDescriptionChange={handleJobDescriptionChange} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="mb-6 glass-card border-violet-500/20">
                  <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
                    <CardTitle className="text-lg gradient-heading">Upload Resumes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4">
                      <Badge className="bg-violet-600 hover:bg-violet-700 mb-2">AI-Powered Analysis</Badge>
                      <ResumeUploader onResumesParsed={handleResumesParsed} />
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-medium mb-2 text-violet-400">Current Job Description</h3>
                      <div className="bg-black/40 border border-white/5 p-3 rounded-md">
                        <p className="text-sm font-medium text-white">{jobDescription.title} at {jobDescription.company}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {jobDescription.description.length > 150 
                            ? `${jobDescription.description.substring(0, 150)}...` 
                            : jobDescription.description}
                        </p>
                        <button 
                          className="text-xs text-violet-400 hover:text-violet-300 mt-2"
                          onClick={() => setJobDescription(null)}
                        >
                          Edit Job Description
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="h-[calc(100vh-450px)]">
                  {isAnalyzing ? (
                    <Card className="p-4 glass-card border-violet-500/20">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-12 w-12 rounded-full bg-violet-800/20" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32 bg-violet-800/20" />
                            <Skeleton className="h-3 w-24 bg-violet-800/20" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full bg-violet-800/20" />
                        <Skeleton className="h-4 w-full bg-violet-800/20" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-20 rounded-full bg-violet-800/20" />
                          <Skeleton className="h-8 w-20 rounded-full bg-violet-800/20" />
                          <Skeleton className="h-8 w-20 rounded-full bg-violet-800/20" />
                        </div>
                      </div>
                      <div className="mt-4 text-center text-sm text-violet-400 animate-pulse">
                        AI is analyzing resumes...
                      </div>
                    </Card>
                  ) : (
                    <CandidateList 
                      candidates={candidates} 
                      selectedCandidate={selectedCandidate}
                      onSelectCandidate={setSelectedCandidate}
                    />
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {selectedCandidate ? (
                  <div className="space-y-6">
                    <Card className="glass-card border-violet-500/20">
                      <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-white">{selectedCandidate.name}</span>
                          <span className={`
                            text-sm rounded-full px-2.5 py-1
                            ${selectedCandidate.score >= 80 ? 'bg-green-900/30 text-green-400' : 
                              selectedCandidate.score >= 60 ? 'bg-yellow-900/30 text-yellow-400' : 
                                'bg-red-900/30 text-red-400'}
                          `}>
                            {selectedCandidate.score}% Match
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="overview" className="mt-2">
                          <TabsList className="mb-4 bg-black/60">
                            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-violet-900/40">Overview</TabsTrigger>
                            <TabsTrigger value="resume" className="text-white data-[state=active]:bg-violet-900/40">Resume</TabsTrigger>
                            <TabsTrigger value="skills" className="text-white data-[state=active]:bg-violet-900/40">Skills Analysis</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-6">
                            <ScoreBreakdown scoreBreakdown={selectedCandidate.scoreBreakdown} />
                            
                            <SkillsMatch 
                              skills={selectedCandidate.skills}
                              requiredSkills={jobDescription.requiredSkills}
                              preferredSkills={jobDescription.preferredSkills}
                            />
                          </TabsContent>
                          
                          <TabsContent value="resume">
                            <Card className="glass-card border-violet-500/20">
                              <CardContent className="pt-6">
                                <div className="prose max-w-none">
                                  <h3 className="text-white">Resume Content</h3>
                                  <div className="bg-black/60 border border-white/5 p-4 rounded-md whitespace-pre-wrap font-mono text-sm text-gray-300">
                                    {selectedCandidate.resumeText}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="skills" className="space-y-6">
                            <SkillsMatch 
                              skills={selectedCandidate.skills}
                              requiredSkills={jobDescription.requiredSkills}
                              preferredSkills={jobDescription.preferredSkills}
                            />
                            
                            <Card className="glass-card border-violet-500/20">
                              <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
                                <CardTitle className="text-lg gradient-heading">Experience</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {selectedCandidate.experience.map((exp, index) => (
                                    <div key={index} className="border-b border-white/10 pb-3 last:border-0">
                                      <div className="flex justify-between">
                                        <h4 className="font-medium text-white">{exp.title}</h4>
                                        <span className="text-sm text-gray-400">
                                          {exp.startDate} - {exp.endDate || 'Present'}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-400 mt-1">{exp.company}</p>
                                      <p className="text-sm mt-2 text-gray-300">{exp.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="glass-card border-violet-500/20">
                              <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
                                <CardTitle className="text-lg gradient-heading">Education</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {selectedCandidate.education.map((edu, index) => (
                                    <div key={index} className="border-b border-white/10 pb-3 last:border-0">
                                      <div className="flex justify-between">
                                        <h4 className="font-medium text-white">{edu.degree}</h4>
                                        <span className="text-sm text-gray-400">{edu.year}</span>
                                      </div>
                                      <p className="text-sm text-gray-400">{edu.institution}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm">
                    {candidates.length > 0 
                      ? 'Select a candidate to view details'
                      : 'Upload resumes to get started with AI analysis'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
