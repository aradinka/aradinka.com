---
title: 'Influence of Covid 19 on PT Unilever Indonesia Stock Price using ARIMA Intervention Model'
date: '2022-04-15'
tags: ['SAS', 'minitab']
draft: false
summary: ''
authors: ['azkaradinka']
layout: PostLayout
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />


# Project Info

🗄 **Tools**: [SAS](https://www.sas.com/en_us/software/on-demand-for-academics.html), [Minitab19](https://www.minitab.com/en-us/products/minitab/)

🔗 **Dataset**: [PT Unilever Indonesia Tbk (UNVR.JK)](https://finance.yahoo.com/quote/UNVR.JK/history?period1=1535760000&period2=1585612800&interval=1d&filter=history&frequency=1d&includeAdjustedClose=true) stock price (5 September 2018 - 30 May 2020)

💻 **Source Code**: [github.com/aradinka/unilever-arima-intervention](https://github.com/aradinka/unilever-arima-intervention)

# Overview

In daily stock trading activities, stock prices have increased or decreased. The formation of share prices occurs due to the demand and supply of shares. This demand and supply are influenced by many factors, both related to company performance and external factors such as developments in interest rates, inflation, value exchange rates, and unforeseen events such as the COVID-19 pandemic. 

PT. Unilever Indonesia Tbk is an Indonesian company founded on December 5, 1933 and is a subsidiary of Unilever. Unilever Indonesia released 15% of its shares on the Stock Exchange Jakarta and the Surabaya Stock Exchange in 1981 and until now Unilever Indonesia has more than 1,000 distributors throughout Indonesia. Based on data obtained from yahoo finance, Unilever Indonesia recorded a decline in stock prices, especially after the COVID-19 pandemic. Therefore we need an analysis that models the pre and post-time series data COVID-19 on PT Unilever Indonesia Tbk shares using ARIMA intervention.

# Analysis

The steps taken in this analysis are as follows:
1. Pre-Intervention ARIMA Analysis
	- Time series plot of pre-intervention data
	- Checking the stationarity of pre-intervention data
	- Identification of pre-intervention presumptive models
	- Diagnostic checking model pre-intervention presumption
	- Choosing the best pre-intervention model
2. Intervention ARIMA Analysis
	- Identification of orders b, r, and s
	- Diagnostic checking of the alleged intervention model
	- Determination of the best intervention model

## Pre-Intervention ARIMA Analysis

### Time series plot of pre-intervention data

![](/static/images/projects/arima-1.jpg)

From the graph of pre-intervention data shows a grim picture that the data is not stationary. To check whether it is true that the data is not stationary, the analysis will be continued by checking the stationarity of the data.

#### Checking the stationarity of pre-intervention data

The data used for ARIMA modelling must be stationary in terms of variance and average. Before identifying the alleged pre-intervention ARIMA model, check whether the pre-intervention data is stationary both in variance and average. A box-cox transformation was performed, and the following results were obtained.

![](/static/images/projects/arima-2.jpg)

Based on the above results, a rounded value of 1 is obtained, which means that PT. Unilever Indonesia Tbk pre-intervention does not require transformation, and **it can be stated that the data has stationary in variance**. Next, we will check the stationarity of the data in the average by making an ACF plot from PT. Unilever Indonesia Tbk pre-intervention. The ACF plot is obtained as follows.

![](/static/images/projects/arima-3.jpg)

Based on the results obtained, it can be seen that the **ACF plot has an extremely slow dies down pattern**, so it can be said that PT. Unilever Indonesia Tbk pre-intervention is **not stationary on average**. Furthermore, differencing will be carried out on the data until the ACF plot no longer has an extremely slow dies down pattern. The ACF plot is obtained after perform differencing 2 times on the data as follows.

![](/static/images/projects/arima-4.jpg)

### Identification of pre-intervention models

The pre-intervention model was identified by looking at the pattern on the ACF and PACF stock data. PT. Unilever Indonesia Tbk stock data has been stationary both in variance and average after perform differencing 2 times. PACF plot as follows.

![](/static/images/projects/arima-5.jpg)

It was found that the ACF plot shows a cut-off pattern after lag 1, and the PACF plot shows a dies down pattern. Then the **model from the pre-intervention data is the ARIMA(0,2,1) model**.

### Diagnostic checking model pre-intervention presumption

Check the diagnostics of the model as described in the box-Jenkins procedure, which will check whether the ARIMA(0,2,1) predictive model's residuals meet the white noise assumption and have a normal distribution. The white noise assumption is fulfilled if the p-value of the ljung-box statistics is more than 0.05, and the residuals are said to be normally distributed if the Kolmogorov-Smirnov test results produce a p-value of more than 0.05. The results of ljung-box statistics and probability plots of residuals are obtained as follows.

| Lag        | 12    | 24    | 36    | 48    |
|------------|-------|-------|-------|-------|
| Chi-Square | 12,45 | 40,46 | 62,14 | 74,34 |
| Df         | 11    | 23    | 35    | 47    |
| P-value    | 0,331 | 0,014 | 0,003 | 0,007 |

![](/static/images/projects/arima-6.jpg)

Based on the results of ljung-box statistics, it is found that the residual is only white noise up to lag 12. And the assumption of normal distribution residuals has not been met because the p-value of the Kolmogorov-Smirnov test is less than 0.05. To overcome the problem of the two assumptions that have not been met, the analysis can be continued using the ARIMA subset by first identifying the lag that exits the residual ACF plot boundaries. The residual ACF plot is obtained as follows.

![](/static/images/projects/arima-7.jpg)

Based on the ACF plot of the residuals above, it is found that 5 lags go out of bounds, namely lags 13, 26, 56, 58, and lag 61. The lags that come out will be included in the ARIMA subset.

### Choosing the best pre-intervention model

Because there are still 5 lags outside the limits of the residual ACF plot of the ARIMA model (0,2,1), namely lags 13, 26, 56, 58, and 61. Those lags will be included in the ARIMA subset with the rule that if the output lag is < 10, it will be entered in order q, and if the output lag is > 10 will be entered at order p, and several options of subset ARIMA models will be tried to enter the largest lag first. With these rules, there are several options subset ARIMA models that can be tried are ARIMA([61],2,1), ARIMA([58 61],2,1), ARIMA([56 58 61],2,1), ARIMA([26 56 58 61],2,1), and ARIMA([13 26 56 58 61],2,1). Based on several options subset ARIMA model that can be used, modelling is carried out, and the following results are obtained.

| Model                           | White Noise Assumption | Residual Normal |
|---------------------------------|------------------------|-----------------|
| ARIMA([61],2,1)                 | Violated               | Violated        |
| ARIMA([58, 61],2,1)             | Violated               | Violated        |
| ARIMA([56, 58, 61],2,1)         | Violated               | Violated        |
| ARIMA([26, 56, 58, 61],2,1)     | Violated               | Fulfilled       |
| ARIMA([13, 26, 56, 58, 61],2,1) | Fulfilled              | Fulfilled       |

---

#### Model ARIMA([13, 26, 56, 58, 61],2,1)

| Parameter | Lag | Estimasi | P-Value | Conclusion |
|-----------|-----|----------|---------|------------|
| MA1,1     | 1   | 0.98306  | 0.0001  | Significanct |
| AR1,1     | 13  | 0.16762  | 0.0017  | Significanct |
| AR1,2     | 26  | 0.11067  | 0.0391  | Significanct |
| AR1,3     | 56  | -0.13194 | 0.0141  | Significanct |
| AR1,4     | 58  | 0.13967  | 0.009   | Significanct |
| AR1,5     | 61  | -0.11902 | 0.0266  | Significanct |

| To Lag | Chi-Square | DF | Pr > ChiSq |
|--------|------------|----|------------|
| 12     | 10.18      | 6  | 0.1174     |
| 24     | 17.15      | 18 | 0.5127     |
| 36     | 22.97      | 30 | 0.8164     |
| 48     | 29.64      | 42 | 0.9244     |

| Test               | Statistics D | P-Value |
|--------------------|--------------|---------|
| Kolmogorov-Smirnov | 0.043351     | 0.0922  |

Based on the modelling results ARIMA([61],2,1), ARIMA([58,61],2,1), ARIMA([56, 58, 61],2,1), ARIMA([26, 56, 58, 61],2,1), and ARIMA([13, 26, 56, 58, 61],2,1) found that the ARIMA model([13, 26, 56, 58, 61], 2, 1) is the best subset ARIMA model for modelling PT. Unilever Indonesia Tbk pre-intervention. It was found that the p-value from the autocorrelation check table of residuals and the Kolmogorov-Smirnov p-value is more than 0.05, it can be said that the residual assumption white noise and normally distributed residuals in the ARIMA model ([13, 26, 56, 58, 61], 2, 1) have been fulfilled.

## Intervention ARIMA Analysis

### Identification of b, r, and s orders

In conducting intervention ARIMA modeling, input orders b, r, and s are needed. This order can be identified by calculating the response function, which is the difference between the original data with data from the prediction results of the pre-intervention model, namely the ARIMA model ([13 26 56 58 61], 2, 1). The chart response values as follows.

![](/static/images/projects/arima-response-value.png)

Based on the chart of response values above, it can be seen that the impact of the COVID-19 case, the first in Indonesia, which falls on March 2, 2020, influenced PT shares Unilever Indonesia Tbk 2 days after the intervention date. Then it can be determined that the value order b in the intervention Arima model is 2. Order r and also s are determined from various experiment combinations, and after carrying out various combinations, 2 models were obtained that had interventions significant as follows.

#### ARIMA([56],2,1) b=2, r=1, s=1

| Parameter | Lag | Estimate | P-Value | Conclusion  |
|-----------|-----|----------|---------|-------------|
| MA1,1     | 1   | 0.94016  | 0.0001  | Significant |
| AR1,1     | 56  | -0.22455 | 0.0003  | Significant |
| NUM1      | 0   | 330.453  | 0.0446  | Significant |
| NUM1,1    | 1   | 365.569  | 0.0278  | Significant |

#### ARIMA(0,2,1) b=2, r=1, s=1

| Parameter | Lag | Estimate | P-Value | Conclusion  |
|-----------|-----|----------|---------|-------------|
| MA1,1     | 1   | 0.94253  | 0.0001  | Significant |
| NUM1      | 0   | 331.975  | 0.047   | Significant |
| NUM1,1    | 1   | 366.744  | 0.0299  | Significant |

### Choosing the Best Intervention Model

After obtaining 2 models that have significant interventions and parameters, we check whether the residuals are white noise and normally distributed. Testing was done in the same way as in the pre-intervention model, the summary of the results is obtained as follows.

| Intervention Model            | Intervention | Residual White Noise | Residual Normal | RMSE   |
|-------------------------------|--------------|----------------------|-----------------|--------|
| ARIMA([56],2,1) b=2, r=1, s=1 | Significance | Fulfilled            | Fulfilled       | 156.23 |
| ARIMA(0,2,1) b=2, r=1, s=1    | Significance | Fulfilled            | Fulfilled       | 165.93 |

Based on the 2 intervention models obtained, it was found that the ARIMA model ([56],2,1) b=2, r=1, s=1 is the best model for PT. Unilever Indonesia Tbk with RMSE value is 156.23. 

#### Two comparison plots of original data vs pre-intervention ARIMA fit data, and original data vs data fits ARIMA intervention.

![](/static/images/projects/arima-8.jpg)

![](/static/images/projects/arima-9.jpg)