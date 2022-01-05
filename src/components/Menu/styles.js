import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: '0',
  width: '100%',
  height: '50px',
  background: '#fff',
  zIndex: '2',
  boxShadow: '1px 1px 10px #00000017',
  padding: '0px 8px',
  overflow: 'hidden'
});
export const MenuContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '60px 0px',
  position: 'fixed',
  top: '0',
  width: '50px',
  height: '100%',
  background: '#fff',
  boxShadow: '1px 1px 10px #00000017'
});