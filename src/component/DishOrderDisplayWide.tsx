import DishSelect from './DishSelect';
import {DishOrderDisplayProps} from '../types';

function DishOrderDisplayWide({
  updateDishOrder,
  handleSelectChange,
  handleCountChange,
  dishOrderCurry,
  dishOrderSalad,
  dishOrderDessert,
  result,
  isDark
}: DishOrderDisplayProps) {
  return (
    <div className="DishOrderDisplayWide">
      <div className="mt-3 mb-4">
        <div className="flex mb-3">
          <span className="bg-[#fe8b71] w-1.5 mr-1.5"></span>
          <h3 className="font-bold bg-[#fe8b71] px-2 w-full clipSlant" style={{color: 'var(--bg-color)'}}>
            カレー・シチュー
          </h3>
          {/* カレーの背景色はhsl(11, 98%, 72%) #fe8b71、元はhsl(11, 98%, 67%)#FD7658 */}
        </div>
        {dishOrderCurry.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Curry"
            updateDishOrder={updateDishOrder}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
            isDark={isDark}
          />
        ))}
      </div>
      <div className="mt-3 mb-4">
        <div className="flex mb-3">
          <span className="bg-[#51e188] w-1.5 mr-1.5"></span>
          <h3 className="font-bold bg-[#51e188] px-2 w-full clipSlant" style={{color: 'var(--bg-color)'}}>
            サラダ
          </h3>
          {/* サラダの背景色はhsl(143, 71%, 60%) #51e188、元はhsl(143, 71%, 50%) */}
        </div>
        {dishOrderSalad.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Salad"
            updateDishOrder={updateDishOrder}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
            isDark={isDark}
          />
        ))}
      </div>
      <div className="mt-3 mb-4">
        <div className="flex mb-3">
          <span className="bg-[#f6bd5a] w-1.5 mr-1.5"></span>
          {/* デザートの背景色は、hsl(38, 90%, 66%)#f6bd5a、元はhsl(38, 90%, 63%)#f6b84b */}
          <h3 className="font-bold bg-[#f6bd5a] px-2 w-full clipSlant" style={{color: 'var(--bg-color)'}}>
            デザート・ドリンク
          </h3>
        </div>
        {dishOrderDessert.map((dish, index) => (
          <DishSelect
            key={index}
            dish={dish}
            index={index}
            category="Dessert"
            updateDishOrder={updateDishOrder}
            handleSelectChange={handleSelectChange}
            handleCountChange={handleCountChange}
            result={result}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

export default DishOrderDisplayWide;
