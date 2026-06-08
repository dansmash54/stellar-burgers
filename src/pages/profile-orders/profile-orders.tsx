import { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrdersHistory,
  getOrders,
  getOrdersLoadingStatus
} from '../../services/slices/ordersHistorySlice';

export const ProfileOrders: FC = () => {
  const loading = useSelector(getOrdersLoadingStatus);
  const orders = useSelector(getOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
