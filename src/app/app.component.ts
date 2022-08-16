import { Component, OnInit } from '@angular/core';
import { Task } from './model/Task';
import { Category } from "./model/Category";
import { Priority } from "./model/Priority";
import { DataHandlerService } from './services/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  private title = 'Todo';
  private searchTaskText = '';
  private priorityFilter: Priority;
  private statusFilter: boolean;
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category = null!;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    this.onSelectCategory(null!);

  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null!,
      null!,
      null!
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  onUpdateTask(task: Task) {

    this.updateTasks();

  }

  onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task).subscribe(cat => {
      this.updateTasks()
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(cat => {
      this.selectedCategory = null!;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onFilterTaskByTitle(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTaskByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTaskByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

}
