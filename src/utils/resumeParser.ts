
import { ParsedResume } from '../types';

// This function would normally use a more sophisticated parsing library
// For demo purposes, we'll use a simplified implementation
export async function parseResumeFile(file: File): Promise<ParsedResume> {
  try {
    const text = await readFileAsText(file);
    
    // Extract basic information using regex patterns
    const skills = extractSkills(text);
    const experience = extractExperience(text);
    const education = extractEducation(text);
    
    return {
      text,
      skills,
      experience,
      education
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse resume');
  }
}

// Helper function to read file content as text
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Simple skill extraction based on common keywords
function extractSkills(text: string): string[] {
  // This is a simplified implementation
  // A real implementation would use NLP or a comprehensive skill database
  const commonSkills = [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
    'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'oracle',
    'machine learning', 'data science', 'artificial intelligence', 'nlp',
    'project management', 'agile', 'scrum', 'kanban', 'waterfall',
    'leadership', 'communication', 'teamwork', 'problem solving'
  ];
  
  const skills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  return [...new Set(skills)]; // Remove duplicates
}

// Simple experience extraction 
function extractExperience(text: string) {
  // This is a placeholder. In a real app, this would use NLP or other techniques
  // to accurately extract work experience sections
  
  // For demo purposes, we'll create some dummy experience
  return [
    {
      title: "Extracted Position",
      company: "Extracted Company",
      startDate: "2020",
      endDate: "Present",
      description: "Description extracted from resume",
      keywordMatches: []
    }
  ];
}

// Simple education extraction
function extractEducation(text: string) {
  // This is a placeholder. In a real app, this would use NLP or other techniques
  // to accurately extract education sections
  
  // For demo purposes, we'll create some dummy education
  return [
    {
      degree: "Extracted Degree",
      institution: "Extracted University",
      year: "2019"
    }
  ];
}
