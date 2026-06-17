import constructorReducer, {
  addIngredientToConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  clearConstructor,
  initialState
} from '../constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 10,
  image: 'img.png',
  image_large: 'img_large.png',
  image_mobile: 'img_mobile.png'
};

const main: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 20,
  price: 20,
  image: 'img.png',
  image_large: 'img_large.png',
  image_mobile: 'img_mobile.png'
};

describe('[constructorSlice] Редьюсер конструктора бургера', () => {
  test('Вызов с undefined состоянием и UNKNOWN экшеном — возвращает начальное состояние', () => {
    const result = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  describe('Добавление ингредиента', () => {
    test('Добавление булки', () => {
      const state = constructorReducer(
        initialState,
        addIngredientToConstructor(bun)
      );
      expect(state.bun).toEqual(bun);
      expect(state.ingredients).toEqual([]);
    });

    test('Замена булки на другую', () => {
      const bun2 = { ...bun, _id: '3', name: 'Другая булка' };
      const stateWithBun = constructorReducer(
        initialState,
        addIngredientToConstructor(bun)
      );
      const state = constructorReducer(
        stateWithBun,
        addIngredientToConstructor(bun2)
      );
      expect(state.bun).toEqual(bun2);
    });

    test('Добавление начинки', () => {
      const state = constructorReducer(
        initialState,
        addIngredientToConstructor(main)
      );
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe('Котлета');
      expect((state.ingredients[0] as TConstructorIngredient).id).toBeDefined();
    });

    test('Добавление нескольких начинок', () => {
      let state = constructorReducer(
        initialState,
        addIngredientToConstructor(main)
      );
      const sauce: TIngredient = {
        ...main,
        _id: '4',
        name: 'Соус',
        type: 'sauce'
      };
      state = constructorReducer(state, addIngredientToConstructor(sauce));
      expect(state.ingredients).toHaveLength(2);
    });
  });

  describe('Удаление ингредиента', () => {
    test('Удаление начинки по индексу', () => {
      let state = constructorReducer(
        initialState,
        addIngredientToConstructor(main)
      );
      const sauce: TIngredient = {
        ...main,
        _id: '4',
        name: 'Соус',
        type: 'sauce'
      };
      state = constructorReducer(state, addIngredientToConstructor(sauce));
      expect(state.ingredients).toHaveLength(2);

      state = constructorReducer(state, deleteIngredientFromConstructor(0));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe('Соус');
    });
  });

  describe('Перемещение ингредиента', () => {
    test('Перемещение начинки вверх', () => {
      let state = constructorReducer(
        initialState,
        addIngredientToConstructor(main)
      );
      const sauce: TIngredient = {
        ...main,
        _id: '4',
        name: 'Соус',
        type: 'sauce'
      };
      state = constructorReducer(state, addIngredientToConstructor(sauce));

      state = constructorReducer(
        state,
        moveIngredientInConstructor({ from: 0, to: 1 })
      );
      expect(state.ingredients[0].name).toBe('Соус');
      expect(state.ingredients[1].name).toBe('Котлета');
    });
  });

  describe('Очистка конструктора', () => {
    test('Полная очистка', () => {
      let state = constructorReducer(
        initialState,
        addIngredientToConstructor(bun)
      );
      state = constructorReducer(state, addIngredientToConstructor(main));
      expect(state.bun).not.toBeNull();
      expect(state.ingredients).toHaveLength(1);

      state = constructorReducer(state, clearConstructor());
      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
    });
  });
});
