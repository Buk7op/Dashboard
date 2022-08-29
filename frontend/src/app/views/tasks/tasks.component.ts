import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { EditTaskDialogComponent } from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { OperationType } from 'src/app/dialog/OperationType';

const COMPLETED_COLOR = '#F8F9FA';
const NO_COLOR = '#FFF'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'select', 'operations'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }
  @Input()
  priorities: Priority[];
  @Input()
  selectedCategory: Category;

  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  deleteTask = new EventEmitter<Task>();
  @Output()
  addTask = new EventEmitter<Task>();
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  filterByTitle = new EventEmitter<string>();
  @Output()
  filterByStatus = new EventEmitter<boolean>();
  @Output()
  filterByPriority = new EventEmitter<Priority>();
  @Output()
  initSearch = new EventEmitter<boolean>();

  tasks!: Task[];
  searchTaskText: string;
  selectedStatusFilter: boolean = null!;
  selectedPriorityFilter: Priority = null!;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }


  ngAfterViewInit() {
    this.addTableObjects();
  }


  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }


  getPriorityColor(task: Task): string {
    if (task.completed) {
      return COMPLETED_COLOR;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return NO_COLOR;
  }
  
  onFilterByTitle(){
    this.filterByTitle.emit(this.searchTaskText)
  }

  onFilterByStatus(status: boolean){
    if(status !== this.selectedStatusFilter) {
      this.selectedStatusFilter = status;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(priority: Priority){
    if(priority !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = priority;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  private fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();
    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : 0
        }
        case 'category': {
          return task.category ? task.category.title : 'Ω'
        }
        case 'date': {
          return task.date ? task.date.getDate() : 0;
        }
        case 'title': {
          return task.title
        }
        default:
          {
            return 'Ω'
          }
      }

    };
  }
  addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setupSearch() {
    this.initSearch.emit();
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Edit task', OperationType.EDIT], autoFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "delete":
          this.deleteTask.emit(task);
          break;
        case "open":
          task.completed = false;
          this.updateTask.emit(task);
          break;
        case "close":
          task.completed = true;
          this.updateTask.emit(task);
          break;
        case result as Task:
          this.updateTask.emit(result);
          break;
      }
    });
  }

  openAddTaskDialog() {
    const task = new Task(null!, '', false, null!, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      maxWidth: '500px',
      data: [task, 'Adding a task', OperationType.ADD],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask.emit(task);
      }
    });
  }

  openDeleteTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: { dialogTitle: 'Confirm the action', message: `Do you really want to delete the task: "${task.title}"?` },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  

}


