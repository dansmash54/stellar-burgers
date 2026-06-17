import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const mockIngredients: TIngredient[] = [
  {
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
  }
];

describe('[ingredientsSlice] Редьюсер ингредиентов', () => {
  test('Вызов с undefined состоянием и UNKNOWN экшеном — возвращает начальное состояние', () => {
    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('fetchIngredients.pending — устанавливает loading в true', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchIngredients.fulfilled — записывает данные и снимает loading', () => {
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      }
    );
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockIngredients);
  });

  test('fetchIngredients.rejected — записывает ошибку и снимает loading', () => {
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка загрузки' }
      }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
