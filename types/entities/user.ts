type Status = "active" | "inactive" | "pending";

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  country?: string;
  city?: string;
  status: Status;
  created_at: string;
  updated_at: string;
};
