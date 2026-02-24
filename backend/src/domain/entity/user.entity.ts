export interface User {
  readonly id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  apiKey: string | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
}

export interface UserCreate {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  apiKey: string | null;
}

export interface UserUpdate {
  firstName: string;
  lastName: string | null;
  companyName: string;
  apiKey: string | null;
}
