import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoryDAOArray } from '../data/dao/implementation/CategoryDAOArray';
import { PriorityDAOArray } from '../data/dao/implementation/PriorityDAOArray';
import { TaskDAOArray } from '../data/dao/implementation/TaskDAOArray';
import { TestData } from '../data/TestData';
import { Category } from '../model/Category';
import { Priority } from '../model/Priority';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  
  private taskDAO = new TaskDAOArray();
  private categoryDAO = new CategoryDAOArray();
  private priorityDAO = new PriorityDAOArray();

  constructor() { 
    
  }

  searchTasks(category: Category, title: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDAO.search(category,title,status,priority);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDAO.add(task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDAO.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAO.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAO.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDAO.update(task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.taskDAO.delete(task.id);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDAO.add(category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAO.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDAO.delete(category.id);
  }

  searchCategory(title: string): Observable<Category[]> {
    return this.categoryDAO.search(title);
  }
}
