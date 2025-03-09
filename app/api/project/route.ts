import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { getProjectsByUser } from "@/db/services/product";
import { withAuthorizedApiHandler } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import { User } from "next-auth";

export const GET = withAuthorizedApiHandler( async (req: Request, user: User) => {
    const projects = await getProjectsByUser(user.id);

    return new ApiResponse({
      success: true,
      message: "list of projects that owned by user",
      status: HttpStatus.SUCCESS,
      statusCode: HttpStatusCode.OK,
      data: projects,
    });
  }
);
