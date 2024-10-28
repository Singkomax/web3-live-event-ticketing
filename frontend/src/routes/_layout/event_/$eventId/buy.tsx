import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useGetAllEvents } from '../../../../queries/quicknode/functions/queries'
import { resultFunctionSelector } from '../../../../queries/quicknode/functions/selectors'
import { alpha, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, styled, TextField } from '@mui/material'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

type BuyTicketParams = {
  ticketName: string
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
}))

export const Route = createFileRoute('/_layout/event_/$eventId/buy')({
  component: BuyTicket,
  validateSearch: (buyTicketParams: Record<string, unknown>): BuyTicketParams => {
    // validate and parse the search params into a typed state
    return {
      ticketName: buyTicketParams.ticketName as string ?? ''
    }
  }
})

export default function BuyTicket() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { ticketName } = Route.useSearch()
  const { eventId } = Route.useParams()
  const [qty, setQty] = useState(1)
  const { isAuthenticated, user } = useAuth0()
  const [receivers, setReceivers] = useState([user?.email])

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

  const ticketType = event.data.ticketTypes.find((ticketType) => ticketType.name === ticketName)

  if (!ticketType) {
    return (
      <Typography>No Ticket Details Found</Typography>
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('You need to login first!')
      return
    }
    alert('send')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <StyledGrid container columns={12}>
        <Grid size={{ xs: 12, md: 8 }} padding={2} gap={2} display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">{event.data.name}</Typography>
            <Typography>{startDateReadable}</Typography>
          </Box>
          <Divider sx={{ borderColor: 'green' }} />
          <Stack onSubmit={onSubmit} component="form" sx={{ width: { xs: '25ch', md: '50ch' } }} spacing={2} autoComplete="off" alignSelf="center">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small" disabled={!isAuthenticated}>
              <InputLabel id="ticket-type-select">Ticket Type</InputLabel>
              <Select
                labelId="ticket-type-select-label"
                id="ticket-type-select"
                value={ticketType.name}
                label="Ticket Type"
                onChange={(e) => navigate({
                  search: { ticketName: e.target.value}
                })}
              >
                {event.data.ticketTypes.map((event) => (
                  <MenuItem key={`menu-item-${event.name}`} value={event.name}>{event.name}</MenuItem>
                ))}
              </Select>
              <Typography>${ticketType.price} per ticket</Typography>
            </FormControl>

            <TextField
              required
              id="outlined-required"
              label="Quantity"
              value={qty}
              onChange={(e) => {
                setQty(Number(e.target.value))
                setReceivers(Array.from({ length: Number(e.target.value) }).map((_, index) => {
                  return index === 0 ? user?.email : ''
                }))
              }}
              type="number"
              inputProps={{
                min: 1,
                max: 4,
              }}
              size="small"
              disabled={!isAuthenticated}
            />
            {receivers.length > 1 && receivers.map((receiver, index) => (
              <TextField
                key={`receiver-email-${index}`}
                id="outlined-required"
                label="Reciever"
                value={receiver}
                onChange={(e) => {
                  const newValues = [...receivers];
                  newValues[index] = e.target.value;
                  setReceivers(newValues);
                }}
                size="small"
                disabled={index === 0}
                type="email"
                helperText={index === 0 ? "You will receive the ticket if not specified" : ""}
              />
            ))}

            <Typography variant='h5'>Total: ${ticketType.price * qty}</Typography>

            <Button type="submit" color="primary" variant="contained" fullWidth>
              Buy Now
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} justifyContent="center" alignItems="center" display="flex" flexDirection="column" gap={2} borderLeft={1} borderColor="rgba(0, 0, 0, 0.12)" padding={2}>
          <Typography variant='h5'>Floor Plan</Typography>
          <img alt="Floor Plan" src={event.data.floorplanImageUrl} width="100%" height="100%" />
        </Grid>
      </StyledGrid>
    </Box>
  )
}