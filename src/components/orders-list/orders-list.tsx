import { FC } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '../ui/orders-list';

export const OrdersList: FC<OrdersListProps> = ({ orders }) => (
  <OrdersListUI orderByDate={orders} />
);
