export interface NotifySingleResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

export interface NotifyListResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T[];
}
