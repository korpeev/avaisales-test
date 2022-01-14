export type State<T> = {
  isLoading: boolean;
  tickets: T[];
  error: Error | null;
};
export type Segment = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};
export type Ticket = {
  id: string;
  price: number;
  carrier: string;
  segments: Segment[];
};

export type ListButtons = {
  text: string;
  id: string;
  checked?: boolean;
};

export type MappingBySort = {
  [key: string]: Ticket[];
};
