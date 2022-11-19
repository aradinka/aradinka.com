---
title: 'Audio Conversation Transcription'
date: '2022-07-01'
tags: ['speaker-diarization', 'voice-activity-detection', 'clustering', 'speaker-recognition', 'speaker-identification']
draft: false
summary: ''
authors: ['azkaradinka']
---

## Project Info

Github:  Private (internal project in company)

Package: [TensorFlow](https://github.com/tensorflow), [librosa](https://github.com/librosa/librosa), [SoundFile](https://github.com/bastibe/python-soundfile), [Pydub](https://github.com/jiaaro/pydub), [webrtcvad](https://github.com/wiseman/py-webrtcvad), [pyannote.audio](https://github.com/pyannote/pyannote-audio), [scikit-learn](https://github.com/scikit-learn/scikit-learn), [SciPy](https://github.com/scipy/scipy), [pandas](https://github.com/pandas-dev/pandas), [NumPy](https://github.com/numpy/numpy)

Environment: `Python 3.7.13`, Tesla V100 GPU

Paper source: [VoxCeleb: a large-scale speaker identification dataset](https://arxiv.org/abs/1706.08612), [VoxCeleb2: Deep Speaker Recognition](https://arxiv.org/abs/1806.05622), [Utterance-level Aggregation For Speaker Recognition In The Wild](https://arxiv.org/abs/1902.10107)

Dataset: VoxCeleb2 (training), VoxCeleb1 (testing). See the dataset [here](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/)

Topics: speaker diarization, voice activity detection, speaker recognition, clustering, similarity measures, speaker identification

Project input: `.wav` audio containing conversation between 2 speakers or up to 25 speakers

Project output: Detect each speaker audio snippet, give each audio snippet a speaker name, then create transcription with speaker timestamps when the speaker speaks

## Live Demo

[Audio Conversation Transcription Demo](https://aradinka-audio-conversation-transcription-app-qr965p.streamlit.app/)