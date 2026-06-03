import { TIngredient } from '@utils-types';

export type TIngredientWithCount = TIngredient & { count: number };

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredientWithCount[];
};
