import { newItem } from 'models';

export const customedHeadrTable = (array: string[]) => {
  const newArray = array.filter((item) => item !== 'Total');
  return [...newArray, 'Total', 'Action'];
};

export const calculationData = (object: newItem, number: number) => {
  let newObject: newItem = object;
  Object.keys(object).forEach((item) => {
    if (item !== 'Total')
      newObject[item] = parseFloat(((object[item] * number) / object.Total).toFixed(2));
  });
  return { ...newObject, Total: number };
};
