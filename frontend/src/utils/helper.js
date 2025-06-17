import moment from "moment";

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  return password.length >= 6;
}


export const addThousandsSeparator = (num) => {
  if (num== null || isNaN(num)) {
    return '';
  }

  const [integerPart, decimalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}


export const prepareExpenseBarChartData=(data=[])=>{
   const chartData=data.map((item)=>({
    category:item?.category,
    amount:item?.amount,

   }))
   return chartData
}



export const prepareIncomeBarChartData=(data=[])=>{
   const sortedData=[...data].sort((a,b)=> new Date(a.date)-new Date(b.date))
   const chartData=sortedData.map((item)=>({
    month:moment(item?.date).format("DD MMM"),
    source:item?.source,
    amount:item?.amount,

   }))
   return chartData
}


export const prepareExpenseLineChartData=(data=[])=>{
  const sortedData=[...data].sort((a,b)=> new Date(a.date)-new Date(b.date))
  const chartData=sortedData.map((item)=>({
    month:moment(item?.date).format("DD MMM"),
    category:item?.category,
    amount:item?.amount,

   }))
   return chartData
  
}