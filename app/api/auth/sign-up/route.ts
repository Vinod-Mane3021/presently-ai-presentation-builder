import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { db } from "@/db/prisma-client";
import { withApiHandler } from "@/lib/api-handler";
import { ApiResponse, ValidationErrorApiResponse } from "@/lib/api-response";
import { hashPassword } from "@/lib/password";
import { signUpSchema } from "@/schemas/user";

export const POST = withApiHandler(async (req: Request) => {
  const jsonData = await req.json();

  const validated = signUpSchema.safeParse(jsonData);

  if (!validated.success) {
    return new ValidationErrorApiResponse();
  }

  const { username, email, password } = validated.data;

  const hashedPwd = await hashPassword(password);

  // check for existing user
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  console.log({existingUser})

  if (existingUser) {
    return new ApiResponse({
      success: false,
      message: "An account with this email or username is already exists. Please sign-in or use a different email or username.",
      status: HttpStatus.USER_ALREADY_EXIST,
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  }

  // Create the new user
  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPwd,
      provider: "credentials"
    },
  });

  if (!user) {
    return new ApiResponse({
      success: false,
      message: "We encountered a problem while creating your account. Please try again later.",
      status: HttpStatus.USER_NOT_CREATED,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  return new ApiResponse({
    success: true,
    message: "Account created successfully! You can now sign-in.",
    status: HttpStatus.USER_CREATED,
    statusCode: HttpStatusCode.CREATED,
  });
});
