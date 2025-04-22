
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
import { analyzeResume } from '@/utils/modelService';
import { Candidate, JobDescription as JobDescriptionType, ParsedResume } from '@/types';

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
          
          const analysis = await analyzeResume(parsedResume, jd);
          
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
      const newCandidates = await Promise.all(
        results.map(async ({ file, parsed }) => {
          // Analyze resume against job description
          const analysis = await analyzeResume(parsed, jobDescription);
          
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
        title: 'Resumes Analyzed',
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="dashboard-container">
          <h1 className="text-2xl font-bold mb-6">Resume Screening Dashboard</h1>
          
          {!jobDescription ? (
            <div className="mb-6">
              <JobDescription onJobDescriptionChange={handleJobDescriptionChange} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Upload Resumes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResumeUploader onResumesParsed={handleResumesParsed} />
                    
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Current Job Description</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm font-medium">{jobDescription.title} at {jobDescription.company}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {jobDescription.description.length > 150 
                            ? `${jobDescription.description.substring(0, 150)}...` 
                            : jobDescription.description}
                        </p>
                        <button 
                          className="text-xs text-indigo-600 mt-2"
                          onClick={() => setJobDescription(null)}
                        >
                          Edit Job Description
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="h-[calc(100vh-450px)]">
                  <CandidateList 
                    candidates={candidates} 
                    selectedCandidate={selectedCandidate}
                    onSelectCandidate={setSelectedCandidate}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {selectedCandidate ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center">
                          <span>{selectedCandidate.name}</span>
                          <span className={`
                            text-sm rounded-full px-2.5 py-1
                            ${selectedCandidate.score >= 80 ? 'bg-green-100 text-green-800' : 
                              selectedCandidate.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                          `}>
                            {selectedCandidate.score}% Match
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="overview">
                          <TabsList className="mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="resume">Resume</TabsTrigger>
                            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
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
                            <Card>
                              <CardContent className="pt-6">
                                <div className="prose max-w-none">
                                  <h3>Resume Content</h3>
                                  <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
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
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">Experience</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {selectedCandidate.experience.map((exp, index) => (
                                    <div key={index} className="border-b pb-3 last:border-0">
                                      <div className="flex justify-between">
                                        <h4 className="font-medium">{exp.title}</h4>
                                        <span className="text-sm text-gray-500">
                                          {exp.startDate} - {exp.endDate || 'Present'}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600 mt-1">{exp.company}</p>
                                      <p className="text-sm mt-2">{exp.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">Education</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {selectedCandidate.education.map((edu, index) => (
                                    <div key={index} className="border-b pb-3 last:border-0">
                                      <div className="flex justify-between">
                                        <h4 className="font-medium">{edu.degree}</h4>
                                        <span className="text-sm text-gray-500">{edu.year}</span>
                                      </div>
                                      <p className="text-sm text-gray-600">{edu.institution}</p>
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
                  <div className="h-64 flex items-center justify-center text-gray-500 border rounded-lg">
                    {candidates.length > 0 
                      ? 'Select a candidate to view details'
                      : 'Upload resumes to get started'}
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
