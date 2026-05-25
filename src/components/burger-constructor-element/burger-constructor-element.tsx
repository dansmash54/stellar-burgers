import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import {
  deleteIngredientFromConstructor,
  moveIngredientInConstructor
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredientInConstructor({ from: index, to: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredientInConstructor({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      dispatch(deleteIngredientFromConstructor(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
