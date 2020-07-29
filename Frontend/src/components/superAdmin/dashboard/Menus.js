import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

 function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      	<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="end"
						onClick={handleClick}
					
					>
						<KeyboardArrowDownIcon />
					</IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          {/* <ListItemIcon>
            <SendIcon />
          </ListItemIcon> */}
          <ListItemText primary="My Account" onClick={()=>props.history.push('/admin/snd/packages/showPackage')}></ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          {/* <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon> */}
          <ListItemText primary="Logout" onClick={()=>
            {window.location.pathname==='/admin/snd/dashboard'?props.history.push('/admin/sigin'):
            props.history.push('/')}}/>
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem> */}
      </StyledMenu>
    </div>
  );
}
export default withRouter(CustomizedMenus)