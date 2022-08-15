import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
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
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;
  indexMouseMove: number;
  

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedCategory = null!;
  }

  showTaskByCategory(category: Category) {
    if(this.selectedCategory === category){
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }
  
  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, { data: [category.title, 'Edit category'], width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
        if(result === 'delete') {
          this.deleteCategory.emit(category);
          return;
        }

        if(typeof(result) === 'string') {
          category.title = result as string;
          this.updateCategory.emit(category);
          return;
        }
    });
  }

}
