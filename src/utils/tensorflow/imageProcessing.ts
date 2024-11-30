import * as tf from '@tensorflow/tfjs';

export async function preprocessImage(file: File): Promise<tf.Tensor3D> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Convert image to tensor and preprocess
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Resize to model input size
        .toFloat()
        .expandDims(0)
        .div(255.0);
      
      resolve(tensor);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}