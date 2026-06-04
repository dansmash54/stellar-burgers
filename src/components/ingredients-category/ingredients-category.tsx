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
  const constructorBuns = useSelector(getBun);
  const constructorIndgridients = useSelector(getIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    constructorIndgridients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;

      counters[ingredient._id]++;
    });
    if (constructorBuns) counters[constructorBuns._id] = 2;
    return counters;
  }, [constructorBuns, constructorIndgridients]);

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
