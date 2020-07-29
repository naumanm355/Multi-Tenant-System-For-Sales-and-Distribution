import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomizedMenus from './Menus'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
grow: {
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.up('sm')]: {
    display: 'none',
    },
},
title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    },
},
inputRoot: {
    color: 'inherit',
},

sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'flex',
    },
},

}));

function DrawerAppbar(props) {
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
}

function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
}

function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
}

const menuId = 'primary-search-account-menu';
  
const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
    >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
);


return (
    <div>
	
    <AppBar position="fixed"
    className={props.appBar}>
        <Toolbar //className={props.menuButton}
        >
        
        
        <IconButton
            edge="start"
            className={props.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerToggle}
        >
            <MenuIcon />
        </IconButton>
        <Typography //className={classes.title} 
        variant="h6" noWrap>
            Sales&Distribution
        </Typography>
      
	
        <CustomizedMenus classTitle={classes.title}/>
       
    
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          
            <IconButton aria-label="Show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
            </IconButton>
            <IconButton
            edge="end"
            aria-label="Account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
        </div>
     
        </Toolbar>
    </AppBar>
     
    {renderMenu}
    </div>
);
}
export default withRouter(DrawerAppbar)