import { FC } from 'react';
import styles from './orders-list.module.css';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  if (!orderByDate || orderByDate.length === 0) {
    return <div className='text text_type_main-medium'>Заказов пока нет</div>;
  }

  return (
    <div className={styles.content}>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
};
