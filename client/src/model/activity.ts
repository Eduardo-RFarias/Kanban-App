export interface Activity {
  id: number;
  type: "Todo" | "Doing" | "Done";
  title: string;
  description: string;
  user: string;
  date: string;
}

export interface ActivityCreate {
  type: "Todo" | "Doing" | "Done";
  title: string;
  description: string;
  user: string;
  date: Date;
}
