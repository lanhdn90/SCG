import { initialPanes, newItem } from 'models';
import React from 'react';

export const customizeHeaderTable = (array: string[]) => {
  const newArray = array.filter((item) => item !== 'Total');
  return [...newArray, 'Total', 'Action'];
};
export const customizeHeaderFrequencyTable = (array: string[]) => {
  const newArray = array.filter((item) => item !== 'Total');
  return [...newArray, 'Action'];
};
export const customedHistoryTable = (array: string[]) => {
  const newArray = array.filter((item) => item !== 'Total' && item !== 'Action');
  return ['Email', 'NameTable', 'Date', ...newArray];
};

export const calculationDataSPC = (object: newItem, number: number) => {
  let newObject = Object.keys(object).reduce(
    (a, v) => ({ ...a, [v]: parseFloat(((object[v] * number) / object.Total).toFixed(2)) }),
    {}
  );
  const spc: newItem = { ...newObject, key: '1', Total: number };
  return spc;
};

export const calculationDataSPR = (object: newItem): number => {
  let number = 0;
  Object.keys(object).forEach((label) => {
    if (label !== 'Total') number += object[label];
  });
  return parseFloat(number.toFixed(2));
};

export const editColumHistoryTable = (array: initialPanes[], id: React.Key): string[] => {
  const newObject = array.find((e) => e.key === Number(id));
  return newObject ? customedHistoryTable(newObject.content) : [];
};
