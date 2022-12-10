import pandas_datareader.data as web
import pandas as pd
import numpy as np
from datetime import datetime, date


def get_volatility(stock):
    # Volatility =  the standard deviation of the stock returns over the past year by the square root of number of days the market is open over a year.
    today = datetime.now()
    one_year_ago = today.replace(year=today.year-1)

    trading_days = 252
    df = web.DataReader(stock, 'yahoo', one_year_ago, today)
    df = df.dropna()
    df = df.assign(close_day_before=df.Close.shift(1))
    # Calculate Vlotility
    sigma = np.sqrt(trading_days) * np.std((df.Close -
                                            df.close_day_before) / df.close_day_before)

    return sigma


def get_risk_free_rate():
    # Risk Free Rate = 10 year U.S. treasury Yield
    today = datetime.now()
    df = web.DataReader("^TNX", 'yahoo', today.replace(day=today.day-1), today)
    rate = df.iloc[-1]["Close"]/100

    return rate


def get_time_till_expiration(expiry):

    return (datetime.strptime(expiry, "%m-%d-%Y") - datetime.utcnow()).days / 365


def get_spot_price(stock):
    today = datetime.now()
    one_year_ago = today.replace(year=today.year-1)
    df = web.DataReader(stock, 'yahoo', one_year_ago, today)
    return df.iloc[-1]["Close"]
