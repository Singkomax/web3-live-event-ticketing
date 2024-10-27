async function main(params: any) {
  const rawEvents = await qnLib.qnGetList('events');
  const events = rawEvents.map((event: any) => JSON.parse(event));

  return {
    events,
  };
}
