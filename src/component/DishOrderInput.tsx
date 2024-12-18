import React, {useState, useEffect, useRef, useCallback} from 'react';
import {iDishData, DishOrderInputProps, iDishOrder, iResult} from '../types';
import Salad from '../db/Salad.json';
import Curry from '../db/Curry.json';
import Dessert from '../db/Dessert.json';
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

function DishOrderInput({result, setResult, isMaximumMode}: DishOrderInputProps) {
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsOrderOpen = localStorage.getItem('isOrderOpen');
      return storedIsOrderOpen ? JSON.parse(storedIsOrderOpen) : true;
    }
    return true;
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isOrderOpen', JSON.stringify(isOrderOpen));
    }
  }, [isOrderOpen]);
  const orderRef = useRef<HTMLDivElement | null>(null);
  const toggleOrder = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const [dishOrderCurry, setDishOrderCurry] = useState<iDishOrder[]>([{name: '', count: 0}]);
  const [dishOrderSalad, setDishOrderSalad] = useState<iDishOrder[]>([{name: '', count: 0}]);
  const [dishOrderDessert, setDishOrderDessert] = useState<iDishOrder[]>([{name: '', count: 0}]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDishOrderCurry = localStorage.getItem('dishOrderCurry');
      const storedDishOrderSalad = localStorage.getItem('dishOrderSalad');
      const storedDishOrderDessert = localStorage.getItem('dishOrderDessert');
      if (storedDishOrderCurry) {
        setDishOrderCurry(JSON.parse(storedDishOrderCurry));
      }
      if (storedDishOrderSalad) {
        setDishOrderSalad(JSON.parse(storedDishOrderSalad));
      }
      if (storedDishOrderDessert) {
        setDishOrderDessert(JSON.parse(storedDishOrderDessert));
      }
    }
  }, []); // 初回レンダリング時のみ実行
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dishOrderCurry', JSON.stringify(dishOrderCurry));
      localStorage.setItem('dishOrderSalad', JSON.stringify(dishOrderSalad));
      localStorage.setItem('dishOrderDessert', JSON.stringify(dishOrderDessert));
    }
  }, [dishOrderCurry, dishOrderSalad, dishOrderDessert]);

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
    (newResult: iResult[]) => {
      setResult(newResult);
    },
    [setResult]
  );

  useEffect(() => {
    if (dishOrderCurry.length === 0 && dishOrderSalad.length === 0 && dishOrderDessert.length === 0) return; // すべてのdishOrderが空の場合は何もしない
    const updatedResult = result.map((item) => {
      let totalCurryTargetIngCount = 0;
      let totalSaladTargetIngCount = 0;
      let totalDessertTargetIngCount = 0;
      dishOrderCurry.forEach((dish) => {
        const dishDataItem: iDishData | undefined = dishDataCurry.find((d) => d.name === dish.name);
        if (!dishDataItem) return;

        const ingredientCount: number | undefined = dishDataItem.ingredients[item.ingName];
        if (ingredientCount) {
          totalCurryTargetIngCount += dish.count * ingredientCount; // 合計を計算
        }
      });
      dishOrderSalad.forEach((dish) => {
        const dishDataItem: iDishData | undefined = dishDataSalad.find((d) => d.name === dish.name);
        if (!dishDataItem) return;

        const ingredientCount: number | undefined = dishDataItem.ingredients[item.ingName];
        if (ingredientCount) {
          totalSaladTargetIngCount += dish.count * ingredientCount; // 合計を計算
        }
      });
      dishOrderDessert.forEach((dish) => {
        const dishDataItem: iDishData | undefined = dishDataDessert.find((d) => d.name === dish.name);
        if (!dishDataItem) return;

        const ingredientCount: number | undefined = dishDataItem.ingredients[item.ingName];
        if (ingredientCount) {
          totalDessertTargetIngCount += dish.count * ingredientCount; // 合計を計算
        }
      });
      let totalTargetIngCount;
      if (isMaximumMode) {
        totalTargetIngCount = Math.max(totalCurryTargetIngCount, totalSaladTargetIngCount, totalDessertTargetIngCount);
      } else {
        totalTargetIngCount = totalCurryTargetIngCount + totalSaladTargetIngCount + totalDessertTargetIngCount;
      }
      const diffIngCount = item.nowIngCount - item.targetIngCount;
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
            <h3 className="font-bold">メニュー入力</h3>
            {isOrderOpen ? (
              <KeyboardArrowUpIcon style={{color: 'white', alignSelf: 'center'}} />
            ) : (
              <KeyboardArrowDownIcon style={{color: 'white', alignSelf: 'center'}} />
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
            />
            <DishOrderDisplayWide
              updateDishOrder={updateDishOrder}
              handleSelectChange={handleSelectChange}
              handleCountChange={handleCountChange}
              dishOrderCurry={dishOrderCurry}
              dishOrderSalad={dishOrderSalad}
              dishOrderDessert={dishOrderDessert}
              result={result}
            />
          </div>
        </Collapse>
      </ThemeProvider>
    </div>
  );
}

export default DishOrderInput;
