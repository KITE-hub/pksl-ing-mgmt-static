import {useEffect, useRef, useCallback} from 'react';
import {iDishData, DishOrderInputProps, iDishOrder, IResult} from '../types';
import Salad from '../db/Salad.json';
import Curry from '../db/Curry.json';
import Dessert from '../db/Dessert.json';
import {useLocalStorageState} from './UseLocalStorageState';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {DishOrderInputTheme} from './MUIStyledComponents';
import DishOrderDisplayNarrow from './DishOrderDisplayNarrow';
import DishOrderDisplayWide from './DishOrderDisplayWide';
import {SelectChangeEvent} from '@mui/material';

const dishDataCurry: iDishData[] = Curry as iDishData[];
const dishDataSalad: iDishData[] = Salad as iDishData[];
const dishDataDessert: iDishData[] = Dessert as iDishData[];

function DishOrderInput({result, setResult, isMaximumMode, isDark}: DishOrderInputProps) {
  const [isOrderOpen, setIsOrderOpen] = useLocalStorageState<boolean>('isOrderOpen', true);
  const orderRef = useRef<HTMLDivElement | null>(null);
  const toggleOrder = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const [dishOrderCurry, setDishOrderCurry] = useLocalStorageState<iDishOrder[]>('dishOrderCurry', [
    {name: '', count: 0}
  ]);
  const [dishOrderSalad, setDishOrderSalad] = useLocalStorageState<iDishOrder[]>('dishOrderSalad', [
    {name: '', count: 0}
  ]);
  const [dishOrderDessert, setDishOrderDessert] = useLocalStorageState<iDishOrder[]>('dishOrderDessert', [
    {name: '', count: 0}
  ]);

  const updateDishState = (
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number,
    field: 'name' | 'count',
    value: string | number
  ) => {
    const updatedDishOrder: iDishOrder[] = [
      ...(category === 'Curry' ? dishOrderCurry : category === 'Salad' ? dishOrderSalad : dishOrderDessert)
    ];
    if (field === 'name') {
      updatedDishOrder[index].name = value as string;
    } else {
      updatedDishOrder[index].count = value as number;
    }

    if (category === 'Curry') setDishOrderCurry(updatedDishOrder);
    else if (category === 'Salad') setDishOrderSalad(updatedDishOrder);
    else setDishOrderDessert(updatedDishOrder);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => {
    updateDishState(category, index, 'name', String(event.target.value));
  };

  const handleCountChange = (category: 'Curry' | 'Salad' | 'Dessert', index: number, value: number) => {
    updateDishState(category, index, 'count', value);
  };
  const updateDishOrder = (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete', index: number) => {
    const currentDishOrder =
      category === 'Curry' ? dishOrderCurry : category === 'Salad' ? dishOrderSalad : dishOrderDessert;

    if (action === 'add') {
      // 現在のindexの次に新しい要素を挿入
      const newDishOrder = [
        ...currentDishOrder.slice(0, index + 1),
        {name: '', count: 0},
        ...currentDishOrder.slice(index + 1)
      ];
      if (category === 'Curry') setDishOrderCurry(newDishOrder);
      else if (category === 'Salad') setDishOrderSalad(newDishOrder);
      else setDishOrderDessert(newDishOrder);
    } else if (action === 'delete') {
      // 現在のindexの要素を削除
      const updatedDishOrder = currentDishOrder.filter((_, i) => i !== index);
      if (category === 'Curry') setDishOrderCurry(updatedDishOrder);
      else if (category === 'Salad') setDishOrderSalad(updatedDishOrder);
      else setDishOrderDessert(updatedDishOrder);
    }
  };

  const memoizedSetResult = useCallback(
    (newResult: IResult[]) => {
      setResult(newResult);
    },
    [setResult]
  );

  const calculateTotalTargetIngCount = (item: IResult, dishOrder: iDishOrder[], dishData: iDishData[]): number => {
    let totalTargetIngCount = 0;
    dishOrder.forEach((dish) => {
      const dishDataItem: iDishData | undefined = dishData.find((d) => d.name === dish.name);
      if (!dishDataItem) return;
      const ingredientCount: number | undefined = dishDataItem.ingredients[item.ingName];
      if (ingredientCount) {
        totalTargetIngCount += dish.count * ingredientCount; // 合計を計算
      }
    });
    return totalTargetIngCount;
  };

  useEffect(() => {
    if (dishOrderCurry.length === 0 && dishOrderSalad.length === 0 && dishOrderDessert.length === 0) return; // すべてのdishOrderが空の場合は何もしない

    const updatedResult = result.map((item) => {
      const totalCurryTargetIngCount = calculateTotalTargetIngCount(item, dishOrderCurry, dishDataCurry);
      const totalSaladTargetIngCount = calculateTotalTargetIngCount(item, dishOrderSalad, dishDataSalad);
      const totalDessertTargetIngCount = calculateTotalTargetIngCount(item, dishOrderDessert, dishDataDessert);
      let totalTargetIngCount;
      if (isMaximumMode) {
        totalTargetIngCount = Math.max(totalCurryTargetIngCount, totalSaladTargetIngCount, totalDessertTargetIngCount);
      } else {
        totalTargetIngCount = totalCurryTargetIngCount + totalSaladTargetIngCount + totalDessertTargetIngCount;
      }
      const diffIngCount = item.nowIngCount - totalTargetIngCount;
      return {
        ...item,
        targetIngCount: totalTargetIngCount > 0 ? totalTargetIngCount : 0, // 合計が0の場合は0を代入
        diffIngCount: diffIngCount
      };
    });
    // resultが変更された場合のみsetResultを呼び出す
    if (JSON.stringify(updatedResult) !== JSON.stringify(result)) {
      memoizedSetResult(updatedResult);
    }
  }, [dishOrderCurry, dishOrderSalad, dishOrderDessert, result, isMaximumMode, memoizedSetResult]);

  return (
    <div className="DishOrderInput mt-4 mb-6 mx-auto">
      <ThemeProvider theme={DishOrderInputTheme}>
        <CssBaseline />
        <div className="flex cursor-pointer" onClick={toggleOrder}>
          <span className="bg-[#f6b84b] w-1.5 mr-1.5"></span>
          <div className="flex justify-between text-white bg-[#f6b84b] px-2 w-full clipSlant">
            <h3 className="font-bold" style={{color: 'var(--bg-color)'}}>
              メニュー入力
            </h3>
            {isOrderOpen ? (
              <KeyboardArrowUpIcon style={{color: 'var(--bg-color)', alignSelf: 'center'}} />
            ) : (
              <KeyboardArrowDownIcon style={{color: 'var(--bg-color)', alignSelf: 'center'}} />
            )}
          </div>
        </div>
        <Collapse in={isOrderOpen} timeout="auto" unmountOnExit>
          <div ref={orderRef}>
            {/* DishOrderDisplayNarrow か DishOrderDisplayWide のどちらかしか表示されない(レスポンシブ) */}
            <DishOrderDisplayNarrow
              updateDishOrder={updateDishOrder}
              handleSelectChange={handleSelectChange}
              handleCountChange={handleCountChange}
              dishOrderCurry={dishOrderCurry}
              dishOrderSalad={dishOrderSalad}
              dishOrderDessert={dishOrderDessert}
              result={result}
              isDark={isDark}
            />
            <DishOrderDisplayWide
              updateDishOrder={updateDishOrder}
              handleSelectChange={handleSelectChange}
              handleCountChange={handleCountChange}
              dishOrderCurry={dishOrderCurry}
              dishOrderSalad={dishOrderSalad}
              dishOrderDessert={dishOrderDessert}
              result={result}
              isDark={isDark}
            />
          </div>
        </Collapse>
      </ThemeProvider>
    </div>
  );
}

export default DishOrderInput;
