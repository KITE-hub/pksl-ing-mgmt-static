import {iDishData, DishSelectProps} from '../types';
import Salad from '../db/Salad.json';
import Curry from '../db/Curry.json';
import Dessert from '../db/Dessert.json';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {ThemeProvider} from '@mui/material/styles';
import {DishOrderInputTheme} from './MUIStyledComponents';
import {StyledAutocomplete, StyledPaper, StyledListbox, StyledTextField} from './MUIStyledComponents';

const dishDataCurry: iDishData[] = Curry as iDishData[];
const dishDataSalad: iDishData[] = Salad as iDishData[];
const dishDataDessert: iDishData[] = Dessert as iDishData[];

const toKatakana = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60));
};
const normalizeString = (str: string | undefined | null): string => {
  if (!str) return '';
  return toKatakana(
    str.toLocaleLowerCase().normalize('NFKC') // 小文字化＆正規化
  );
};

function DishSelect({
  dish,
  index,
  category,
  updateDishOrder,
  handleInputChange,
  handleSelectChange,
  handleCountChange,
  result
}: DishSelectProps) {
  return (
    <div key={index} className="dish-set mt-3 mb-4">
      <div className="flex items-center mx-auto mb-2">
        <div className="flex ml-auto mr-4">
          {index > 0 && (
            <button onClick={() => updateDishOrder(category, 'delete')}>
              <RemoveIcon />
            </button>
          )}
          <button onClick={() => updateDishOrder(category, 'add')}>
            <AddIcon />
          </button>
        </div>
        <ThemeProvider theme={DishOrderInputTheme}>
          <StyledAutocomplete
            disablePortal
            options={category === 'Curry' ? dishDataCurry : category === 'Salad' ? dishDataSalad : dishDataDessert}
            getOptionLabel={(option) => option.name}
            value={
              (category === 'Curry' ? dishDataCurry : category === 'Salad' ? dishDataSalad : dishDataDessert).find(
                (d) => d.name === dish.name
              ) || null
            }
            filterOptions={(options, state) => {
              const inputValue = normalizeString(state.inputValue);
              return options.filter((option) => normalizeString(option.name).includes(inputValue));
            }}
            PaperComponent={(props) => <StyledPaper {...props} />}
            ListboxComponent={StyledListbox}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                variant="outlined"
                value={dish.name}
                onChange={(event) => handleInputChange(event, category, index)}
              />
            )}
            inputValue={dish.name}
            onChange={(event, selectedOption) => {
              if (selectedOption) {
                handleSelectChange(event, selectedOption.name, category, index);
              }
            }}
            onInputChange={(event, value) => handleSelectChange(event, value, category, index)}
            renderOption={(props, option) => {
              const totalIngredients = Object.values(option.ingredients).reduce((a, b) => a + b, 0);

              const {key, ...restProps} = props; // keyを除外するんだけど、除外されたkeyについてno-unused-varsのエラーを吐く
              return (
                <li
                  key={option.name}
                  {...restProps}
                  style={{display: 'flex', flexDirection: 'column', padding: '0.6rem'}}
                >
                  <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                    <span>{option.name}</span>
                    <span
                      style={{
                        fontSize: '0.8em',
                        marginLeft: 'auto',
                        position: 'relative'
                      }}
                    >
                      x{totalIngredients}, +{option.BonusAtLv1}%
                      <span
                        style={{
                          fontSize: '0.9em',
                          position: 'absolute',
                          top: '70%',
                          right: '0'
                        }}
                      >
                        (Lv.1)
                      </span>
                    </span>
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                    {Object.keys(
                      (category === 'Curry'
                        ? dishDataCurry
                        : category === 'Salad'
                          ? dishDataSalad
                          : dishDataDessert
                      ).find((d) => d.name === option.name)?.ingredients || {}
                    ).map((ingredient) => {
                      const resultItem = result.find((item) => item.ingName === ingredient);
                      return resultItem ? (
                        <div key={ingredient} style={{display: 'flex', alignItems: 'center'}}>
                          <img src={resultItem.ingImage} alt={ingredient} width={24} height={24} />
                          <span className="mr-2 text-[#653618] text-xs w-5">
                            x
                            {
                              (category === 'Curry'
                                ? dishDataCurry
                                : category === 'Salad'
                                  ? dishDataSalad
                                  : dishDataDessert
                              ).find((d) => d.name === option.name)?.ingredients[ingredient]
                            }
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </li>
              );
            }}
          />
        </ThemeProvider>
      </div>
      <div className="flex items-center justify-end">
        {Object.keys(
          (category === 'Curry' ? dishDataCurry : category === 'Salad' ? dishDataSalad : dishDataDessert).find(
            (d) => d.name === dish.name
          )?.ingredients || {}
        ).map((ingredient) => {
          const resultItem = result.find((item) => item.ingName === ingredient);
          return resultItem ? (
            <div key={ingredient} className="flex items-center">
              <img src={resultItem.ingImage} alt={ingredient} width={32} height={32} />
              <span className="mr-2 text-[#653618] text-xs w-5">
                x
                {
                  (category === 'Curry' ? dishDataCurry : category === 'Salad' ? dishDataSalad : dishDataDessert).find(
                    (d) => d.name === dish.name
                  )?.ingredients[ingredient]
                }
              </span>
            </div>
          ) : null;
        })}
        <input
          type="number"
          value={dish.count}
          onChange={(e) => handleCountChange(category, index, parseInt(e.target.value, 10) || 0)}
          className="font-bold ml-3 px-2 focus:px-[7px] h-9 w-16 py-1 box-border rounded-lg border border-[#25d76b] shadow-input focus:outline-none focus:border-2 focus:border-[#25d76b]"
        />
      </div>
    </div>
  );
}

export default DishSelect;
