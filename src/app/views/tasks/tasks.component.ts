import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const COMPLETED_COLOR: string = '#F8F9FA';
const NO_COLOR: string = '#F8F9FA';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource!: MatTableDataSource<Task>;
  tasks!: Task[];

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(task => this.tasks = task);
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
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
    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch(colName) {
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

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }
  addTableObjects() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }
}
