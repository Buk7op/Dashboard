import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/services/data-handler.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories?: Category[];
  selectedCategory?: Category;
  isUncategorized?: Boolean

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.categoriesSubject.subscribe(category => this.categories = category);
  }

  showTaskByCategory(category: Category) {
    this.isUncategorized = false
    this.selectedCategory = category;
    this.dataHandler.fillTasksByCategory(category);
  }

  showUncategorizedTasks() {
    this.isUncategorized = true;
    this.selectedCategory = undefined;
    this.dataHandler.fillUncategorizedTasks();
  }

}
