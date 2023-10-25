import { Prisma } from '@prisma/client';
import { IsDate, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto implements Prisma.EventCreateInput {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;

  @IsDate()
  @IsISO8601(
    { strict: true },
    { message: 'A data deve estar no formado Ano/Mes/Dia' },
  )
  date: Date;
}
