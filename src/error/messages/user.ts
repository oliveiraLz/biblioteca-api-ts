import { HttpStatus } from "@nestjs/common";

export const UserError = {
  USER_001: {
    code: "USER_001",
    status: HttpStatus.NOT_FOUND,
    message: "Usuário não encontrado",
  },
  USER_002: {
    code: "USER_002",
    status: HttpStatus.BAD_REQUEST,
    message: "Identificador inválido",
  },
  USER_003: {
    code: "USER_003",
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Erro ao salvar dados do usuário",
  },
};
