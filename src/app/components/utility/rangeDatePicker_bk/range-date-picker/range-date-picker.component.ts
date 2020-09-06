import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent implements OnInit {
  public minDate = new Date(2020, 0, 1);
  public maxDate = new Date(2020, 11, 31);

  public from = new Date(2020, 6, 1);
  public to = new Date(2020, 6, 5);

  public selectYear = this.from.getFullYear();
  public selectMonth = this.from.getMonth();

  public dateJson = {};

  constructor() { }

  ngOnInit(): void {
    // deep copy
    let initialDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());

    while (initialDate <= this.maxDate) {
      if (this.dateJson[initialDate.getFullYear()] === undefined) {
        this.dateJson[initialDate.getFullYear()] = {};
      }

      if (this.dateJson[initialDate.getFullYear()][initialDate.getMonth()] === undefined) {
        this.dateJson[initialDate.getFullYear()][initialDate.getMonth()] = [];
      }

      this.dateJson[initialDate.getFullYear()][initialDate.getMonth()].push(
        { year: initialDate.getFullYear(), month: initialDate.getMonth(), week: initialDate.getDay(), date: initialDate.getDate(), class: "default" }
      )
      initialDate.setDate(initialDate.getDate() + 1);
    }
    this.createCalendar();
  }


  public showCalendar = [];
  createCalendar() {
    let selectCalender = this.dateJson[this.selectYear][this.selectMonth];
    let beforeCalender = [];
    let afterCalender = [];

    let startWeek = selectCalender[0]["week"];
    let endWeek = selectCalender[selectCalender.length - 1]["week"];



    let beforeMonth = (this.selectMonth == 0 ? this.dateJson[this.selectYear - 1]["11"] : this.dateJson[this.selectYear][this.selectMonth - 1]);
    let afterMonth = (this.selectMonth == 11 ? this.dateJson[this.selectYear + 1]["0"] : this.dateJson[this.selectYear][this.selectMonth + 1]);

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
    let startYear = this.selectFrom.getFullYear();
    let endYear = this.selectTo.getFullYear();
    let startMonth = this.selectFrom.getMonth();
    let endMonth = this.selectTo.getMonth();
    let startDate = this.selectFrom.getDate();
    let endDate = this.selectTo.getDate();

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

  selectDate(year, month, date) {
    let tmp = new Date(year, month, date);
    if (this.selectFrom && this.selectTo) {
      this.refreshCss("reset");
      this.selectFrom = undefined;
      this.selectTo = undefined;
      this.selectFrom = tmp;
      this.dateJson[year][month][date-1]["class"] = "active";
      this.createCalendar();
    } else if (this.selectFrom) {
      if (tmp < this.selectFrom) {
        this.selectTo = new Date(this.selectFrom.getFullYear(), this.selectFrom.getMonth(), this.selectFrom.getDate());
        this.selectFrom = tmp;
        this.refreshCss("redraw");
      } else {
        this.selectTo = tmp;
        this.refreshCss("redraw");
      }
    } else {
      this.selectFrom = tmp;
      this.dateJson[year][month][date-1]["class"] = "active";
    }

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

  setDate($event, flag) {
    console.log($event)
    let dateList = $event.split("/");
    if (dateList.length != 3) {
      return null;
    }

    if (dateList[0].length > 4 || dateList[1].length > 2 || dateList[2].length > 2) {
      return null;
    }

    let year: number = parseInt(dateList[0]);
    let month: number = parseInt(dateList[1]);
    let date: number = parseInt(dateList[2]);

    if (isNaN(year) || isNaN(month) || isNaN(date)) {
      console.log("NaN")
      return null;
    }

    month = month - 1;
    let dateIndex = date - 1;
    console.log(year)
    console.log(month)
    console.log(date)

    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(dateIndex)) {
      console.log("not integer")
      return null;
    }

    if (year < 0 || month < 0 || dateIndex < 0) {
      return null;
    }

    if (this.dateJson[year][month][dateIndex] === undefined) {
      console.log("undefined")
      return null
    }
    if (flag === "from") {
      this.dateJson[this.selectFrom.getFullYear()][this.selectFrom.getMonth()][this.selectFrom.getDate()-1]["class"] = "default";
      this.selectFrom.setFullYear(year);
      this.selectFrom.setMonth(month);
      this.selectFrom.setDate(date);
      this.changeMonth(month);
      this.dateJson[year][month][dateIndex]["class"] = "active";
      console.log(this.selectFrom)
    } else if (flag === "to") {
      this.refreshCss("reset");
      this.selectTo.setFullYear(year);
      this.selectTo.setMonth(month);
      this.selectTo.setDate(date);
      if (this.selectTo < this.selectFrom) {
        let tmp = new Date(this.selectFrom);
        this.selectFrom = new Date(this.selectTo);
        this.selectTo = new Date(tmp);
      }
      this.changeMonth(month);
      this.refreshCss("redraw");
      console.log(this.selectTo)
    }
  }

}
