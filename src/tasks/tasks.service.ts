import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './tasks-status.enum';;
import { CreateTaskDto } from './dto/create-tasks.dto';
//Puede da error 
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}

    async getTasks(filterDto: GetTasksFilterDto,user: User): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto,user)
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto,user)
    }

    async getTaskById(id: number, user: User): Promise<Task>{
       const found= await this.taskRepository.findOne({where:{ id, userId: user.id }})
       if(!found){
           throw new NotFoundException(`Task with ID: "${id}" not found`)  
       }
       return found
    }

    async deleteTaskById(id: number,user: User): Promise<void>{
       const result = await this.taskRepository.delete({id, userId: user.id})
       
       if(result.affected === 0) {
            throw new NotFoundException(`Task with ID: "${id}" not found`)
       }
    }

    async updateTaskStatus(id: number,status: TaskStatus,user: User): Promise<Task>{
       const task = await this.getTaskById(id,user)
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
