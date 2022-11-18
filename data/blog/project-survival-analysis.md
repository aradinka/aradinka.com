---
title: 'Survival Analysis - Veterans Lung Cancer Study'
date: '2021-07-14'
tags: ['survival-analysis', 'R']
draft: false
summary: ''
authors: ['azkaradinka']
layout: PostLayout
---

<TOCInline toc={props.toc} asDisclosure toHeading={3} />

## Overview

In a study conducted by the US Veterans Administration, male patients with inoperable advanced lung cancer were given standard therapy or chemotherapy. Time to death was recorded for 137 patients, while 9 left the study before death. Several covariates were also assigned for each patient. The main aim of this study was to assess **whether chemotherapy tests are beneficial**. The secondary objective is covariate analysis as a predictive variable. These data have been published in Kalbfleisch and Prentice (1980). The data consists of the following variables:

* trt: 1=standard 2=test chemotherapy
* celltype: 1=squamous, 2=smallcell, 3=adeno, 4=large
* time: survival time
* status: censoring status
* karno: Karnofsky performance score (100=good)
* diagtime: months from diagnosis to randomisation
* age: in years
* prior: prior therapy 0=no, 10=yes

![](/static/images/projects/survival-analysis.png)


## What survival model should be chosen?

Strategy:

* Initialize Cox Proportional Hazard first -> Most popular mathematical model used for analyzing survival data
* If Proportional Hazard assumption violated. Another model option:
    * Time dependent: Treat variable that indicate to be the cause of the PH assumption violated. And define certain cutoff t.
    * Stratified Cox: Stratifying variable that indicate to be the cause of the PH assumption violated.
    * Alternative analysis: Treat some variable with stratified.
    * AFT Model: Use Anderson-Darling GoF Test to choose what model to use.
* Compare all model by considering the significant variable and AIC.
    
After some research about the karnofsky performance score (karno variable), I found the following article https://continuagroup.com/article/guidelines-for-use-the-karnofsky-performance-scale/. The Karnofsky Performance Scale (KPS) is an assessment tool for predicting of length of survival in terminally ill patients. The KPS is an 11 point rating scale which ranges from normal functioning (100) to dead (0) in ten point increments. Based on the description obtained, we will try to experiment to discretize variables into 2 categories 0(0-50), 1(60-100) and also 3 categories 0(0-40), 1(50-70) and 2(80-100).

Some models will performs backward model selection by AIC using `stepAIC()` function for coxPH model, or using `fastbw()` function for AFT model. These function chooses the best model according to the Akaike information criterion (AIC). AIC quantifies the amount of information loss due to this simplification, we will prefer the model with lower AIC value.

Here are the summary of all the experiments that have been done:

|Model|Significant Variable|AIC|PH Assumtion|
|---|---|---|---|
|**Cox PH Model**| | | |
|Use all covariate|celltypesmallcell, celltypeadeno, karno|964.79|Violated|
|Backward AIC|celltypesmallcell, celltypeadeno, karno|959.53|Violated|
|Alternative Analysis discretized karno 2 category, use all covariate|celltypesmallcell, celltypeadeno, karno|979.05|Violated|
|Alternative Analysis discretized karno 2 category, Backward AIC|celltypesmallcell, celltypeadeno, karno|973.5|Violated|
|Alternative Analysis discretized karno 3 category, use all covariate|celltypesmallcell, celltypeadeno, karno|977.55|Violated|
|Alternative Analysis discretized karno 2 category, Backward AIC|celltypesmallcell, celltypeadeno, karno|971.67|Violated|
|Time Dependent discretized karno 2 category Cut=365 use all covariate|celltypesmallcell, celltypeadeno, karno:gt1|980.69|Violated|
|Strata discretized karno 2 category, use all covariate|celltypesmallcell, celltypeadeno|837.27|Violated|
|Strata discretized karno 2 category, Backward AIC|celltypesmallcell, celltypeadeno|829.87|Fulfilled|
|Strata celltype, discretized karno 3 category, Backward AIC|celltypesmallcell, celltypeadeno|651.46|Violated|
|Strata discretized karno 3 category Backward AIC|celltypesmallcell, celltypeadeno|735.68|Violated|
|Time Dependent discretized karno 3 category, use all covariate|celltypesmallcell, celltypeadeno, karno_categorygt1, karno_categorygt2|954.65|Violated|
|Time Dependent discretized karno 3 category, Backward AIC|celltypesmallcell, celltypeadeno, karno_categorygt1, karno_categorygt2|947.41|Fulfilled|
|**AFT Model**| | | |
|Weibull, use all covariates|celltypesmallcell, celltypeadeno, karno|1451.1|No PH Assumption|
|Weibull, Backward AIC|celltypesmallcell, celltypeadeno, karno|1445.03|No PH Assumption|
|Exponential, use all covariates|celltypesmallcell, celltypeadeno, karno|1452.32|No PH Assumption|
|Exponential, Backward AIC|celltypesmallcell, celltypeadeno,  karno|1445.94|No PH Assumption|


