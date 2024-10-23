import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WritePost from "./WritePost";
import EditPost from "./EditPost";
import ViewPost from "./ViewPost";
import SearchPost from "./SearchPost";
import Community from "./Community";

interface CummunityRoutesProps {
  isLogin: boolean;
}

const CommunityRoutes: React.FC<CummunityRoutesProps> = ({ isLogin }) => {
  const location = useLocation();
  const previousPage = location.pathname + location.search;
  return (
    <Routes>
      <Route path="/" element={<Community />} />
      <Route path="/free" element={<SearchPost type={1} />} />
      <Route path="/question" element={<SearchPost type={2} />} />
      <Route
        path="/free/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <WritePost type={1} />
          )
        }
      />
      <Route
        path="/question/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <WritePost type={2} />
          )
        }
      />
      <Route
        path="/free/edit/:no"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <EditPost type={1} />
          )
        }
      />
      <Route
        path="/question/edit/:no"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <EditPost type={2} />
          )
        }
      />
      <Route path="/free/:no" element={<ViewPost type={1} />} />
      <Route path="/question/:no" element={<ViewPost type={2} />} />
    </Routes>
  );
};

export default CommunityRoutes;
