
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
    <Card className="glass-card border-violet-500/20">
      <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
        <CardTitle className="text-lg gradient-heading">Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchedSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center text-violet-400">
                <CheckIcon size={14} className="mr-1 text-green-400" />
                Matching Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-green-900/30 text-green-400 text-xs px-2.5 py-1 rounded-full border border-green-400/20"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {unmatchedSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-400">Other Skills</h4>
              <div className="flex flex-wrap gap-2">
                {unmatchedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-700"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {missingRequiredSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center text-violet-400">
                <XIcon size={14} className="mr-1 text-red-400" />
                Missing Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingRequiredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-red-900/30 text-red-400 text-xs px-2.5 py-1 rounded-full border border-red-400/20"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {missingPreferredSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center text-violet-400">
                <XIcon size={14} className="mr-1 text-yellow-400" />
                Missing Preferred Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingPreferredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-yellow-900/30 text-yellow-400 text-xs px-2.5 py-1 rounded-full border border-yellow-400/20"
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
