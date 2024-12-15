import {Autocomplete, TextField, Paper, Button, DialogTitle, Switch, SwitchProps, Tabs, Tab} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {styled} from '@mui/material/styles';
import {iDishData} from '../types';
import {createTheme} from '@mui/material/styles';

// TextInput.tsx

export const StyledTextInputField = styled(TextField)({
  width: '80%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'white',
    padding: '8px 10px',
    margin: '16px auto',
    width: '100%',
    fontSize: '14px',
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

export const StyledAutocomplete = styled(Autocomplete<iDishData>)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    height: '36px',
    width: '295px',
    padding: '0px 0px 0px 10px',
    margin: '0px 0px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, .1)',
    '& .MuiInputBase-input': {
      padding: '0px' // 内側のpaddingを調整
    },
    '& fieldset': {
      borderColor: '#25d76b'
    },
    '&:hover fieldset': {
      borderColor: '#25d76b'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#25d76b',
      borderWeight: '1px'
    }
  },
  '& + .MuiAutocomplete-popper': {
    '& .MuiAutocomplete-option': {
      backgroundColor: 'white' // 通常の背景色
    },
    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: 'hsl(143, 70%, 98%)' // 選択中の背景色
    },
    '& .MuiAutocomplete-option.Mui-focused': {
      backgroundColor: 'hsl(143, 70%, 95%)' // フォーカス時の背景色
    },
    "& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
      backgroundColor: 'hsl(143, 70%, 95%)' // フォーカス時の背景色
    }
  }
}));

export const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    fontWeight: 'normal'
  }
});

export const StyledPaper = styled(Paper)(() => ({
  // 元々は{theme}が引数
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: 'none',
  boxSizing: 'border-box',
  border: '1px solid #25d76b'
}));

export const StyledListbox = styled('ul')(() => ({
  // 元々は{theme}が引数
  fontSize: '13px',
  padding: 0
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
