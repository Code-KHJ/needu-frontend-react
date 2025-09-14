import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DetailTraining from "./DetailTraining";
import DetailWorking from "./DetailWorking";
import EditTraining from "./EditTraining";
import EditWorking from "./EditWorking";
import SearchTraining from "./SearchTraining";
import SearchWorking from "./SearchWorking";
import WriteTraining from "./WriteTraining";
import WriteWorking from "./WriteWorking";

interface ReviewRoutesProps {
  isLogin: boolean;
}
const ReviewRoutes: React.FC<ReviewRoutesProps> = ({ isLogin }) => {
  const location = useLocation();
  const previousPage = location.pathname + location.search;
  return (
    <Routes>
      <Route
        path="/working/write/new"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} replace />
          ) : (
            <WriteWorking />
          )
        }
      />
      <Route
        path="/working/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} replace />
          ) : (
            <WriteWorking />
          )
        }
      />
      <Route
        path="/training/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} replace />
          ) : (
            <WriteTraining />
          )
        }
      />
      <Route
        path="/working/edit"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} replace />
          ) : (
            <EditWorking />
          )
        }
      />
      <Route
        path="/training/edit"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} replace />
          ) : (
            <EditTraining />
          )
        }
      />
      <Route path="/detail/working" element={<DetailWorking />} />
      <Route path="/detail/training" element={<DetailTraining />} />
      <Route path="/search/working" element={<SearchWorking />} />
      <Route path="/search/training" element={<SearchTraining />} />
    </Routes>
  );
};

export default ReviewRoutes;
