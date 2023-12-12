import React from "react";

const SearchId = () => {
  return (
    <>
      <div className="explanation">
        회원가입 시 작성하신 휴대폰 번호를 입력해주세요.
      </div>
      <form>
        <fieldset>
          <div className="item">
            <label>휴대폰 번호</label>
            <div className="item-input">
              <input
                type="text"
                autoComplete="off"
                placeholder="'-'빼고 숫자만 입력하세요."
                maxLength={11}
                required
              ></input>
              <p>124564654564564654564564887987893</p>
            </div>
          </div>
          <div className="item userId">
            <label>아이디</label>
            <div className="item-input">
              <input type="text" disabled></input>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default SearchId;
