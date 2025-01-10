// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import AccountSettings from '@/components/views/AccountSettings'

const AccountTab = dynamic(() => import('@/components/views/account-settings/account'))
const SettingsTab = dynamic(() => import('@/components/views/account-settings/settings'))
const NotificationsTab = dynamic(() => import('@/components/views/account-settings/notifications'))
const ConnectionsTab = dynamic(() => import('@/components/views/account-settings/connections'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  account: <AccountTab />,
  settings: <SettingsTab />,
  notifications: <ConnectionsTab />,
  connections: <NotificationsTab />
})

const AccountSettingsPage = () => {
  return (
    <>
        <AccountSettings tabContentList={tabContentList()} />
    </>
  );
  
}

export default AccountSettingsPage
