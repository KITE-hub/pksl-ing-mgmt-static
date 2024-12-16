import {
  Autocomplete,
  Select,
  MenuItem,
  TextField,
  Paper,
  Button,
  DialogTitle,
  Switch,
  SwitchProps,
  Tabs,
  Tab
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {styled} from '@mui/material/styles';
import {iDishData} from '../types';
import {createTheme} from '@mui/material/styles';

// TextInput.tsx

export const StyledTextInputField = styled(TextField)({
  width: '80%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, .1)',
    backgroundColor: 'white',
    padding: '8px 10px',
    margin: '16px auto',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'normal',
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

export const StyledClearIcon = styled(ClearIcon)({
  width: '35px',
  height: '35px',
  marginLeft: '3%',
  cursor: 'pointer',
  borderRadius: '9999px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#E8EBEF'
  }
});

// DishSelect.tsx

export const DishOrderInputTheme = createTheme({
  typography: {
    fontFamily: "'M PLUS 1p'"
  },
  palette: {
    text: {
      primary: '#333'
    }
  }
});

export const StyledSelect = styled(Select)(() => ({
  backgroundColor: 'white',
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

export const StyledMenuItem = styled(MenuItem)(() => ({
  backgroundColor: 'white',
  transition: 'none',
  display: 'flex',
  flexDirection: 'column', // 内容を縦方向に並べる
  alignItems: 'flex-start', // 左寄せ
  padding: '8px 16px', // MenuItemの余白調整
  whiteSpace: 'normal', // テキストが改行されるように
  '&:hover': {
    backgroundColor: 'hsl(143, 70%, 95%)' // hover時の背景色
  },
  '&.Mui-selected': {
    backgroundColor: 'hsl(143, 70%, 98%)',
    transition: 'none'
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'hsl(143, 70%, 95%)',
    transition: 'none'
  }
}));

export const StyledNavigateNextIcon = styled(NavigateNextIcon)(() => ({
  borderRadius: '9999px',
  width: '35px',
  height: '35px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#E8EBEF'
  }
}));

export const StyledNavigateBeforeIcon = styled(NavigateBeforeIcon)(() => ({
  borderRadius: '9999px',
  width: '35px',
  height: '35px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#E8EBEF'
  }
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
  '&.Mui-selected': {
    color: selectedcolor // 選択中の文字色を変更
  }
}));

// Description.tsx

export const DescriptionTheme = createTheme({
  typography: {
    fontFamily:
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
        backgroundColor: '#51e188',
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
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D'
    })
  }
}));
