import React from "react";

export default function CurrencyConverter(props) {
  const { typeCurrency, defaulVal, handleOnChange, amountss, onChangeAmount } =
    props;
  return (
    <div>
      <select value={defaulVal} onChange={handleOnChange}>
        {typeCurrency.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input type="number" value={amountss} onChange={onChangeAmount} />
    </div>
  );
}
