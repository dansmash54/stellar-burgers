import { useEffect, useState } from 'react';
import { getOrdersApi } from '@api';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersApi()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='text text_type_main-medium'>Загрузка...</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
