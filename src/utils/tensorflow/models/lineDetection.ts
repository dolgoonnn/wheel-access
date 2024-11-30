import * as tf from '@tensorflow/tfjs';

export function detectLines(edges: tf.Tensor3D, threshold: number = 0.5): {
  horizontal: number;
  vertical: number;
  diagonal: number;
} {
  const data = edges.dataSync();
  const [height, width] = edges.shape;
  
  let horizontal = 0;
  let vertical = 0;
  let diagonal = 0;
  
  // Analyze edge patterns
  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const idx = y * width + x;
      const val = data[idx];
      
      if (val > threshold) {
        // Check horizontal lines
        if (Math.abs(data[idx] - data[idx + 1]) < threshold) {
          horizontal++;
        }
        // Check vertical lines
        if (Math.abs(data[idx] - data[idx + width]) < threshold) {
          vertical++;
        }
        // Check diagonal lines
        if (Math.abs(data[idx] - data[idx + width + 1]) < threshold) {
          diagonal++;
        }
      }
    }
  }
  
  // Normalize counts
  const total = horizontal + vertical + diagonal;
  return {
    horizontal: horizontal / total,
    vertical: vertical / total,
    diagonal: diagonal / total
  };
}