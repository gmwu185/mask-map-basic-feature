

/*----------  口罩與藥局 JSON 資料  ----------*/
// console.log(data);
var data2 = data.features
console.log(data2);


/*----------  時間日期資料  ----------*/
// var _date = '星期三';

// var _date = new Date();
// console.log('_date', _date);
// 回傳一個 Date Sun Mar 01 2020 00:48:53 GMT+0800 (台北標準時間) 的時間資料

// console.log('_date.getDate()', _date.getDate());
// 取得今天是這個月份的幾號

// var _day = _date.getDay();
// console.log('_date.getDay()', _date.getDay());
// console.log('_day', _day);
// 取得今天是星期幾 0 -> 週日

function renderDay () {
  var _date = new Date();
  var _day = _date.getDay();
  var _chineseDay = judgeDayChinese (_day);
  var _thisDay__Year = _date.getFullYear();
  var _thisDay__Month = addZeroStr(_date.getMonth()+1); // 一月由 0 開始要加 1
  var _thisDay__Date = addZeroStr(_date.getDate());

  /* 月份與日期單位數前面加 '0'
  -------------------------------------------------- */
  function addZeroStr(num) {
    var zero = '0'; // 判斷月份是如大於雙數，單位數前面要加 '0'
    // if ( num < 10 ) {
    //   return zero + num; 
    // } else {
    //   return String(num);
    // };
    return num < 10 ? zero + num : String(num)
  }
  /* End of 月份與日期單位數前面加 '0'
  -------------------------------------------------- */

  // 單數 odd、雙數 even 
  // if ( _dateMonthNum ==  2 ) {
  //   console.log('');
  // }

  
  /* 輸出畫面
  -------------------------------------------------- */
  document.querySelector('.js-week span').innerHTML = _chineseDay;
  document.querySelector('.js-day').innerHTML = _thisDay__Year + '-' + _thisDay__Month + '-' + _thisDay__Date;
  /* End of 輸出畫面
  -------------------------------------------------- */
}

function judgeDayChinese (day) {
  /* if 寫法
  -------------------------------------------------- */
  // if (day == 0) { return '日' }
  // if (day == 1) { return '一' }
  // if (day == 2) { return '二' }
  // if (day == 3) { return '三' }
  // if (day == 4) { return '四' }
  // if (day == 5) { return '五' }
  // if (day == 6) { return '六' }
  /* End of if 寫法
  -------------------------------------------------- */

  /* 條件 (三元) 運算子
  -------------------------------------------------- */
  
  return  day == 0 ? '日' : 
          day == 1 ? '一' : 
          day == 2 ? '二' : 
          day == 3 ? '三' : 
          day == 4 ? '四' : 
          day == 5 ? '五' : 
          day == 6 ? '六' : 
          '資料不正確'
  
  /* End of 條件 (三元) 運算子
  -------------------------------------------------- */

  /* switch 寫法
  -------------------------------------------------- */
  // switch(day){
  //   case 0:
  //     return '日'
  //     break;
  //   case 1:
  //     return '一'
  //     break;
  //   case 2:
  //     return '二'
  //     break;
  //   case 3:
  //     return '三'
  //     break;
  //   case 4:
  //     return '四'
  //     break;
  //   case 5:
  //     return '五'
  //     break;
  //   case 6:
  //     return '六'
  //     break;
  //   default:
  //     console.log('沒有任何資料');
  //     break;
  // }
  /* End of switch 寫法
  -------------------------------------------------- */
}

// 初始化執行
function init() {
  // 執行函式
  renderDay();
}

init();