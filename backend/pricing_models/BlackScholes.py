
import pandas_datareader.data as web
import pandas as pd
import numpy as np
from math import log, sqrt, pi, exp
from scipy.stats import norm
from datetime import datetime, date
from pricing_models.data import get_volatility, get_risk_free_rate, get_time_till_expiration, get_spot_price

trading_days = 252


def black_scholes_model_call(stock, expiry, strike_price):
    # calc d1
    S = get_spot_price(stock)
    r = get_risk_free_rate()
    sigma = get_volatility(stock)
    t = get_time_till_expiration(expiry)
    K = strike_price
    d1 = (log(S/K)+(r+sigma**2/2.)*t)/(sigma*sqrt(t))

    # calc d2
    d2 = d1 - (sigma*sqrt(t))

    return S*norm.cdf(d1) - K*exp(-r*t)*norm.cdf(d2)


def black_scholes_model_put(stock, expiry, strike_price):
    # calc d1
    S = get_spot_price(stock)
    r = get_risk_free_rate()
    sigma = get_volatility(stock)
    t = get_time_till_expiration(expiry)
    K = strike_price
    d1 = (log(S/K)+(r+sigma**2/2.)*t)/(sigma*sqrt(t))

    # calc d2
    d2 = d1 - (sigma*sqrt(t))

    return K * exp(-r*t) * norm.cdf(-d2) - S*exp()
