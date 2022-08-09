import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { MatTableDataSource } from "@angular/material/table";

const COMPLETED_COLOR: string = '#F8F9FA';
const NO_COLOR: string = '#F8F9FA';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource!: MatTableDataSource<Task>;
  tasks!: Task[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(task => this.tasks = task);
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  getPriorityColor(task: Task): string {

    if(task.completed) {
      return COMPLETED_COLOR;
    }

    if(task.priority && task.priority.color) {
      return task.priority.color;
    }
    return NO_COLOR;
  }

  private refreshTable() {
    this.dataSource!.data = this.tasks;
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }
}
