import {Select, MenuItem, TextField, Button, DialogTitle, Switch, SwitchProps, Tabs, Tab} from '@mui/material';
import {styled} from '@mui/material/styles';
import {createTheme} from '@mui/material/styles';

// TextInput.tsx
export const StyledTextInputField = styled(TextField)({
  width: '80%',
  display: 'block',
  margin: '4px auto',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, .1)',
    backgroundColor: 'var(--input-color)',
    color: 'var(--text-color)',
    padding: '8px 10px',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'normal',
    // eslint-disable-next-line
    fontFamily: "'M PLUS 1p'",
    '& fieldset': {
      borderColor: '#25d76b'
    },
    '&:hover fieldset': {
      borderColor: '#25d76b'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#25d76b'
    }
  }
});

// DishSelect.tsx
export const DishOrderInputTheme = createTheme({
  typography: {
    // eslint-disable-next-line
    fontFamily: "'M PLUS 1p'"
  },
  palette: {
    text: {
      primary: '#333'
    }
  }
});
export const StyledSelect = styled(Select)(() => ({
  backgroundColor: 'var(--input-color)',
  color: 'var(--text-color)',
  height: '72px',
  width: '295px',
  padding: '0px 0px 0px 0px',
  margin: '0px 0px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, .1)',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #25d76b' // カスタムスタイルを適用
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #25d76b' // hover時も変化しない
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #25d76b' // フォーカス時も変化しない
  }
}));
interface StyledMenuItemProps {
  isDark: boolean;
}
export const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>(({isDark}) => ({
  backgroundColor: 'var(--input-color)',
  color: 'var(--text-color)',
  transition: 'none',
  display: 'flex',
  flexDirection: 'column', // 内容を縦方向に並べる
  alignItems: 'flex-start', // 左寄せ
  padding: '6px 16px', // MenuItemの余白調整
  whiteSpace: 'normal', // テキストが改行されるように
  '&.Mui-selected': {
    borderColor: '#25d76b',
    '&:hover': {
      backgroundColor: 'hsl(143, 70%, 95%)', // 選択状態かつホバー　'#D3F7E1'
      color: 'var(--text-color)'
    }
  },
  '&.Mui-selected:not(:hover)': {
    backgroundColor: 'hsl(143, 70%, 98%)', // 選択中かつホバーしていない
    color: 'var(--text-color)'
  },
  '&:hover': {
    backgroundColor: 'hsl(143, 70%, 95%)' // 選択していないかつホバー
  },

  ...(isDark && {
    '&:hover': {
      backgroundColor: '#1f252d' // ダークモードでホバー時の色
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: '#1f252d' // ダークモードで選択中かつホバー時
      }
    },
    '&.Mui-selected:not(:hover)': {
      backgroundColor: '#2a313c' // ダークモードで選択中、ホバーなし
    }
  })
}));

// DishOrderInput.tsx
export const StyledTabs = styled(Tabs)(({selectedcolor}: {selectedcolor: string}) => ({
  minHeight: '36px',
  '& .MuiTabs-indicator': {
    backgroundColor: selectedcolor // 選択中の下のバーの色を変更
  }
}));
export const StyledTab = styled(Tab)<{selectedcolor: string}>(({selectedcolor}) => ({
  minHeight: '36px',
  padding: '6px 6px',
  flex: 1,
  fontSize: '12px',
  color: 'var(--text-color)',
  '&.Mui-selected': {
    color: selectedcolor // 選択中の文字色を変更
  }
}));

// Description.tsx
export const DescriptionTheme = createTheme({
  typography: {
    fontFamily:
      // eslint-disable-next-line
      "'M PLUS 1p','Noto Sans JP', 'Helvetica Neue', 'Helvetica', 'Hiragino Sans', 'Arial', 'Yu Gothic', 'Meiryo', sans-serif",
    fontSize: 14
  }
});
export const StyledDialogTitle = styled(DialogTitle)({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333'
});
export const StyledButton = styled(Button)({
  color: '#333',
  fontWeight: 'bold',
  borderRadius: '9999px',
  fontSize: '16px',
  paddingTop: '6px',
  paddingBottom: '6px',
  display: 'flex',
  margin: '5px auto',
  width: '128px',
  border: '1px solid #999',
  boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, .1)',
  '&:hover': {
    backgroundColor: 'inherit'
  }
});

// Switch.tsx
export const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#5cd68b',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45'
        })
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600]
      })
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3
      })
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#b9c0c6',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D'
    })
  }
}));
