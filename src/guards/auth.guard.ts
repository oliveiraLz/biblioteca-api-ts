import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../modules/user/user.service";
import { AuthService } from "../modules/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
      request.tokenPayLoad = data;

      request.user = await this.userService.show(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
