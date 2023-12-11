const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
const regNickname = /^[A-Za-z가-힣0-9._-]{2,}$/;
const regPhone = /^(010)[0-9]{7,8}$/;

export { regEmail, regPw, regNickname, regPhone };
