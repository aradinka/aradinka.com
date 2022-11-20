---
title: 'My 1 Year Data Scientist Internship'
date: '2022-07-11'
tags: ['post']
draft: false
summary: ''
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />

## Overview

In my last year of college, I interned as a data scientist in the technical voice analytics team (Big Data Platform, AI & Cyber Security Division) and the technical ai team (Emerging Technology Platform Division) in Digital Business Telkom. My team consists of less than eight people, with two interns. I do all data scientist activities starting from paper research, reproducing SOTA paper code from GitHub, reading old code and implementing new code on the server, doing model training, evaluating model performance, creating CRUD API, writing papers, and creating datasets for evaluation.

Some projects that I work on use voice data and text data. On text data, I researched question-answering systems and trained big language RoBERTa model on the Indonesian using the [Indo4B](https://www.indobenchmark.com/) dataset by utilizing several GPUs on the server. On voice data, I developed a speaker diarization project that includes voice activity detection, speaker recognition, and voice identification tasks.


<div className="flex flex-wrap -mx-2 overflow-hidden xl:-mx-2">
  <div className="my-1 px-2 w-full overflow-hidden xl:my-1 xl:px-2 xl:w-1/2">
    ![1](/static/images/post/intern-ddb-1.jpeg)
  </div>
  <div className="my-1 px-2 w-full overflow-hidden xl:my-1 xl:px-2 xl:w-1/2">
    ![2](/static/images/post/intern-ddb-5.jpeg)
  </div>
</div>

Read about my internship journey from Digi Inspiration DDB Instagram post [here](https://www.instagram.com/p/CZZFAYovC8x/?utm_source=ig_web_copy_link)

## How I get in

![Interview](/static/gifs/post-intern-ddb.gif)

I registered as a data scientist intern at [internship.ddbtelkom.id/](https://internship.ddbtelkom.id/). This FHCI (Forum Human Capital Indonesia) program allows active university students to do an internship for six months which can be extended for up to 12 months. My CV was accepted, and I had to make a profile video like the one above. After receiving my application, I was interviewed by 2 data scientists and talked about the projects I had worked on and the stack of data science tools I could use. I am thrilled that I managed to pass along with 29 other data scientists interns who were also selected among 1100 applicants.


### Speaker Diarization Project

In the first month of my internship, I was paired with one of the on-the-job training participants to complete the speaker diarization project. At that time, our team already had one of the states of speaker recognition models trained on a large amount of voice data. The problem statement given is as follows.

> Given a speaker recognition model, how do we know how many speakers there are in an audio conversation and when the speaker speaks?

This project lasted 1 month until it solved the problem statement above and continued making the CRUD API in the following months. This project is also the initiation of my final undergraduate thesis project, which is about unsupervised speaker diarization. A demo of my final project can be seen **[here](https://aradinka-audio-conversation-transcription-app-qr965p.streamlit.app/)**.