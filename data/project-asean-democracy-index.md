---
title: 'ASEAN Democracy Index EDA'
date: '2018-08-15'
tags: ['EDA', 'ggplot2']
draft: false
summary: ''
authors: ['azkaradinka']
---

## Overview

The Democracy Index is an index that compiled based on 60 indicators grouped in five different categories that measure pluralism, civil liberties, and political culture. The aim of this project is to know the condition of democracy in ASEAN member countries in the last 1 decade. The data source which used in this project is produced by the Economist Intelligence Unit about the index democracy from 2010 to 2019. Data exploration method, used are boxplot, violin plot, scatterplot, line graphs, correlograms, and geographic plots.

## EDA

### How's the index spread and skew each year?

![](/static/images/projects/asean-1.png)

The democracy index of ASEAN member countries has varied in the last 10 years. Overall, a decline happened from 2013 to 2018 after 3 the previous year was constant but rose again in 2019.

### How's the evolution of the democracy index  in each country?

![](/static/images/projects/asean-2.png)

In the last decade, the highest increase in the democracy index score occurred in Myanmar. Myanmar's democracy index score rose by 17.8 from 17.7 to 35.5. The biggest decline in the democracy index score occurred in Cambodia. Cambodia's democracy index score fell by 13.4 from 48.7 to 35.3.

### How's the distribution of the democracy index  in each country?

![](/static/images/projects/asean-3.png)

![](/static/images/projects/asean-median-df.png)

Violin plots show the shape of a data set by using a density plot, which is effectively a smoothed-over histogram. Laos has a shortest tange violin and has the lowest democratic index median value in the last decade with a median value of 22.4. Myanmar has the longest violin range. Philippines has the highest democracy index median value in the last decade with a value of 66.75.

### How's the correlation betweeen variables?

![](/static/images/projects/asean-4.png)

The democracy index strongly correlates positively with the Electoral Pluralism Index, Political Participation Index, Civil Liberties Index, and Government Index. But the democracy index has a weak positive correlation with the Political Culture Index.

### Map Visualization

![](/static/images/projects/asean-5.png)

Based on the last democracy index score in 2019, ASEAN countries categorized as a regime with flawed democracy are; Indonesia, Thailand, Malaysia, Philippines, and Singapore,. The authoritarian regime countries are; Vietnam, Laos, Cambodia, and Myanmar.

## Kaggle Notebooks

See [here](https://www.kaggle.com/code/aradinka/asean-democracy-index-eda)