import { Navigate, Route, Routes } from 'react-router-dom';
import WriteWorking from './WriteWorking';
import WriteTraining from './WriteTraining';

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
    </Routes>
  );
};

export default ReviewRoutes;
