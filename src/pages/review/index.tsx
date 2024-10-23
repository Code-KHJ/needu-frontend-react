import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WriteWorking from "./WriteWorking";
import WriteTraining from "./WriteTraining";
import DetailWorking from "./DetailWorking";
import DetailTraining from "./DetailTraining";
import SearchWorking from "./SearchWorking";
import EditWorking from "./EditWorking";
import EditTraining from "./EditTraining";
import SearchTraining from "./SearchTraining";

interface ReviewRoutesProps {
  isLogin: boolean;
}
const ReviewRoutes: React.FC<ReviewRoutesProps> = ({ isLogin }) => {
  const location = useLocation();
  const previousPage = location.pathname + location.search;
  return (
    <Routes>
      <Route
        path="/working/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <WriteWorking />
          )
        }
      />
      <Route
        path="/training/write"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <WriteTraining />
          )
        }
      />
      <Route
        path="/working/edit"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
          ) : (
            <EditWorking />
          )
        }
      />
      <Route
        path="/training/edit"
        element={
          !isLogin ? (
            <Navigate to="/login" state={{ previous: previousPage }} />
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
