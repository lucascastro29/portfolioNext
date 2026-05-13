---
title: "Entrenar un modelo de clasificación CNN: de 2 clases a N clases"
date: "2026-04-08"
coverImage: "/images/workimg.png"
excerpt: "Cómo diseñé y entrené un modelo de visión por computadora para clasificar orientación de piezas (Tulipa vs Tulipa invertida), y cómo escalar la solución a múltiples clases."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

# 🚀 Entrenando un modelo de clasificación con CNN: Tulipa vs Tulipa Invertida

En este proyecto desarrollé un modelo de visión por computadora capaz de clasificar imágenes en dos categorías:

- **Tulipa correcta**
- **Tulipa invertida**

El objetivo es aplicar este modelo en un entorno industrial para validar automáticamente la correcta orientación de componentes.

---

## 🧠 1. ¿Por qué elegí esta tecnología?

Antes de entrar en el código, es clave entender las decisiones técnicas detrás del proyecto.

### 🔹 Uso de CNN (Redes Neuronales Convolucionales)

Elegí una CNN porque:

- Es el estándar en problemas de visión por computadora.
- Detecta automáticamente patrones visuales (bordes, formas, texturas).
- Funciona muy bien con imágenes pequeñas (en este caso **48x48**).
- No requiere ingeniería manual de *features*.

A diferencia de métodos clásicos de OpenCV (thresholding, edge detection, etc.), una CNN:

- Aprende directamente de los datos.
- Se adapta mejor a variaciones reales (iluminación, ruido y pequeñas rotaciones).

### 🔹 TensorFlow / Keras

Utilicé TensorFlow con Keras porque:

- Permite construir modelos de forma rápida y clara.
- Tiene integración directa con GPU.
- Es estándar en la industria.
- Facilita exportar el modelo para producción.

### 🔹 Clasificación binaria

El problema inicial es de clasificación binaria, por eso:

- Se usa una sola neurona de salida.
- Activación `sigmoid`.
- Función de pérdida `binary_crossentropy`.

Esto simplifica el modelo y mejora la estabilidad del entrenamiento.

### 🔹 Data Augmentation controlado

Apliqué transformaciones como:

- Rotación leve.
- Variaciones de brillo y contraste.

Y evité el uso de *flips*, porque invertir una imagen cambia completamente su clase.

### 🔹 GlobalAveragePooling en lugar de Flatten

Se utilizó `GlobalAveragePooling2D` porque:

- Reduce la cantidad de parámetros.
- Disminuye el riesgo de overfitting.
- Mejora la capacidad de generalización.

### 🔹 Uso de GPU

El entrenamiento se ejecuta en GPU para:

- Reducir tiempos de entrenamiento.
- Permitir iteraciones más rápidas.

---

## ⚙️ 2. Preparación del entorno

Se utilizó Google Colab junto con Google Drive para gestionar el dataset y los modelos.

> 🔗 **Colab del proyecto:** _[Agregar link al notebook]_  
> 🔗 **Repositorio en GitHub:** _[Agregar link al repositorio]_

---

## 📁 3. Organización del dataset

El dataset está organizado en carpetas:

```text
tulipas_dataset/
 ├── train/
 │    ├── tulipa/
 │    └── tulipa_invertida/
 └── val/
      ├── tulipa/
      └── tulipa_invertida/
```

Esta estructura permite cargar automáticamente las clases con TensorFlow.

---

## 🔄 4. Preprocesamiento de datos

Se aplican:

- Normalización (valores entre 0 y 1).
- Cache para evitar reprocesamiento.
- Shuffle para mejorar generalización.
- Prefetch para optimizar rendimiento.

---

## 🏗️ 5. Diseño del modelo CNN

El modelo está compuesto por:

- Data augmentation inicial.
- Bloques convolucionales (`Conv2D` + `BatchNorm` + `MaxPooling`).
- Clasificador con `GlobalAveragePooling` + `Dense` + `Dropout`.

---

## 🏋️ 6. Entrenamiento del modelo

Se utilizan callbacks clave:

- `EarlyStopping` (evita sobreentrenamiento).
- `ReduceLROnPlateau` (ajusta el learning rate).
- `ModelCheckpoint` (guarda el mejor modelo).

---

## 📊 7. Evaluación

El modelo se evalúa con datos no vistos para medir su rendimiento real.

---

## 💾 8. Exportación del modelo

El modelo se exporta para su uso en producción y se puede comprimir para distribución.

---

## 🔍 9. Inferencia

Se prueba el modelo con imágenes reales para validar su comportamiento en escenarios prácticos.

---

## 🔁 10. ¿Cómo escalar de 2 clases a N clases?

El mismo enfoque puede escalar a clasificación multiclase:

- Cambiar la capa de salida a `Dense(N, activation="softmax")`.
- Usar `categorical_crossentropy` o `sparse_categorical_crossentropy`.
- Ajustar el dataset para incluir una carpeta por clase.
- Mantener callbacks y estrategia de evaluación por clase.

---

## 🧩 Conclusión

Este proyecto no solo consiste en entrenar un modelo, sino en diseñar una solución completa:

- Selección correcta de tecnología.
- Adaptación del modelo al problema real.
- Optimización para generalización.
- Preparación para uso en producción.

La clave está en entender que en entornos industriales, la robustez y la aplicabilidad son más importantes que simplemente alcanzar una métrica alta.

Si quisiera llevar este proyecto al siguiente nivel, los siguientes pasos serían:

- Matriz de confusión y métricas por clase.
- Comparación con métodos clásicos de visión por computadora.
- Integración directa con sistemas industriales en tiempo real.

Eso convertiría el modelo en una solución completamente productiva.
