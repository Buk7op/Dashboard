import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './services/data-handler.service';
import { Task } from "src/app/model/Task";
import { Category } from './model/Category';
import { Priority } from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo-App';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category;
  selectedTask?: Task;
  statusFilter: boolean;
  titleFilter: string;
  priorityFilter: Priority;

  constructor(private dataHandler: DataHandlerService) {
    
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(category => this.categories = category);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(category, null!, null!, null!).subscribe(tasks => this.tasks = tasks);
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory, null!, null!, null!
      ).subscribe(t => this.tasks = t)
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory, null!, null!, null!
      ).subscribe(t => this.tasks = t)
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    })
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(cat => {
      this.selectedCategory = null!;
      this.onSelectCategory(this.selectedCategory);
    })
  }

  onFilterTaskByStatus(status: boolean) {
    this.statusFilter = status;
    this.dataHandler.searchTasks(null!,null!,status,null!).subscribe(tasks => this.tasks = tasks);
  }

  onFilterTaskByTitle(title: string) {
    this.titleFilter = title;
    this.dataHandler.searchTasks(null!,title,null!,null!).subscribe(tasks => this.tasks = tasks);
  }

  onFilterTaskByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.dataHandler.searchTasks(null!,null!,null!,priority).subscribe(tasks => this.tasks = tasks);
  }
}
