import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{
    //    if(Object.keys(filterDto).length){
    //        return this.tasksService.getTasksWithFilter(filterDto)
    //    } 
    //    return this.tasksService.getAllTasks()
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto:CreateTaskDto): Task {
    //    return this.tasksService.createTask(createTaskDto)
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id:string):Task{
    //     return this.tasksService.getTaskById(id)
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id:string):void{
    //      this.tasksService.deleteTaskById(id)
    // }

    // @Patch('/:id')
    // updateTask(@Param('id') id:string, @Body('status',TaskStatusValidationPipe) status: TaskStatus):Task{
    //     console.log(status)
    //     return this.tasksService.updateTask(id, status)
    // }
}