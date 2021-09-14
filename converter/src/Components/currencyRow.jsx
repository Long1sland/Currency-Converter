import React from 'react';



const CurrencyRow = (props) => {

    const {options, currency, selected, amount, userInput} = props
    return ( 
        <div>
            <input type="number" placeholder = "Enter value here" value = {amount} onChange = {userInput}/>
            <select name="" id="" value = {currency} onChange = {selected}>
                
                {options.map((data) => <option value = {data} key = {data}>{data}</option>  )}
            </select>
        </div>
    );
}
 
export default CurrencyRow;