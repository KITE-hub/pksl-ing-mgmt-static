import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Description from './component/Description';
import TextInput from './component/TextInput';
import DishOrderInput from './component/DishOrderInput';
import Grid from './component/Grid';
import ResultInitialState from './db/ResultInitialState.json';
import { iResult } from './types';

function App() {
  const [result, setResult] = useState<iResult[]>(ResultInitialState);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedResult = localStorage.getItem('result');
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('result', JSON.stringify(result));
    }
  }, [result]);
  const memoizedSetResult = useCallback((newResult: iResult[]) => {
    setResult(newResult);
  }, []);

  const [isMaximumMode, setIsMaximumMode] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedIsMaximumMode = localStorage.getItem('isMaximumMode');
      if (storedIsMaximumMode) {
        setIsMaximumMode(JSON.parse(storedIsMaximumMode));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isMaximumMode', JSON.stringify(isMaximumMode));
    }
  }, [isMaximumMode]);

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
