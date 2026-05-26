import { FC } from 'react';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

export const FeedInfo: FC<{
  readyOrders: number[];
  pendingOrders: number[];
  total: number;
  totalToday: number;
}> = ({ readyOrders, pendingOrders, total, totalToday }) => (
  <FeedInfoUI
    readyOrders={readyOrders}
    pendingOrders={pendingOrders}
    feed={{ total, totalToday }}
  />
);
