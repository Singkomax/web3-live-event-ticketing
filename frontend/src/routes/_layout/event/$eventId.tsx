import { createFileRoute } from '@tanstack/react-router'
import { useGetAllEvents } from '../../../queries/quicknode/functions/queries'
import { resultFunctionSelector } from '../../../queries/quicknode/functions/selectors'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button'
// import {  TicketType } from '../../../queries/quicknode/functions/types'
// import { useAuth0 } from '@auth0/auth0-react'
import { ButtonLink } from '../../../components/ButtonLink'

export const Route = createFileRoute('/_layout/event/$eventId')({
  component: EventDetails,
})

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 16,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


export default function EventDetails() {
  const { eventId } = Route.useParams()

  const event = useGetAllEvents('', {
    select: (res) => {
      const resObj = resultFunctionSelector(res)
      return resObj.events.find(event => event.id === eventId)
    }
  })

  if (!event.data) {
    return (
      <Typography>No Event Detail Found</Typography>
    )
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  const startDate = new Date(event.data?.startDate * 1000)
  const startDateReadable = startDate.toLocaleString('en-US', dateOptions)

  const endDate = new Date(event.data?.endDate * 1000)
  const endDateReadable = endDate.toLocaleString('en-US', dateOptions)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={event.data?.imageUrl}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {startDateReadable} - {endDateReadable}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {event.data.name}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {event.data.location}
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant='h5'>Buy Ticket</Typography>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {event.data.ticketTypes.map(ticketType => (
              <ListItem
                key={ticketType.name}
                secondaryAction={
                  <ButtonLink color="primary" variant="contained" size="small" to={`/event/${eventId}/buy`} search={{ ticketName: ticketType.name }}>Buy for ${ticketType.price}</ButtonLink>
                }
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  margin: '8px 0',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`${ticketType.name} - ${ticketType.price}`}
                    src={ticketType.imageUrl ?? event.data?.imageUrl}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${ticketType.name} - ${ticketType.quantity} Available`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
    
  )
} 
