import { useReducer, useCallback } from 'react';
import DishSelect from './DishSelect';
import { DishOrderDisplayProps } from '../types';
import { StyledTabs, StyledTab } from './MUIStyledComponents';

interface State {
  tabIndex: number; // 初期状態に応じて適切な型を指定
}
interface Action {
  type: string;
  payload?: { index: number };
}
const initialState: State = { tabIndex: 0 }; // 初期状態を定義
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'changeUpperTab':
      return { ...state, tabIndex: action.payload?.index ?? state.tabIndex };
    default:
      return state;
  }
};

function DishOrderDisplayNarrow({
  updateDishOrder,
  handleInputChange,
  handleSelectChange,
  handleCountChange,
  dishOrderCurry,
  dishOrderSalad,
  dishOrderDessert,
  result
}: DishOrderDisplayProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tabColors = ['#fe8b71', '#51e188', '#f6bd5a'];
  const onTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      dispatch({ type: 'changeUpperTab', payload: { index: newValue } });
    },
    [dispatch]
  );
  return (
    <div className="DishOrderDisplay1">
      <StyledTabs
        value={state.tabIndex}
        onChange={onTabChange}
        selectedcolor={tabColors[state.tabIndex]}
      >
        <StyledTab selectedcolor={tabColors[state.tabIndex]} label="カレー・シチュー" />
        <StyledTab selectedcolor={tabColors[state.tabIndex]} label="サラダ" />
        <StyledTab selectedcolor={tabColors[state.tabIndex]} label="デザート・ドリンク" />
      </StyledTabs>
      {state.tabIndex === 0 &&
        dishOrderCurry.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Curry"
            updateDishOrder={updateDishOrder}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
          />
        ))}
      {state.tabIndex === 1 &&
        dishOrderSalad.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Salad"
            updateDishOrder={updateDishOrder}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
          />
        ))}
      {state.tabIndex === 2 &&
        dishOrderDessert.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Dessert"
            updateDishOrder={updateDishOrder}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
          />
        ))}
    </div>
  );
}

export default DishOrderDisplayNarrow;