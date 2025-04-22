
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScoreBreakdown as ScoreBreakdownType } from '@/types';

interface ScoreBreakdownProps {
  scoreBreakdown: ScoreBreakdownType;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scoreBreakdown }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const scoreCategories = [
    { name: 'Skills Match', score: scoreBreakdown.skillsMatch },
    { name: 'Experience Match', score: scoreBreakdown.experienceMatch },
    { name: 'Education Match', score: scoreBreakdown.educationMatch },
    { name: 'Keyword Match', score: scoreBreakdown.keywordMatch },
    { name: 'ATS Compatibility', score: scoreBreakdown.atsCompatibility }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <div className="relative h-28 w-28 flex items-center justify-center rounded-full border-8 border-gray-100">
            <div className="text-2xl font-bold">{scoreBreakdown.overall}%</div>
            <svg className="absolute top-0 left-0 h-full w-full -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className={`${getScoreTextColor(scoreBreakdown.overall)}`}
                strokeDasharray={`${48 * 2 * Math.PI * (scoreBreakdown.overall / 100)} ${
                  48 * 2 * Math.PI * (1 - scoreBreakdown.overall / 100)
                }`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          {scoreCategories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{category.name}</span>
                <span className={`text-sm font-medium ${getScoreTextColor(category.score)}`}>
                  {category.score}%
                </span>
              </div>
              <Progress 
                value={category.score} 
                className="h-2" 
                indicatorClassName={getScoreColor(category.score)} 
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
          <p className="mb-1">
            <span className="font-medium">High match (80-100%):</span> Strongly aligned with job requirements
          </p>
          <p className="mb-1">
            <span className="font-medium">Medium match (60-79%):</span> Partially meets job requirements
          </p>
          <p>
            <span className="font-medium">Low match (0-59%):</span> Significant gaps in matching job requirements
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdown;
