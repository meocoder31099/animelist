// Import Libs
import { trueTypeOf } from ".";

class FormatDistanceDate {
  dirtyDate: number | Date;
  dirtyBaseDate: number | Date;
  options?: {
    includeSeconds?: boolean | undefined;
    addSuffix?: boolean | undefined;
    locale?: Locale | undefined;
  };
  MINUTES_IN_DAY: number = 1440;
  MINUTES_IN_ALMOST_TWO_DAYS: number = 2520;
  MINUTES_IN_MONTH: number = 43200;
  MINUTES_IN_TWO_MONTHS: number = 86400;

  constructor(
    dirtyDate: FormatDistanceDate["dirtyDate"],
    dirtyBaseDate: FormatDistanceDate["dirtyBaseDate"],
    options?: FormatDistanceDate["options"]
  ) {
    this.dirtyDate = dirtyDate;
    this.dirtyBaseDate = dirtyBaseDate;
    this.options = options;
  }

  /**
   * @name toDate
   *
   * @description
   * Convert the given argument to an instance of Date.
   */
  toDate(argument: Date | number): Date {
    const argumentType = trueTypeOf(argument);

    if (argument instanceof Date || argumentType === "date") {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date((argument as Date).getTime());
    } else if (typeof argument === "number" || argumentType === "number") {
      return new Date(argument);
    }
    return new Date(NaN);
  }

