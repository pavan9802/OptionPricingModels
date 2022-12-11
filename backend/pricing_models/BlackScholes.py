
import pandas_datareader.data as web
import pandas as pd
import numpy as np
from math import log, sqrt, pi, exp
from scipy.stats import norm
from datetime import datetime, date
from pricing_models.data import get_volatility, get_risk_free_rate, get_time_till_expiration, get_spot_price

trading_days = 252

def d1(S, K, r, sigma, t):
        return (log(S/K)+(r+sigma**2/2.)*t)/(sigma*sqrt(t))

def d2(S, K, r, sigma, t):
        return d1(S, K, r, sigma, t) - (sigma*sqrt(t))

def black_scholes_model_call(stock, expiry, strike_price):
        # calc d1
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)

        # calc d2
        dTwo = d2(S, K, r, sigma, t)

        return S*norm.cdf(dOne) - K*exp(-r*t)*norm.cdf(dTwo)

def black_scholes_model_put(stock, expiry, strike_price):
        # calc d1
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)

        # calc d2
        dTwo = d2(S, K, r, sigma, t)

        return K * exp(-r*t) * norm.cdf(-dTwo) - S*norm.cdf(-dOne)

def black_scholes_call_IV(Price, stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        t = get_time_till_expiration(expiry)
        K = strike_price
        sigma = 0.001
        while sigma < 1:
            Price_implied = S * \
                norm.cdf(d1(S, K, r, sigma, t))-K*exp(-r*t) * \
                norm.cdf(d2(S, K, r, sigma, t))
            if Price-(Price_implied) < 0.001:
                return sigma
            sigma += 0.001
        return "Not Found"

def black_scholes_put_IV(Price, stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        t = get_time_till_expiration(expiry)
        K = strike_price
        sigma = 0.001
        sigma = 0.001
        while sigma < 1:
            Price_implied = K * \
                exp(-r*t)-S+black_scholes_model_call(stock, expiry, strike_price)
            if Price-(Price_implied) < 0.001:
                return sigma
            sigma += 0.001
        return "Not Found"

def black_scholes_call_delta(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        return norm.cdf(dOne)

def black_scholes_put_delta(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        return norm.cdf(dOne) - 1

def black_scholes_gamma(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        return norm.pdf(dOne) / (S*sigma*sqrt(t))

def black_scholes_vega(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        return 0.01*(S*norm.pdf(dOne)*sqrt(t))

def black_scholes_call_theta(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        dTwo = d2(S, K, r, sigma, t)

        return 0.01*(-(S*norm.pdf(dOne)*sigma)/(2*sqrt(t)) - r*K*exp(-r*t)*norm.cdf(dTwo))

def black_scholes_put_theta(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dOne = d1(S, K, r, sigma, t)
        dTwo = d2(S, K, r, sigma, t)
        return 0.01*(-(S*norm.pdf(dOne)*sigma)/(2*sqrt(t)) + r*K*exp(-r*t)*norm.cdf(-dTwo))

def black_scholes_call_rho(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dTwo = d2(S, K, r, sigma, t)
        return 0.01*(K*t*exp(-r*t)*norm.cdf(dTwo))

def black_scholes_put_rho(stock, expiry, strike_price):
        S = get_spot_price(stock)
        r = get_risk_free_rate()
        sigma = get_volatility(stock)
        t = get_time_till_expiration(expiry)
        K = strike_price
        dTwo = d2(S, K, r, sigma, t)
        return 0.01*(-K*t*exp(-r*t)*norm.cdf(-dTwo))
