import { IsMongoId } from 'class-validator';

export class FetchUserDto {
  @IsMongoId()
  readonly id: string;
}