Answer: We will use stratified Cox Proportional Hazard model, stratifying the karno variable (indicated to be the cause of the PH assumption violated), and discretizing the karno variable first to 0 (0-50) and 1 (51-100).


## Stratified Cox Proportional Hazard Model

$h_g(t, \mathbf{X}) = h_{0g}(t)exp[\beta_1X_1+\beta_2X_2+...+\beta_pX_p]$

where $g = 1, 2, ..., k*$ 

$k*$ = total # strata combination

**Model Karno 0**
- $\hat{h_1}(t, \mathbf{X}) = \hat{h_{01}}(t)exp[0.8983X_1+1.1069X_2+0.2842X_3]$

**Model Karno 1**
- $\hat{h_2}(t, \mathbf{X}) = \hat{h_{02}}(t)exp[0.8983X_1+1.1069X_2+0.2842X_3]$

### Cox proportional hazard modeling

```r
veteran_data = data.frame(veteran)
veteran_data$karno_category = apply(veteran, 1, FUN = function(x) if (x[5]<=50) 0 else 1)

# all covariate model
coxPH = coxph(Surv(time=time, event=status)~trt+celltype+karno_category+diagtime+age+prior, data=veteran_data)
# stepAIC
backward_model = stepAIC(object=coxPH, data=veteran_data, direction="backward")

# backward model non strata
coxPH_backward = coxph(Surv(time=time, event=status)~celltype+karno_category, data=veteran_data)
summary(coxPH_backward)

cox.zph(coxPH_backward)

# strata backward model
coxPH_strata_backward = coxph(Surv(time=time, event=status)~celltype+strata(karno_category), data=veteran_data)
summary(coxPH_strata_backward)
```


**Output strata backward model:**

```
Call:
coxph(formula = Surv(time = time, event = status) ~ celltype + 
    strata(karno_category), data = veteran_data)

  n= 137, number of events= 128 

                    coef exp(coef) se(coef)     z Pr(>|z|)    
celltypesmallcell 0.8983    2.4555   0.2604 3.450 0.000561 ***
celltypeadeno     1.1069    3.0251   0.2964 3.735 0.000188 ***
celltypelarge     0.2842    1.3287   0.2796 1.016 0.309397    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

                  exp(coef) exp(-coef) lower .95 upper .95
celltypesmallcell     2.455     0.4073    1.4739     4.091
celltypeadeno         3.025     0.3306    1.6922     5.408
celltypelarge         1.329     0.7526    0.7682     2.298

Concordance= 0.606  (se = 0.029 )
Likelihood ratio test= 19.31  on 3 df,   p=2e-04
Wald test            = 18.63  on 3 df,   p=3e-04
Score (logrank) test = 19.48  on 3 df,   p=2e-04
```


Now we do a cox proportional hazard modeling using the `coxph()` function. The model formed used only celltype and karno variables based on stepAIC result. Based on the cox proportional hazard model formed, it was found that celltypesmallcell and celltypeadeno are significant because it has `p-value` smaller than 0.05.

