---
title: 'Audio Conversation Transcription'
date: '2022-07-01'
tags: ['python', 'tensorflow', 'librosa', 'soundfile', 'pydub', 'webrtcvad', 'pyannote', 'scikit-learn', 'scipy', 'streamlit']
draft: true
summary: ''
authors: ['azkaradinka']
---

## Project Info

🗃 **Package**: [TensorFlow](https://github.com/tensorflow), [librosa](https://github.com/librosa/librosa), [SoundFile](https://github.com/bastibe/python-soundfile), [Pydub](https://github.com/jiaaro/pydub), [webrtcvad](https://github.com/wiseman/py-webrtcvad), [pyannote.audio](https://github.com/pyannote/pyannote-audio), [scikit-learn](https://github.com/scikit-learn/scikit-learn), [SciPy](https://github.com/scipy/scipy)

🗄 **Environment**: `Python 3.7.13`, Tesla V100 GPU

📑 **Related Paper**: [VoxCeleb: a large-scale speaker identification dataset](https://arxiv.org/abs/1706.08612), [VoxCeleb2: Deep Speaker Recognition](https://arxiv.org/abs/1806.05622), [Utterance-level Aggregation For Speaker Recognition In The Wild](https://arxiv.org/abs/1902.10107)

🔗 **Dataset**: VoxCeleb2 (training), VoxCeleb1 (testing). See the dataset [here](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/)

📰 **Topics**: speaker diarization, voice activity detection, speaker recognition, clustering, similarity measures, speaker identification

📥 **Project input**: `.wav` audio containing conversation between 2 speakers or up to 25 speakers

📤 **Project output**: Detect each speaker audio snippet, user can give each audio snippet a speaker name, then create transcription with speaker time stamp when the speaker speaks

📌 **Live Demo**: [Audio Conversation Transcription Demo](https://aradinka-audio-conversation-transcription-app-qr965p.streamlit.app/)

## Overview

Much information can be extracted from recorded voice data such as the speaker's identity, the conversation between speakers, and the exact time stamp of when the speaker speaks. Manually, lengthy recorded voice data information extraction process takes significant time and energy.

Speaker diarization overcame this problem by dividing pieces of recorded voice data into groups based on the speaker's identity while specifying when the speaker speaks. A speaker diarization system was made by performing segmentation on voice data, extracting unique voice features, and clustering the extracted voice features. A convolutional neural network model called visual geometry group speaker recognition was trained on VoxCeleb2 data to extract voice features. 

This project carries out a comparison of the voice clustering method between agglomerative hierarchical clustering and spectral clustering. The speaker diarization system was evaluated on 600 conversation data with 2 to 7 speakers made of VoxCeleb1 voice snippets. The best cluster was determined using Silhouette Coefficient.

## Live Demo

📌 **Live Demo**: [Audio Conversation Transcription Demo](https://aradinka-audio-conversation-transcription-app-qr965p.streamlit.app/)
