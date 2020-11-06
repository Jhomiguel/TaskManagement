import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import {  TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getTasks(
     @Query(ValidationPipe) filterDto: GetTasksFilterDto,
     @GetUser() user: User):Promise<Task[]>{
       return this.tasksService.getTasks(filterDto,user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User): Promise<Task> {
       return this.tasksService.createTask(createTaskDto,user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User
        ):Promise<Task>{
        return this.tasksService.getTaskById(id,user)
    }

    @Delete('/:id')
    deleteTaskById(
     @Param('id',ParseIntPipe) id:number,
     @GetUser() user: User):Promise<void>{
        return this.tasksService.deleteTaskById(id,user)
    }

    @Patch('/:id')
    updateTask(
    @Param('id',ParseIntPipe) id:number, 
    @Body('status',TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status, user)
    }
}
