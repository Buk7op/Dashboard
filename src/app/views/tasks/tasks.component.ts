import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { EditTaskDialogComponent } from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

const COMPLETED_COLOR = '#F8F9FA';
const NO_COLOR = '#FFF'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'select', 'operations'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  deleteTask = new EventEmitter<Task>();

  tasks!: Task[];


  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
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

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Edit task'], autoFocus: false });
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

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}


