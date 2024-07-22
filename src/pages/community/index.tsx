import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchWorking from "../review/SearchWorking";
import SearchTraining from "../review/SearchTraining";
import WritePost from "./WritePost";
import EditPost from "./EditPost";

interface CummunityRoutesProps {
  isLogin: boolean;
}

const CommunityRoutes: React.FC<CummunityRoutesProps> = ({ isLogin }) => {
  return (
    <Routes>
      <Route path="/free" element={<SearchWorking />} />
      <Route path="/free/write" element={<WritePost type={1} />} />
      <Route path="/question/write" element={<WritePost type={2} />} />
      <Route path="/free/edit/:no" element={<EditPost type={1} />} />
      <Route path="/question/edit/:no" element={<EditPost type={2} />} />
      <Route path="/free/:no" element={<SearchTraining />} />
    </Routes>
  );
};

export default CommunityRoutes;
