---
title: "From pixels to predictions: computer vision and deep learning with OpenCV and TensorFlow"
date: "2026-07-13"
coverImage: "/images/opencv-cover.gif"
excerpt: "A walkthrough of two OpenCV University courses — from image manipulation and classical object detection to CNNs with transfer learning and Grad-CAM — all in Python with OpenCV, TensorFlow and Keras."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## The starting point

I wanted to understand computer vision from the ground up — not just use pre-trained models, but know what happens underneath. So I took two courses from OpenCV University: one on classical CV and one on deep learning with TensorFlow. This repository is the result: ~40 notebooks and scripts going from reading a pixel to training CNNs with transfer learning.

---

## Computer Vision Fundamentals

The first half covers the full classical computer vision pipeline with OpenCV.

### Images as data

Everything starts with understanding that an image is a matrix of numbers. Pixel manipulation, color channels, cropping, resizing, masks, arithmetic operations and drawing primitives. Sounds basic, but without understanding this you can't debug anything that comes after.

### Preprocessing and filtering

Color spaces (HSV, Lab, YCrCb), histogram equalization, CLAHE, convolution, filters (Gaussian, median, bilateral), edge detection with Sobel and Canny, sharpening, and dominant color extraction. Each technique has its own notebook with step-by-step visual examples.

![Computer vision pipeline: the image goes through color conversion, filtering, Canny edge detection, thresholding and contour analysis — each stage transforms the visual signal into processable information.](/images/opencv-stage-pipeline.gif)

### Advanced techniques

Hough Transform for line and circle detection, HDR imaging, seamless cloning (pasting an object into another image without visible seams), face blending and inpainting.

### Feature detection and matching

ORB feature detection, matching with brute-force and FLANN. These techniques enable applications like: document alignment, panorama stitching, object search by features, perspective correction and virtual billboards using homography estimation.

![Feature detection: ORB extracts keypoints from two images, the matcher connects them, and homography computes the geometric transformation — the foundation for panoramas, tracking and augmented reality.](/images/opencv-stage-features.gif)

### Object detection and tracking (classical)

GrabCut for segmentation, HOG+SVM for image classification, pedestrian detection with a custom HOG detector, Haar cascades for face detection, and eyeglasses classification on video.

For tracking: optical flow (Lucas-Kanade), video stabilization, tracking with multiple algorithms (KCF, CSRT, MOSSE), Kalman filter, MeanShift and CamShift.

### End-to-end projects

Four projects combining everything above:

- **Blemish removal** — automatic blemish removal using patch-based inpainting
- **Green screen** — chroma key compositing using HSV-based segmentation
- **Object tracking** — soccer ball tracking with OpenCV's tracker API
- **Document scanner** — automatic document scanner with perspective correction

---

## Deep Learning with TensorFlow and Keras

The second half of the repository dives into deep learning.

### The fundamentals

NumPy deep dive, TensorFlow basics, and gradient descent implemented from scratch — no libraries, just math and code. Linear regression, data preprocessing, binary classification with Keras, activation functions, backpropagation with GradientTape, perceptron on MNIST, and MLP on Fashion MNIST.

### CNNs and transfer learning

LeNet implementation, overfitting management with data augmentation, inference with pre-trained models, and transfer learning with VGG — both feature extraction and fine-tuning, tested on ASL (American Sign Language) and KTBalls datasets.

![CNN architecture: the input image passes through convolutional layers that extract features (edges, textures, patterns), pooling that reduces dimensionality, and dense layers that classify — with transfer learning reusing features from pre-trained VGG.](/images/opencv-stage-cnn.gif)

### Advanced training

Optimizers (SGD, Adam, RMSProp), tf.data pipelines, custom loaders, TFRecords, learning rate schedulers, and **Grad-CAM** — visualizing which parts of the image the model looks at to make its decision. This is key for interpretability: it's not enough for the model to be right, you need to understand *why* it's right.

---

## The stack

| Layer | Technology |
|---|---|
| Language | Python 3 |
| Classical CV | OpenCV 4.5+ |
| Deep Learning | TensorFlow · Keras |
| Data | NumPy · scikit-learn |
| Environment | Jupyter Notebook · Google Colab |

---

## Why it matters

Most CV tutorials jump straight to YOLO or a pre-trained model. That works for quick demos, but when something fails in production — a lighting change, an unexpected angle, image noise — you need to understand the layers below to diagnose and fix the problem.

This repository is that foundation: from the raw pixel to the model's prediction, through every intermediate transformation.

---

The full repo is at [github.com/lucascastro29/OpenCVProjects](https://github.com/lucascastro29/OpenCVProjects).
