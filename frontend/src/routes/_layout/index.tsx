import { createFileRoute, Link } from '@tanstack/react-router'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AttachedMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';
import { TicketEvent } from '../../queries/quicknode/functions/types';
import { useGetAllEvents } from '../../queries/quicknode/functions/queries';
import { resultFunctionSelector } from '../../queries/quicknode/functions/selectors';

export const Route = createFileRoute('/_layout/')({
  component: Home,
})

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'row',
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

const EventCard = ({ event }: { event: TicketEvent }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  const startDate = new Date(event.startDate * 1000)
  const startDateReadable = startDate.toLocaleString('en-US', dateOptions)

  const endDate = new Date(event.endDate * 1000)
  const endDateReadable = endDate.toLocaleString('en-US', dateOptions)

  const totalTickets = event.ticketTypes.reduce((total, ticket) => total + ticket.quantity, 0)

  const [lowestPrice, highestPrice] = event.ticketTypes.reduce(
    ([min, max], ticket) => [
        Math.min(min, ticket.price),
        Math.max(max, ticket.price)
    ],
    [Infinity, -Infinity] // Initial values for min and max
)

  return (
    <Grid size={{ xs: 12, md: 6 }} key={event.id}>
      <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
        <SyledCard
          variant="outlined"
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={event.imageUrl}
            sx={{
              aspectRatio: '16 / 9',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <SyledCardContent>
            <Box alignSelf="flex-start">
              <Typography gutterBottom variant="caption" component="div">
                {startDateReadable} - {endDateReadable}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {event.name}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {event.location}
              </StyledTypography>
            </Box>
            <Box alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography gutterBottom variant="caption" fontSize="small" display="flex" justifyContent="flex-end" alignItems="center">{totalTickets} <LocalActivityIcon fontSize='small' /></Typography>
              <Typography gutterBottom variant="caption" fontSize="small" display="flex" justifyContent="flex-end" alignItems="center">{lowestPrice} - {highestPrice} <AttachedMoneyIcon fontSize='small' /></Typography>
            </Box>
          </SyledCardContent>
        </SyledCard>
      </Link>
    </Grid>
  )
}


export function Search({ value, setValue }: { value: string, setValue: (val: string) => void}) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function Home() {
  const [searchString, setSearchString] = useState('')
  const allEvents = useGetAllEvents('', {
    select: (res) => {
      const resObj = resultFunctionSelector(res)

      if (!searchString || searchString.length < 4) {
        return resObj
      }

      const events = resObj.events.filter(event => {
        const srch = searchString.toLowerCase()
        return event.name.toLowerCase().includes(srch) || event.location.toLowerCase().includes(srch)
      })

      return { events }
    }
  })

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search value={searchString} setValue={setSearchString} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All" />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search value={searchString} setValue={setSearchString} />
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {!allEvents.data?.events.length && (
          <Typography>No Events Found</Typography>
        )}
        {allEvents.data?.events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </Grid>
    </Box>
  );
}

