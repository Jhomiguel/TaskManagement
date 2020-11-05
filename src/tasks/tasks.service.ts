import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './tasks-status.enum';;
import { CreateTaskDto } from './dto/create-tasks.dto';
//Puede da error 
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    // private tasks: Task[] = []


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

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto
    //     const task: Task={
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task)
    //     return task
    // }

    // getTaskById(id: string):Task{
    //    const found= this.tasks.find(task => task.id === id)

    //    if(!found){
    //        throw new NotFoundException(`Task with ID: "${id}" not found`);   
    //    }
    //    return found
    // }

    // deleteTaskById(id: string): void{
    //  const found = this.getTaskById(id)

    //  this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }

    // updateTask(id:string, status: TaskStatus):Task{
    // //  this.tasks.forEach(task => task.id===id ? task.status = status: task)
    //  const task = this.getTaskById(id)
    //  task.status = status
    //  return task
    // }
}