Likelihood ratio test, wald test, and score (logrank) test are global statistical significance of the model. These three methods are asymptotically equivalent, but likelihood ratio test has better behavior for small sample sizes, so it is generally preferred. Based on the likelihood ratio test that has been carried out, we get the value of `p-value=0.0002`, it can be concluded that at least one of these $\beta$'s are non-zero.

We will also analyze the hazard ratio value represented by exp(coef). The hazard ratio gives the instantaneous potential per unit time for the event to occur, given that the individual has survived up to time t. Based on the hazard ratio value obtained, it can be said that patients with small cells have a 2.46 times higher risk of death than patients with squamous cells. And patients with adeno cells have a risk of death 3x higher than patients who have squamous cells.

### Model Evaluation

```r
print(AIC(coxPH_strata_backward))
cox.zph(coxPH_strata_backward)
```

**Output:**

```
[1] 829.8741

         chisq df     p
celltype  7.49  3 0.058
GLOBAL    7.49  3 0.058
```

Now, we will evaluate whether the formed model meets the first assumption, namely the regression effect $\beta$ is constant over time. The Grambsch and Therneau test is an approach to the goodness-of-fit test where this test uses the value of Schoenfeld residuals, giving p-value results so that this test is more objective than if only using a graphical approach.

The Grambsch and Therneau test has a null hypothesis, namely the proportional hazard assumption is fulfilled. Based on the tests carried out, it was found that in global conditions the `p-value` value obtained was 0.058. This value is greater than 0.05 so it can be concluded that the assumption $\beta$ is constant over time has been fulfilled.

### Cox-Snell residual plot

```r
veteran_data$resid_mart = residuals(coxPH_strata_backward, type="martingale")
veteran_data$resid_coxsnell = -(veteran_data$resid_mart-veteran_data$status)

fit_coxsnell = coxph(Surv(resid_coxsnell, status)~1, data=veteran_data)
df_base_haz = basehaz(fit_coxsnell, centered=FALSE)
ggplot(data=df_base_haz, mapping=aes(x=time, y=hazard)) +
    geom_point() +
    labs(x="Cox-Snell residuals as pseudo observed times",
         y="Estimated cumulative hazard at pseudo observed times") +
    geom_abline(intercept=0, slope=1) +
    theme_bw() + theme(legend.key=element_blank())
```

![](/static/images/projects/survival-analysis-2.png)

Cox-Snell residual plot base uses cumulative hazard, so the shape of the curve will continue to rise. We use this plot to diagnose the data roughly descriptively to see whether or not there are outliers in the data. Based on the plot results obtained, there is a tendency for the model to give a reasonable fit to the data because the overall residuals fall on the straight line with an intercept zero and a slope one.

### Martingale Residual Plot

```r
ggplot(data=veteran_data, mapping=aes(x=unclass(celltype), y=resid_mart)) +
    geom_point() +
    geom_smooth() +
    theme_bw() + theme(legend.key=element_blank())
```

![](/static/images/projects/survival-analysis-3.png)

The Martingale residual plot is used to check the linearity assumption of the covariate, if the data is censored, the value of the Martingale residual will be negative, while if an event occurs, the value will be positive. In general, there are 3 conditions of the Martingale residual plot, namely:

1. Ideal conditions, where the line formed is straight and falls around zero. In this condition, it can be said that there is a tendency that the assumption of linearity in the covariates is fulfilled.
2. Not ideal conditions, but the linearity assumption of the covariate is still fulfilled. In this condition, the line formed should not exceed the +-0.5 interval.
3. The condition does not meet the assumptions. This condition occurs when the line formed exceeds the +-0.5 interval. It can be said that there is a tendency that the assumption of covariate linearity is not met, and to overcome this problem, the analysis can be continued by using methods such as using the b spline function.

Based on the results obtained, the condition of the martingale residual plot obtained is condition 1 which is an ideal condition, the line  is straight and falls around zero. It can be said that there is a tendency that the assumption of linearity in the covariates is fulfilled.


### Is chemotherapy useful?

