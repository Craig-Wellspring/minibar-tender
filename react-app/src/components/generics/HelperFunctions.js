export function sortDrinkListByName(list) {
  const sortedList = list.sort(function (a, b) {
    var drinkNameA = a.drink_name.toUpperCase();
    var drinkNameB = b.drink_name.toUpperCase();
    return drinkNameA < drinkNameB ? -1 : drinkNameA > drinkNameB ? 1 : 0;
  });

  return sortedList;
}

export function sortedMerge(drinkLists) {
  const combinedList = [];
  drinkLists.forEach((list) => combinedList.push(...list));

  const sortedList = sortDrinkListByName(combinedList);
  return sortedList;
}
