

# Creating a Project

- Create project post `project-ProjectName.md`, store at `/data/blog/` folder
- Prepare project thumbnail (16 x 9), store in `/static/images/project/project-ProjectName/`
- Add created project to `/data/projectsData.js` data. Add title, desc, imgSrc and href link

Project templates
```
---
title: 'The Time Machine'
date: '2018-08-15'
tags: ['writings', 'book', 'reflection']
draft: false
summary: 'The Time Traveller (for so it will be convenient to speak of him) was
expounding a recondite matter to us. His pale grey eyes shone and
twinkled, and his usually pale face was flushed and animated...'
---
```

# Creating a Blog

- Create blog post `PostName.md`, store at `/data/project/` folder

Blog templates
```
---
title: Images in Next.js
date: '2020-11-11'
tags: ['next js', 'guide']
draft: false
summary: 'In this article we introduce adding images in the tailwind starter blog and the benefits and limitations of the next/image component.'
authors: ['sparrowhawk']
---
```

# Creating Author Profile

- Put author's profile image at `/static/images/authors/`

Author template
```
---
name: Azka Radinka
avatar: /static/images/sparrowhawk-avatar.jpg
occupation: Data Scientist
company:  
linkedin: https://www.linkedin.com/in/aradinka
---
```