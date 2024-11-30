import React, { useState } from 'react';
import { ImageUpload } from '../components/AccessibilityCheck/ImageUpload';
import { AccessibilityResult } from '../components/AccessibilityCheck/AccessibilityResult';
import { analyzeImage } from '../utils/imageAnalysis';
import { AlertCircle } from 'lucide-react';

export function AccessibilityPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    issues: string[];
    recommendations: string[];
  } | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setSelectedImage(URL.createObjectURL(file));

    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the image');
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Та зургаа оруулна
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ImageUpload
          onImageSelect={handleImageSelect}
          isAnalyzing={isAnalyzing}
        />
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}
        
        {selectedImage && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Оруулсан зураг
            </h2>
            <img
              src={selectedImage}
              alt="Uploaded route"
              className="w-full rounded-lg shadow-md mb-6"
            />
          </div>
        )}
        
        {isAnalyzing && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Analyzing image...</p>
          </div>
        )}
        
        {analysisResult && !isAnalyzing && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Үр дүн
            </h2>
            <AccessibilityResult
              score={analysisResult.score}
              issues={analysisResult.issues}
              recommendations={analysisResult.recommendations}
            />
          </div>
        )}
      </div>
    </div>
  );
}