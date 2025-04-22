// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { use, useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(
    function () {
      if (amount === 0 || fromCurrency === toCurrency) {
        setOutput(amount);
        return;
      }
      async function convert() {
        setLoader(true);
        await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        )
          .then((res) => res.json())
          .then((data) => setOutput(data.rates[toCurrency]));
        setLoader(false);
      }
      convert();
    },
    [amount, fromCurrency, toCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {loader ? <p>LOADING ...</p> : <p>{output}</p>}
    </div>
  );
}
