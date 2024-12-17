import React, {useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Divider,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MoreIcon from '@mui/icons-material/MoreVert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {DescriptionTheme, StyledDialogTitle, StyledButton} from './MUIStyledComponents';

function Description() {
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<HTMLElement | null>(null);
  const simulatorClick = () => {
    setMoreMenuAnchor(null);
    window.location.href = 'https://kite-hub.github.io/pksl-simulator/';
  };
  const ingMgmtClick = () => {
    setMoreMenuAnchor(null);
  };
  const moreButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };
  const onMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };
  const isMoreMenuOpen = Boolean(moreMenuAnchor);

  const [isHowToDialogOpen, setIsHowToDialogOpen] = useState<boolean>(false);
  const howToMenuClick = () => {
    setIsHowToDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onHowToDialogClose = () => {
    setIsHowToDialogOpen(false);
  };

  const [isCautionDialogOpen, setIsCautionDialogOpen] = useState<boolean>(false);
  const cautionMenuClick = () => {
    setIsCautionDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onCautionDialogClose = () => {
    setIsCautionDialogOpen(false);
  };

  const [isReferenceDialogOpen, setIsReferenceDialogOpen] = useState(false);
  const referenceMenuClick = () => {
    setIsReferenceDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onReferenceDialogClose = () => {
    setIsReferenceDialogOpen(false);
  };

  const [isDevRequestDialogOpen, setIsDevRequestDialogOpen] = useState(false);
  const devRequestMenuClick = () => {
    setIsDevRequestDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onDevRequestDialogClose = () => {
    setIsDevRequestDialogOpen(false);
  };

  return (
    <div className="Description ml-auto">
      <ThemeProvider theme={DescriptionTheme}>
        <CssBaseline />
        <IconButton size="small" aria-label="actions" sx={{color: 'white'}} onClick={moreButtonClick}>
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={moreMenuAnchor}
          open={isMoreMenuOpen}
          onClose={onMoreMenuClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
          <MenuItem onClick={simulatorClick}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            寝顔リサーチシミュレーター
          </MenuItem>
          <MenuItem onClick={ingMgmtClick}>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            食材管理ツール
          </MenuItem>
          <Divider />
          <MenuItem onClick={howToMenuClick}>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            使い方
          </MenuItem>
          <MenuItem onClick={cautionMenuClick}>
            <ListItemIcon>
              <WarningAmberIcon />
            </ListItemIcon>
            注意点
          </MenuItem>
          <MenuItem onClick={referenceMenuClick}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            参考元
          </MenuItem>
          <MenuItem onClick={devRequestMenuClick}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            開発者・要望について
          </MenuItem>
        </Menu>
        <Dialog
          open={isHowToDialogOpen}
          onClose={onHowToDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>使い方</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">基本的な使い方</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <div>
                {'　'}
                このツールは、食材バッグのスクリーンショットを画像として読み込み、目的のレシピを入力することで、食材数を管理します。
                iPhone XS以降のユーザーが対象です。
              </div>
              <br />
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">詳細な使い方</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <ol>
                <li>XS以降のiPhoneを入手し、iOS 15以降をインストールする。</li>
                <li>
                  <Link
                    href="https://www.icloud.com/shortcuts/e1eb862652ee4a3c9650622fc587eb64"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    このURL
                  </Link>
                  からショートカットを入手し、背面タップやロック画面に配置する。
                </li>
                <li>
                  ポケモンスリープを開き、食材バッグへ移動した画面を表示させる。このときに、注意点に書かれた要件を満たすようにする。
                </li>
                <li>ショートカットを実行し、テキスト入力へペーストする。食材数 (現在) へ反映される。</li>
                <li>メニュー入力で、作りたい料理を入力する。</li>
                <li>食材一覧表に、料理に必要な食材数と差分が表示される。</li>
              </ol>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onHowToDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isCautionDialogOpen}
          onClose={onCautionDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>注意点</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">テキスト入力について</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <div>
                {'　'}
                このツールでは、iPhoneの画像のライブテキスト機能を用いて食材数（現在）を更新します。ただし、文字が正しく読み取れない場合や、画像内に対応する食材名や食材数が存在しない場合、
                <strong>食材数 (現在) は一部更新されない</strong>
                点にご注意ください。以下に例を示します。
              </div>
              <br />
              <img
                src={`${process.env.PUBLIC_URL}/DescriptionImages/OK1.jpg`}
                alt="OK1"
                width={750}
                height={1294}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図1. 読み取り成功例 <small>(画像中の全ての食材が認識される)</small>
              </div>
              <br />
              <img
                src={`${process.env.PUBLIC_URL}/DescriptionImages/NG1.jpg`}
                alt="NG1"
                width={750}
                height={340}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図2. 読み取り失敗例1 <small>(最下段の食材名が途切れているため認識されない)</small>
              </div>
              <br />
              <img
                src={`${process.env.PUBLIC_URL}/DescriptionImages/NG2.jpg`}
                alt="NG2"
                width={750}
                height={337}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図3. 読み取り失敗例2 <small>(最下段の食材数に対応する食材名が画像中に存在しないため認識されない)</small>
              </div>
              <br />
              <img
                src={`${process.env.PUBLIC_URL}/DescriptionImages/NG3.jpg`}
                alt="NG3"
                width={750}
                height={581}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図4. 読み取り失敗例3 <small>(最上段の食材数が不鮮明なため認識されない)</small>
              </div>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onCautionDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isReferenceDialogOpen}
          onClose={onReferenceDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>参考元</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <ul>
                <li>
                  <Link
                    href="https://pks.raenonx.cc/ja/meal"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    raenonX
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ny-an.github.io/gaogao-pksr/"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ポケスリ献立表 by がおがおぷーん
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://nitoyon.github.io/pokesleep-tool/iv/index.ja.html"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    個体値計算機 by nitoyon
                  </Link>
                </li>
              </ul>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onReferenceDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isDevRequestDialogOpen}
          onClose={onDevRequestDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>開発者・要望について</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <div>
                {'　'}
                このツールは、{' '}
                <Link href="https://x.com/mdk_pksldev" underline="hover" target="_blank" rel="noopener noreferrer">
                  擬き(もどき)
                </Link>{' '}
                が個人で開発した非公式のツールです。
                <br />
                {'　'}
                不具合報告や要望等は、X (twitter) の{' '}
                <Link href="https://x.com/mdk_pksldev" underline="hover" target="_blank" rel="noopener noreferrer">
                  @mdk_pksldev
                </Link>{' '}
                のDMまでお願いします (Googleフォームによる対応も検討中) 。
              </div>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onDevRequestDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default Description;
