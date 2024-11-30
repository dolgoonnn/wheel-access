import { openai } from './config';
import { AccessibilityAnalysis } from './types';
import { convertImageToBase64 } from './imageProcessing';

export async function analyzeImageWithOpenAI(file: File): Promise<AccessibilityAnalysis> {
  try {
    const base64Image = await convertImageToBase64(file);

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image for wheelchair accessibility issues. Focus on specific measurements, compliance issues, and provide detailed recommendations"
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    const analysis = response.choices[0]?.message?.content || '';
    return processAnalysis(analysis);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

function processAnalysis(analysis: string): AccessibilityAnalysis {
  const score = calculateAccessibilityScore(analysis);
  const { issues, recommendations } = extractIssuesAndRecommendations(analysis);

  return {
    score,
    issues: issues.length > 0 ? issues : ['No specific issues identified'],
    recommendations: recommendations.length > 0 ? recommendations : ['No specific recommendations available']
  };
}

function calculateAccessibilityScore(analysis: string): number {
  const lowercaseAnalysis = analysis.toLowerCase();
  
  const severityIndicators = {
    high: ['unsafe', 'dangerous', 'impossible', 'severe', 'major issue'],
    medium: ['difficult', 'challenging', 'moderate', 'potential issue'],
    low: ['minor', 'slight', 'small', 'minimal']
  };

  let score = 0.75; // Default score

  // Adjust score based on severity indicators
  severityIndicators.high.forEach(term => {
    if (lowercaseAnalysis.includes(term)) score -= 0.2;
  });

  severityIndicators.medium.forEach(term => {
    if (lowercaseAnalysis.includes(term)) score -= 0.1;
  });

  severityIndicators.low.forEach(term => {
    if (lowercaseAnalysis.includes(term)) score -= 0.05;
  });

  // Positive adjustments
  const positiveIndicators = ['compliant', 'accessible', 'suitable', 'appropriate width', 'proper slope'];
  positiveIndicators.forEach(term => {
    if (lowercaseAnalysis.includes(term)) score += 0.1;
  });

  return Math.max(0, Math.min(1, score));
}

function extractIssuesAndRecommendations(analysis: string): {
  issues: string[];
  recommendations: string[];
} {
  const sentences = analysis.split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
  
  const issues: string[] = [];
  const recommendations: string[] = [];

  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    
    if (
      lowerSentence.includes('issue') ||
      lowerSentence.includes('problem') ||
      lowerSentence.includes('hazard') ||
      lowerSentence.includes('concern') ||
      lowerSentence.includes('non-compliant')
    ) {
      issues.push(sentence);
    }
    
    if (
      lowerSentence.includes('recommend') ||
      lowerSentence.includes('should') ||
      lowerSentence.includes('could') ||
      lowerSentence.includes('suggest') ||
      lowerSentence.includes('consider')
    ) {
      recommendations.push(sentence);
    }
  });

  return {
    issues: issues.slice(0, 5),
    recommendations: recommendations.slice(0, 5)
  };
}