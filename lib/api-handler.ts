import { logger } from "@/logger";
import { ApiResponse } from "./api-response";
import { errorMessage } from "@/constants/messages";
import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { auth } from "@/auth";
import { User } from "next-auth";


export const withApiHandler = (
  handler: (req: Request) => Promise<ApiResponse>
) => {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      logger.error("Error during API request:", error);
      return new ApiResponse({
        success: false,
        message: errorMessage.serverError,
        status: HttpStatus.SERVER_ERROR,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  };
};

export const withAuthorizedApiHandler = (
  handler: (req: Request, user: User ) => Promise<ApiResponse>
) => {
  return withApiHandler(async (req: Request) => {
    const session = await auth();
    const user = session?.user
    if (!user) {
      return new ApiResponse({
        success: false,
        message: errorMessage.unauthorizedAccess,
        status: HttpStatus.UNAUTHORIZED,
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
    return handler(req, user);
  });
};
