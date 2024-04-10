import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { TodoStatus } from '../enum/todoStatus';

export class CreateTodoDto {

    @ApiProperty()
    @IsString()
    title: string;


    @ApiProperty()
    @IsBoolean()
    completed: boolean;

    status: TodoStatus;


    @ApiProperty()
    @IsString()
    description?: string;

}
