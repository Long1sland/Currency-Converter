// This is to test github so just ignore
import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './Components/currencyRow';

const BASE_URL = "https://api.exchangerate.host/latest?base=NGN"


function App() {


  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInfromCurrency] = useState(true)


console.log(toCurrency)
 useEffect(() => {
   fetch(BASE_URL)
   .then((res) => res.json())
   .then(data => {
     setCurrencyOptions([ ...Object.keys(data.rates)])
     setFromCurrency("NGN")
     setToCurrency("USD")
     setExchangeRate(data.rates["USD"])
 
   })
 }, [])


 useEffect(() => {
   if(toCurrency!=null&&fromCurrency!=null){
   fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
   .then(res => res.json())
   .then(data => {
     setExchangeRate(data.rates[toCurrency])
   })}
 }, [toCurrency,fromCurrency])




 let toAmount, fromAmount
if(amountInFromCurrency){
  fromAmount = amount
  toAmount = amount * exchangeRate
}
else {
  toAmount = amount
  fromAmount = amount / exchangeRate
}


function handleFromInput(e) {

  setAmount(e.target.value)
  setAmountInfromCurrency(true)
}

function handleToInput(e) {
  
  setAmount(e.target.value)
  setAmountInfromCurrency(false)
}



  return (
    
   <React.Fragment>
     <h1>Convert</h1>
     <CurrencyRow userInput = {handleFromInput} amount = {fromAmount} options = {currencyOptions} currency =
      {fromCurrency} selected = {(e) => {setFromCurrency(e.target.value)}}/>
     <CurrencyRow userInput = {handleToInput} amount = {toAmount} options = {currencyOptions} currency = 
     {toCurrency} selected = {(e) => {setToCurrency(e.target.value)}}/>
   </React.Fragment> 
  );
}

export default App;
