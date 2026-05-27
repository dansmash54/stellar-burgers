import { FC, memo } from 'react';
import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@zlden/react-developer-burger-ui-components';
import { OrderCardUIProps } from './type';

export const OrderCardUI: FC<OrderCardUIProps> = memo(({ orderInfo, onClick }) => {
  const statusText = {
    done: 'Выполнен',
    pending: 'Готовится',
    created: 'Создан'
  }[orderInfo.status] || orderInfo.status;

  return (
    <div className={styles.orderCard} onClick={onClick}>
      <div className={styles.header}>
        <span className='text text_type_digits-default'>#{orderInfo.number}</span>
        <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={orderInfo.date} />
        </span>
      </div>
      <h3 className='text text_type_main-medium'>{orderInfo.name}</h3>
      <p className={`text text_type_main-default ${styles.status}`}>{statusText}</p>
      <div className={styles.footer}>
        <div className={styles.images}>
          {orderInfo.ingredientsToShow.map((ingredient: any, index: number) => (
            <div key={index} className={styles.imageWrapper}>
              <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image} />
            </div>
          ))}
          {orderInfo.remains > 0 && <div className={styles.remains}>+{orderInfo.remains}</div>}
        </div>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>{orderInfo.total}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
});