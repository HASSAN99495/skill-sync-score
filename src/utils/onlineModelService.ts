
import { ParsedResume, JobDescription, ScoreBreakdown, Candidate, Skill } from '../types';

// This service uses an online model API for resume analysis
export async function analyzeResumeWithOnlineModel(
  parsedResume: ParsedResume,
  jobDescription: JobDescription
): Promise<{
  score: number;
  scoreBreakdown: ScoreBreakdown;
  skills: Skill[];
}> {
  try {
    console.log('Analyzing resume with online AI model');
    
    // In a real implementation, we would make an API call to a hosted model
    // For this demo, we're simulating the API response with enhanced analysis
    
    // First attempt to analyze using existing method as fallback
    const fallbackAnalysis = await simulateOnlineModelAnalysis(parsedResume, jobDescription);
    
    // Enhance with sentiment analysis and bias detection
    const enhancedScoreBreakdown = {
      ...fallbackAnalysis.scoreBreakdown,
      // Add extra metrics from "online" model
      sentimentScore: Math.round(65 + Math.random() * 25),
      biasDetectionScore: Math.round(70 + Math.random() * 20)
    };
    
    // Recalculate overall score with new metrics
    const enhancedOverall = (
      enhancedScoreBreakdown.skillsMatch * 0.3 + 
      enhancedScoreBreakdown.experienceMatch * 0.25 + 
      enhancedScoreBreakdown.educationMatch * 0.15 + 
      enhancedScoreBreakdown.keywordMatch * 0.15 + 
      enhancedScoreBreakdown.atsCompatibility * 0.05 +
      enhancedScoreBreakdown.sentimentScore * 0.05 +
      enhancedScoreBreakdown.biasDetectionScore * 0.05
    );
    
    // Add more sophisticated skill matching
    const enhancedSkills = fallbackAnalysis.skills.map(skill => ({
      ...skill,
      relevanceScore: Math.floor(Math.random() * 100), // 0-100 relevance score
      confidence: Math.floor(50 + Math.random() * 50) // 50-100 confidence score
    }));
    
    return {
      score: Math.round(enhancedOverall),
      scoreBreakdown: {
        ...enhancedScoreBreakdown,
        overall: Math.round(enhancedOverall)
      },
      skills: enhancedSkills
    };
  } catch (error) {
    console.error('Error analyzing resume with online model:', error);
    throw new Error('Failed to analyze resume with online model');
  }
}

// Simulation of online model analysis for demo purposes
async function simulateOnlineModelAnalysis(
  parsedResume: ParsedResume,
  jobDescription: JobDescription
) {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // More sophisticated skills matching
  const skillsMatch = calculateEnhancedSkillsMatch(parsedResume.skills, jobDescription);
  
  // More sophisticated experience matching
  const experienceMatch = calculateEnhancedExperienceMatch(parsedResume.experience, jobDescription);
  
  // Education match with field relevance
  const educationMatch = calculateEducationMatch(parsedResume.education, jobDescription);
  
  // Enhanced keyword matching with contextual understanding
  const keywordMatch = calculateEnhancedKeywordMatch(parsedResume.text, jobDescription.description);
  
  // ATS compatibility with layout analysis
  const atsCompatibility = 75 + Math.random() * 20;
  
  // Calculate overall score as weighted average
  const overall = (
    skillsMatch * 0.35 + 
    experienceMatch * 0.3 + 
    educationMatch * 0.15 + 
    keywordMatch * 0.15 + 
    atsCompatibility * 0.05
  );
  
  // Create skills array with match information and confidence scores
  const skills = parsedResume.skills.map(skill => {
    const isRequired = jobDescription.requiredSkills.some(
      s => s.toLowerCase() === skill.toLowerCase()
    );
    
    const isPreferred = jobDescription.preferredSkills.some(
      s => s.toLowerCase() === skill.toLowerCase()
    );
    
    return {
      name: skill,
      level: Math.floor(Math.random() * 5) + 1, // Random level 1-5
      isMatch: isRequired || isPreferred,
      isRequired: isRequired,
      isPreferred: isPreferred
    };
  });
  
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
}

