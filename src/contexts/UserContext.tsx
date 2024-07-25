import userApi from "@/apis/user";
import { createContext, useState, useContext, useEffect } from "react";

//@ts-ignore
const UserContext = createContext();
//@ts-ignore
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    user_id: null,
    nickname: null,
    authority: null,
  });
  const [loading, setLoading] = useState(true);
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const part = parts.pop();
      if (part) {
        return part.split(";").shift();
      }
    }
  }
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      if (user.id == null) {
        if (accessToken) {
          const userInfo = localStorage.getItem("userInfo");
          if (userInfo !== null) {
            const userData = JSON.parse(userInfo);
            setUser({
              id: userData.id,
              user_id: userData.user_id,
              nickname: userData.nickname,
              authority: userData.authority,
            });
          } else {
            const response: any = await userApi.getMe();
            if (response.status == 200) {
              setUser({
                id: response.data.id,
                user_id: response.data.user_id,
                nickname: response.data.nickname,
                authority: response.data.authority,
              });
              localStorage.setItem(
                "userInfo",
                JSON.stringify({
                  id: response.data.id,
                  user_id: response.data.user_id,
                  nickname: response.data.nickname,
                  authority: response.data.authority,
                })
              );
            } else {
              setUser({
                id: null,
                user_id: null,
                nickname: null,
                authority: null,
              });
            }
          }
        } else {
          setUser({
            id: null,
            user_id: null,
            nickname: null,
            authority: null,
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
