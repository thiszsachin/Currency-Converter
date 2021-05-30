import React from "react";

export default function CurrencyConverter(props) {
  const { typeCurrency, defaultVal, handleOnChange, amount, onChangeAmount } =
    props;
  return (
    <div>
      <select
        className="col-first"
        value={defaultVal}
        onChange={handleOnChange}
      >
        {typeCurrency.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="number"
        min="0"
        value={amount}
        onChange={onChangeAmount}
      />
    </div>
  );
}
