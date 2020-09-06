import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {

  constructor() { }

  public element = [
    {
      content: "hoge",
      class: "content active",
      arrow: true,
      rightArrow: "right-arrow disable",
      leftArrow: "left-arrow active"
    },
    {
      content: "fuga",
      class: "content select",
      arrow: true,
      rightArrow: "right-arrow active",
      leftArrow: "left-arrow disable"
    },
    {
      content: "moge",
      class: "content active",
      arrow: true,
      rightArrow: "right-arrow disable",
      leftArrow: "left-arrow disable"
    },
    {
      content: "mogumogu",
      class: "content disable",
      arrow: false
    }
  ]

  ngOnInit(): void {
  }

}
