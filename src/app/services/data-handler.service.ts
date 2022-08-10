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

  
  private taskDAO = new TaskDAOArray();
  private categoryDAO = new CategoryDAOArray();

  constructor() { 
    // this.fillTasks();
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

  // fillTasks() {
  //   this.tasksSubject.next(TestData.tasks)
  // }

  // fillTasksByCategory(category: Category) {
  //   this.tasksSubject.next(TestData.tasks.filter(task => task.category === category));
  // }

  // fillUncategorizedTasks() {
  //   this.tasksSubject.next(TestData.tasks.filter(task => task.category === undefined));
  // }
}
