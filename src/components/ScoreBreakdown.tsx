
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400/20 to-green-600/20';
    if (score >= 60) return 'from-yellow-400/20 to-yellow-600/20';
    return 'from-red-400/20 to-red-600/20';
  };

  // Create dynamic categories including potential new online model metrics
  const scoreCategories = [
    { name: 'Skills Match', score: scoreBreakdown.skillsMatch },
    { name: 'Experience Match', score: scoreBreakdown.experienceMatch },
    { name: 'Education Match', score: scoreBreakdown.educationMatch },
    { name: 'Keyword Match', score: scoreBreakdown.keywordMatch },
    { name: 'ATS Compatibility', score: scoreBreakdown.atsCompatibility }
  ];
  
  // Add additional metrics if they exist in the scoreBreakdown
  if ('sentimentScore' in scoreBreakdown) {
    scoreCategories.push({ name: 'Sentiment Analysis', score: (scoreBreakdown as any).sentimentScore });
  }
  
  if ('biasDetectionScore' in scoreBreakdown) {
    scoreCategories.push({ name: 'Bias Detection', score: (scoreBreakdown as any).biasDetectionScore });
  }

  return (
    <Card className="glass-card border-violet-500/20 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-violet-900/30 to-indigo-900/30">
        <CardTitle className="text-lg gradient-heading flex items-center">
          <svg className="w-5 h-5 mr-2 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI Score Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-center mb-6">
          <div className="relative h-36 w-36 flex items-center justify-center rounded-full">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreGradient(scoreBreakdown.overall)} opacity-30 animate-pulse-subtle`}></div>
            <div className={`text-4xl font-bold ${getScoreTextColor(scoreBreakdown.overall)}`}>{scoreBreakdown.overall}%</div>
            <svg className="absolute top-0 left-0 h-full w-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="68"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className={`${getScoreTextColor(scoreBreakdown.overall)} opacity-20`}
                strokeDasharray={`${68 * 2 * Math.PI}`}
              />
              <circle
                cx="72"
                cy="72"
                r="68"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className={`${getScoreTextColor(scoreBreakdown.overall)}`}
                strokeDasharray={`${68 * 2 * Math.PI * (scoreBreakdown.overall / 100)} ${
                  68 * 2 * Math.PI * (1 - scoreBreakdown.overall / 100)
                }`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-4">
          {scoreCategories.map((category, index) => (
            <div key={category.name} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-300">{category.name}</span>
                <span className={`text-sm font-medium ${getScoreTextColor(category.score)} flex items-center`}>
                  {category.score}%
                  {category.score >= 80 && 
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                </span>
              </div>
              <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreColor(category.score)} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${category.score}%`,
                    animation: 'animate-gradient-flow',
                    boxShadow: `0 0 8px ${category.score >= 80 ? 'rgba(74, 222, 128, 0.5)' : 
                                          category.score >= 60 ? 'rgba(250, 204, 21, 0.5)' : 
                                          'rgba(248, 113, 113, 0.5)'}`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 space-y-2">
          <div className="text-center mb-3 text-sm text-violet-400">AI-powered analysis</div>
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="font-medium text-green-400">High match (80-100%):</span> 
            <span className="ml-1">Strongly aligned with job requirements</span>
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="font-medium text-yellow-400">Medium match (60-79%):</span>
            <span className="ml-1">Partially meets job requirements</span>
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="font-medium text-red-400">Low match (0-59%):</span>
            <span className="ml-1">Significant gaps in matching job requirements</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdown;
