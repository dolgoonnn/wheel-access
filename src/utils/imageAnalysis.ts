import { analyzeImageWithTensorflow } from './tensorflow/analysis';

export async function analyzeImage(file: File) {
  try {
    const analysis = await analyzeImageWithTensorflow(file);
    return {
      score: analysis.score,
      issues: analysis.issues,
      recommendations: analysis.recommendations
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}