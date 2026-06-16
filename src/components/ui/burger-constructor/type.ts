import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: BurgerConstructorUIItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};

type BurgerConstructorUIItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};
