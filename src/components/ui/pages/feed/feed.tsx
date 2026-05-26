import { FC, memo } from 'react';
import styles from './feed.module.css';
import { OrdersList, FeedInfo } from '@components';
import { FeedUIProps } from './type';

export const FeedUI: FC<FeedUIProps> = memo(
  ({
    orders,
    total,
    totalToday,
    readyOrders,
    pendingOrders,
    handleGetFeeds
  }) => (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className='text text_type_main-large'>Лента заказов</h1>
        <div className={styles.content}>
          <div className={styles.orders}>
            <OrdersList orders={orders} />
          </div>
          <div className={styles.info}>
            <FeedInfo
              readyOrders={readyOrders}
              pendingOrders={pendingOrders}
              total={total}
              totalToday={totalToday}
            />
            <button onClick={handleGetFeeds} className={styles.button}>
              Обновить
            </button>
          </div>
        </div>
      </div>
    </main>
  )
);
