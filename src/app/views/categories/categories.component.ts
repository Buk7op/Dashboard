import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Task } from 'src/app/model/Task';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories!: Category[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
  }

  showTaskByCategory(category: Category): Task[] {
    return this.dataHandler.getTasksByCategory(category);
  }

}
