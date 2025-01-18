import React, {useState, useEffect, useMemo, useRef} from 'react';
import {InputProps} from '../types';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {StyledTextInputField} from './MUIStyledComponents';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {iResult} from '../types';
import {debounce} from 'lodash';

const ingredientsReadList: {[key: string]: number} = {
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
const extractIngredientsAndNumbers = (inputValue: string[]): ExtractResult => {
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

const validateAndParseNumbers = (numbers: string[]) => {
  const parsedNumbers: number[] = [];

  numbers.forEach((item) => {
    const withoutFirstChar = item?.slice(1);
    if (withoutFirstChar && /^\d+$/.test(withoutFirstChar)) {
      parsedNumbers.push(Number(withoutFirstChar)); // 数字である場合のみ追加
    }
  });
  return parsedNumbers;
};

const updateResult = (
  ingredients: string[],
  numbers: number[],
  ingredients2: string[],
  numbers2: number[],
  result: iResult[]
) => {
  const updatedResult = [...result];
  updatedResult.forEach((item) => (item.nowIngCount = 0));

  ingredients.forEach((item, index) => {
    const index2 = ingredientsReadList[item];
    if (index2 !== undefined && numbers[index] !== undefined) {
      updatedResult[index2].nowIngCount = numbers[index];
    }
  });
  ingredients2.forEach((item, index) => {
    const index2 = ingredientsReadList[item];
    if (index2 !== undefined && numbers[index] !== undefined) {
      updatedResult[index2].nowIngCount = numbers2[index];
    }
  });
  return updatedResult;
};

function TextInput({result, setResult}: InputProps) {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsInputOpen = localStorage.getItem('isInputOpen');
      return storedIsInputOpen ? JSON.parse(storedIsInputOpen) : true;
    }
    return true;
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isInputOpen', JSON.stringify(isInputOpen));
    }
  }, [isInputOpen]);

  const inputRef = useRef<HTMLDivElement | null>(null);
  const toggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };
  const [inputValue, setInputValue] = useState<string[]>([]);
  const [inputValue2, setInputValue2] = useState<string[]>([]);
  const [processedInputValue, setProcessedInputValue] = useState<string[]>([]);
  const [processedInputValue2, setProcessedInputValue2] = useState<string[]>([]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string[]) => {
        setProcessedInputValue(value);
      }, 300),
    []
  );
  const debouncedUpdate2 = useMemo(
    () =>
      debounce((value: string[]) => {
        setProcessedInputValue2(value);
      }, 300),
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedInputValue = localStorage.getItem('inputValue');
      if (storedInputValue) {
        setInputValue(JSON.parse(storedInputValue));
      }
    }
    if (typeof window !== 'undefined') {
      const storedInputValue2 = localStorage.getItem('inputValue2');
      if (storedInputValue2) {
        setInputValue2(JSON.parse(storedInputValue2));
      }
    }
    return () => {
      debouncedUpdate.cancel();
      debouncedUpdate2.cancel();
    };
  }, [debouncedUpdate, debouncedUpdate2]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inputValue', JSON.stringify(inputValue));
    }
  }, [inputValue]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inputValue2', JSON.stringify(inputValue2));
    }
  }, [inputValue2]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split(/\n|\s+/); // 改行で分割して配列化
    setInputValue(lines);
    debouncedUpdate(lines);
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split(/\n|\s+/); // 改行で分割して配列化
    setInputValue2(lines);
    debouncedUpdate2(lines);
  };

  const clearInputValue = () => {
    setInputValue([]);
    debouncedUpdate([]);
  };
  const clearInputValue2 = () => {
    setInputValue2([]);
    debouncedUpdate2([]);
  };

  useEffect(() => {
    const {ingredients, numbers} = extractIngredientsAndNumbers(processedInputValue);
    const validatedNumbers = validateAndParseNumbers(numbers);
    const {ingredients: ingredients2, numbers: numbers2} = extractIngredientsAndNumbers(processedInputValue2);
    const validatedNumbers2 = validateAndParseNumbers(numbers2);
    const updatedResult = updateResult(ingredients, validatedNumbers, ingredients2, validatedNumbers2, result);
    if (updatedResult !== result) {
      setResult(updatedResult);
    }
  }, [processedInputValue, processedInputValue2]);

  return (
    <div className="TextInput mt-4 mb-6 mx-auto">
      <div className="flex mb-3 cursor-pointer" onClick={toggleInput}>
        <span className="bg-[#25d76b] w-1.5 mr-1.5"></span>
        <div className="flex text-white bg-[#25d76b] px-2 w-full clipSlant items-end">
          <h3 className="font-bold">テキスト入力</h3>
          <small className="ml-1">(使い方必読)</small>
          {isInputOpen ? (
            <KeyboardArrowUpIcon style={{color: 'white', alignSelf: 'center', marginLeft: 'auto'}} />
          ) : (
            <KeyboardArrowDownIcon style={{color: 'white', alignSelf: 'center', marginLeft: 'auto'}} />
          )}
        </div>
      </div>
      <Collapse in={isInputOpen} timeout="auto" unmountOnExit>
        <div ref={inputRef} className="flex">
          <div className="w-6/12">
            <StyledTextInputField multiline rows={4} value={inputValue.join('\n')} onChange={handleInputChange} />
            <IconButton aria-label="actions" onClick={clearInputValue} sx={{display: 'block', margin: '0px auto'}}>
              <DeleteIcon sx={{color: '#666', display: 'block', margin: '0px auto'}} />
            </IconButton>
          </div>
          <div className="w-6/12">
            <StyledTextInputField multiline rows={4} value={inputValue2.join('\n')} onChange={handleInputChange2} />
            <IconButton aria-label="actions" onClick={clearInputValue2} sx={{display: 'block', margin: '0px auto'}}>
              <DeleteIcon sx={{color: '#666', display: 'block', margin: '0px auto'}} />
            </IconButton>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default TextInput;
