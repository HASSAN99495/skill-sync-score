
import { ParsedResume, JobDescription, ScoreBreakdown, Candidate, Skill } from '../types';

// In a real implementation, this would connect to a serverless function 
// or API that handles the ML model interactions
export async function analyzeResume(
  parsedResume: ParsedResume,
  jobDescription: JobDescription
): Promise<{
  score: number;
  scoreBreakdown: ScoreBreakdown;
  skills: Skill[];
}> {
  try {
    // Simulate API call to ML model
    console.log('Analyzing resume against job description');
    
    // For demo purposes, we'll simulate the scoring logic
    const skillsMatch = calculateSkillsMatch(parsedResume.skills, jobDescription);
    const experienceMatch = calculateExperienceMatch(parsedResume.experience, jobDescription);
    const educationMatch = Math.random() * 100; // Simplified for demo
    const keywordMatch = calculateKeywordMatch(parsedResume.text, jobDescription.description);
    const atsCompatibility = 75 + Math.random() * 20; // Simplified for demo
    
    // Calculate overall score as weighted average
    const overall = (
      skillsMatch * 0.35 + 
      experienceMatch * 0.3 + 
      educationMatch * 0.15 + 
      keywordMatch * 0.15 + 
      atsCompatibility * 0.05
    );
    
    // Create skills array with match information
    const skills = parsedResume.skills.map(skill => ({
      name: skill,
      level: Math.floor(Math.random() * 5) + 1, // Random level 1-5
      isMatch: jobDescription.requiredSkills.includes(skill) || 
               jobDescription.preferredSkills.includes(skill)
    }));
    
    return {
      score: Math.round(overall),
      scoreBreakdown: {
        overall: Math.round(overall),
        skillsMatch: Math.round(skillsMatch),
        experienceMatch: Math.round(experienceMatch),
        educationMatch: Math.round(educationMatch),
        keywordMatch: Math.round(keywordMatch),
        atsCompatibility: Math.round(atsCompatibility)
      },
      skills
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
}

function calculateSkillsMatch(skills: string[], jobDescription: JobDescription): number {
  const requiredSkillMatches = jobDescription.requiredSkills.filter(
    skill => skills.some(s => s.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const preferredSkillMatches = jobDescription.preferredSkills.filter(
    skill => skills.some(s => s.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const requiredScore = requiredSkillMatches / jobDescription.requiredSkills.length * 100;
  const preferredScore = preferredSkillMatches / Math.max(1, jobDescription.preferredSkills.length) * 100;
  
  // Weigh required skills more heavily
  return requiredScore * 0.7 + preferredScore * 0.3;
}

function calculateExperienceMatch(
  experience: any[], 
  jobDescription: JobDescription
): number {
  // Simple implementation for demo
  // This would normally use more sophisticated matching algorithms
  
  // Calculate total years of experience
  const totalYears = experience.reduce((sum, exp) => {
    const startYear = parseInt(exp.startDate);
    const endYear = exp.endDate === 'Present' 
      ? new Date().getFullYear() 
      : parseInt(exp.endDate);
    
    if (!isNaN(startYear) && !isNaN(endYear)) {
      return sum + (endYear - startYear);
    }
    return sum;
  }, 0);
  
  // Score based on minimum experience requirement
  if (totalYears >= jobDescription.minimumExperience * 1.5) {
    return 100; // Exceeds requirement by 50% or more
  } else if (totalYears >= jobDescription.minimumExperience) {
    return 80; // Meets requirement
  } else if (totalYears >= jobDescription.minimumExperience * 0.75) {
    return 60; // Slightly below requirement
  } else if (totalYears >= jobDescription.minimumExperience * 0.5) {
    return 40; // Significantly below requirement
  } else {
    return 20; // Far below requirement
  }
}

function calculateKeywordMatch(resumeText: string, jobDescription: string): number {
  // Extract important keywords from job description
  const jobKeywords = extractKeywords(jobDescription);
  
  // Count how many keywords appear in the resume
  const matchedKeywords = jobKeywords.filter(keyword => 
    resumeText.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Calculate match percentage
  return (matchedKeywords.length / jobKeywords.length) * 100;
}

function extractKeywords(text: string): string[] {
  // This is a simplified keyword extraction
  // A real implementation would use NLP techniques
  
  // Remove common words
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'in', 'to', 'with', 'for', 'of'];
  
  // Split text into words and filter
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Get top keywords
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(entry => entry[0]);
}
