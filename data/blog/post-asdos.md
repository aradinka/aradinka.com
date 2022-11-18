---
title: 'Exploratory Data Analysis Course'
date: '2022-02-01'
tags: ['teaching', 'ggplot']
draft: false
summary: 'Course materials about exploring data before conducting more complex data analysis.'
authors: ['azkaradinka', 'benedictuskt']
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />

## Course Description

This course studies summarizing or exploring data before conducting more complex data analysis to obtain initial information about the data. Teaching was carried out for 16 weeks with 50 student participants. The techniques studied in this course include; Identifying data patterns through diagrams or graphs, determining the pattern of relationships between variables using scatter diagrams, making equations and smoothing data, comparing several groups of data and data distribution.

## Sample Materials

### Data visualization using custom theme `ggplot` library

Create your own custom theme

```R
theme_azka = function(){
        theme_fivethirtyeight() +
        theme(plot.title = element_text(size = 24, face = 'bold'),
              plot.subtitle = element_text(size = 16),
              plot.caption = element_text(size = 11, color = '#1BCBF2'),
              axis.title.x = element_text(size = 16, face = 'bold', vjust = 0),
              axis.text.x  = element_text(size = 11),
              axis.title.y = element_text(size = 16, face = 'bold', vjust = 1),
              axis.text.y = element_text(size = 11),
              axis.ticks = element_blank(),
              panel.grid.major = element_blank(),
              panel.grid.minor = element_blank(),
              panel.grid.major.y = element_line(colour = "grey"),
              panel.border = element_blank())
}
```


#### Bar Plot

Data [Football Events](https://www.kaggle.com/datasets/secareanualin/football-events)

```R
library(dplyr)

events = read.csv('../input/football-events/events.csv')
matches = read.csv('../input/football-events/ginf.csv')
df = left_join(events, matches, by = "id_odsp")
df$league = as.factor(df$league)
levels(df$league) = c('Bundesliga','Premier League','Ligue 1','Serie A','La Liga')
cards =<-= df[df$event_type == 4 | df$event_type==5 | df$event_type==6,]
```

```R
cards %>%
    filter(event_type == 4 | event_type == 5 | event_type == 6) %>%
    select(league, event_type) %>%
    count(league, sort = TRUE) %>%
    ggplot(aes(x = reorder(league, -n), y = n)) +
        geom_bar(stat = 'identity', fill = c('#038C3E', '#049DD9', '#D9CD23', '#F23545', '#030A8C')) +
        labs(title = 'Total Jumlah Kartu',
             subtitle = '9,074 football games across Europe',
             caption = 'Data from Kaggle',
             x = 'League') +
        scale_y_continuous('Jumlah Kartu', 
                            breaks = seq(0, 15000, 3000),
                            limits = c(0, 15000)) +
        geom_text(aes(label = n), vjust = 2.2, fontface = 'bold', colour = 'white') +
        theme_azka()
```

![Barplot](/static/images/post/asdos-1.png) 

#### Bubble Plot

Data [Gapminder](https://www.kaggle.com/datasets/tklimonova/gapminder-datacamp-2007)

```R
gapminder = read.csv('../input/gapminder-datacamp-2007/gapminder_full.csv')

gapminder %>%
    filter(year == 2007) %>%
    ggplot(aes(x = gdp_cap, y = life_exp, size = population, color = continent)) +
        geom_point(alpha = 0.4, ) + 
        labs(title = 'Gapminder World Chart',
             subtitle = 'Year 2007',
             caption = 'Data from Kaggle',
             x = 'Income per capita (Dollars)',
             y = 'Life Expectancy (Year)') +
        scale_size(range = c(.1, 22))
```

![Bubbleplot1](/static/images/post/asdos-2.png)


```R
indonesia = gapminder %>%
    filter(year == 2007, country == 'Indonesia') %>%
    mutate(`population (M)` = population/1000000)

gapminder %>%
    filter(year == 2007) %>%
    mutate(`population (M)` = population/1000000) %>%
    ggplot(aes(x = gdp_cap, y = life_exp, size = `population (M)`)) +
        geom_point(alpha = 0.11) +
        geom_point(data = indonesia, aes(x = gdp_cap, y = life_exp, color = 'red')) +
        annotate("text", x = indonesia[, 'gdp_cap'] + 5500, y = indonesia[, 'life_exp'] - 1.5, label = "Indonesia",
                 fontface="bold", color = 'red', alpha = 0.8, size = 5) +
        labs(title = 'Gapminder World Chart',
             subtitle = 'Year 2007',
             caption = 'Data from Kaggle',
             x = 'Income per capita (Dollars)',
             y = 'Life Expectancy (Year)') +
        scale_size(range = c(.1, 19)) +
        theme_azka() +
        theme(panel.grid.major.x = element_line(colour = "grey")) +
        guides(color=FALSE)
```

![Barplot](/static/images/post/asdos-3.png)

## Kaggle Notebook

Full notebook on my [kaggle](https://www.kaggle.com/code/aradinka/count-plot-bubble-plot-in-ggplot2-r/notebook)