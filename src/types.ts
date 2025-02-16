import {SelectChangeEvent} from '@mui/material';
import {GridSortModel} from '@mui/x-data-grid';

export interface IResult {
  ingName: string;
  ingImage: string;
  ingEP: number;
  nowIngCount: number;
  targetIngCount: number;
  diffIngCount: number;
}

export interface iDishData {
  name: string;
  ingredients: {
    [key: string]: number;
  };
  BonusAtLv1: number;
}

export interface InputProps {
  result: IResult[];
  setResult: (result: IResult[]) => void;
  handlePaste: (setter: React.Dispatch<React.SetStateAction<string[]>>) => Promise<void>;
}

export interface GridProps {
  result: IResult[];
  isMaximumMode: boolean;
  setIsMaximumMode: (isMaximumMode: boolean) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
}

export interface DishOrderInputProps {
  result: IResult[];
  setResult: (result: IResult[]) => void;
  isMaximumMode: boolean;
}

export interface DishSelectProps {
  dish: iDishOrder;
  index: number;
  category: 'Curry' | 'Salad' | 'Dessert';
  updateDishOrder: (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete', index: number) => void;
  handleSelectChange: (
    event: SelectChangeEvent<unknown>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleCountChange: (category: 'Curry' | 'Salad' | 'Dessert', index: number, value: number) => void;
  result: IResult[];
}

export interface DishOrderDisplayProps {
  updateDishOrder: (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete', index: number) => void;
  handleSelectChange: (
    event: SelectChangeEvent<unknown>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => void;
  handleCountChange: (category: 'Curry' | 'Salad' | 'Dessert', index: number, value: number) => void;
  dishOrderCurry: iDishOrder[];
  dishOrderSalad: iDishOrder[];
  dishOrderDessert: iDishOrder[];
  result: IResult[];
}

export interface iDishOrder {
  name: string;
  count: number;
}
