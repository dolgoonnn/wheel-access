export interface AccessibilityAnalysis {
  score: number;
  issues: string[];
  recommendations: string[];
}

export interface ImageFeatures {
  hasRamp: boolean;
  hasStairs: boolean;
  hasHandrails: boolean;
  pathWidth: number;
  slope: number;
}