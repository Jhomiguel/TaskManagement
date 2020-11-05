import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import {  TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto):Promise<Task[]>{
       return this.tasksService.getTasks(filterDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task> {
       return this.tasksService.createTask(createTaskDto)
    }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id:number):Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id',ParseIntPipe) id:number):void{
         this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id')
    updateTask(@Param('id',ParseIntPipe) id:number, 
    @Body('status',TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status)
    }
}
