import React, { useEffect, useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import "../styles/App.css";

const App = () => {
  const [typeCurrency, setTypeCurrency] = useState([]);
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(0);
  const [amountInFrom, setAmountInFrom] = useState(true);

  let toAmount, fromAmount;
  if (amountInFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  const url =
    "http://api.exchangeratesapi.io/v1/latest?access_key=16e980d3605abe6960372d3737419e44&format=1";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const first = Object.keys(data.rates)[0];

        setTypeCurrency([data.base, ...Object.keys(data.rates)]);
        setFromCurr("USD");
        setToCurr("INR");
        setExchangeRate(data.rates[first]);
      });
  }, []);

  useEffect(() => {
    if (fromCurr != null && toCurr != null) {
      fetch(`${url}?base=${fromCurr}&symbols=${toCurr}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurr]));
    }
  }, [fromCurr, toCurr]);

  function handleFromAmontChange(e) {
    setAmount(e.target.value);
    setAmountInFrom(true);
  }
  function handleToAmontChange(e) {
    setAmount(e.target.value);
    setAmountInFrom(false);
  }

  return (
    <div id="main">
      <h1>Currency Converter App</h1>
      <div className="container">
        <CurrencyConverter
          className="col-first"
          typeCurrency={typeCurrency}
          defaultVal={fromCurr}
          handleOnChange={(e) => setFromCurr(e.target.value)}
          onChangeAmount={handleFromAmontChange}
          amount={fromAmount}
        />

        <CurrencyConverter
          typeCurrency={typeCurrency}
          defaultVal={toCurr}
          handleOnChange={(e) => setToCurr(e.target.value)}
          onChangeAmount={handleToAmontChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
};

export default App;
