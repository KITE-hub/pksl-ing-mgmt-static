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

const dishDataCurry: iDishData[] = Curry as iDishData[];
const dishDataSalad: iDishData[] = Salad as iDishData[];
const dishDataDessert: iDishData[] = Dessert as iDishData[];

function DishOrderInput({result, setResult, isMaximumMode}: DishOrderInputProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => {
    updateDishState(category, index, 'name', String(event.target.value));
  };
  const handleSelectChange = (
    event: React.SyntheticEvent,
    value: string,
    category: 'Curry' | 'Salad' | 'Dessert',
    index: number
  ) => {
    updateDishState(category, index, 'name', String(value));
  };

  const handleCountChange = (category: 'Curry' | 'Salad' | 'Dessert', index: number, value: number) => {
    updateDishState(category, index, 'count', value);
  };
  const updateDishOrder = (category: 'Curry' | 'Salad' | 'Dessert', action: 'add' | 'delete') => {
    const currentDishOrder =
      category === 'Curry' ? dishOrderCurry : category === 'Salad' ? dishOrderSalad : dishOrderDessert;

    if (action === 'add') {
      const newDish = {name: '', count: 0};
      if (category === 'Curry') setDishOrderCurry([...currentDishOrder, newDish]);
      else if (category === 'Salad') setDishOrderSalad([...currentDishOrder, newDish]);
      else setDishOrderDessert([...currentDishOrder, newDish]);
    } else if (action === 'delete') {
      const updatedDishOrder = currentDishOrder.slice(0, -1); // 最後の要素を削除
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
    <div className="DishOrderInput mt-6 mb-10 mx-auto">
      <ThemeProvider theme={DishOrderInputTheme}>
        <CssBaseline />
        <div className="flex" onClick={toggleMenu}>
          <span className="bg-[#f6b84b] w-1.5 mr-1.5"></span>
          <div className="flex justify-between text-white bg-[#f6b84b] px-2 w-full clipSlant">
            <h3 className="font-bold">メニュー入力</h3>
            {isMenuOpen ? (
              <KeyboardArrowUpIcon style={{color: 'white', alignSelf: 'center'}} />
            ) : (
              <KeyboardArrowDownIcon style={{color: 'white', alignSelf: 'center'}} />
            )}
          </div>
        </div>
        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
          <div ref={menuRef}>
            {/* DishOrderDisplayNarrow か DishOrderDisplayWide のどちらかしか表示されない(レスポンシブ) */}
            <DishOrderDisplayNarrow
              updateDishOrder={updateDishOrder}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleCountChange={handleCountChange}
              dishOrderCurry={dishOrderCurry}
              dishOrderSalad={dishOrderSalad}
              dishOrderDessert={dishOrderDessert}
              result={result}
            />
            <DishOrderDisplayWide
              updateDishOrder={updateDishOrder}
              handleInputChange={handleInputChange}
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
