from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pricing_models.BlackScholes import black_scholes_model_call, black_scholes_model_put, black_scholes_gamma, black_scholes_vega
from pricing_models.BlackScholes import black_scholes_call_IV, black_scholes_call_delta, black_scholes_call_theta, black_scholes_call_rho
from pricing_models.BlackScholes import black_scholes_put_IV, black_scholes_put_delta, black_scholes_put_theta, black_scholes_put_rho
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/bs/{option}/{stock}/{expiry}/{strike_price}")
def read_root(option: str, stock: str, expiry: str, strike_price: str):
    strike_price = int(strike_price)
    iv = ""
    delta = ""
    gamma = round(black_scholes_gamma(stock, expiry, strike_price), 4)
    vega = round(black_scholes_vega(stock, expiry, strike_price), 4)
    theta = ""
    rho = ""
    price = 0
    if option == "Call":
        price = round(black_scholes_model_call(stock, expiry, strike_price), 4)
        iv = round(black_scholes_call_IV(
            price, stock, expiry, strike_price), 4)
        delta = round(black_scholes_call_delta(stock, expiry, strike_price), 4)
        theta = round(black_scholes_call_theta(stock, expiry, strike_price), 4)
        rho = round(black_scholes_call_rho(stock, expiry, strike_price), 4)

    else:
        price = round(black_scholes_model_put(stock, expiry, strike_price), 4)
        iv = round(black_scholes_put_IV(price, stock, expiry, strike_price), 4)
        delta = round(black_scholes_put_delta(stock, expiry, strike_price), 4)
        theta = round(black_scholes_put_theta(stock, expiry, strike_price), 4)
        rho = round(black_scholes_put_rho(stock, expiry, strike_price), 4)

    return {"option": price, "iv": iv, "delta": delta,  "gamma": gamma, "vega": vega, "theta": theta, "rho": rho}


@ app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
# to run uvicorn main:app --reload
