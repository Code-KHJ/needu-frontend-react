import userApi from '@/apis/user';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

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
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      if (user.id == null) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo !== null) {
          const userData = JSON.parse(userInfo);
          setUser({
            id: userData.id,
            user_id: userData.user_id,
            nickname: userData.nickname,
            authority: userData.authority,
          });
        } else if (!accessToken) {
          setUser({
            id: null,
            user_id: null,
            nickname: null,
            authority: null,
          });
        } else {
          const response = await userApi.getMe();
          if (response.status == 200) {
            setUser({
              id: response.data.id,
              user_id: response.data.user_id,
              nickname: response.data.nickname,
              authority: response.data.authority,
            });
            localStorage.setItem(
              'userInfo',
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
