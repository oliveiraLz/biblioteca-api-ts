import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UsersService } from "../user/user.service";
import { RoleService } from "../role/role.service";
import { UserEntity } from "../user/entities/user.entity";
import { ListGroupJwtDto } from "../group/dto/list-group-jwt.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly roleService: RoleService,
    @Inject("USERS_REPOSITORY")
    private usersRepository: Repository<UserEntity>
  ) {}

  async createToken(user: UserEntity) {
    const groups = user.groups?.map((g) => new ListGroupJwtDto(g.id, g.name, g.role, g.admin));

    let roles = [];
    if (groups.some((e) => e.admin)) {
      const listRoles = await this.roleService.findAll();

      roles = listRoles.map((r) => r.name);
    } else {
      roles = groups.flatMap((g) => g.role.map((r) => r.name));
    }

    // console.log(roles);
    const tenantList = user.groups?.map((g) => g.tenant);

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: [...new Set(roles)],
          tenant: tenantList.length > 0 ? tenantList[0].id : "",
          // application: '5b9c05ce-5c2b-48f5-9281-2429682c4f35',
        },

        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: "login",
          audience: "access",
        }
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: "access",
        issuer: "login",
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  getTenant(token: string) {
    const payload = this.jwtService.decode(token.split(" ")[1]);

    return payload["tenant"];
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: {
        groups: {
          role: true,
          tenant: true,
        },
      }, // tras a relação de group na construção do token
    });

    if (!user) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new UnauthorizedException("Email está incorreto");
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "30 minutes",
        subject: String(user.id),
        issuer: "forget",
        audience: "users",
      }
    );

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: "forget",
        audience: "users",
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException("Token é inválido");
      }
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.show(String(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user[0]);
  }
}

// async getRolesForGroup(groups: GroupsEntity[]): Promise<RoleEntity[]> {
//   if (groups.some((e) => e.admin)) {
//     return await this.roleService.findAll();
//   } else {
//     const findGroups = await this.groupService.findGroupsAndRelations(groups);
//     const roles: RoleEntity[] = [];
//     for (const group of findGroups) {
//       roles.push(...group.role);
//     }
//     return roles;
//   }
// }

// await this.mailer.sendMail({
//   subject: 'Recuperação de Senha',
//   to: 'ronny.perera@ipdec.org',
//   template: 'forget',
//   context: {
//     name: user.name,
//     token,
//   },
// });
