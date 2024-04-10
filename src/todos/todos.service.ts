import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todoRepository.create(createTodoDto);
      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new InternalServerErrorException('Could not create todo');
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Could not find todos');
    }
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({where:{id}});
      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException('Could not find todo');
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = await this.findOne(id);
      this.todoRepository.merge(todo, updateTodoDto);
      return await this.todoRepository.save(todo);
    } catch (error) {
      throw new InternalServerErrorException('Could not update todo');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const todo = await this.findOne(id);
      await this.todoRepository.remove(todo);
    } catch (error) {
      throw new InternalServerErrorException('Could not delete todo');
    }
  }
}