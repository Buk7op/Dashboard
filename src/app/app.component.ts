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

  constructor(private dataHandler: DataHandlerService) {
    
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(category => this.categories = category);
  }

}
