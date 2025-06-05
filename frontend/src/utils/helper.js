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