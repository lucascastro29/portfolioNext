---
title: "Training a CNN classification model: from 2 classes to N classes"
date: "2026-04-08"
coverImage: "/images/cnn-cover.gif"
excerpt: "How I designed and trained a computer-vision model to classify part orientation (Tulipa vs inverted Tulipa), and how to scale the solution to multiple classes."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

# 🚀 Training a CNN classification model: Tulipa vs Inverted Tulipa

In this project I built a computer-vision model able to classify images into two categories:

- **Correct Tulipa**
- **Inverted Tulipa**

The goal is to apply this model in an industrial environment to automatically validate the correct orientation of components.

---

## 🧠 1. Why I chose this technology

Before diving into the code, it's key to understand the technical decisions behind the project.

### 🔹 Using CNNs (Convolutional Neural Networks)

I chose a CNN because:

- It's the standard for computer-vision problems.
- It automatically detects visual patterns (edges, shapes, textures).
- It works very well with small images (in this case **48x48**).
- It doesn't require manual feature engineering.

Unlike classic OpenCV methods (thresholding, edge detection, etc.), a CNN:

- Learns directly from the data.
- Adapts better to real-world variations (lighting, noise and small rotations).

### 🔹 TensorFlow / Keras

I used TensorFlow with Keras because:

- It lets you build models quickly and clearly.
- It has direct GPU integration.
- It's an industry standard.
- It makes it easy to export the model for production.

### 🔹 Binary classification

The initial problem is binary classification, so:

- A single output neuron is used.
- `sigmoid` activation.
- `binary_crossentropy` loss function.

This simplifies the model and improves training stability.

### 🔹 Controlled data augmentation

I applied transformations such as:

- Slight rotation.
- Brightness and contrast variations.

And I avoided *flips*, because flipping an image completely changes its class.

### 🔹 GlobalAveragePooling instead of Flatten

I used `GlobalAveragePooling2D` because:

- It reduces the number of parameters.
- It lowers the risk of overfitting.
- It improves generalization.

### 🔹 Using the GPU

Training runs on GPU to:

- Reduce training times.
- Allow faster iterations.

---

## ⚙️ 2. Setting up the environment

I used Google Colab together with Google Drive to manage the dataset and the models.

> 🔗 **Project Colab:** _[Add link to the notebook]_  
> 🔗 **GitHub repository:** _[Add link to the repository]_

---

## 📁 3. Dataset organization

The dataset is organized into folders:

```text
tulipas_dataset/
 ├── train/
 │    ├── tulipa/
 │    └── tulipa_invertida/
 └── val/
      ├── tulipa/
      └── tulipa_invertida/
```

This structure lets TensorFlow load the classes automatically.

---

## 🔄 4. Data preprocessing

The following are applied:

- Normalization (values between 0 and 1).
- Cache to avoid reprocessing.
- Shuffle to improve generalization.
- Prefetch to optimize performance.

![Dataset organized into train/val folders and the preprocessing pipeline: 0–1 normalization, shuffle, cache and prefetch.](/images/cnn-stage-data.gif)

---

## 🏗️ 5. CNN model design

The model is made up of:

- Initial data augmentation.
- Convolutional blocks (`Conv2D` + `BatchNorm` + `MaxPooling`).
- Classifier with `GlobalAveragePooling` + `Dense` + `Dropout`.

![Flow of activations through the CNN architecture: Input 48×48 → Conv2D+BatchNorm blocks → MaxPooling → GlobalAveragePooling → Dense → sigmoid.](/images/cnn-stage-arch.gif)

---

## 🏋️ 6. Training the model

Key callbacks are used:

- `EarlyStopping` (prevents overtraining).
- `ReduceLROnPlateau` (adjusts the learning rate).
- `ModelCheckpoint` (saves the best model).

![Training curves: the loss goes down while validation accuracy (val_acc) goes up, with EarlyStopping and ReduceLROnPlateau.](/images/cnn-stage-train.gif)

---

## 📊 7. Evaluation

The model is evaluated on unseen data to measure its real performance.

---

## 💾 8. Exporting the model

The model is exported for production use and can be compressed for distribution.

---

## 🔍 9. Inference

The model is tested with real images to validate its behavior in practical scenarios.

---

## 🔁 10. How to scale from 2 classes to N classes?

The same approach can scale to multi-class classification:

- Change the output layer to `Dense(N, activation="softmax")`.
- Use `categorical_crossentropy` or `sparse_categorical_crossentropy`.
- Adjust the dataset to include one folder per class.
- Keep the callbacks and the per-class evaluation strategy.

---

## 🧩 Conclusion

This project isn't just about training a model, but about designing a complete solution:

- Choosing the right technology.
- Adapting the model to the real problem.
- Optimizing for generalization.
- Preparing it for production use.

The key is understanding that in industrial environments, robustness and applicability matter more than simply reaching a high metric.

If I wanted to take this project to the next level, the next steps would be:

- Confusion matrix and per-class metrics.
- Comparison with classic computer-vision methods.
- Direct integration with real-time industrial systems.

That would turn the model into a fully production-ready solution.
