import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray, Form, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ValueTransformer } from '@angular/compiler/src/util';
import _ from 'lodash';



interface SampleInterface extends OnDestroy {
}

class SampleClass implements OnInit, OnDestroy {
  ngOnInit() {
    console.log("init");
  }
  ngOnDestroy() {
    console.log("destroy");
  }
}

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent extends SampleClass implements SampleInterface {

  constructor(
    public formBuilder: FormBuilder
  ) { 
    super();
  }

  public formGroup: FormGroup;
  public testCheckboxList = ["hoge", "moge", "fuga"];
  public testPullDownList = ["wei", "yeah", "huweei"];

  private initialFormGroup;

  ngOnInit(): void {
    let testCheckboxs = this.testCheckboxList.map(x => {
      return new FormControl(false);
    })
    this.formGroup = this.formBuilder.group({
      //inputForm: [null, [Validators.required, numberSizeValidator(10), isNumberValidator]],
      inputForm: [null, [Validators.required]],
      checkbox: this.formBuilder.array(testCheckboxs, [checkboxRequiredValidator]),
      pulldown: ["", [Validators.required]]
    })
    this.formGroup.controls["inputForm"]["customType"] = "number";
    this.initialFormGroup = _.cloneDeep(this.formGroup);
    console.log(this.initialFormGroup);
    let keys = Object.keys(this.formGroup.controls)
    keys.map(key => {
      console.log(this.formGroup.get(key));
    })
    //console.log(this.formGroup);
    //this.formGroup.get('inputForm').setValidators([Validators.required, numberSizeValidator(this.formGroup.get('inputForm') as FormControl, 10), numberValidator])
  }

  getMessage(formControlName) {
    console.log("getMessage")
    console.log(formControlName);
    let message;
    if (formControlName.hasError('required')) {
      console.log("require");
      message = "required Error"
    } else if (formControlName.hasError('isNumberValidator')) {
      message = "numberError"

    }

    return message;
  }

  checkChange() {
    console.log("checkChange*****")
  }

  formatValue(formControl: AbstractControl) {
    console.log("format!!!!!!!!")
    let value = new DecimalPipe('ja-jp').transform(formControl.value);
    formControl.setValue(value);
    console.log(value);
  }

  unformatValue(formControl: AbstractControl) {
    console.log("unformat!!!!!!!!")
    let value = formControl.value.toString().replace(/,/g, '');
    formControl.setValue(value);
    console.log(value);
  }

  submit() {
    console.log("after")
    console.log(this.formGroup)

    for (let key of Object.keys(this.formGroup.value)) {
      if (typeof(this.formGroup.value[key]) === "string") {
        console.log("-------- string compare --------")
        console.log(key)
        console.log(this.initialFormGroup.value[key]);
        console.log(this.formGroup.value[key]);
        console.log(this.initialFormGroup.value[key] === this.formGroup.value[key]);
      } else if (typeof(this.formGroup.value[key]) === "object") {
        for (let index in this.formGroup.value[key]) {
          console.log("-------- object compare --------")
          console.log(`${key}, ${index}`)
          console.log(this.initialFormGroup.value[key][index]);
          console.log(this.formGroup.value[key][index]);
          console.log(this.initialFormGroup.value[key][index] === this.formGroup.value[key][index]);
        }
      }

    }

  }

}

function checkboxRequiredValidator(formArray: FormArray) {
  for (let i in formArray.controls) {
    if (formArray.controls[i].value) {
      return null;
    }
  }
  return {checkboxRequired: true};
}

function isNumberValidator(formControl: FormControl) {
  let value = formControl.value;
  value = value.toString().replace(/,/g, '');

  return isNaN(value) ? { isNumberValidator: true } : null;

}

export function numberSizeValidator(size: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let value = control.value.toString().replace(/,/g, '');
    return value.length <= size ? null : {numberSizeValidator: true};
  }
}


