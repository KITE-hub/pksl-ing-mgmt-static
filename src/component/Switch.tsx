import React, {useState} from 'react';
import {StyledSwitch} from './MUIStyledComponents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {IconButton, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {StyledButton, useThemeConfig} from './MUIStyledComponents';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function Switch({
  checked,
  onChange
}: {
  checked: boolean;
  // eslint-disable-next-line
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isSwitchInfoOpen, setIsSwitchInfoOpen] = useState<boolean>(false);
  const switchInfoClick = () => {
    setIsSwitchInfoOpen(true);
  };
  const onSwitchInfoClose = () => {
    setIsSwitchInfoOpen(false);
  };

  const theme = useThemeConfig;

  return (
    <div className="flex items-center ml-auto my-[2px]">
      <span className="mx-4 text-sm">合計モード</span>
      <StyledSwitch checked={checked} onChange={onChange} />
      <span className="ml-4 mx-2 text-sm">最大値モード</span>
      <IconButton onClick={switchInfoClick}>
        <InfoOutlinedIcon sx={{color: 'var(--button-color)'}} />
      </IconButton>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dialog
          open={isSwitchInfoOpen}
          onClose={onSwitchInfoClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
          sx={{'& .MuiPaper-root': {backgroundColor: 'var(--input-color)'}}}
        >
          <DialogTitle sx={{color: 'var(--title-color)', fontSize: '20px', fontWeight: 'bold'}}>
            合計モードと最大値モード
          </DialogTitle>
          <DialogContent dividers sx={{borderColor: 'var(--devide-color)'}}>
            <div style={{color: 'var(--text-color)'}}>
              <p>これらのモードは、食材数 (目標) の計算方法を変更するためのものです。</p>
              <br />
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">合計モード</h3>
              </div>
              <hr className="mt-1 mb-2" style={{borderColor: 'var(--devide-color)'}} />
              <div>
                {'　'}
                合計モードは、各食材でカレー・シチュー、サラダ、デザート・ドリンクの合計食材数の合計を食材数 (目標)
                に表示します。
                <br />
                {'　'}
                例えば、ある食材名において、カレーとシチューで使用された合計食材数が100、サラダで使用された合計食材数が250、デザートで使用された合計食材数が300の場合、その食材名の食材数
                (目標) は<strong>650</strong>と表示されます。
              </div>
              <br />
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">最大値モード</h3>
              </div>
              <hr className="mt-1 mb-2" style={{borderColor: 'var(--devide-color)'}} />
              <div>
                {'　'}
                最大値モードは、各食材でカレー・シチュー、サラダ、デザート・ドリンクの内、最も合計食材数が多い料理カテゴリーの合計食材数を食材数
                (目標) に表示します。
                <br />
                {'　'}
                例えば、ある食材名において、カレーとシチューで使用された合計食材数が100、サラダで使用された合計食材数が250、デザートで使用された合計食材数が300の場合、その食材名の食材数
                (目標) は<strong>300</strong>と表示されます。
                <br />
                {'　'}
                週初めの料理を作る際に、フィールドいどうチケットを使用せず、料理カテゴリーに左右されない立ち回りを目指す場面で役立ちます。
              </div>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onSwitchInfoClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default Switch;
