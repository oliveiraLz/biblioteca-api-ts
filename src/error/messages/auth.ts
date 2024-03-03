import { HttpStatus } from "@nestjs/common";

export const AuthError = {
  AUTH_001: {
    code: "AUTH_001",
    status: HttpStatus.UNAUTHORIZED,
    message: "Token Inválido ou expirado",
  },
  AUTH_002: {
    code: "AUTH_002",
    status: HttpStatus.UNAUTHORIZED,
    message: "Não foi possível carregar as permissões do Core",
  },
  AUTH_003: {
    code: "AUTH_003",
    status: HttpStatus.FORBIDDEN,
    message: "Usuário não possui acesso a este módulo",
  },
  AUTH_004: {
    code: "AUTH_004",
    status: HttpStatus.FORBIDDEN,
    message: "Usuário possui acesso a este módulo, mas não a este recurso",
  },
  AUTH_005: {
    code: "AUTH_005",
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Erro ao se comunicar com o core",
  },
};
