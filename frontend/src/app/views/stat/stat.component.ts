import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {


  @Input()
  quantity: number;
  @Input()
  uncomplitedQuantity: number;
  @Input()
  totalQuantity: number;


  constructor() { }

  ngOnInit(): void {
  }

  
}
