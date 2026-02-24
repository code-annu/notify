import { Session } from "../../domain/entity/session.entity";

export default abstract class AuthResponse {
  static toSingle(
    session: Session,
    accessToken: string,
    message: string,
    code: number,
  ) {
    const user = session.user;
    return {
      status: "success",
      code,
      message,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
        },
        session: {
          id: session.id,
          refreshToken: session.token,
          expiresAt: session.expiresAt,
        },
        accessToken,
      },
    };
  }
}
