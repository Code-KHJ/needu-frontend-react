import userApi from '@/apis/user';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    nickname: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user.id == null) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo !== null) {
          const userData = JSON.parse(userInfo);
          setUser({ id: userData.id, nickname: userData.nickname });
        } else {
          const response = await userApi.getMe();
          if (response.status == 200) {
            setUser({ id: response.data.id, nickname: response.data.nickname });
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                id: response.data.id,
                nickname: response.data.nickname,
              })
            );
          } else {
            setUser({ id: null, nickname: null });
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
