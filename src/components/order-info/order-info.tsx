import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/orderSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const { orderByNumber, isLoading } = useSelector((state) => state.order);
  const ingredients = useSelector((state) => state.ingredients.data);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [number, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderByNumber || !ingredients.length) return null;

    const date = new Date(orderByNumber.createdAt);
    const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
      {};

    orderByNumber.ingredients.forEach((id: string) => {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        if (!ingredientsInfo[id]) {
          ingredientsInfo[id] = { ...ingredient, count: 1 };
        } else {
          ingredientsInfo[id].count++;
        }
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderByNumber,
      ingredientsInfo,
      date,
      total
    };
  }, [orderByNumber, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
