import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchWorking from "../review/SearchWorking";
import SearchTraining from "../review/SearchTraining";
import WriteFree from "./WriteFree";

interface CummunityRoutesProps {
  isLogin: boolean;
}

const CommunityRoutes: React.FC<CummunityRoutesProps> = ({ isLogin }) => {
  return (
    <Routes>
      <Route path="/free" element={<SearchWorking />} />
      <Route path="/free/write" element={<WriteFree />} />
      <Route path="/free/:no" element={<SearchTraining />} />
    </Routes>
  );
};

export default CommunityRoutes;
