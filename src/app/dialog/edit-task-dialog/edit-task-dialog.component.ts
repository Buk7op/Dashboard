import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Task } from 'src/app/model/Task';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }
  
  dialogTitle: string;
  task: Task;
  tmpTitle: string;
  categories: Category[];
  tmpCategory: Category | undefined;
  priorities: Priority[];
  tmpPriority: Priority | undefined;
  tmpDate: Date | undefined;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;
    this.dataHandler.getAllCategories().subscribe(c => this.categories = c);
    this.dataHandler.getAllPriorities().subscribe(p => this.priorities = p);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {maxWidth: '500px',
      data: {dialogTitle: 'Confirm the action', message: `Do you really want to delete the task: "${this.task.title}"?`},
      autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogRef.close('delete');
      }
    });
  }
  
  open(): void {
    this.dialogRef.close('open');
  }

  close(): void {
    this.dialogRef.close('close');
  }
}
