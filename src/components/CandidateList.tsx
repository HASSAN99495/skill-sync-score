
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CandidateCard from './CandidateCard';
import { Candidate, SortOption, FilterOption } from '@/types';

interface CandidateListProps {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  onSelectCandidate: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ 
  candidates, 
  selectedCandidate,
  onSelectCandidate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('score');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');

  // Filter candidates based on search term and filter option
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => 
                           skill.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
                         
    if (!matchesSearch) return false;
    
    switch (filterOption) {
      case 'highMatch':
        return candidate.score >= 80;
      case 'mediumMatch':
        return candidate.score >= 60 && candidate.score < 80;
      case 'lowMatch':
        return candidate.score < 60;
      case 'all':
      default:
        return true;
    }
  });
  
  // Sort candidates based on sort option
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortOption) {
      case 'score':
        return b.score - a.score;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'lastUpdated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search candidates, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/60 border-gray-800 text-white focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          {filteredCandidates.length} candidates
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterOption} onValueChange={(value) => setFilterOption(value as FilterOption)}>
            <SelectTrigger className="text-xs h-8 w-[110px] bg-black/60 border-gray-800 text-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="all" className="focus:bg-violet-900/20 focus:text-white">All</SelectItem>
              <SelectItem value="highMatch" className="focus:bg-violet-900/20 focus:text-white">High Match</SelectItem>
              <SelectItem value="mediumMatch" className="focus:bg-violet-900/20 focus:text-white">Medium Match</SelectItem>
              <SelectItem value="lowMatch" className="focus:bg-violet-900/20 focus:text-white">Low Match</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="text-xs h-8 w-[110px] bg-black/60 border-gray-800 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="score" className="focus:bg-violet-900/20 focus:text-white">Match Score</SelectItem>
              <SelectItem value="name" className="focus:bg-violet-900/20 focus:text-white">Name</SelectItem>
              <SelectItem value="lastUpdated" className="focus:bg-violet-900/20 focus:text-white">Last Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {sortedCandidates.length > 0 ? (
          sortedCandidates.map(candidate => (
            <CandidateCard 
              key={candidate.id} 
              candidate={candidate} 
              isSelected={selectedCandidate?.id === candidate.id}
              onSelect={onSelectCandidate}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-black/40 border border-gray-800 rounded-lg backdrop-blur-sm">
            {searchTerm || filterOption !== 'all'
              ? 'No candidates match your search criteria'
              : 'No candidates available. Upload resumes to get started.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
