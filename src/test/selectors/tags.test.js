import selectTag from '../../selectors/tags';
import tags from '../fixtures/tags';

test('should filter by text value', () =>{
  const result = selectTag(tags,{tag: 'x'});
  expect(result).toEqual([tags[0]])
})

test('should oder objects alphabetically', () => {
  const result = selectTag(tags,{tag: ''});
  expect(result).toEqual([tags[2],tags[0],tags[1]]);
})
