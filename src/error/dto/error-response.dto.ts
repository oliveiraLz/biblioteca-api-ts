import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDTO {
  @ApiProperty({
    type: "number",
    example: "401",
  })
  statusCode: number;

  @ApiProperty({
    type: "string",
    example: "2022-01-01 10:00:08",
  })
  timestamp: string;

  @ApiProperty({
    type: "string",
    example: "/auth/login",
  })
  path: string;

  @ApiProperty({
    type: "string",
    example: "POST",
  })
  method: string;

  @ApiProperty({
    type: "string",
    example: "AUTH_001",
  })
  code?: string;

  @ApiProperty({
    type: "string",
    example: "Token inválido",
  })
  message: string;
}
