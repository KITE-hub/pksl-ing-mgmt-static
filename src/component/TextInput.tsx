import {useEffect} from 'react';
import {InputProps} from '../types';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {StyledTextInputField} from './MUIStyledComponents';
import {IconButton} from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import DeleteIcon from '@mui/icons-material/Delete';
import {useLocalStorageState} from './UseLocalStorageState';
import {useDebounce} from './UseDebounce';
import {extractIngredientsAndNumbers, validateAndParseNumbers, updateResult} from './TextToResult';

function TextInput({result, setResult, handlePaste}: InputProps) {
  const [isInputOpen, setIsInputOpen] = useLocalStorageState<boolean>('isInputOpen', true);
  const [inputValue, setInputValue] = useLocalStorageState<string[]>('inputValue', []);
  const [inputValue2, setInputValue2] = useLocalStorageState<string[]>('inputValue2', []);

  const debouncedInputValue = useDebounce(inputValue, 300);
  const debouncedInputValue2 = useDebounce(inputValue2, 300);

  const toggleInput = () => setIsInputOpen(!isInputOpen);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const lines = e.target.value.split(/\n|\s+/);
    setter(lines);
  };

  const clearInputValue = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter([]);
  };

  useEffect(() => {
    const {ingredients, numbers} = extractIngredientsAndNumbers(debouncedInputValue);
    const validatedNumbers = validateAndParseNumbers(numbers);
    const {ingredients: ingredients2, numbers: numbers2} = extractIngredientsAndNumbers(debouncedInputValue2);
    const validatedNumbers2 = validateAndParseNumbers(numbers2);
    const updatedResult = updateResult(ingredients, validatedNumbers, ingredients2, validatedNumbers2, result);
    if (JSON.stringify(updatedResult) !== JSON.stringify(result)) {
      setResult(updatedResult);
    }
  }, [debouncedInputValue, debouncedInputValue2, result, setResult]);

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
        <div className="flex">
          <InputField
            value={inputValue}
            onChange={(e) => handleInputChange(e, setInputValue)}
            onPaste={() => handlePaste(setInputValue)}
            onClear={() => clearInputValue(setInputValue)}
          />
          <InputField
            value={inputValue2}
            onChange={(e) => handleInputChange(e, setInputValue2)}
            onPaste={() => handlePaste(setInputValue2)}
            onClear={() => clearInputValue(setInputValue2)}
          />
        </div>
      </Collapse>
    </div>
  );
}

interface InputFieldProps {
  value: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPaste: () => void;
  onClear: () => void;
}

const InputField: React.FC<InputFieldProps> = ({value, onChange, onPaste, onClear}) => (
  <div className="w-6/12">
    <StyledTextInputField multiline rows={4} value={value.join('\n')} onChange={onChange} />
    <div className="flex">
      <IconButton aria-label="actions" onClick={onPaste} sx={{display: 'block', margin: '0px auto'}}>
        <ContentPasteGoIcon sx={{color: '#666', display: 'block', margin: '0px auto'}} />
      </IconButton>
      <IconButton aria-label="actions" onClick={onClear} sx={{display: 'block', margin: '0px auto'}}>
        <DeleteIcon sx={{color: '#666', display: 'block', margin: '0px auto'}} />
      </IconButton>
    </div>
  </div>
);

export default TextInput;
