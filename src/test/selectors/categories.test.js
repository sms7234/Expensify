import selectCategory from '../../selectors/categories';
import categories from '../fixtures/categories';

test('should filter by text value', () =>{
  const result = selectCategory(categories,{category: 's'});
  expect(result).toEqual([categories[1]]);
})

test('should oder objects alphabetically', () => {
  const result = selectCategory(categories,{category: ''});
  expect(result).toEqual([categories[2],categories[0],categories[1]]);
})
