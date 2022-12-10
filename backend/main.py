from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pricing_models.BlackScholes import black_scholes_model_call, black_scholes_model_put

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


@app.get("/bs/{stock}/{expiry}/{strike_price}")
def read_root(stock: str, expiry: str, strike_price: str):

    strike_price = int(strike_price)
    callPrice = black_scholes_model_call(stock, expiry, strike_price)
    putPrice = black_scholes_model_put(stock, expiry, strike_price)
    return {"call": callPrice, "put": putPrice}


@ app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
# to run uvicorn main:app --reload
