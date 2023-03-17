let favoriteAnimals = ["blowfish", "capricorn", "giraffe"];
const maurosFavoriteAnimal = "turtle";
favoriteAnimals.push(maurosFavoriteAnimal);
console.log(favoriteAnimals);
const jimsFavoriteAnimal = "meerkat";
favoriteAnimals.splice(1, 0, jimsFavoriteAnimal);
console.log(
  "I think the new value of the array will be: [ 'blowfish', 'meerkat', 'capricorn', 'giraffe', 'turtle' ]"
);
console.log(favoriteAnimals);
console.log(`The array has a length of: ${favoriteAnimals.length} `);
favoriteAnimals.splice(3, 1);
console.log(favoriteAnimals);
console.log(
  `The item you are looking for is at index: ${favoriteAnimals.indexOf(
    "meerkat"
  )}`
);
