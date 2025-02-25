import {useState, useRef, useCallback} from 'react';
import DarkModeButton from './component/DarkModeButton';
import Description from './component/Description';
import TextInput from './component/TextInput';
import DishOrderInput from './component/DishOrderInput';
import Grid from './component/Grid';
import {useLocalStorageState} from './component/UseLocalStorageState';
import {IResult} from './types';
import ResultInitialState from './db/ResultInitialState.json';
import {GridSortModel} from '@mui/x-data-grid';

function App() {
  const [isDark, setIsDark] = useLocalStorageState<boolean>('IsDark', false);

  const [result, setResult] = useLocalStorageState<IResult[]>('result', ResultInitialState);
  const memoizedSetResult = useCallback((newResult: IResult[]) => {
    setResult(newResult);
  }, []);
  const targetRef = useRef<HTMLDivElement>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const handlePaste = async (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const lines = clipboardText.split(/\n|\s+/);
      setter(lines);
      setTimeout(() => {
        targetRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
        setSortModel([{field: 'diffIngCount', sort: 'asc'}]);
      }, 100);
    } catch (error) {}
  };
  const [isMaximumMode, setIsMaximumMode] = useLocalStorageState<boolean>('IsMaximumMode', false);

  return (
    <div className="App">
      <header className="text-xl flex items-center bg-[#25d76b] border-b-2 border-[#0d974f] shadow-md m-0 px-3">
        <h1 className="font-bold m-0" style={{color: 'var(--bg-color)'}}>
          食材管理ツール <small className="hide-on-small">for ポケモンスリープ</small>
        </h1>
        <div className="flex ml-auto">
          <DarkModeButton isDark={isDark} setIsDark={setIsDark} />
          <Description />
        </div>
      </header>
      <div className="responsiveFlex">
        <div className="mx-auto">
          <TextInput result={result} setResult={memoizedSetResult} handlePaste={handlePaste} />
          <DishOrderInput result={result} setResult={setResult} isMaximumMode={isMaximumMode} isDark={isDark} />
        </div>
        <Grid
          ref={targetRef}
          result={result}
          isMaximumMode={isMaximumMode}
          setIsMaximumMode={setIsMaximumMode}
          sortModel={sortModel}
          isDark={isDark}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
}

export default App;
