import { names } from './names';

export const buildCat = (pics, items) => {
  const cats = [];
  pics.forEach((item, index) => {
    cats.push(
      {
        name: names[calcStat(item.substring(40,41),names.length-1,0)],
        pic: item,
        fact: items[index],
        hp: calcStat(item.substring(40, 42), 20, 5),
        at: calcStat(item.substring(37,39), 7, 3),

      }
    );
  });
  return cats;
};


const calcStat = (str, max, min) => {
  return (+str.split('').map((char) => char.charCodeAt(0)).join('') % (max - min))  + min;
};
