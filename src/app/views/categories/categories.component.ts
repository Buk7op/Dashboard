import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  @Input()
  categories!: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;
  

  constructor() { }

  ngOnInit(): void {
    
  }

  showTaskByCategory(category: Category) {
    if(this.selectedCategory === category){
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  

}
