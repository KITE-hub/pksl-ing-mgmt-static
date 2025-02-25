import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {GridProps} from '../types';
import Switch from './Switch';
import {forwardRef} from 'react';

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({result, isMaximumMode, setIsMaximumMode, sortModel, isDark, onSortModelChange}, ref) => {
    const rows: GridRowsProp = result.map((item, index) => ({
      id: index,
      ...item
    }));
    const columns: GridColDef[] = [
      {
        field: 'ingEP',
        headerName: '食材名',
        headerClassName: 'header',
        flex: 145,
        minWidth: 145,
        renderCell: (params) => {
          const isTotalRow = params.row.id === 'total';
          return (
            <div className="flex items-center h-full">
              {isTotalRow ? (
                <span className="text-sm font-bold" style={{color: 'var(--text-color)'}}>
                  {params.row.ingName}
                </span>
              ) : (
                <div className="flex items-center h-full">
                  <img
                    src={`${process.env.PUBLIC_URL || ''}${params.row.ingImage}`}
                    alt=""
                    width={32}
                    height={32}
                    style={{
                      objectFit: 'cover',
                      marginLeft: '-5px',
                      borderRadius: '4px'
                    }}
                  />
                  <div className="space-y-0.5">
                    <div className="text-[12px] leading-none" style={{color: 'var(--text-color)'}}>
                      {params.row.ingName}
                    </div>
                    <div className="text-[11px] leading-none text-[#e69b19] font-bold">EP: {params.row.ingEP}</div>
                  </div>
                </div>
              )}
            </div>
          );
        },
        sortingOrder: ['desc', null]
      },
      {
        field: 'nowIngCount',
        renderHeader: () => (
          <div className="text-[13px]">
            食材数 <br />
            <span>(現在)</span>
          </div>
        ),
        headerClassName: 'header',
        flex: 100,
        minWidth: 100,
        renderCell: (params) => {
          const isTotalRow = params.row.id === 'total';
          return (
            <span style={{fontWeight: isTotalRow ? 'bold' : 'normal', color: 'var(--text-color)'}}>
              {params.row.nowIngCount}
            </span>
          );
        },
        sortingOrder: ['asc', null],
        sortComparator: (v1, v2, param1, param2) => {
          const isTotalRow1 = param1.id === 'total';
          const isTotalRow2 = param2.id === 'total';

          if (isTotalRow1 && !isTotalRow2) return 1; // 'total'行を一番下に
          if (!isTotalRow1 && isTotalRow2) return -1; // 'total'行を一番下に
          return v1 - v2; // 通常の数値ソート
        }
      },
      {
        field: 'diffIngCount',
        renderHeader: () => (
          <div className="text-[13px]">
            食材数 <br />
            <span>(目標, 差分)</span>
          </div>
        ),
        headerClassName: 'header',
        flex: 115,
        minWidth: 115,
        renderCell: (params) => {
          const isNegative = params.row.diffIngCount < 0;
          const isTotalRow = params.row.id === 'total';
          return (
            <div className="flex items-center h-full">
              <div className="space-y-[1px]">
                <div
                  className="text-[13px] leading-none"
                  style={{fontWeight: isTotalRow ? 'bold' : 'normal', color: 'var(--text-color)'}}
                >
                  {params.row.targetIngCount}
                </div>
                <div
                  className="text-[11px] leading-none"
                  style={{
                    color: isNegative ? '#e05252' : 'var(--text-color)',
                    fontWeight: isTotalRow || isNegative ? 'bold' : 'normal'
                  }}
                >
                  ({params.row.diffIngCount >= 0 ? `+${params.row.diffIngCount}` : params.row.diffIngCount})
                </div>
              </div>
            </div>
          );
        },
        sortingOrder: ['asc', null],
        sortComparator: (v1, v2, param1, param2) => {
          const isTotalRow1 = param1.id === 'total';
          const isTotalRow2 = param2.id === 'total';

          if (isTotalRow1 && !isTotalRow2) return 1; // 'total'行を一番下に
          if (!isTotalRow1 && isTotalRow2) return -1; // 'total'行を一番下に
          return v1 - v2; // 通常の数値ソート
        }
      }
    ];

    const totals = result.reduce(
      (acc, item) => {
        acc.nowIngCount += item.nowIngCount;
        acc.targetIngCount += item.targetIngCount;
        acc.diffIngCount += item.diffIngCount;
        return acc;
      },
      {nowIngCount: 0, targetIngCount: 0, diffIngCount: 0}
    );

    const rowsWithTotal = [
      ...rows,
      {
        id: 'total',
        ingName: '合計',
        ingImage: '',
        nowIngCount: totals.nowIngCount,
        targetIngCount: totals.targetIngCount,
        diffIngCount: totals.diffIngCount,
        isTotal: true
      }
    ];

    return (
      <div className="Grid mx-auto mt-4 mb-6 flex flex-col flex-grow-0">
        <div className="flex">
          <span className="bg-[#5dabfe] w-1.5 mr-1.5"></span>
          <h2 className="font-bold bg-[#5dabfe] px-2 w-full clipSlant" style={{color: 'var(--bg-color)'}}>
            食材一覧表
          </h2>
          {/* 食材一覧表の背景色はhsl(211, 99%, 68%) #5dabfe、元はhsl(211, 99%, 64%) #469ffe */}
        </div>
        <Switch checked={isMaximumMode} onChange={(event) => setIsMaximumMode(event.target.checked)} />
        <DataGrid
          ref={ref}
          rows={rowsWithTotal}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
          density="comfortable"
          rowHeight={24}
          columnHeaderHeight={32}
          initialState={{
            pagination: {paginationModel: {pageSize: 100}}
          }}
          disableColumnMenu={true}
          hideFooter={true}
          rowSelection={false}
          sx={{
            border: 'none',
            fontFamily:
              // eslint-disable-next-line
              "'M PLUS 1p','Roboto','Noto Sans JP', 'Helvetica Neue', 'Helvetica', 'Hiragino Sans', 'Arial', 'Yu Gothic', 'Meiryo', sans-serif",
            color: '#333',
            '& .header': {
              backgroundColor: 'var(--input-color)',
              color: 'var(--text-color)'
            },
            '& .MuiDataGrid-cell': {
              borderColor: isDark ? '#2d3239' : '#dde0e4' // セルの境界線の色
            }
          }}
        />
      </div>
    );
  }
);
Grid.displayName = 'Grid';
export default Grid;
