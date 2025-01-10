// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AccountProfile from './AccountProfile'

const Account = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountProfile />
      </Grid>
    </Grid>
  )
}

export default Account
