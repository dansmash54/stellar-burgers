import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { 
  ConstructorPage, 
  Feed, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  ProfileOrders, 
  NotFound404 
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Preloader } from '@ui';

const App = () => {
  /** TODO: взять переменные из стора */
const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <BrowserRouter>
     <div className={styles.app}>
        <AppHeader />
        {loading ? (
          <Preloader />
        ) : error ? (
          <div className={`${styles.error} text text_type_main-medium pt-4`}>
            {error}
          </div>
        ) : data.length > 0 ? (
          <Routes>
            <Route path="/" element={<ConstructorPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        ) : (
          <div className={`${styles.title} text text_type_main-medium pt-4`}>
            Нет ингредиентов
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
