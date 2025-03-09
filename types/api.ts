/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { ZodIssue } from "zod";

export type ApiResponseType<T = any> = {
  success: boolean;
  statusCode: HttpStatusCode;
  status: HttpStatus;
  message: string
  data?: T;
  errors?: ZodIssue[];
};
