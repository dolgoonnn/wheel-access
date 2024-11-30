import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export function ImageUpload({ onImageSelect, isAnalyzing }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8",
        "flex flex-col items-center justify-center",
        "transition-colors cursor-pointer",
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
        isAnalyzing && "pointer-events-none opacity-50"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isAnalyzing}
      />
      
      <Upload className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-700">
        Drag and drop your image here
      </p>
      <p className="text-sm text-gray-500 mt-2">
        or click to select a file
      </p>
      
      <div className="mt-4 flex items-center gap-2 text-amber-600">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">
          Please ensure the image clearly shows the pathway or stairs
        </span>
      </div>
    </div>
  );
}