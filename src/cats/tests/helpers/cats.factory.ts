import { Cat } from '../../entities/cat.entity';

const defaultCatParams = {
  id: 1,
  name: 'Garfield',
  age: 10,
  breed: 'Red Fat',
  photos: [],
};

export function createCat(catParams: Cat = defaultCatParams): Cat {
  const cat = new Cat();

  cat.id = catParams.id;
  cat.name = catParams.name;
  cat.age = catParams.age;
  cat.breed = catParams.breed;
  cat.photos = catParams.photos;

  return cat;
}
