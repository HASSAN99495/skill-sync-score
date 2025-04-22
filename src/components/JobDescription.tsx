
import React, { useState } from 'react';
import { FileTextIcon, PlusIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { JobDescription as JobDescriptionType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface JobDescriptionProps {
  onJobDescriptionChange: (jobDescription: JobDescriptionType) => void;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ onJobDescriptionChange }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [minimumExperience, setMinimumExperience] = useState(2);
  const [requiredSkill, setRequiredSkill] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkill, setPreferredSkill] = useState('');
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);

  const addRequiredSkill = () => {
    if (requiredSkill.trim() !== '') {
      setRequiredSkills([...requiredSkills, requiredSkill.trim()]);
      setRequiredSkill('');
    }
  };

  const removeRequiredSkill = (index: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index));
  };

  const addPreferredSkill = () => {
    if (preferredSkill.trim() !== '') {
      setPreferredSkills([...preferredSkills, preferredSkill.trim()]);
      setPreferredSkill('');
    }
  };

  const removePreferredSkill = (index: number) => {
    setPreferredSkills(preferredSkills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobDescription: JobDescriptionType = {
      id: uuidv4(),
      title,
      company,
      description,
      requiredSkills,
      preferredSkills,
      minimumExperience,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    onJobDescriptionChange(jobDescription);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileTextIcon size={18} className="mr-2 text-indigo-500" />
          Job Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Inc."
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={5}
              required
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="experience">Minimum Experience (years)</Label>
            <Input
              id="experience"
              type="number"
              min={0}
              max={20}
              value={minimumExperience}
              onChange={(e) => setMinimumExperience(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="requiredSkills">Required Skills</Label>
            <div className="flex space-x-2">
              <Input
                id="requiredSkills"
                value={requiredSkill}
                onChange={(e) => setRequiredSkill(e.target.value)}
                placeholder="e.g. JavaScript"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addRequiredSkill();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={addRequiredSkill}
              >
                <PlusIcon size={16} />
              </Button>
            </div>
            {requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {requiredSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeRequiredSkill(index)}
                      className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                    >
                      <XIcon size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <Label htmlFor="preferredSkills">Preferred Skills</Label>
            <div className="flex space-x-2">
              <Input
                id="preferredSkills"
                value={preferredSkill}
                onChange={(e) => setPreferredSkill(e.target.value)}
                placeholder="e.g. TypeScript"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addPreferredSkill();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={addPreferredSkill}
              >
                <PlusIcon size={16} />
              </Button>
            </div>
            {preferredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {preferredSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-1 rounded flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removePreferredSkill(index)}
                      className="ml-1.5 text-violet-600 hover:text-violet-800"
                    >
                      <XIcon size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save & Apply to Resumes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