function calculateEnhancedSkillsMatch(skills: string[], jobDescription: JobDescription): number {
  // More sophisticated skill matching with weightage
  const requiredSkillMatches = jobDescription.requiredSkills.filter(
    skill => skills.some(s => s.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const preferredSkillMatches = jobDescription.preferredSkills.filter(
    skill => skills.some(s => s.toLowerCase() === skill.toLowerCase())
  ).length;
  
  const requiredSkillPercentage = requiredSkillMatches / Math.max(1, jobDescription.requiredSkills.length);
  const preferredSkillPercentage = preferredSkillMatches / Math.max(1, jobDescription.preferredSkills.length);
  
  // Apply non-linear scoring for required skills
  // Missing required skills should have a significant impact
  let requiredScore = 0;
  if (requiredSkillPercentage === 1) {
    requiredScore = 100; // All required skills present
  } else if (requiredSkillPercentage >= 0.8) {
    requiredScore = 90; // Missing a few required skills
  } else if (requiredSkillPercentage >= 0.6) {
    requiredScore = 70; // Missing several required skills
  } else if (requiredSkillPercentage >= 0.4) {
    requiredScore = 50; // Missing many required skills
  } else {
    requiredScore = requiredSkillPercentage * 100; // Linear below 40%
  }
  
  const preferredScore = preferredSkillPercentage * 100;
  
  // Weigh required skills more heavily
  return requiredScore * 0.8 + preferredScore * 0.2;
}

function calculateEnhancedExperienceMatch(
  experience: any[], 
  jobDescription: JobDescription
): number {
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
  
  // Check for relevant experience by keyword matching
  const relevantExperienceScore = experience.reduce((score, exp) => {
    // Check if job title/description contains relevant keywords
    const titleRelevance = jobDescription.title.toLowerCase().split(' ').some(
      keyword => exp.title.toLowerCase().includes(keyword)
    ) ? 10 : 0;
    
    const descriptionRelevance = jobDescription.description.toLowerCase().split(' ')
      .filter(word => word.length > 4)
      .some(keyword => exp.description.toLowerCase().includes(keyword)) ? 10 : 0;
    
    return score + titleRelevance + descriptionRelevance;
  }, 0);
  
  // Normalize relevant experience score (0-100)
  const normalizedRelevantScore = Math.min(100, relevantExperienceScore);
  
  // Score based on minimum experience requirement
  let yearsScore = 0;
  if (totalYears >= jobDescription.minimumExperience * 1.5) {
    yearsScore = 100; // Exceeds requirement by 50% or more
  } else if (totalYears >= jobDescription.minimumExperience) {
    yearsScore = 85; // Meets requirement
  } else if (totalYears >= jobDescription.minimumExperience * 0.75) {
    yearsScore = 70; // Slightly below requirement
  } else if (totalYears >= jobDescription.minimumExperience * 0.5) {
    yearsScore = 50; // Significantly below requirement
  } else {
    yearsScore = 30; // Far below requirement
  }
  
  // Combine years score and relevance score
  return yearsScore * 0.6 + normalizedRelevantScore * 0.4;
}

function calculateEducationMatch(education: any[], jobDescription: JobDescription): number {
  // Simple implementation for demo
  // Check for degree level and relevant field
  
  const relevantDegrees = ['computer science', 'software engineering', 'information technology', 
                           'data science', 'mathematics', 'engineering'];
                           
  let score = 50; // Base score
  
  // Check for bachelor's, master's, PhD
  const hasBachelors = education.some(edu => 
    edu.degree.toLowerCase().includes('bachelor') || 
    edu.degree.toLowerCase().includes('b.s.') ||
    edu.degree.toLowerCase().includes('b.a.')
  );
  
  const hasMasters = education.some(edu => 
    edu.degree.toLowerCase().includes('master') || 
    edu.degree.toLowerCase().includes('m.s.') ||
    edu.degree.toLowerCase().includes('m.a.')
  );
  
  const hasPhD = education.some(edu => 
    edu.degree.toLowerCase().includes('phd') || 
    edu.degree.toLowerCase().includes('doctorate') ||
    edu.degree.toLowerCase().includes('ph.d')
  );
  
  // Check for relevant field
  const hasRelevantField = education.some(edu => 
    relevantDegrees.some(degree => 
      edu.degree.toLowerCase().includes(degree) || 
      (edu.institution && edu.institution.toLowerCase().includes(degree))
    )
  );
  
  // Add scores based on degree level
  if (hasPhD) score += 30;
  else if (hasMasters) score += 20;
  else if (hasBachelors) score += 10;
  
  // Add score for relevant field
  if (hasRelevantField) score += 20;
  
  return Math.min(100, score);
}

function calculateEnhancedKeywordMatch(resumeText: string, jobDescription: string): number {
  // Extract important keywords from job description
  const jobKeywords = extractKeywords(jobDescription);
  
  // Count how many keywords appear in the resume and their frequency
  let totalScore = 0;
  const matchedKeywords = jobKeywords.map(keyword => {
    const regex = new RegExp('\\b' + keyword.toLowerCase() + '\\b', 'g');
    const matches = (resumeText.toLowerCase().match(regex) || []).length;
    
    // Score based on frequency and importance
    return {
      keyword,
      matches,
      score: matches > 0 ? Math.min(10, matches) : 0
    };
  });
  
  // Calculate total score
  totalScore = matchedKeywords.reduce((sum, kw) => sum + kw.score, 0);
  
  // Normalize to percentage (0-100)
  return Math.min(100, (totalScore / jobKeywords.length) * 10);
}

function extractKeywords(text: string): string[] {
  // This is a simplified keyword extraction
  // A real implementation would use NLP techniques
  
  // Remove common words
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'in', 'to', 'with', 'for', 'of', 'on', 'at'];
  
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
    .slice(0, 25)
    .map(entry => entry[0]);
}
