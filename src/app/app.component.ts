import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './services/data-handler.service';
import { Task } from "src/app/model/Task";
import { Category } from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo-App';
  tasks!: Task[];
  categories!: Category[];
  selectedCategory: Category;
  selectedTask?: Task;

  constructor(private dataHandler: DataHandlerService) {
    
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(category => this.categories = category);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasksByCategory(category).subscribe(tasks => this.tasks = tasks);
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasksByCategory(
        this.selectedCategory
      ).subscribe(t => this.tasks = t)
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(() => {
      this.dataHandler.searchTasksByCategory(
        this.selectedCategory
      ).subscribe(t => this.tasks = t)
    });
    console.log(this.tasks);
  }
}
