import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/event/$eventId')({
  component: EventDetails,
})

export default function EventDetails() {
  const { eventId } = Route.useParams()
  return (
    <div>hey! {eventId}</div>
  )
} 
