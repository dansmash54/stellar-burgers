import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday, loading } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number)
    .slice(0, 20);

  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number)
    .slice(0, 20);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      total={total}
      totalToday={totalToday}
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      handleGetFeeds={handleGetFeeds}
    />
  );
};
