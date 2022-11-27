---
title: 'Face Detection & Gender Classification'
date: '2021-09-25'
tags: ['python', 'tensorflow', 'PIL', 'face_recognition', 'streamlit']
draft: false
summary: ''
authors: ['azkaradinka']
---

## Project Info

🗃 **Package**: [TensorFlow](https://github.com/tensorflow), [PIL](https://github.com/python-pillow/Pillow), [face_recognition](https://github.com/ageitgey/face_recognition)

🗄 **Environment**: `Python 3.7.13`, [Google Colab](https://colab.research.google.com/) with K80 GPU

🎖 **Related Competition**: [Satria Data](https://satriadata.kemdikbud.go.id/)

🔗 **Dataset**: Private dataset provided by Satria Data Competition

📈 **Result**: Top 15 solution on the competition (total 218 participant / 70++ teams)

💻 **Source Code**: [github.com/aradinka/big-data-challenge-satria-data](https://github.com/aradinka/big-data-challenge-satria-data)

## Live Demo

📌 **Live Demo**: [Gender Classification with Sample Image](http://bdc.herokuapp.com/)

This live demo built using free Heroku dynos. Starting November 28th 2022 the apps will no longer be available :( you can run the app in your local machine as follows

```
!git clone https://github.com/aradinka/big-data-challenge-satria-data.git
!cd big-data-challenge-satria-data
!pip instal requirements.txt
!pip streamlit run app.py
```