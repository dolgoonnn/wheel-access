import * as tf from '@tensorflow/tfjs';
import { AccessibilityAnalysis } from './types';
import { preprocessImage } from './imageProcessing';
import { extractFeatures } from './models/featureExtraction';

export async function analyzeImageWithTensorflow(file: File): Promise<AccessibilityAnalysis> {
  try {
    // Load and preprocess the image
    const tensor = await preprocessImage(file);
    
    // Extract features using computer vision techniques
    const features = await extractFeatures(tensor);
    
    // Generate analysis based on detected features
    return generateAnalysis(features);
  } catch (error) {
    console.error('Analysis Error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  } finally {
    // Clean up tensors
    tf.dispose();
  }
}

function generateAnalysis(features: ImageFeatures): AccessibilityAnalysis {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 1.0;

  // Analyze path width
  if (features.pathWidth < 1.5) {
    issues.push('Path width is less than the recommended 1.5 meters');
    recommendations.push('Widen the path to at least 1.5 meters for wheelchair access');
    score -= 0.2;
  }

  // Analyze slope
  if (features.slope > 8) {
    issues.push('Slope exceeds the recommended maximum of 8 degrees');
    recommendations.push('Reduce the slope or provide alternative accessible route');
    score -= 0.3;
  }

  // Analyze stairs and ramps
  if (features.hasStairs && !features.hasRamp) {
    issues.push('Stairs present without an accompanying ramp');
    recommendations.push('Install a ramp alongside stairs for wheelchair accessibility');
    score -= 0.3;
  }

  // Analyze handrails
  if (!features.hasHandrails) {
    issues.push('No handrails detected');
    recommendations.push('Install handrails for additional support and safety');
    score -= 0.2;
  }

  // Ensure we have at least one issue and recommendation
  if (issues.length === 0) {
    issues.push('No significant accessibility issues detected');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain current accessibility standards');
  }

  // Ensure score stays within 0-1 range
  score = Math.max(0, Math.min(1, score));

  return {
    score,
    issues,
    recommendations
  };
}