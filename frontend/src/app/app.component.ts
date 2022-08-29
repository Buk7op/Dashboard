import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Task } from './model/Task';
import { Category } from "./model/Category";
import { Priority } from "./model/Priority";
import { DataHandlerService } from './services/data-handler.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {
  private title = 'Todo';
  private searchTaskText = '';
  private priorityFilter: Priority;
  private statusFilter: boolean;
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category = null!;
  searchCategoryTitle: string;
  quantity: number;
  totalQuantity: number;
  uncomplitedQuantity: number;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngAfterViewInit(): void {
    this.onSelectCategory(null!);
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    

  }


  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTaskAndStats()

  }

  onUpdateTask(task: Task) {

    this.dataHandler.updateTask(task).subscribe(() => {
      this.updateTaskAndStats()
    });

  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(cat => {
      this.updateTaskAndStats()
    });
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(Task => {
      this.updateTaskAndStats()
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(cat => {
      this.selectedCategory = null!;
      this.updateCategories();
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

  async updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onInitTaskSearch() {
    this.dataHandler.setupTaskSearch();
  }

  onCreateCategory(title: string) {
    const category = new Category(null!, title);
    this.dataHandler.addCategory(category).subscribe(cat => {
      this.updateCategories();
      this.selectedCategory = cat;
      this.onSelectCategory(this.selectedCategory);
    });;
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(title: string) {
    console.log("onSearch")
    this.searchCategoryTitle = title;
    this.dataHandler.searchCategory(this.searchCategoryTitle).subscribe(categories => {
      this.categories = categories
    });
  }

  updateTaskAndStats() {
    this.updateTasks();
    this.updateStats();
  }
  
  updateStats() {
    zip(this.dataHandler.getTotalQuantity(this.selectedCategory),
    this.dataHandler.getCompletedQuantity(this.selectedCategory))
    .subscribe(result => {
      this.totalQuantity = result[0],
      this.quantity = result[1],
      this.uncomplitedQuantity = result[0] - result[1]
    })
  }

  onSetupSearch() {
    this.dataHandler.setupCategorySearch();
  }
}
