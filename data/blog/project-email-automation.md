---
title: 'Personalized Email Automation with Python'
date: '2020-03-2'
tags: ['automation']
draft: false
summary: ''
authors: ['azkaradinka']
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />

## Project Info

🗃 **Package**: [smtplib](https://docs.python.org/3/library/smtplib.html)

💻 **Source Code**:  [github.com/aradinka/Personalized-Email-Automation](https://github.com/aradinka/Personalized-Email-Automation)

## Overview

I just completed one of the specializations from Coursera, namely [Google IT Automation with Python](https://www.coursera.org/professional-certificates/google-it-automation). In the last course, several automation projects interested me to implementing them in my organization. This specialization consists of 6 courses, including:
1. Crash Course on Python
2. Using Python to Interact with the Operating System
3. Introduction to Git and GitHub
4. Troubleshooting and Debugging Techniques
5. Configuration Management and the Cloud
6. Automating Real-World Tasks with Python

Currently, I am a member of Professional Statistics HIMASTA-ITS as Head of Public Relations. One of the tasks that I will often do is to provide information to all members via email. The closest event I have to convey is the welcoming activity for a new team. Dozens of new members should get an email from me with different names and divisions. Sending emails would only be effective if done by writing the name and divisions one by one.

I also don't want to use additional extensions or paid services to do mass personalized email automation. Therefore I created this simple project so that when I have to send an email, I only need to edit the text message and send it by running a python script.

## Requirements

1. Recipient data in tabular format containing information about name, division, email, etc. Saved as `.csv` file
2. Message in html format, saved as `.txt` file
3. Python script to sent `.txt` message to all recipient

### Sample recipient data

| Name                | Email                | Department         |
| ------------------- | -------------------  | ------------------- | 
| Yohanes xxx         | yohanesxxx@gmail.com | Research and Development |
| Putri xxx           | putrixxx@gmail.com   | Operation  |
| . | .| .| 
| . | .| .| 
| Bramandika | bramandikaxxx@gmail.com | Media | 




### Sample `.txt` message

```
<h2 style="color: #2e6c80;">Hi ${NAME}!</h2>

<p>You have confirmed your seat in PST HIMASTA-ITS 2020/2021. Welcome to the team!</p>

<p>We're thrilled to have you at PSt HIMASTA-ITS. It's amazing to have such a fresh and talented new member as part of our team. A big congratulations on your new role on ${DEPARTEMEN} department. Hope we can together take PSt to new heights!</p>

<p>Our first meeting will be held in a few days, and we'd love for you to join us at our welcome party. This is an intimate event intended to foster conversation and get to know each other. Before we have our first meeting, there are things you need to prepare. We challenge you to make a professional summary.</p>

<p>Professional summary is a professional introduction that highlight your most valuable skills and experiences. Your professional summary is like a strong handshake, articulating your personal vision, major skills, and also your interest.</p>

<p>Use the template that we provide on <span style="color: #000000;"><strong><a style="color: #000000;" href="http://www.pstguides.website/WelcomeParty">www.pstguides.website/WelcomeParty</a></strong></span>, you can use either bahasa or english for your professional summary, and please send your work back to us via email before 4 March 2021 20:59.</p>

<p>Best Regards, PSt Team.</p>
```

See the sample message above, we can subtitute `${NAME}` and `${DEPARTEMEN}` with our data later.

### Python script

```python
import csv
import smtplib

from string import Template
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def main():
  with open("Message.txt", "r", encoding = "utf-8") as file:
    messages = Template(file.read())
  
  smtObject = smtplib.SMTP(host = "smtp.gmail.com", port = 587)
  smtObject.starttls()
  smtObject.login("myemail@gmail.com", "password")
  
  with open("Email Data.csv", "r") as file:
    csv_file = csv.reader(file, delimiter = ",")
    next(csv_file)
    
    for x in csv_file:
      message = messages.substitute(NAME = x[0], DEPARTEMEN = x[2])
      msg = MIMEMultipart()
      msg["Subject"] = "Welcome Party PSt"
      msg["From"] = "psthimasta@gmail.com"
      msg["To"] = x[1]
      msg.attach(MIMEText(message, "html"))
      
      smtObject.send_message(msg)
      del msg
      
      print("Email sent to {}".format(x[0]))
    smtObject.quit()
    
    
if __name__ == "__main__":
  main()
```

Run your python script

```
python script.py
```

![](/static/gifs/pst-email-automation.gif)

Viola!