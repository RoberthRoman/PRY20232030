export type ApiResponse<T> = {
  code: number;
  status: number;
  message: string;
  body: T;
};

export type GetAllRequestBody<T> = {
  quantity: number;
  data: T[];
};
