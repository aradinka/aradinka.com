---
title: 'IMDb Dashboard using Shiny R'
date: '2020-08-15'
tags: ['R', 'shiny', 'ggplot']
draft: false
summary: 'Top 500 IMDb Movie Dashboard using Shiny R'
authors: ['azkaradinka', 'auboktav']
---

## Project Info

🗄 **Environment**: R, Rmarkdown

📑 **Paper**: [Implementasi Teknik Web Scrapping dan Analisis Clustering pada Data Top 500 IMDb US Box Office Movies](https://github.com/aradinka/IMDb-Dashboard/blob/main/Paper.pdf)

🔗 **Dataset**: Scrapped from [IMDb "Top 1000" (Sorted by US Box Office Descending)](https://www.imdb.com/search/title/?groups=top_1000&sort=boxoffice_gross_us,desc)

💻 **Source Code**: [github.com/aradinka/IMDb-Dashboard](https://github.com/aradinka/IMDb-Dashboard)

📌 **Live Demo**: **[aradinka.shinyapps.io/imdb](https://aradinka.shinyapps.io/imdb)**

## Overview

![overview](/static/gifs/project-imdb.gif)

Searching and retrieving large amounts of data is more accessible and faster nowadays. Data can be obtained from web pages with the web scraping method. Web scraping is the process of retrieving a semi-structured document from the internet, generally a web page. Using web scraping, we will examine the data on the top 500 films on IMDb. We will do exploratory data analysis, K-Means Clustering, and creating dashboard to find information and characteristics of the films.

## Library

```R
# scrapping
library(xml2)
library(rvest)

# data preprocessing
library(stringr)
library(rebus)
library(writexl)

### data wrangling
library(tidyverse)
library(readxl)
library(BBmisc)
library(purrr)
library(data.table)

### visualization
library(radarchart)
library(grDevices)
library(plotly)
library(DT)
library(fmsb)
library(cowplot)
library(dygraphs)
library(formattable)
library(ggpubr)

### clustering
library(NbClust)
library(factoextra)

### dashboard
library(knitr)
library(shiny)
library(shinydashboard)
library(flexdashboard)
```
