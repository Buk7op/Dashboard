import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoryDAOArray } from '../data/dao/implementation/CategoryDAOArray';
import { TaskDAOArray } from '../data/dao/implementation/TaskDAOArray';
import { TestData } from '../data/TestData';
import { Category } from '../model/Category';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  // fillTasksByCategory(category: Category) {
  //   this.tasksSubject.next(TestData.tasks.filter(task => task.category === category));
  // }
  // fillUncategorizedTasks() {
  //   this.tasksSubject.next(TestData.tasks.filter(task => task.category === undefined));
  // }
  
  private taskDAO = new TaskDAOArray();
  private categoryDAO = new CategoryDAOArray();

  constructor() { 
    
  }

  searchTasksByCategory(category: Category): Observable<Task[]> {
    return this.taskDAO.search(category,undefined,undefined,undefined);
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDAO.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAO.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDAO.update(task);
  }

  
}
