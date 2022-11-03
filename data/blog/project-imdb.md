---
title: 'IMDb'
date: '2020-08-15'
tags: ['R', 'shiny', 'ggplot']
draft: false
summary: 'Top 500 IMDb Movie Dashboard'
authors: ['azkaradinka', 'auboktav']
---

# Overview

![overview](/static/images/projects/project-imdb/imdb-thumbnail.jpg)

Searching and retrieving large amounts of data is more accessible and faster nowadays. Data can be obtained from web pages with the web scraping method. Web scraping is the process of retrieving a semi-structured document from the internet, generally a web page. Using web scraping, we will examine the data on the top 500 films on IMDb. We will do exploratory data analysis, K-Means Clustering, and creating dashboard to find information and characteristics of the films.

# Library

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

The dashboard now live on **[aradinka.shinyapps.io/imdb](https://aradinka.shinyapps.io/imdb)**