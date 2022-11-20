---
title: 'HBAT Factor Analysis'
date: '2021-05-7'
tags: ['R']
draft: false
summary: ''
authors: ['azkaradinka']
layout: PostLayout
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />

# Project Info

🗃 **Package**: [psych](https://cran.r-project.org/web/packages/psych/index.html), [factoextra](https://cran.r-project.org/web/packages/factoextra/index.html), [FactoMineR](https://cran.r-project.org/web/packages/FactoMineR/index.html), [tidyr](https://cran.r-project.org/web/packages/tidyr/index.html), [ggplot2](https://cran.r-project.org/web/packages/ggplot2/index.html)

🗄 **Environment**: R Kaggle Notebook

🔗 **Dataset**: [HBAT Customer Survey Dataset](https://www.kaggle.com/datasets/aradinka/hbat-dataset)

💻 **Source Code**: [kaggle.com/aradinka/hbat-factor-analysis-using-pca-varimax-rotation](https://www.kaggle.com/aradinka/hbat-factor-analysis-using-pca-varimax-rotation)

# HBAT Dataset

This dataset has 100 observations with 18 variables from a market segmentation study of HBAT customers.

HBAT sells paper products to 2 market segments, namely Newsprint Industry and Magazine Industry. Paper products are sold to both market segments directly or indirectly/through brokers.

There are 2 pieces of information taken from the survey conducted:
1. Information on perceptions of HBAT performance (13 variables). This information is obtained through the pretest and previous research, which is considered the most influential in selecting suppliers in the paper industry. The respondents were purchasing managers of companies that buy from HBAT, and they rated HBAT using a scale of 0-10, with 10 being "Very Good" and 0 being "Poor".
2. Purchase results and business relationships. It can also be said to be satisfied with HBAT and whether the company will consider a strategic alliance/partnership with HBAT.

By analyzing this data, HBAT can better understand its customers' characteristics and the relationship between their perceptions of HBAT and their actions towards HBAT.

The following are the variables in the HBAT data, along with their descriptions and data types:

|Variable|Description|Type|
|---|---|---|
|**Data Warehouse Classification Variables**| | |
|X1|Customer Type|Nonmetric|
|X2|Industry Type|Nonmetric|
|X3|Firm Size|Nonmetric|
|X4|Region|Nonmetric|
|X5|Distribution System|Nonmetric|
|**Performance Perceptions Variables**| | |
|X6|Product Quality|Metric|
|X7|E-Commerce Activities/Website|Metric|
|X8|Technical Support|Metric|
|X9|Complaint Resolution|Metric|
|X10|Advertising|Metric|
|X11|Product Line|Metric|
|X12|Salesforce Image|Metric|
|X13|Competitive Pricing|Metric|
|X14|Warrantly and Claims|Metric|
|X15|New Products|Metric|
|X16|Ordering and Billing|Metric|
|X17|Price Flexibility|Metric|
|X18|Delivery Speed|Metric|
|**Outcome/Relationship Measures**| | |
|X19|Satisfaction|Metric|
|X20|Likelihood of Recommendation|Metric|
|X21|Likelihood of Future Purchase|Metric|
|X22|Current Purchase/Usage Level|Metric|
|X23|Consider Strategic Alliance/Partnership in Future|Nonmetric|


# Analysis

Objective:
- Obtain m groups of dominant and independent variables using the orthogonal factor analysis method with the Principle Component factor weight estimation method and the varimax rotation method.
- Give category names based on similar characteristics between variables in the same group.
- Obtain the covariance matrix between m factor scores and the covariance matrix between m PCs

## Factor Analysis Assumption

- Measures of Sampling Adequacy (MSA)
- Kaiser Meyer Olkin Measure of Sampling (KMO)
- Bartlett Test of Sphericity

### Measures of Sampling Adequacy


```r
library(readxl)
library(psych)

df = read_excel('../input/hbat-dataset/HBAT100.xlsx')
df = df[7:19]
colnames(df) = c('Product Quality', 'E-Commerce Activities/Website', 'Technical Support', 'Complaint Resolution', 
                 'Advertising', 'Product Line', 'Salesforce Image', 'Competitive Pricing', 'Warrantly and Claims', 
                 'New Products', 'Ordering and Billing', 'Price Flexibility', 'Delivery Speed')

KMO(df)
```

```
Kaiser-Meyer-Olkin factor adequacy
Call: KMO(r = df)
Overall MSA =  0.61
MSA for each item = 
              Product Quality E-Commerce Activities/Website 
                         0.87                          0.62 
            Technical Support          Complaint Resolution 
                         0.53                          0.89 
                  Advertising                  Product Line 
                         0.81                          0.45 
             Salesforce Image           Competitive Pricing 
                         0.59                          0.88 
         Warrantly and Claims                  New Products 
                         0.53                          0.31 
         Ordering and Billing             Price Flexibility 
                         0.86                          0.44 
               Delivery Speed 
                         0.53
```

- The MSA value > 0.5 indicates that this variable has a sufficient correlation with other variables to be analyzed further. If the MSA value < 0.5, this variable cannot be analyzed further, so it needs to be excluded.
- The MSA value based on the test above shows that the `Product Line`, `New Products`, and `Price Flexibility` variables have an MSA value of < 0.5. We will exclude variables with an MSA < 0.5, starting from the smallest MSA value to the overall MSA value obtained > 0.5.
- Because the MSA value of the `New Products` variable is the smallest MSA value, we will remove the `New Products` variable first.

```r
df = subset(df, select = -c(`New Products`))
KMO(df)
```

```
Kaiser-Meyer-Olkin factor adequacy
Call: KMO(r = df)
Overall MSA =  0.61
MSA for each item = 
              Product Quality E-Commerce Activities/Website 
                         0.88                          0.62 
            Technical Support          Complaint Resolution 
                         0.53                          0.89 
                  Advertising                  Product Line 
                         0.80                          0.45 
             Salesforce Image           Competitive Pricing 
                         0.59                          0.88 
         Warrantly and Claims          Ordering and Billing 
                         0.53                          0.86 
            Price Flexibility                Delivery Speed 
                         0.44                          0.53
```

MSA value of Price Flexibility and Product Line < 0.5. The Price Flexibility variable will be excluded from the data because it has the lowest MSA value.

```r
df = subset(df, select = -c(`Price Flexibility`))
KMO(df)
```

```
Kaiser-Meyer-Olkin factor adequacy
Call: KMO(r = df)
Overall MSA =  0.65
MSA for each item = 
              Product Quality E-Commerce Activities/Website 
                         0.51                          0.63 
            Technical Support          Complaint Resolution 
                         0.52                          0.79 
                  Advertising                  Product Line 
                         0.78                          0.62 
             Salesforce Image           Competitive Pricing 
                         0.62                          0.75 
         Warrantly and Claims          Ordering and Billing 
                         0.51                          0.76 
               Delivery Speed 
                         0.67
```

The MSA value for all variables is > 0.5, so further analysis can be carried out.

### Kaiser Meyer Oikin Test (KMO)

Refrence : [KMO documentation](https://www.rdocumentation.org/packages/psych/versions/2.1.3/topics/KMO)

Kaiser-Meyer-Olkin (KMO) Measure of Sampling Adequacy is an index that compares the magnitude of the observed correlation coefficient with the magnitude of the partial coefficient. The number generated by the KMO Measure of Sampling Adequency must be greater than 0.50 so that factor analysis can be processed further. ([Santoso, 2012](https://media.neliti.com/media/publications/287280-analisis-faktor-yang-merupakan-intensi-p-c8e56a3d.pdf)).

#### Hipotesis

- $H_0$ = The amount of data is enough to be factored
- $H_1$ = The amount of data is not enough to be factored

```r
KMO(df)
```

```
Kaiser-Meyer-Olkin factor adequacy
Call: KMO(r = df)
Overall MSA =  0.65
MSA for each item = 
              Product Quality E-Commerce Activities/Website 
                         0.51                          0.63 
            Technical Support          Complaint Resolution 
                         0.52                          0.79 
                  Advertising                  Product Line 
                         0.78                          0.62 
             Salesforce Image           Competitive Pricing 
                         0.62                          0.75 
         Warrantly and Claims          Ordering and Billing 
                         0.51                          0.76 
               Delivery Speed 
                         0.67
```

#### Test Result

Failed to reject $H_0$ because the overall MSA value greater than the significance level used (0.65 > 0.05). By using a 95% confidence level, it can be concluded that the amount of data is sufficient to be factored.


### Bartlett Test of Sphericity

Refrence : [cortest.barlett documentation](https://rdrr.io/cran/psych/man/cortest.bartlett.html)

Bartlett's Test of Sphericity tests the interdependence between variables that are indicators of a factor. This analysis intends to state that the variables in question are not correlated with one another in the population. Significance in this Bartlett's test must also show a value lower than 0.05 so that factor analysis can be carried out. ([Santoso, 2012](https://media.neliti.com/media/publications/287280-analisis-faktor-yang-merupakan-intensi-p-c8e56a3d.pdf)).

```r
cortest.bartlett(cor(df), n = nrow(df))
```

```
$chisq
619.272557796416

$p.value
1.79337000936339e-96

$df
55
```

The p.value results of the Barlett test are smaller than the significance level used (1.79e-96 < 0.05), so factor analysis can be performed.

## Correlation Matrix

This matrix shows the value of the closeness of the relationship between variables. The correlation matrix contains the coefficients of all pairs of research variables.

```r
mat = cor(df) 
mat
```

![](/static/images/projects/factor-analysis-1.png)

## Eigenvalue $\hat{\lambda}$  


Refrence : [eigen documentation](https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/eigen)

```
pc = eigen(mat)
eigenvalue = pc$values
eigenvalue
```

```
1.  3.42697132813607
2.  2.55089671199934
3.  1.69097647560724
4.  1.08655605660975
5.  0.609424094911493
6.  0.551883777841791
7.  0.401518146732035
8.  0.246951544718933
9.  0.20355326777805
10.  0.132841576935574
11.  0.0984270187297207
```

## Eigenvector ${\hat{e}}$

```r
eigenvec = pc$vectors
eigenvec
```


![](/static/images/projects/factor-analysis-2.png)

## Scree Plot

```r
res.pca <- PCA(df, graph = FALSE)
fviz_eig(res.pca, addlabels = TRUE)
```


![](/static/images/projects/factor-analysis.png)

## Varians Proportion and It's Cumulative

```r
sumvar = sum(pc$values)
p = ncol(df)
var = matrix(c(0), p, 1)
cumvar = matrix(c(0), p, 1)

for(i in 1:p){ 
    var[i] = pc$values[i]/sumvar
    
    if(i == 1){
        cumvar[i] = var[i]
    }else{
        cumvar[i] = var[i] + cumvar[i-1]
    }
}

total_variance_explained = data.frame(Component = seq(1, p, 1), 
                                      Total = pc$values, `% of Variance` = var, 
                                      `Cumulative %` = cumvar, 
                                      check.names = FALSE)
total_variance_explained
```


![](/static/images/projects/factor-analysis-3.png)

## Determining the number of factor

```r
factors = sum(eigen(mat)$values >= 1)
factors
```

```
4
```

## The proportion of cumulative variability

```r
m = 4
sum(total_variance_explained[m, 'Cumulative %'])
```

```
0.795945506577491
```

0.7959 is the proportion of cumulative variability explained by 4 common factors of a total of 11 variables.

## Loading Factor Matrix

```r
eigenvec = eigen(mat)$vectors
stdev = sqrt(eigen(mat)$values)
loadings = eigenvec[, 1:factors] %*% diag(stdev[1:factors])
loadings
```


![](/static/images/projects/factor-analysis-4.png)

## Communality

```r
communality = as.matrix(apply(loadings, 1, function(x)sum(x^2)))
Communalities = data.frame(Variable = colnames(df), 
                           Communality = communality, 
                           `Specific Variance` = 1-communality,
                           check.names = FALSE)
Communalities
```


![](/static/images/projects/factor-analysis-5.png)

Communality shows the proportion of variability explained by four common factors for each variable. The communalities values of the 11 variables indicate that these four factors cover a relatively large percentage of the sample variance for each variable.

The four factors formed can explain 76.8% of the proportion of the variance of the `Product Quality` variable, 77.8% of the proportion of the variance of the `E-Commerce Activities/Website` variable, 89.3% of the proportion of the variance of the `Technical Support` variable, 88.1% of the proportion of the variance of the `variable Complaint Resolution`, 57.6% proportion of the variance of the `Advertising` variable, 78.7% of the proportion of the variance of the `Product Line` variable, 85.9% of the proportion of the variance of the `Salesforce Image` variable, 64.1% of the proportion of the variance of the `Competitive Pricing` variable, 89.2% of the proportion variance of the `Warranty and Claims` variable, 76.6% of the proportion of the variance of the `Ordering and Billing` variable, and 91.4% of the proportion of the variance of the `Delivery Speed` variable.

## Component Matrix - Grouping variables

### Principal Component Methods

```r
data.frame(Variabel = colnames(df), Component = loadings)
```


![](/static/images/projects/factor-analysis-6.png)

### Varimax Rotation

Refrence : [varimax documentation](https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/varimax)

```r
rotated.loadings = varimax(loadings)

matrix_loadings = rotated.loadings$loadings
class(matrix_loadings) = 'matrix'

data.frame(Variabel = colnames(df), Component = matrix_loadings)1
```


![](/static/images/projects/factor-analysis-7.png)

### Factors formed

- Factor 1: Complaint Resolution, Ordering and Billing, Delivery Speed
- Factor 2: E-Commerce Activities/Website, Advertising, Salesforce Image
- Factor 3: Technical Support, Warranty and Claims
- Factor 4: Product Quality, Product Line, Competitive Pricing

### Visualization

```r
df %>%
    rename(CR = `Complaint Resolution`, OB = `Ordering and Billing`, DS = `Delivery Speed`,
           W = `E-Commerce Activities/Website`, Adv = `Advertising`, SI = `Salesforce Image`,
           TS = `Technical Support`, WC = `Warrantly and Claims`,
           PQ = `Product Quality`, PL = `Product Line`, CP = `Competitive Pricing`) %>%
    gather(key = condition, value = measurement, factor_key = TRUE) %>%
    group_by(condition) %>%
    summarize(mean = mean(measurement)) %>%
    mutate(faktor = case_when(condition == 'CR' |  condition == 'OB' | condition == 'DS' ~ 'Faktor Customer Service',
                              condition == 'W' |  condition == 'Adv' | condition == 'SI' ~ 'Faktor Marketing',
                              condition == 'TS' |  condition == 'WC' ~ 'Faktor Warranty',
                              condition == 'PQ' |  condition == 'PL' | condition == 'CP' ~ 'Faktor Product Value')) %>%
    ggplot(aes(x = condition, y = mean, fill = condition)) +
        geom_bar(stat = 'identity') +
        labs(title = 'Rata-rata skor penilaian HBAT',
             subtitle = 'Skala 0-10, dengan 10 Sangat Baik dan 0 Buruk',
             x = 'Variabel', y = 'Skor') +
        facet_grid(.~faktor, scale = 'free', space = 'free') + 
        theme_minimal() +
        theme(plot.title = element_text(size = 24, face = 'bold'),
              plot.subtitle = element_text(size = 16),
              plot.caption = element_text(size = 11, color = '#1BCBF2'),
              axis.title.x = element_text(size = 16, face = 'bold', vjust = -1),
              axis.text.x  = element_text(size = 11),
              axis.title.y = element_text(size = 16, face = 'bold', vjust = 2),
              axis.text.y = element_text(size = 11),
              axis.ticks = element_blank(),
              panel.grid.major = element_blank(),
              panel.grid.minor = element_blank(),
              panel.grid.major.y = element_line(colour = "grey"),
              panel.grid.minor.y = element_line(colour = "grey"),
              panel.border = element_blank()) +
        guides(fill = FALSE)
        
```

![](/static/images/projects/factor-analysis-plot.png)


# Reference


- [HBAT Dataset Description](https://www.scribd.com/document/458098815/HBAT-description)
- [readxl.tidyverse](https://readxl.tidyverse.org/)
- [Subset Data in R](https://www.statmethods.net/management/subset.html)
- [KMO documentation](https://www.rdocumentation.org/packages/psych/versions/2.1.3/topics/KMO)
- [cor documentation](https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/cor)
- [det documentation](https://www.rdocumentation.org/packages/Matrix/versions/0.3-19/topics/det)
- [cortest.barlett documentation](https://rdrr.io/cran/psych/man/cortest.bartlett.html)
- [eigen documentation](https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/eigen)
- [Converting a List to a Data Frame](https://www.r-bloggers.com/2013/01/converting-a-list-to-a-data-frame/)
- [varimax documentation](https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/varimax)