  /**
   * @name compareAsc
   *
   * @description
   * Compare the two dates and return 1 if the first date is after the second,
   * -1 if the first date is before the second or 0 if dates are equal.
   */
  compareAsc(
    dirtyDateLeft: Date | number,
    dirtyDateRight: Date | number
  ): number {
    var dateLeft = this.toDate(dirtyDateLeft);
    var dateRight = this.toDate(dirtyDateRight);
    var diff = dateLeft.getTime() - dateRight.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
      // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }

  /**
   * @name rounding
   *
   * @description
   * Rounds the value passed in.
   */
  rounding(value: number): number {
    // is Math.trunc
    // Math.trunc is not supported by IE
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  }

  /**
   * @name differenceInMilliseconds
   *
   * @description
   * Get the number of milliseconds between the given dates.
   */
  differenceInMilliseconds(dateLeft: Date, dateRight: Date): number {
    return this.toDate(dateLeft).getTime() - this.toDate(dateRight).getTime();
  }

  /**
   * @name differenceInSeconds
   *
   * @description
   * Get the number of seconds between the given dates.
   */
  differenceInSeconds(dateLeft: Date, dateRight: Date): number {
    var diff = this.differenceInMilliseconds(dateLeft, dateRight) / 1000;
    return this.rounding(diff);
  }

  /**
   * @name differenceInCalendarMonths
   *
   * @description
   * Get the number of calendar months between the given dates.
   */
  differenceInCalendarMonths(
    dirtyDateLeft: Date,
    dirtyDateRight: Date
  ): number {
    var dateLeft = this.toDate(dirtyDateLeft);
    var dateRight = this.toDate(dirtyDateRight);
    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
    var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
    return yearDiff * 12 + monthDiff;
  }

  /**
   * @name endOfDay
   *
   * @description
   * Return the end of a day for the given date.
   * The result will be in the local timezone.
   */
  endOfDay(dirtyDate: Date): Date {
    var date = this.toDate(dirtyDate);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  /**
   * @name endOfMonth
   *
   * @description
   * Return the end of a month for the given date.
   * The result will be in the local timezone.
   */
  endOfMonth(dirtyDate: Date): Date {
    var date = this.toDate(dirtyDate);
    var month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  /**
   * @name isLastDayOfMonth
   *
   * @description
   * Is the given date the last day of a month?
   */
  isLastDayOfMonth(dirtyDate: Date): boolean {
    var date = this.toDate(dirtyDate);
    return this.endOfDay(date).getTime() === this.endOfMonth(date).getTime();
  }

  /**
   * @name differenceInMonths
   *
   * @description
   * Get the number of full months between the given dates using trunc as a default rounding method.
   */
  differenceInMonths(dirtyDateLeft: Date, dirtyDateRight: Date): number {
    var dateLeft = this.toDate(dirtyDateLeft);
    var dateRight = this.toDate(dirtyDateRight);
    var sign = this.compareAsc(dateLeft, dateRight);
    var difference = Math.abs(
      this.differenceInCalendarMonths(dateLeft, dateRight)
    );
    var result;

    // Check for the difference of less than month
    if (difference < 1) {
      result = 0;
    } else {
      if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
        // This will check if the date is end of Feb and assign a higher end of month date
        // to compare it with Jan
        dateLeft.setDate(30);
      }
      dateLeft.setMonth(dateLeft.getMonth() - sign * difference);

      // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
      // If so, result must be decreased by 1 in absolute value
      var isLastMonthNotFull = this.compareAsc(dateLeft, dateRight) === -sign;

      // Check for cases of one full calendar month
      if (
        this.isLastDayOfMonth(this.toDate(dirtyDateLeft)) &&
        difference === 1 &&
        this.compareAsc(dirtyDateLeft, dateRight) === 1
      ) {
        isLastMonthNotFull = false;
      }
      result = sign * (difference - Number(isLastMonthNotFull));
    }

    // Prevent negative zero
    return result === 0 ? 0 : result;
  }

  /**
   * @name getTimezoneOffsetInMilliseconds
   * @description
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */
  getTimezoneOffsetInMilliseconds(date: Date) {
    var utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }

  /**
   * @name getDistance
   * @description
   * Return the distance between the given dates in words.
   * | Distance between dates                                            | Result              |
   * |-------------------------------------------------------------------|---------------------|
   * | 0 ... 30 secs                                                     | less than a minute  |
   * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
   * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
   * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
   * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
   * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
   * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
   * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
   * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
   * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
   * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
   * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
   * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
   * | N yrs ... N yrs 3 months                                          | about N years       |
   * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
   * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
   *
   * With `options.includeSeconds == true`:
   * | Distance between dates | Result               |
   * |------------------------|----------------------|
   * | 0 secs ... 5 secs      | less than 5 seconds  |
   * | 5 secs ... 10 secs     | less than 10 seconds |
   * | 10 secs ... 20 secs    | less than 20 seconds |
   * | 20 secs ... 40 secs    | half a minute        |
   * | 40 secs ... 60 secs    | less than a minute   |
   * | 60 secs ... 90 secs    | 1 minute             |
   */
  getDistance(): string {
    const comparison = this.compareAsc(this.dirtyDate, this.dirtyBaseDate);
    if (isNaN(comparison)) {
      throw new RangeError("Invalid time value");
    }
    let dateLeft: Date;
    let dateRight: Date;
    if (comparison > 0) {
      dateLeft = this.toDate(this.dirtyBaseDate);
      dateRight = this.toDate(this.dirtyDate);
    } else {
      dateLeft = this.toDate(this.dirtyDate);
      dateRight = this.toDate(this.dirtyBaseDate);
    }
    const seconds: number = this.differenceInSeconds(dateRight, dateLeft);
    const offsetInSeconds: number =
      (this.getTimezoneOffsetInMilliseconds(dateRight) -
        this.getTimezoneOffsetInMilliseconds(dateLeft)) /
      1000;
    const minutes: number = Math.round((seconds - offsetInSeconds) / 60);
    let months: number;

    // 0 up to 2 mins
    if (minutes < 2) {
      if (seconds < 60) {
        return `${seconds}s`;
      } else {
        return "1m";
      }

      // 2 mins up to 59 mins
    } else if (minutes < 60) {
      return `${minutes}m`;

      // 1 hrs up to 24 hrs
    } else if (minutes < this.MINUTES_IN_DAY) {
      var hours = Math.round(minutes / 60);
      return `${hours}h`;

      // 1 day or more
    } else {
      return dateLeft.toLocaleString('en-US', { month: 'short', day: 'numeric',  });
    }

    //   // 1 day up to 1.75 days
    // } else if (minutes < this.MINUTES_IN_ALMOST_TWO_DAYS) {
    //   return "1d";

    //   // 1.75 days up to 30 days
    // } else if (minutes < this.MINUTES_IN_MONTH) {
    //   var days = Math.round(minutes / this.MINUTES_IN_DAY);
    //   return `${days}d`;

    //   // 1 month up to 2 months
    // } else if (minutes < this.MINUTES_IN_TWO_MONTHS) {
    //   months = Math.round(minutes / this.MINUTES_IN_MONTH);
    //   return `${months}mon`;
    // }
    // months = this.differenceInMonths(dateRight, dateLeft);

    // // 2 months up to 12 months
    // if (months < 12) {
    //   var nearestMonth = Math.round(minutes / this.MINUTES_IN_MONTH);
    //   return `${nearestMonth}mon`;

    //   // 1 year up to max Date
    // } else {
    //   var monthsSinceStartOfYear = months % 12;
    //   var years = Math.floor(months / 12);

    //   // N years up to 1 years 3 months
    //   if (monthsSinceStartOfYear < 3) {
    //     return `${years}y`;

    //     //   // N years 3 months up to N years 9 months
    //     // } else if (monthsSinceStartOfYear < 9) {
    //     //   return locale.formatDistance('overXYears', years, localizeOptions);

    //     // N years 9 months up to N year 12 months
    //   } else {
    //     return `${years + 1}y`;
    //   }
    // }
  }
}

export default FormatDistanceDate;
