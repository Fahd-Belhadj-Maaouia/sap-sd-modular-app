import React from 'react'
import {  ShellBar as ShellBarUI5 } from '@ui5/webcomponents-react/ShellBar';
import {  Button } from '@ui5/webcomponents-react/Button';
import {  ShellBarBranding } from '@ui5/webcomponents-react/ShellBarBranding';
import {  ShellBarItem } from '@ui5/webcomponents-react/ShellBarItem';
import {  ListItemStandard } from '@ui5/webcomponents-react/ListItemStandard';
import {  ListItemCustom } from '@ui5/webcomponents-react/ListItemCustom';
import { Popover } from '@ui5/webcomponents-react/Popover';
import { List } from '@ui5/webcomponents-react/List';
import {  ListItemGroup } from '@ui5/webcomponents-react/ListItemGroup';
import {  Avatar } from '@ui5/webcomponents-react/Avatar';
import '@ui5/webcomponents-icons/dist/menu2.js';
import { useState, useRef } from 'react';



const ShellBar = () => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const profileRef = useRef(null);

  const handleProfileClick = (event) => {
    profileRef.current = event.detail.targetRef;
    
    
    setIsPopoverOpen((prev) => !prev);
  };
    
  return (
    <>
    <ShellBarUI5
  branding={<ShellBarBranding href="https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-shellbar--docs" logo={<img alt="SAP Logo" src="https://ui5.github.io/webcomponents/images/sap-logo-svg.svg"/>} onClick={function pU(){}} target="_blank">Sales and Distribution</ShellBarBranding>}
  logo={<img alt="SAP Logo" src="https://ui5.github.io/webcomponents/images/sap-logo-svg.svg"/>}
  notificationsCount="10"
  onContentItemVisibilityChange={function pU(){}}
  onLogoClick={function pU(){}}
  onMenuItemClick={function pU(){}}
  onNotificationsClick={function pU(){}}
  onProductSwitchClick={function pU(){}}
  onProfileClick={handleProfileClick}
  onSearchButtonClick={function pU(){}}
  primaryTitle="Primary Title"
  profile={<Avatar
  fallbackIcon="employee"
  onClick={function pU(){}}
>
  <img
    alt="Person"
    src="https://ui5.github.io/webcomponents/images/avatars/woman_avatar_1.png"
  />
</Avatar>}
  showNotifications
  startButton={<Button accessibleName="Menu" icon="menu2" tooltip="Menu"/>}
>
  <ShellBarItem
    icon="sys-help"
    text="Help"
  />
  
</ShellBarUI5>
<Popover 
  open={isPopoverOpen}
  onClose={() => setIsPopoverOpen(false)} // Reset state when closed
  opener={profileRef.current}
>
  <List>
    <ListItemStandard>Settings</ListItemStandard>
    <ListItemStandard>Log Out</ListItemStandard>
  </List>
</Popover>
</>
  )
  
}

export default ShellBar