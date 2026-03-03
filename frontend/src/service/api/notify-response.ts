export interface NotifyResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

