import { Navigate, Route, Routes } from "react-router-dom";
import WriteNotice from "./WriteNotice";
import EditNotice from "./EditNotice";
import ViewNotice from "./ViewNotice";

interface NoticeRoutesProps {
  isAdmin: boolean;
}

const NoticeRoutes: React.FC<NoticeRoutesProps> = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/list" />
      <Route
        path="/write"
        element={!isAdmin ? <Navigate to="/404" /> : <WriteNotice />}
      />
      <Route
        path="/edit/:no"
        element={!isAdmin ? <Navigate to="/404" /> : <EditNotice />}
      />
      <Route path="/:no" element={<ViewNotice />} />
    </Routes>
  );
};

export default NoticeRoutes;
