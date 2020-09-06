import { Component, OnInit } from '@angular/core';
import { faCaretLeft, faCaretRight, faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent implements OnInit {
  public minDate = new Date(2020, 0, 1);
  public maxDate = new Date(2020, 11, 31);

  public minYear = this.minDate.getFullYear();
  public minMonth = this.minDate.getMonth();

  public maxYear = this.maxDate.getFullYear();
  public maxMonth = this.maxDate.getMonth();

  public from = new Date(2020, 6, 1);
  public to = new Date(2020, 6, 5);

  public selectYear = this.from.getFullYear();
  public selectMonth = this.from.getMonth();

  public dateJson = {};

  public pagingLeft = faCaretLeft;
  public pagingRight = faCaretRight;

  constructor() { }

  ngOnInit(): void {
    // deep copy
    this.createDateJson();
    this.createCalendar();
    this.createShowDate();
  }

  createDateJson() {
    let initialDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth()-1, this.minDate.getDate());
    let endDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1, this.maxDate.getDate());

    while (initialDate <= endDate) {
      if (this.dateJson[initialDate.getFullYear()] === undefined) {
        this.dateJson[initialDate.getFullYear()] = {};
      }

      if (this.dateJson[initialDate.getFullYear()][initialDate.getMonth()] === undefined) {
        this.dateJson[initialDate.getFullYear()][initialDate.getMonth()] = [];
      }

      if (initialDate < this.minDate || this.maxDate < initialDate) {
        this.dateJson[initialDate.getFullYear()][initialDate.getMonth()].push(
          { year: initialDate.getFullYear(), month: initialDate.getMonth(), week: initialDate.getDay(), date: initialDate.getDate(), class: "disable", status: false}
        )
      } else {
        this.dateJson[initialDate.getFullYear()][initialDate.getMonth()].push(
          { year: initialDate.getFullYear(), month: initialDate.getMonth(), week: initialDate.getDay(), date: initialDate.getDate(), class: "default", status: true}
        )
      }
      initialDate.setDate(initialDate.getDate() + 1);
    }
  }

  public showDate: string;

  public showCalendar = [];
  createCalendar() {
    let selectCalender = this.dateJson[this.selectYear][this.selectMonth];
    let beforeCalender = [];
    let afterCalender = [];

    let startWeek = selectCalender[0]["week"];
    let endWeek = selectCalender[selectCalender.length - 1]["week"];

    let afterMonth = (this.selectMonth == 11 ? this.dateJson[this.selectYear + 1]["0"] : this.dateJson[this.selectYear][this.selectMonth + 1]);

    let beforeMonth = (this.selectMonth == 0 ? this.dateJson[this.selectYear - 1]["11"] : this.dateJson[this.selectYear][this.selectMonth - 1]);

    for (var i = 0; i < startWeek; i++) {
      beforeCalender.push(
        beforeMonth[beforeMonth.length - (startWeek - i)]
      )
    }

    for (var i = 0;; i++) {
      afterCalender.push(
        afterMonth[i]
      )
      if (afterMonth[i]["week"] === 6) {
        break;
      }
    }


    let mergeCalender = beforeCalender.concat(selectCalender);
    mergeCalender = mergeCalender.concat(afterCalender);


    var i = 0;
    this.showCalendar[i] = [];
    for (let cal of mergeCalender) {
      this.showCalendar[i].push(cal);

      if (cal["week"] === 6) {
        i++;
        this.showCalendar[i] = [];
      }
    }
  }

  public selectFrom = new Date(this.from);
  public selectTo = new Date(this.to);

  refreshCss(flag) {
    let startYear = this.from.getFullYear();
    let endYear = this.to.getFullYear();
    let startMonth = this.from.getMonth();
    let endMonth = this.to.getMonth();
    let startDate = this.from.getDate();
    let endDate = this.to.getDate();

    while (true) {
      if (this.dateJson[startYear][startMonth] == undefined) {
        startMonth = 0;
        startYear++;
      }
      if (this.dateJson[startYear][startMonth][startDate-1] === undefined) {
        startMonth++;
        startDate = 1;
      }

      if (flag === "reset") {
        this.dateJson[startYear][startMonth][startDate-1]["class"] = "default";

      } else if (flag === "redraw" ){
        this.dateJson[startYear][startMonth][startDate-1]["class"] = "active";
      }

      if (startYear == endYear && startMonth == endMonth && startDate == endDate) {
        break;
      } else {
        startDate++;
      }
    }
    this.createCalendar();
  }

  resetDate() {
    this.createDateJson();
    this.createCalendar();
    this.createShowDate();
  }

  selectDate(year, month, date) {
    let tmp = new Date(year, month, date);
    if (this.from && this.to) {
      this.refreshCss("reset");
      this.from = undefined;
      this.to = undefined;
      this.from = tmp;
      this.dateJson[year][month][date-1]["class"] = "active";
      this.createCalendar();
    } else if (this.from) {
      if (tmp < this.from) {
        this.to = new Date(this.from.getFullYear(), this.from.getMonth(), this.from.getDate());
        this.from = tmp;
        this.refreshCss("redraw");
      } else {
        this.to = tmp;
        this.refreshCss("redraw");
      }
    } else {
      this.from = tmp;
      this.dateJson[year][month][date-1]["class"] = "active";
    }
    this.createShowDate();
  }

  changeMonth(month) {
    if (month == 12) {
      this.selectYear++;
      this.selectMonth = 0;
    } else if (month == -1) {
      this.selectYear--;
      this.selectMonth = 11;
    } else {
      this.selectMonth = month;
    }
    this.createCalendar();
  }

  public errorMessage = "";

  setDate($event) {
    console.log($event);
    let tmp = $event.split("-");
    let from = tmp[0];
    let to = tmp[1];

    if (from === undefined || to === undefined) {
      console.log("error1")
      this.errorMessage = "フォーマット不正。YYYY/MM/DD - YYYY/MM/DDの形式で入力してください"
    } else {
      from = from.replace(/ /g, "");
      to = to.replace(/ /, "");
      if (from.split("/").length !== 3 || to.split("/").length !== 3) {
        console.log("error1")
        this.errorMessage = "フォーマット不正。YYYY/MM/DD - YYYY/MM/DDの形式で入力してください"
      } else if (isNaN(from.replace(/\//g, "")) || isNaN(to.replace(/\//g, ""))) {
        this.errorMessage = "入力値不正。数字以外の文字が入力されています"
      } else {
        let fromDate = new Date(from);
        let toDate = new Date(to);

        if (fromDate.toString() === "Invalid Date" || toDate.toString() === "Invalid Date") {
          this.errorMessage = "日付入力不正。存在しない年月日が入力されています。"
        } else if (fromDate > toDate) {
          this.errorMessage = "入力値不正。開始より終了日時が先になっています。"
        } else {
          this.errorMessage = "";
          this.refreshCss("reset");
          this.from = undefined;
          this.to = undefined;
          this.selectDate(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
          this.selectDate(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        }
      }
    }

  }

  createShowDate() {
    if (this.from === undefined && this.to === undefined) {
      return null;
    }

    let from;
    let to;

    if (this.from !== undefined && this.to === undefined) {
      try {
        from = new DatePipe('ja-JP').transform(this.from, 'yyyy/MM/dd');
      }
      catch(e) {
        console.log(e);
        from = this.from;
      }
      to = "";
    } else {
      try {
        from = new DatePipe('ja-JP').transform(this.from, 'yyyy/MM/dd');
      }
      catch(e) {
        console.log(e);
        from = this.from;
      }

      try {
        to =  new DatePipe('ja-JP').transform(this.from, 'yyyy/MM/dd');
      }
      catch(e) {
        console.log(e);
        to = this.from;
      }
    }

    this.showDate = `${from} - ${to}`
    console.log(this.showDate);
  }

}
