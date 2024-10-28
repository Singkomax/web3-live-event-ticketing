import { UseQueryOptions } from "react-query";
import { qnFuncQueryKeys } from "./queries";

type Execution<T> = {
  duration: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: any[];
  size: number;
  status_code: number;
  result: T;
  memory: number;
}

export type QNFuncResponse<T> = {
  id: string;
    created_at: string;
    updated_at: string;
    action_id: string;
    dataset: string;
    network: string;
    block_number: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user_data: Record<string, any>;
    execution: Execution<T>;
    billable: boolean;
    activation_source: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    custom_payload: any | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quickstream_payload: any | null;
    stream_id: string;
}

type TicketType = {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type TicketEvent = {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  location: string;
  imageUrl: string;
  organizerAddress: string;
  contractAddress: string;
  ticketTypes: TicketType[];
}

export type AllEventsQnFuncResponse = QNFuncResponse<{ events: TicketEvent[] }>

export type GetAllEventsOptions<T> = Omit<
  UseQueryOptions<
  AllEventsQnFuncResponse,
    unknown,
    T,
    ReturnType<typeof qnFuncQueryKeys.getAllEvents>
  >,
  'queryKey' | 'queryFn'
>