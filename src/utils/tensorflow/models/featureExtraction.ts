import * as tf from '@tensorflow/tfjs';
import { detectEdges } from './edgeDetection';
import { detectLines } from './lineDetection';
import { ImageFeatures } from '../types';

export async function extractFeatures(tensor: tf.Tensor3D): Promise<ImageFeatures> {
  // Detect edges in the image
  const edges = await detectEdges(tensor);
  
  // Detect lines and their orientations
  const lines = detectLines(edges);
  
  // Analyze features based on line patterns
  const hasStairs = lines.horizontal > 0.4; // Strong horizontal lines indicate stairs
  const hasRamp = lines.diagonal > 0.3; // Diagonal lines indicate ramps
  const hasHandrails = lines.vertical > 0.3; // Vertical lines indicate handrails
  
  // Calculate approximate path width based on image analysis
  const pathWidth = calculatePathWidth(edges);
  
  // Calculate slope based on diagonal line patterns
  const slope = calculateSlope(lines.diagonal);
  
  return {
    hasStairs,
    hasRamp,
    hasHandrails,
    pathWidth,
    slope
  };
}

function calculatePathWidth(edges: tf.Tensor3D): number {
  // Calculate path width based on edge patterns
  const data = edges.dataSync();
  const [height, width] = edges.shape;
  
  // Find the average width between strong edges
  let totalWidth = 0;
  let count = 0;
  
  for (let y = 0; y < height; y++) {
    let edgeStart = -1;
    for (let x = 0; x < width; x++) {
      const val = data[y * width + x];
      if (val > 0.5) {
        if (edgeStart === -1) {
          edgeStart = x;
        } else {
          totalWidth += x - edgeStart;
          count++;
          edgeStart = -1;
        }
      }
    }
  }
  
  // Convert pixel width to approximate meters (assuming standard path width)
  const averagePixelWidth = count > 0 ? totalWidth / count : width / 2;
  return (averagePixelWidth / width) * 3; // Scale to reasonable meter range
}

function calculateSlope(diagonalRatio: number): number {
  // Convert diagonal line ratio to approximate slope angle
  return diagonalRatio * 15; // Max slope of 15 degrees
}