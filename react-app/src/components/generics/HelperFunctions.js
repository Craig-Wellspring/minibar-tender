export function sortDrinkListByName(list) {
  const sortedList = list.sort(function (a, b) {
    var drinkNameA = a.drink_name.toUpperCase();
    var drinkNameB = b.drink_name.toUpperCase();
    return drinkNameA < drinkNameB ? -1 : drinkNameA > drinkNameB ? 1 : 0;
  });

  return sortedList;
}

export function sortedMerge(list) {

  const beerList = [];
  const cocktailList = [];
  const liquorList = [];
  const jelloList = [];
  const waterList = [];
  list.forEach((drink) => {
    switch (drink.drink_type) {
      case "beer":
        beerList.push(drink);
        break;
      case "cocktail":
        cocktailList.push(drink);
        break;
      case "liquor":
        liquorList.push(drink);
        break;
      case "jello":
        jelloList.push(drink);
        break;
      case "water":
        waterList.push(drink);
        break;
    }
  });

  const combinedList = [];
  const allLists = [beerList, cocktailList, liquorList, jelloList, waterList];
  allLists.forEach((list) => combinedList.push(...sortDrinkListByName(list)));

  return combinedList;
}
