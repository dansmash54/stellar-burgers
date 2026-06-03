import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { getBun, getIngredients } from '../../services/slices/constructorSlice';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const buns = useSelector(getBun);
  const ingridients = useSelector(getIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;

      counters[ingredient._id]++;
    });
    if (buns) counters[buns._id] = 2;
    return counters;
  }, [buns, ingridients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
