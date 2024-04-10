import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateTodoDto {

    @ApiProperty()
    @IsString()
    title: string;


    @ApiProperty()
    @IsBoolean()
    completed: boolean;


    @ApiProperty()
    @IsString()
    description?: string;

}
