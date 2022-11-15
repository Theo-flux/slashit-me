const separate = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  export const AmountSeparator = (amount) => {
    const rounding = (Math.round(amount * 100) / 100).toFixed(2);
    const cal = separate(rounding);
    return cal;
  };