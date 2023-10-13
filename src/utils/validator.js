const email = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const password = (value) => {
  if (password.length < 12) {
    return false;
  }

  const alphanumericRegex = /[a-zA-Z0-9]/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return alphanumericRegex.test(value) && symbolRegex.test(value);
};

export default { email, password };