To find out whether chemotherapy is beneficial for the patient or not, we need analyze is there any difference between the survival curves of patients who receive chemotherapy and patients who only receive standard therapy.

Kaplan-Meier estimator of the survival function `S(t)` for the two samples with standard treatment and chemotherapy treatment respectively. We will use `Surv()` function to create a survival object, and `survfit()` function to create an object of class survfit containing survival curves.

```r
KM = survfit(formula=Surv(time=time, event=status)~trt, data=veteran)
KM
```

**Output:**

```
Call: survfit(formula = Surv(time = time, event = status) ~ trt, data = veteran)

       n events median 0.95LCL 0.95UCL
trt=1 69     64  103.0      59     132
trt=2 68     64   52.5      44      95
```

**Kaplan-Meier Plot**

```r
tema_azka = function(){
    theme_bw() + 
    theme(aspect.ratio=1, 
          panel.border = element_blank(),
          plot.title = element_text(size = 11),
          axis.title.x = element_text(size = 10),
          axis.title.y = element_text(size = 10)
    )
}

ggsurv = ggsurvplot(KM, risk.table=TRUE, surv.median.line="hv", 
           ggtheme=tema_azka(), 
           tables.theme=theme(aspect.ratio = 0.15),
           fontsize = 3,
           legend.labs = c("Standard", "Chemotherapy"),
           legend.title="trt Group"
           )
ggsurv
```

![](/static/images/projects/survival-analysis-4.png)

Veteran data contained 137 patient data where 69 patients underwent standard treatment (trt=1) while the remaining 68 underwent chemotherapy (trt=2). The standard treatment group there were 64 events and had 5 censored data, while the chemotherapy group had 64 events and had 4 censored data. 

The Kaplan-Meier is  an estimator of the survival function S(t) as well as a visualization of the comparison between the two treatments. Based on the plot formed, there is no tendency that show that one treatment provides a better chance to survie than the others.

The dash line shows the median survival time. For standard treatment group, the time corresponding to the 50% quantile for standard treatment is 103, that means the half of the patient survive less than or equal to 103 days, and the other half survive more than 103 days for standard treatment group.  For chemotherapy group, the time corresponding to the 50% quantile for chemotherapy group is 52.5, that means the half of the patient survive less than or equal to 52.5 days, and the other half survive more than 52.5 days for chemotherapy group. The number at risk table shows the number of patients who are still at risk in a certain period of time.

There are 2 types of cases in the Kaplan Meier plot, namely; (1) The occurrence of crossing points, (2) One dominates the other. In the Kaplan Meier plot case that we got, it can be seen that there is a crossing point between the two treatments, but it still cannot be concluded that one case doesn't dominates the other because the results of the Kaplan Meier plot are still descriptive. We need to continue our analysis to log rank test

### Compare the two treatments using the log-rank test

```r
survdiff(Surv(time=time, event=status)~trt, data=veteran, rho=0)
```

**Output:**

```
Call:
survdiff(formula = Surv(time = time, event = status) ~ trt, data = veteran, 
    rho = 0)

       N Observed Expected (O-E)^2/E (O-E)^2/V
trt=1 69       64     64.5   0.00388   0.00823
trt=2 68       64     63.5   0.00394   0.00823

 Chisq= 0  on 1 degrees of freedom, p= 0.9
```

Now we will evaluate whether or not KM curves for two groups are statistically equivalent. When we state kaplan meier plot before, we do not have evidence to indicate that the true population of 2 groups are different based on only looking at the graph. 

The log–rank test is a large-sample chi-square test that uses as its test criterion a statistic that provides an overall comparison of the kaplan meier plot being compared. We will use `survdiff()` function with rho=0 argument to do the log-rank test. The null hypothesis is that there is no difference between curves.

Based on the log rank test that has been carried out, the value of `p=0.9`. Then it can be concluded that there is no difference between standard treatment and chemotherapy KM curves.

## Kaggle Notebooks

See [here](https://www.kaggle.com/aradinka/survival-analysis-veterans-lung-cancer-study)