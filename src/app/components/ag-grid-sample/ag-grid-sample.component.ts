import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-grid-sample',
  templateUrl: './ag-grid-sample.component.html',
  styleUrls: ['./ag-grid-sample.component.scss']
})
export class AgGridSampleComponent implements OnInit {

  constructor() { }

  public columnDefs = [
      {headerName: 'Make', field: 'make' },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
  ];

  public rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  ngOnInit(): void {
  }
}
