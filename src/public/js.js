const validateEmail = (email) => {
  const mailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(mailFormat)) return true;
  else return false;
};

const accountValidation = (email, password) => {
  if (typeof email !== "string") return false;
  if (typeof password !== "string" || password.length <= 3) return false;
  if (!validateEmail(email)) return false;

  return true;
};
const signup = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  if (accountValidation(email, password)) return requestSignup(email, password);
};
const signin = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (accountValidation(email, password)) return requestLogin(email, password);
};
const requestSignup = async (email, password) => {
  try {
    await axios.post("http://localhost:5000/user/signup", {
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
const requestLogin = async (email, password) => {
  try {
    await axios.post("http://localhost:5000/user/signin", {
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
