
import React from 'react';
import { ChartBarIcon, CheckIcon, FileTextIcon, UserIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  isSelected,
  onSelect 
}) => {
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'bg-green-900/30 text-green-400 border border-green-400/20';
    if (score >= 60) return 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/20';
    return 'bg-red-900/30 text-red-400 border border-red-400/20';
  };

  return (
    <Card 
      className={`mb-4 transition-all duration-200 cursor-pointer hover:shadow-md glass-card border-violet-500/20 ${
        isSelected ? 'border-violet-400 ring-1 ring-violet-400' : ''
      }`}
      onClick={() => onSelect(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-violet-900/60 p-2 rounded-full mr-3 border border-violet-400/20">
              <UserIcon size={20} className="text-violet-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">{candidate.name}</h3>
              <p className="text-sm text-gray-400">{candidate.email}</p>
            </div>
          </div>
          <div>
            <div className={`${getScoreClass(candidate.score)} rounded-full px-2.5 py-1 text-xs font-semibold`}>
              {candidate.score}% Match
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-sm text-gray-400 mb-2">Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 5).map((skill, index) => (
              <div 
                key={index} 
                className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
                  skill.isMatch 
                    ? 'bg-violet-900/30 text-violet-300 border border-violet-400/20' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                {skill.isMatch && <CheckIcon size={10} className="mr-1" />}
                {skill.name}
              </div>
            ))}
            {candidate.skills.length > 5 && (
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                +{candidate.skills.length - 5} more
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-3 pt-2 flex justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-900/20">
              <FileTextIcon size={14} className="mr-1" /> View Resume
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-900/20">
              <ChartBarIcon size={14} className="mr-1" /> Score Details
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            Updated {new Date(candidate.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
