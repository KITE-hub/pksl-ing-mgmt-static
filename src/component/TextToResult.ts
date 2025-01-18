import {iResult} from '../types';

export const ingredientsReadList: {[key: string]: number} = {
  ながねぎ: 0,
  キノコ: 1,
  エッグ: 2,
  ポテト: 3,
  リンゴ: 4,
  ハーブ: 5,
  マメ: 6,
  ミルク: 7,
  ミツ: 8,
  オイル: 9,
  ジン: 10,
  トマト: 11,
  カカオ: 12,
  シッポ: 13,
  大豆: 14,
  コーン: 15,
  コーヒー: 16
};

type ExtractResult = {
  ingredients: string[];
  numbers: string[];
};

export const extractIngredientsAndNumbers = (inputValue: string[]): ExtractResult => {
  let ingredients: string[] = [];
  let numbers: string[] = [];
  let isNumberFound = false;
  let isInitialError = false;

  inputValue.forEach((item) => {
    if (/^[xXх]/.test(item)) {
      numbers.push(item);
      isNumberFound = true;
      const withoutFirstChar = item.slice(1);
      if (numbers.length <= 4 && (!withoutFirstChar || !/^\d+$/.test(withoutFirstChar))) {
        isInitialError = true;
      }
    } else if (isNumberFound) {
      let remaining = item;
      while (remaining.length > 0) {
        const matchedKey = Object.keys(ingredientsReadList).find((key) => remaining.startsWith(key));
        if (matchedKey) {
          ingredients.push(matchedKey);
          remaining = remaining.slice(matchedKey.length);
        } else {
          remaining = remaining.slice(1);
        }
      }
    }
  });

  if (numbers.length >= 4 && ingredients.length >= 4 && isInitialError) {
    numbers = numbers.slice(4);
    ingredients = ingredients.slice(4);
  }

  numbers.forEach((item) => {
    const withoutFirstChar = item?.slice(1);
    if (!withoutFirstChar || !/^\d+$/.test(withoutFirstChar)) {
      numbers = [];
      ingredients = [];
    }
  });

  return {ingredients, numbers};
};

export const validateAndParseNumbers = (numbers: string[]): number[] => {
  return numbers
    .map((item) => {
      const withoutFirstChar = item?.slice(1);
      return withoutFirstChar && /^\d+$/.test(withoutFirstChar) ? Number(withoutFirstChar) : null;
    })
    .filter((num): num is number => num !== null);
};

export const updateResult = (
  ingredients: string[],
  numbers: number[],
  ingredients2: string[],
  numbers2: number[],
  result: iResult[]
): iResult[] => {
  const updatedResult = result.map((item) => ({...item, nowIngCount: 0}));

  const updateIngredients = (ingredients: string[], numbers: number[]) => {
    ingredients.forEach((item, index) => {
      const index2 = ingredientsReadList[item];
      if (index2 !== undefined && numbers[index] !== undefined) {
        updatedResult[index2].nowIngCount = numbers[index];
      }
    });
  };

  updateIngredients(ingredients, numbers);
  updateIngredients(ingredients2, numbers2);

  return updatedResult;
};
