---
title: 'Mapping and Data Assesment for Natural Incident'
date: '2020-07-01'
tags: ['computer-vision', 'image-classification', 'image-segmentation']
draft: false
summary: 'Madani is an application that makes it easier for volunteers to carry out disaster mitigation by classifying routes and impact buildings based on post-disaster satellite images.'
authors: ['azkaradinka']
---


## Project Info

🗃 **Package**: [TensorFlow](https://github.com/tensorflow), [PIL](https://github.com/python-pillow/Pillow),  [Shapely](https://github.com/shapely/shapely), [opencv](https://github.com/opencv/opencv-python), [SciPy](https://github.com/scipy/scipy), [pandas](https://github.com/pandas-dev/pandas), [NumPy](https://github.com/numpy/numpy)

🗄 **Environment**: `Python 3.7.13`, [Google Colab](https://colab.research.google.com/) with K80 GPU

📑 **Related Paper**: [xBD dataset](https://arxiv.org/abs/1911.09296)

🔗 **Dataset**: [Palu Disaster Satellite Images](https://www.kaggle.com/datasets/auliawicaksono/palu-disaster-satellite-images) (part of [xBD dataset](https://arxiv.org/abs/1911.09296))

🎖 **Related Competition**: [xView2: Assess Building Damage](https://xview2.org/)

💻 **Source Code**: [github.com/aradinka/MADANI](https://github.com/aradinka/MADANI)

📌 **Live Demo**: **[Building Damage Detection Demo](https://aradinka-xview2-building-damage-detection-app-rm3i5q.streamlit.app/)**


## Overview

![overview](/static/images/projects/madani-thumbnail.jpg)

From many disasters in Indonesia, the problem that often occurs in the disaster mitigation process is the difficulty of determining the areas and buildings affected by the disaster and determining the logistics distribution channels needed after a disaster occurs. Manual monitoring can be done, but it will require more resources, such as human and financial resources.

Disaster mitigation follows the processes included in the standard operating procedures according to the level of disaster. MADANI (Mapping and Data Assesment for Natural Incident) is intended to support one of these processes, mainly in estimating areas and buildings affected by disasters and determining post-disaster logistics distribution channels.

## Dataset

![](/static/images/projects/madani-1.jpg)

I use the xBD dataset to assess building damage from satellite imagery. xBD provides pre and post-event satellite imagery from various disaster events with building polygons, classification labels for damage types, labels of damage level, and corresponding satellite medatada. Detailed information can be found on [the xView2](https://xview2.org/) site. I use the Palu 2018 tsunami disaster satellite data provided by xBD, which can be downloaded [here](https://www.kaggle.com/auliawicaksono/palu-disaster-satellite-images). This dataset contains 226 pre and post-disaster satellite imagery, with 16,764 building polygons.

## Data Preparation

![](/static/images/projects/madani-2.jpg)

The image that will be used for training is a polygon image that has been extracted from a complete satellite image. After doing some extraction, we generate a csv file with polygon ID and its corresponding damage labels. We will use this csv later to input data into the model using [flow_from_dataframe](https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/image/ImageDataGenerator#flow_from_dataframe). We will apply multiple augmentations to our training data for all polygon images, such as; horizontal flip, vertical flip, rotation, width and height shift. We resize our input images to 128x128.

## App Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/-6sgkJwHzxM?start=22" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Building Damage Detection Demo

See [here](https://aradinka-xview2-building-damage-detection-app-rm3i5q.streamlit.app/)