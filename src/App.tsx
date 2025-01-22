import {useCallback} from 'react';
import Description from './component/Description';
import TextInput from './component/TextInput';
import DishOrderInput from './component/DishOrderInput';
import Grid from './component/Grid';
import {useLocalStorageState} from './component/UseLocalStorageState';
import {IResult} from './types';
import ResultInitialState from './db/ResultInitialState.json';

function App() {
  const [result, setResult] = useLocalStorageState<IResult[]>('result', ResultInitialState);
  const memoizedSetResult = useCallback((newResult: IResult[]) => {
    setResult(newResult);
  }, []);

  const [isMaximumMode, setIsMaximumMode] = useLocalStorageState<boolean>('IsMaximumMode', false);

  return (
    <div className="App">
      <header className="text-xl flex items-center bg-[#25d76b] border-b-2 border-[#0d974f] shadow-md m-0 px-3">
        <h1 className="font-bold m-0 text-white">
          食材管理ツール <small>for ポケモンスリープ</small>
        </h1>
        <Description />
      </header>
      <div className="responsiveFlex">
        <div className="mx-auto">
          <TextInput result={result} setResult={memoizedSetResult} />
          <DishOrderInput result={result} setResult={setResult} isMaximumMode={isMaximumMode} />
        </div>
        <Grid result={result} isMaximumMode={isMaximumMode} setIsMaximumMode={setIsMaximumMode} />
      </div>
    </div>
  );
}

export default App;
