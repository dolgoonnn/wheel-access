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
    issues.push('Замын өргөн 1.5 метрээс бага байна');
    recommendations.push('Тэргэнцэртэй хүмүүст зориулж замыг дор хаяж 1.5 метр хүртэл өргөсгөх');
    score -= 0.2;
}

// Налуугийн шинжилгээ
if (features.slope > 8) {
    issues.push('Налуу зөвшөөрөгдсөн дээд хязгаараас давсан (8 градус)');
    recommendations.push('Налуу бууруулах эсвэл өөр хүртээмжтэй замаар хангах');
    score -= 0.3;
}

// Шат болон налуу замын шинжилгээ
if (features.hasStairs && !features.hasRamp) {
    issues.push('Шат байгаа боловч налуу зам байхгүй');
    recommendations.push('Шатны хажуугаар тэргэнцэртэй хүмүүст зориулж налуу зам суурилуулах');
    score -= 0.3;
}

// Бариул шинжилгээ
if (!features.hasHandrails) {
    issues.push('Бариул илрээгүй');
    recommendations.push('Дэмжлэг болон аюулгүй байдлыг сайжруулахын тулд бариул суурилуулах');
    score -= 0.2;
}

// Асуудал байгаа эсэхийг баталгаажуулах
if (issues.length === 0) {
    issues.push('Ямар нэг чухал хүртээмжийн асуудал илрээгүй');
}

if (recommendations.length === 0) {
    recommendations.push('Одоогийн хүртээмжийн стандартыг хадгалах');
}

  // Ensure score stays within 0-1 range
  score = Math.max(0, Math.min(1, score));

  return {
    score,
    issues,
    recommendations
  };
}