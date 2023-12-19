const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
const regNickname = /^[A-Za-z가-힣0-9._-]{2,}$/;
const regPhone = /^(010)[0-9]{8,8}$/;

const validateInput = (reg: RegExp, target: HTMLInputElement) => {
  if (!reg.test(target.value)) {
    target.classList.add("invalid");
  } else {
    target.classList.remove("invalid");
  }
};

export { regEmail, regPw, regNickname, regPhone, validateInput };
