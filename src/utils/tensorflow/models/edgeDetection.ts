import * as tf from '@tensorflow/tfjs';

export async function detectEdges(tensor: tf.Tensor3D): Promise<tf.Tensor3D> {
  // Convert to grayscale
  const grayscale = tf.mean(tensor, -1, true);
  
  // Sobel kernels for edge detection
  const sobelX = tf.tensor2d([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]);
  const sobelY = tf.tensor2d([[-1, -2, -1], [0, 0, 0], [1, 2, 1]]);
  
  // Apply convolution
  const gradX = tf.conv2d(grayscale, sobelX.expandDims(-1).expandDims(-1), 1, 'same');
  const gradY = tf.conv2d(grayscale, sobelY.expandDims(-1).expandDims(-1), 1, 'same');
  
  // Calculate magnitude
  const magnitude = tf.sqrt(tf.add(tf.square(gradX), tf.square(gradY)));
  
  return magnitude.squeeze();
}