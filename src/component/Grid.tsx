import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {GridProps} from '../types';
import Switch from './Switch';

function Grid({result, setIsMaximumMode, isMaximumMode}: GridProps) {
  const rows: GridRowsProp = result.map((item, index) => ({
    id: index,
    ...item
  }));
  const columns: GridColDef[] = [
    {
      field: 'nameWithImage',
      headerName: '食材名',
      flex: 140,
      minWidth: 100,
      renderCell: (params) => {
        const isTotalRow = params.row.id === 'total';
        return (
          <div className="flex items-center gap-[3px]">
            {isTotalRow ? (
              <div />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL || ''}${params.row.ingImage}`}
                alt=""
                width={30}
                height={30}
                style={{
                  objectFit: 'cover',
                  marginLeft: '-5px',
                  borderRadius: '4px'
                }}
              />
            )}
            <span
              style={{
                fontSize: isTotalRow ? '14px' : '10px',
                fontWeight: isTotalRow ? 'bold' : 'normal'
              }}
            >
              {params.row.ingName}
            </span>
          </div>
        );
      },
      sortingOrder: ['asc', null]
    },
    {
      field: 'nowIngCount',
      renderHeader: () => (
        <div className="text-center">
          食材数 <br />
          <span className="text-[13px]">(現在)</span>
        </div>
      ),
      flex: 95,
      minWidth: 95,
      renderCell: (params) => {
        const isTotalRow = params.row.id === 'total';
        return <span style={{fontWeight: isTotalRow ? 'bold' : 'normal'}}>{params.row.nowIngCount}</span>;
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
      field: 'targetIngCount',
      renderHeader: () => (
        <div style={{textAlign: 'center'}}>
          食材数 <br />
          <span style={{fontSize: '13px'}}>(目標)</span>
        </div>
      ),
      flex: 95,
      minWidth: 95,
      renderCell: (params) => {
        const isTotalRow = params.row.id === 'total';
        return <span style={{fontWeight: isTotalRow ? 'bold' : 'normal'}}>{params.row.targetIngCount}</span>;
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
        <div className="text-center">
          食材数 <br />
          <span className="text-[13px]">(差分)</span>
        </div>
      ),
      flex: 95,
      minWidth: 95,
      renderCell: (params) => {
        const isNegative = params.value < 0;
        const isTotalRow = params.row.id === 'total';
        return (
          <span
            style={{
              color: isNegative ? 'red' : '#333',
              fontWeight: isTotalRow ? 'bold' : 'normal'
            }}
          >
            {params.value > 0 ? `+${params.value}` : params.value}
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
        <h2 className="font-bold text-white bg-[#5dabfe] px-2 w-full clipSlant">食材一覧表</h2>
        {/* 食材一覧表の背景色はhsl(211, 99%, 68%) #5dabfe、元はhsl(211, 99%, 64%) #469ffe */}
      </div>
      <Switch checked={isMaximumMode} onChange={(event) => setIsMaximumMode(event.target.checked)} />
      <DataGrid
        rows={rowsWithTotal}
        columns={columns}
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
          '& .small-header': {
            fontSize: '0.8rem'
          }
        }}
      />
    </div>
  );
}

export default Grid;
