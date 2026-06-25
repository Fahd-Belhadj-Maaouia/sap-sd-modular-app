import React from 'react'
import {  ShellBar as ShellBarUI5 } from '@ui5/webcomponents-react/ShellBar';
import {  Button } from '@ui5/webcomponents-react/Button';
import {  ShellBarBranding } from '@ui5/webcomponents-react/ShellBarBranding';
import {  ShellBarItem } from '@ui5/webcomponents-react/ShellBarItem';
import {  ListItemStandard } from '@ui5/webcomponents-react/ListItemStandard';
import {  ListItemCustom } from '@ui5/webcomponents-react/ListItemCustom';
import {  ListItemGroup } from '@ui5/webcomponents-react/ListItemGroup';
import {  Avatar } from '@ui5/webcomponents-react/Avatar';
import '@ui5/webcomponents-icons/dist/menu2.js';




const ShellBar = () => {
    
  return (
    <ShellBarUI5
  branding={<ShellBarBranding href="https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-shellbar--docs" logo={<img alt="SAP Logo" src="https://ui5.github.io/webcomponents/images/sap-logo-svg.svg"/>} onClick={function pU(){}} target="_blank">Sales and Distribution</ShellBarBranding>}
  logo={<img alt="SAP Logo" src="https://ui5.github.io/webcomponents/images/sap-logo-svg.svg"/>}
  notificationsCount="10"
  onContentItemVisibilityChange={function pU(){}}
  onLogoClick={function pU(){}}
  onMenuItemClick={function pU(){}}
  onNotificationsClick={function pU(){}}
  onProductSwitchClick={function pU(){}}
  onProfileClick={function pU(){}}
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
  )
}

export default ShellBar