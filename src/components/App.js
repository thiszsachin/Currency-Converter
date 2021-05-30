import React, { useEffect, useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import "../styles/App.css";

const App = () => {
  const [typeCurrency, setTypeCurrency] = useState([]);
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFrom, setamountInFrom] = useState(true);

  let toAmount, fromAmount;
  if (amountInFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  console.log(amount);
  console.log(exchangeRate);

  useEffect(() => {
    fetch(
      "http://api.exchangeratesapi.io/v1/latest?access_key=16e980d3605abe6960372d3737419e44&format=1"
    )
      .then((res) => res.json())
      .then((data) => {
        const first = Object.keys(data.rates)[0];

        setTypeCurrency([data.base, ...Object.keys(data.rates)]);
        setFromCurr(data.base);
        setToCurr(first);
        setExchangeRate(data.rates[first]);
      });
  }, []);

  function handleFromAmontChange(e) {
    setAmount(e.target.value);
    setamountInFrom(true);
  }
  function handleToAmontChange() {
    setAmount(e.target.value);
    setamountInFrom(false);
  }

  return (
    <div id="main">
      <h1>Currency Converter App</h1>
      <CurrencyConverter
        typeCurrency={typeCurrency}
        defaulVal={fromCurr}
        handleOnChange={(e) => setFromCurr(e.target.value)}
        onChangeAmount={handleFromAmontChange}
        amountss={fromAmount}
      />
      <CurrencyConverter
        typeCurrency={typeCurrency}
        defaulVal={toCurr}
        handleOnChange={(e) => setToCurr(e.target.value)}
        onChangeAmount={handleToAmontChange}
        amoutss={toAmount}
      />
    </div>
  );
};

export default App;
