import { Inject, Injectable } from "@nestjs/common";
import { ConflictException, NotAcceptableException, NotFoundException } from "@nestjs/common/exceptions";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ListUserDto } from "./dto/list-user.dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entities/user.entity";
import { GroupsEntity } from "../group/entities/group.entity";
import { ListGroupDto } from "../group/dto/list-group.dto";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USERS_REPOSITORY")
    private usersRepository: Repository<UserEntity>,
    @Inject("GROUP_REPOSITORY")
    private groupsRepository: Repository<GroupsEntity>
  ) {}

  async findAll() {
    const retorno = await this.usersRepository.find({
      select: ["id", "name", "email"],
      relations: { groups: true },
    });

    const userListDto = retorno.map(
      (r) =>
        new ListUserDto(
          r.id,
          r.name,
          r.email,
          r.groups?.map((g) => new ListGroupDto(g.id, g.name, g.role))
        )
    );

    userListDto.sort((a, b) => a.name.localeCompare(b.name));
    return userListDto;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: { groups: true },
    });
    if (!user) {
      throw new NotAcceptableException("Usuario não existe");
    }
    const userListDto = new ListUserDto(
      user.id,
      user.name,
      user.email,
      user.groups?.map((g) => new ListGroupDto(g.id, g.name, g.role))
    );

    return userListDto;
  }

  async findOne2(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: { groups: true },
    });
    if (!user) {
      throw new NotAcceptableException("Usuario não existe");
    }
    const userDto = new UserDto(user.id, user.name, user.email);

    return userDto;
  }

  async findOneByUuid(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotAcceptableException("Usuario não existe");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async create(data: CreateUserDto) {
    let groups;
    if (data.groups) {
      groups = await Promise.all(data.groups.map((name) => this.preloadGroupsEntityByName(name)));
    }

    const user = this.usersRepository.create({
      ...data,
      groups,
    });

    const buscaEmail = await this.findByEmail(user.email);
    if (buscaEmail) {
      throw new ConflictException("E-mail ja cadastrado no sistema");
    }
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const groups = data.groups && (await Promise.all(data.groups.map((id) => this.preloadGroupsEntityByName(id))));
    const user = await this.usersRepository.preload({
      id,
      ...data,
      groups,
    });

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotAcceptableException(`Usuario não existe`);
    }
    return this.usersRepository.remove(user);
  }

  private async preloadGroupsEntityByName(id: string): Promise<GroupsEntity> {
    const groupsEntity = await this.groupsRepository.findOne({
      where: { id },
    });
    if (groupsEntity) {
      return groupsEntity;
    }
    return this.groupsRepository.create({ id });
  }

  async show(id: string) {
    await this.exists(id);

    return this.usersRepository.findOneBy({
      id,
    });
  }

  async exists(id: string) {
    if (
      !(await this.usersRepository.findOne({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Usuário ${id} não existe`);
    }
  }

  async findGroupsByUserUuid(id: string): Promise<GroupsEntity[]> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        groups: true,
      },
    });
    return user.groups;
  }

  async createUser(data: CreateUserDto) {
    const user = this.usersRepository.create({
      ...data,
      groups: [],
    });

    const buscaEmail = await this.findByEmail(user.email);
    if (buscaEmail) {
      throw new ConflictException("E-mail ja cadastrado no sistema");
    }
    return await this.usersRepository.save(user);
  }

  // private async preloadUsersEntityByUuid(id: string): Promise<UsersEntity> {
  //   const userEntity = await this.usersRepository.findOne({
  //     where: { id },
  //   });
  //   if (userEntity) {
  //     return userEntity;
  //   }
  //   return this.usersRepository.create({ id });
  // }
}
