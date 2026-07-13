---
title: "De píxeles a predicciones: visión por computadora y deep learning con OpenCV y TensorFlow"
date: "2026-07-13"
coverImage: "/images/opencv-cover.gif"
excerpt: "Un recorrido por dos cursos de OpenCV University — desde manipulación de imágenes y detección de objetos clásica hasta CNNs con transfer learning y Grad-CAM — todo en Python con OpenCV, TensorFlow y Keras."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## El punto de partida

Quería entender visión por computadora desde los cimientos — no solo usar modelos pre-entrenados, sino saber qué pasa debajo. Así que hice dos cursos de OpenCV University: uno de CV clásica y otro de deep learning con TensorFlow. Este repositorio es el resultado: ~40 notebooks y scripts que van desde leer un píxel hasta entrenar CNNs con transfer learning.

---

## Computer Vision Fundamentals

La primera mitad cubre todo el pipeline clásico de visión por computadora con OpenCV.

### Imágenes como datos

Todo arranca entendiendo que una imagen es una matriz de números. Manipulación de píxeles, canales de color, cropping, resizing, máscaras, operaciones aritméticas y primitivas de dibujo. Parece básico, pero sin entender esto no podés debuggear nada de lo que viene después.

### Preprocesamiento y filtrado

Espacios de color (HSV, Lab, YCrCb), ecualización de histograma, CLAHE, convolución, filtros (Gaussian, median, bilateral), detección de bordes con Sobel y Canny, sharpening, y extracción de color dominante. Cada técnica tiene su notebook con ejemplos visuales paso a paso.

![Pipeline de visión por computadora: la imagen pasa por conversión de color, filtrado, detección de bordes con Canny, umbralización y análisis de contornos — cada etapa transforma la señal visual en información procesable.](/images/opencv-stage-pipeline.gif)

### Técnicas avanzadas

Transformada de Hough para detección de líneas y círculos, HDR imaging, seamless cloning (pegar un objeto en otra imagen sin bordes visibles), blending de caras e inpainting.

### Detección de features y matching

ORB feature detection, matching con brute-force y FLANN. Con esto se construyen aplicaciones como: alineación de documentos, stitching de panoramas, búsqueda de objetos por features, corrección de perspectiva y billboards virtuales con estimación de homografía.

![Detección de features: ORB extrae keypoints de dos imágenes, el matcher los conecta, y la homografía calcula la transformación geométrica — la base de panoramas, tracking y realidad aumentada.](/images/opencv-stage-features.gif)

### Detección y tracking de objetos (clásico)

GrabCut para segmentación, HOG+SVM para clasificación de imágenes, detección de peatones con un detector HOG custom, Haar cascades para detección de caras, y clasificación de anteojos en video.

Para tracking: optical flow (Lucas-Kanade), estabilización de video, tracking con múltiples algoritmos (KCF, CSRT, MOSSE), filtro de Kalman, MeanShift y CamShift.

### Proyectos integradores

Cuatro proyectos que combinan todo lo anterior:

- **Blemish removal** — eliminación automática de imperfecciones usando inpainting por parches
- **Green screen** — composición con chroma key usando segmentación HSV
- **Object tracking** — seguimiento de pelota de fútbol con la API de trackers de OpenCV
- **Document scanner** — escáner automático de documentos con corrección de perspectiva

---

## Deep Learning con TensorFlow y Keras

La segunda mitad del repositorio entra en deep learning.

### Los fundamentos

NumPy a fondo, fundamentos de TensorFlow, y gradient descent implementado desde cero — sin librerías, solo matemáticas y código. Regresión lineal, preprocesamiento de datos, clasificación binaria con Keras, funciones de activación, backpropagation con GradientTape, perceptrón en MNIST, y MLP en Fashion MNIST.

### CNNs y transfer learning

Implementación de LeNet, manejo de overfitting con data augmentation, inferencia con modelos pre-entrenados, y transfer learning con VGG — tanto feature extraction como fine-tuning, probado en datasets de ASL (lenguaje de señas americano) y KTBalls.

![Arquitectura CNN: la imagen de entrada pasa por capas convolucionales que extraen features (bordes, texturas, patrones), pooling que reduce dimensionalidad, y capas densas que clasifican — con transfer learning reutilizando features de VGG pre-entrenado.](/images/opencv-stage-cnn.gif)

### Entrenamiento avanzado

Optimizadores (SGD, Adam, RMSProp), pipelines con tf.data, loaders custom, TFRecords, schedulers de learning rate, y **Grad-CAM** — visualización de qué partes de la imagen está mirando el modelo para tomar su decisión. Esto último es clave para interpretabilidad: no alcanza con que el modelo acierte, hay que entender *por qué* acierta.

---

## El stack

| Capa | Tecnología |
|---|---|
| Lenguaje | Python 3 |
| CV clásica | OpenCV 4.5+ |
| Deep Learning | TensorFlow · Keras |
| Datos | NumPy · scikit-learn |
| Entorno | Jupyter Notebook · Google Colab |

---

## Por qué importa

La mayoría de los tutoriales de CV saltan directo a YOLO o a un modelo pre-entrenado. Eso funciona para demos rápidas, pero cuando algo falla en producción — un cambio de iluminación, un ángulo inesperado, ruido en la imagen — necesitás entender las capas de abajo para diagnosticar y arreglar el problema.

Este repositorio es esa base: desde el píxel crudo hasta la predicción del modelo, pasando por cada transformación intermedia.

---

El repo completo está en [github.com/lucascastro29/OpenCVProjects](https://github.com/lucascastro29/OpenCVProjects).
