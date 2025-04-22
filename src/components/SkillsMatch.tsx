
import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skill } from '@/types';

interface SkillsMatchProps {
  skills: Skill[];
  requiredSkills: string[];
  preferredSkills: string[];
}

const SkillsMatch: React.FC<SkillsMatchProps> = ({ 
  skills, 
  requiredSkills, 
  preferredSkills 
}) => {
  const matchedSkills = skills.filter(skill => skill.isMatch);
  const unmatchedSkills = skills.filter(skill => !skill.isMatch);
  
  // Find skills from job description that aren't in the candidate's skills
  const missingRequiredSkills = requiredSkills.filter(
    skill => !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );
  
  const missingPreferredSkills = preferredSkills.filter(
    skill => !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchedSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <CheckIcon size={14} className="mr-1 text-green-500" />
                Matching Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {unmatchedSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Other Skills</h4>
              <div className="flex flex-wrap gap-2">
                {unmatchedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {missingRequiredSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <XIcon size={14} className="mr-1 text-red-500" />
                Missing Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingRequiredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {missingPreferredSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <XIcon size={14} className="mr-1 text-yellow-500" />
                Missing Preferred Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingPreferredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsMatch;
