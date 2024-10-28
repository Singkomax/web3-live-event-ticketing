import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Avatar, Divider, Drawer, IconButton, MenuItem, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUserProfile } from '../queries/auth0';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const userProfile = useGetUserProfile(user?.sub ?? '', {
    enabled: !!user?.sub
  })

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography color="primary" variant="h5" mr={2}>
                Ticket World
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              
            </Box>
          </Box>
          <Box
            sx={{
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!isAuthenticated ? (
              <Button color="primary" variant="contained" size="small" onClick={() => loginWithRedirect()}>
                Sign in
              </Button>
            ): (
              <>
                 <Box sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1,
                  alignItems: 'center',
                }}>
                  <Button sx={{ marginRight: 2 }}variant="text" color="info" size="small">
                    My Tickets
                  </Button>
                  <Button sx={{ marginRight: 2 }} color="primary" variant="contained" size="small" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                  </Button>
                  <Avatar onClick={() => alert(1)} style={{ cursor: 'pointer' }} alt={userProfile.data?.name} src={userProfile.data?.picture}>
                    {userProfile.data?.name?.charAt(0)}
                  </Avatar>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                  <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                      sx: {
                        top: 'var(--template-frame-height, 0px)',
                      },
                    }}
                  >
                    <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <IconButton onClick={toggleDrawer(false)}>
                          <CloseRoundedIcon />
                        </IconButton>
                      </Box>
                      <MenuItem>My Tickets</MenuItem>
                      <Divider sx={{ my: 3 }} />
                      <MenuItem>
                        <Button color="primary" variant="contained" fullWidth onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                          Logout
                        </Button>
                      </MenuItem>
                    </Box>
                  </Drawer>
                </Box>
              </>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
