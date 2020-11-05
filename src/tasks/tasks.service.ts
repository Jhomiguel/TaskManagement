import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './tasks-status.enum';;
import { CreateTaskDto } from './dto/create-tasks.dto';
//Puede da error 
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksWithFilter(filterDto:GetTasksFilterDto):Task[] {
    //     const {status, search} = filterDto
    //     let tasks = this.getAllTasks()
    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status)
    //     }
        
    //     if(search){
    //         tasks = tasks.filter(task=>
    //             task.title.includes(search) ||
    //             task.description.includes(search))
    //     }

    //     return tasks
    // }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto)
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)
    }

    async getTaskById(id: number): Promise<Task>{
       const found= await this.taskRepository.findOne(id)
       if(!found){
           throw new NotFoundException(`Task with ID: "${id}" not found`)  
       }
       return found
    }

    async deleteTaskById(id: number): Promise<void>{
       const result = await this.taskRepository.delete(id)
      
       if(result.affected ===0) {
            throw new NotFoundException(`Task with ID: "${id}" not found`)
       }
    }

    async updateTaskStatus(id: number,status: TaskStatus): Promise<Task>{
       const task = await this.getTaskById(id)
       task.status = status
       await task.save()
       return task
    }

    // updateTask(id:string, status: TaskStatus):Task{
    // //  this.tasks.forEach(task => task.id===id ? task.status = status: task)
    //  const task = this.getTaskById(id)
    //  task.status = status
    //  return task
    // }
}
