import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-error-wrapper',
  templateUrl: './error-wrapper.component.html',
  styleUrls: ['./error-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ErrorWrapperComponent)
    }
  ]
})
export class ErrorWrapperComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  @Input() formControl: FormControl;

  ngOnInit(): void {
    console.log(this.formControl.errors);
  }

  registerOnChange() {}
  registerOnTouched() {}
  writeValue() {}

}
