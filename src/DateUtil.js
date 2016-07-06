export default class DateUtil {

  static isDate (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  // origin from
  // http://stackoverflow.com/questions/10645994/node-js-how-to-format-a-date-string-in-utc
  static dateFormat (date, fmt, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fmt.replace(/%[YmdHMS]/g, (m) => {
      switch (m) {
        case '%Y': return date[`${utc}FullYear`](); // no leading zeros required
        case '%m': m = 1 + date[`${utc}Month`](); break;
        case '%d': m = date[`${utc}Date`](); break;
        case '%H': m = date[`${utc}Hours`](); break;
        case '%M': m = date[`${utc}Minutes`](); break;
        case '%S': m = date[`${utc}Seconds`](); break;
        default: return m.slice(1); // unknown code, remove %
      }
      // add leading zero if required
      return ('0' + m).slice(-2);
    });
  }

  /**
   * static - convert a Date-like object to a string with specified format
   *
   * @param  {number || Date || string} obj
   * @param  {string} format  set output string format.
   *                          Y: year, m: month, d: day, H: hour, M: minute, S: second
   * @param  {bool} utc
   * @return {string}      date string with specified format
   */
  static toDateString (obj, format, utc) {
    const date  = DateUtil.toDate(obj);
    const fmt = format || '%Y-%m-%d';
    return DateUtil.dateFormat(date, fmt, utc);
  }

  static toDate (date) {
    if (!date) {
      throw new Error('Date value does not exist');
    };

    if (DateUtil.isDate(date)) {
      return date;
    } else {
      const dateReg = /([0-9]{4})[^0-9]*([0-9]{2})[^0-9]*([0-9]{2})/;
      const matched = date.match(dateReg);

      if (matched) {
        const year = matched[1];
        const month = matched[2] - 1;
        const Day = matched[3];
        return (new Date(year, month, Day));
      } else {
        throw new Error('Provided value should be valid');
      }
    }
  }

  /**
   * static - return a time integrate with time value set to 00:00:00:00
   *
   * @param  {number || Date} date a value could be converted to a Date object
   *
   * @return {number}  a time integrate
   */
  static dateRemoveTime (date) {
    let timeNum = 0;

    if (DateUtil.isDate(date)) {
      timeNum = date.valueOf();
    }
    if (typeof date === 'number') {
      timeNum = date;
    }

    const time = new Date(timeNum);
    return time.setHours(0, 0, 0, 0);
  }

  /**
   * static - used to calcultate a delta time from a time point, Default is
   * from current time.
   *
   * @param  {string} str     time steps, data fromat is [0-9][dwmy]
   *                          d : day, w: week, m: month, y: year.
   *
   * @param  {object} options has two properties: flag and date
   *                          date: an Date-like object,
   *                          flag: '0' or '1'. '0' is default value which means
   *                          days before; '1' means days after.
   *
   * @return {number}         return a time integrate value
   */
  static parseDeltaDateStringToDate (str, options) {
    let day = new Date();
    let flag = 0;

    if (options) {
      day = DateUtil.toDate(options.date);
      flag = options.flag || 0;
    }

    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    let deltaDate = 0;
    let deltaWeek = 0;
    let deltaMonth = 0;
    let deltaYear = 0;

    const deltaDateMatched = str.match(/([0-9]*)d+/i);
    if (deltaDateMatched) {
      deltaDate = deltaDateMatched[1];
    }

    const deltaWeekMatched = str.match(/([0-9]*)w+/i);
    if (deltaWeekMatched) {
      deltaWeek = deltaWeekMatched[1];
      deltaDate = deltaWeek * 7 + deltaDate;
    }

    const deltaMonthMatched = str.match(/([0-9]*)m+/i);
    if (deltaMonthMatched) {
      deltaMonth = deltaMonthMatched[1];
    }

    const deltaYearMatched = str.match(/([0-9]*)y+/i);
    if (deltaYearMatched) {
      deltaYear = deltaYearMatched[1];
    }

    if (!flag) {
      day.setYear(year - parseInt(deltaYear));
      day.setMonth(month - parseInt(deltaMonth));
      day.setDate(date - parseInt(deltaDate));
    } else {
      day.setYear(year + parseInt(deltaYear));
      day.setMonth(month + parseInt(deltaMonth));
      day.setDate(date + parseInt(deltaDate));
    }
    return day;
  }

  static toDateTime (date) {
    if (DateUtil.isDate(date)) {
      return date.getTime();
    }

    if ((typeof date !== 'undefined') && (date !== '')) {
      return DateUtil.toDate(date).getTime();
    }
  }

  static isLeapYear (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  static getDaysInMonth (year, month) {
    return [31, DateUtil.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  /**
   * static - description
   *
   * @param  {type} year  description
   * @param  {type} month description
   * @return {type}       description
   */
  static paddingWeeksInMonth (year, month) {
    let daysInMonth = DateUtil.getDaysInMonth(year, month - 1);

    let firstDayInMonth = new Date(year, month - 1, 1);
    let lastDayInMonth = new Date(year, month, 0);

    let daysBeforeInWeek = firstDayInMonth.getDay();
    let daysAfterInWeek = lastDayInMonth.getDay();
    let paddingLeft = [];
    let paddingRight = [];
    let currentMonth = [];
    let ret = [];
    let i = 0;

    // should padding days on left
    if (daysBeforeInWeek) {
      let prevDate = DateUtil.getPrevMonthFirstDay(firstDayInMonth);
      let prevYear = prevDate.getFullYear();
      let prevMonth = prevDate.getMonth() + 1;
      let prevDaysInMonth = DateUtil.getDaysInMonth(prevYear, prevMonth - 1);

      for (i = daysBeforeInWeek - 1; i >= 0; i--) {
        paddingLeft.push({
          year : prevYear,
          month: prevMonth,
          day  : prevDaysInMonth - i
        });
      }
    }

    if (daysAfterInWeek !== 6) {
      let nextDate = DateUtil.getNextMonthFirstDay(firstDayInMonth);
      let nextYear = nextDate.getFullYear();
      let nextMonth = nextDate.getMonth() + 1;

      for (i = 0; i < 6 - daysAfterInWeek; i++) {
        paddingRight.push({
          year : nextYear,
          month: nextMonth,
          day  : i + 1
        });
      }
    }

    for (i = 0; i < daysInMonth; i++) {
      currentMonth.push({
        year : year,
        month: month,
        day  : i + 1
      });
    }

    ret = paddingLeft.concat(currentMonth, paddingRight);
    return ret;
  }

  static getPrevMonthFirstDay (date) {
    let time = date.getTime();
    let timeDate = new Date(time);
    timeDate.setMonth(date.getMonth() - 1);
    timeDate.setDate(1);
    return new Date(timeDate);
  }

  static getNextMonthFirstDay (date) {
    let time = date.getTime();
    let timeDate = new Date(time);
    timeDate.setMonth(date.getMonth() + 1);
    timeDate.setDate(1);
    return new Date(timeDate);
  }

  static getPrevMonthDate (date) {
    var tmp = date;
    return new Date(tmp.setMonth(tmp.getMonth() - 1));
  };

  static getNextMonthDate (date) {
    var tmp = date;
    return new Date(tmp.setMonth(tmp.getMonth() + 1));
  };

  static getPrevYearDate (date) {
    var tmp = date;
    return new Date(tmp.setFullYear(tmp.getFullYear() - 1));
  };

  static getNextYearDate (date) {
    var tmp = date;
    return new Date(tmp.setFullYear(tmp.getFullYear() - 1));
  };
}
