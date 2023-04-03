import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
interface Props {
  state:string,
  labels:string[]
}
export default function PositionedMenu({state,labels}:Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{float:'left'}}
      >
        {state}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
      >
        {['Open','In Progress','Done'].map((data,index)=>{return <MenuItem key={index} style={{backgroundColor:data.toUpperCase()===state.toUpperCase()?"#000":"#FFF",color:data.toUpperCase()===state.toUpperCase()?"#FFF":"#000"}} onClick={handleClose}>{data}</MenuItem>})}
      </Menu>
    </div>
  );
}