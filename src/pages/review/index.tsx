import { Navigate, Route, Routes } from 'react-router-dom';
import WriteWorking from './WriteWorking';
import WriteTraining from './WriteTraining';
import DetailWorking from './DetailWorking';

interface ReviewRoutesProps {
  isLogin: boolean;
}
const ReviewRoutes: React.FC<ReviewRoutesProps> = ({ isLogin }) => {
  return (
    <Routes>
      <Route
        path="/write/working"
        element={!isLogin ? <Navigate to="/" /> : <WriteWorking />}
      />
      <Route
        path="/write/training"
        element={!isLogin ? <Navigate to="/" /> : <WriteTraining />}
      />
      <Route path="/detail/working" element={<DetailWorking />} />
      <Route path="/detail/training" element={<WriteWorking />} />
    </Routes>
  );
};

export default ReviewRoutes;
