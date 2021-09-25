const thirtyDayInMonthArray = [4, 6, 9, 11]

export const isLeapYear = (year: number): boolean => {
  /**
   * 閏年のロジック：
   * 1. 西暦が4で割り切れるかつ100で割り切れない場合
   * 2. 上記または400で割り切れる場合
   */
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

// switch文とか別の方法で書いた方が良さそう！！
export const calcDayInMonth = (year: number, month: number): number => {
  /**
   * 新しいオブジェクトを生成するのはなんかよくなさそうなのでできる限り計算で求めるようにしたい。
   */
  if (month === 2) {
    if (isLeapYear(year)) {
      return 29;
    }
    return 28;
  }

  if (thirtyDayInMonthArray.includes(month)) {
    return 30;
  }

  return 31;
};
