
import React, { useState, useCallback } from 'react';
import { FileIcon, UploadIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { parseResumeFile } from '@/utils/resumeParser';
import { ParsedResume } from '@/types';

interface ResumeUploaderProps {
  onResumesParsed: (resumes: { file: File; parsed: ParsedResume }[]) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onResumesParsed }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
             file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (droppedFiles.length === 0) {
      setErrorMessage('Only PDF and DOCX files are supported');
      return;
    }
    
    setFiles(prev => [...prev, ...droppedFiles]);
    setErrorMessage(null);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === 'application/pdf' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      
      if (selectedFiles.length === 0) {
        setErrorMessage('Only PDF and DOCX files are supported');
        return;
      }
      
      setFiles(prev => [...prev, ...selectedFiles]);
      setErrorMessage(null);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const parsed = await parseResumeFile(file);
          return { file, parsed };
        })
      );
      
      onResumesParsed(results);
      setFiles([]);
    } catch (error) {
      console.error('Error processing files:', error);
      setErrorMessage('Failed to process one or more files');
    } finally {
      setIsLoading(false);
    }
  }, [files, onResumesParsed]);

  return (
    <div className="mb-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-violet-500 bg-violet-900/20' : 'border-gray-700 bg-black/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <UploadIcon 
            size={36} 
            className={`mb-2 ${isDragging ? 'text-violet-400' : 'text-gray-500'}`} 
          />
          <p className="text-lg font-medium mb-1 text-white">Upload Resumes</p>
          <p className="text-sm text-gray-400 mb-4">
            Drag and drop PDF or DOCX files, or click to browse
          </p>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('fileInput')?.click()}
            className="border-violet-500/30 bg-black text-violet-400 hover:bg-violet-900/20"
          >
            Select Files
          </Button>
          <input
            id="fileInput"
            type="file"
            multiple
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-900/20 text-red-400 rounded-md text-sm border border-red-500/30">
          {errorMessage}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2 text-violet-400">Selected Files ({files.length})</p>
          <div className="space-y-2 max-h-40 overflow-y-auto p-1">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-black/60 border border-gray-800 p-2 rounded"
              >
                <div className="flex items-center">
                  <FileIcon size={16} className="text-violet-400 mr-2" />
                  <span className="text-sm truncate max-w-xs text-gray-300">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-400"
                  aria-label="Remove file"
                >
                  <XIcon size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={isLoading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              {isLoading ? 'AI Processing...' : 'Upload & AI Analyze'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
