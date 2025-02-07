import {iDishData, DishSelectProps} from '../types';
import Salad from '../db/Salad.json';
import Curry from '../db/Curry.json';
import Dessert from '../db/Dessert.json';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {StyledSelect, StyledMenuItem} from './MUIStyledComponents';
import {Box, Typography, FormControl, IconButton} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const dishDataCurry: iDishData[] = Curry as iDishData[];
const dishDataSalad: iDishData[] = Salad as iDishData[];
const dishDataDessert: iDishData[] = Dessert as iDishData[];

const menuProps = {
  PaperProps: {
    style: {
      boxShadow: 'none',
      border: '1px solid #25d76b',
      borderRadius: '8px'
    }
  }
};

function DishSelect({
  dish,
  index,
  category,
  updateDishOrder,
  handleSelectChange,
  handleCountChange,
  result
}: DishSelectProps) {
  return (
    <div key={index} className="DishSelect mt-3 w-[360px]">
      <div className="flex items-center mx-auto mb-2">
        <div className="flex ml-auto mr-2">
          {index > 0 && (
            <button onClick={() => updateDishOrder(category, 'delete', index)}>
              <RemoveIcon sx={{color: '#666'}} />
            </button>
          )}
          <button onClick={() => updateDishOrder(category, 'add', index)}>
            <AddIcon sx={{color: '#666'}} />
          </button>
        </div>
        <FormControl>
          <StyledSelect
            MenuProps={menuProps}
            value={dish.name}
            onChange={(event) => handleSelectChange(event, category, index)}
            displayEmpty
          >
            {(category === 'Curry' ? dishDataCurry : category === 'Salad' ? dishDataSalad : dishDataDessert).map(
              (option) => {
                const totalIngredients = Object.values(option.ingredients).reduce((a, b) => a + b, 0);
                return (
                  <StyledMenuItem key={option.name} value={option.name}>
                    <Box display="flex" alignItems="center" width="255px">
                      <Typography
                        sx={{
                          fontSize: '0.85em'
                        }}
                      >
                        {option.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7em',
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
                      </Typography>
                    </Box>
                    <Box display="flex" width="255px">
                      {Object.keys(option.ingredients).map((ingredient) => {
                        const resultItem = result.find((item) => item.ingName === ingredient);
                        return resultItem ? (
                          <Box key={ingredient} display="flex" alignItems="center" marginRight="10px">
                            <img
                              src={`${process.env.PUBLIC_URL || ''}${resultItem.ingImage}`}
                              alt={ingredient}
                              width={22}
                              height={22}
                            />
                            <Typography className="mr-2 text-[#653618] w-5" sx={{fontSize: '12px'}}>
                              x{option.ingredients[ingredient]}
                            </Typography>
                          </Box>
                        ) : null;
                      })}
                    </Box>
                  </StyledMenuItem>
                );
              }
            )}
          </StyledSelect>
        </FormControl>
      </div>
      <div className="flex items-center justify-end space-x-2 mx-2">
        <input
          type="text"
          value={dish.count}
          onChange={(e) => handleCountChange(category, index, parseInt(e.target.value, 10) || 0)}
          className="font-bold mr-2 px-2 focus:px-[7px] h-9 w-16 py-1 box-border rounded-lg border border-[#25d76b] shadow-input focus:outline-none focus:border-2 focus:border-[#25d76b]"
        />
        <IconButton
          aria-label="actions"
          onClick={() => handleCountChange(category, index, Math.max(0, dish.count - 1))}
        >
          <NavigateBeforeIcon sx={{color: '#666'}} />
        </IconButton>
        <IconButton aria-label="actions" onClick={() => handleCountChange(category, index, dish.count + 1)}>
          <NavigateNextIcon sx={{color: '#666'}} />
        </IconButton>
      </div>
    </div>
  );
}

export default DishSelect;
