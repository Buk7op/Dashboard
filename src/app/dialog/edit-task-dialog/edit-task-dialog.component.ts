import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Task } from 'src/app/model/Task';

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
  
  dialogTitle?: string;
  task?: Task;
  tmpTitle?: string;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
  }

  onConfirm(): void {
    this.task!.title = this.tmpTitle!;
    this.dialogRef.close(this.task)
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
