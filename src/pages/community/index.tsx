import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WritePost from "./WritePost";
import EditPost from "./EditPost";
import ViewPost from "./ViewPost";
import SearchPost from "./SearchPost";

interface CummunityRoutesProps {
  isLogin: boolean;
}

const CommunityRoutes: React.FC<CummunityRoutesProps> = ({ isLogin }) => {
  return (
    <Routes>
      <Route path="/free" element={<SearchPost type={1} />} />
      <Route path="/question" element={<SearchPost type={2} />} />
      <Route
        path="/free/write"
        element={!isLogin ? <Navigate to="/" /> : <WritePost type={1} />}
      />
      <Route
        path="/question/write"
        element={!isLogin ? <Navigate to="/" /> : <WritePost type={2} />}
      />
      <Route
        path="/free/edit/:no"
        element={!isLogin ? <Navigate to="/" /> : <EditPost type={1} />}
      />
      <Route
        path="/question/edit/:no"
        element={!isLogin ? <Navigate to="/" /> : <EditPost type={2} />}
      />
      <Route path="/free/:no" element={<ViewPost type={1} />} />
      <Route path="/question/:no" element={<ViewPost type={2} />} />
    </Routes>
  );
};

export default CommunityRoutes;
