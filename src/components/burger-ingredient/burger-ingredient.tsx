import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredientToConstructor } from '../../services/slices/constructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      dispatch(addIngredientToConstructor(ingredient));
    };

    return (
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </Link>
    );
  }
);