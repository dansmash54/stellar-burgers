import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  readyOrders: number[];
  pendingOrders: number[];
  handleGetFeeds: () => void;
};
