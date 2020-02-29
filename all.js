

/*----------  口罩與藥局 JSON 資料  ----------*/
// console.log(data);
var data2 = data.features
console.log(data2);


/*----------  時間日期資料  ----------*/
var _date = '星期三';

var _date = new Date();
console.log('_date', _date);
// 回傳一個 Date Sun Mar 01 2020 00:48:53 GMT+0800 (台北標準時間) 的時間資料

// console.log('_date.getDate()', _date.getDate());
// 取得今天是這個月份的幾號

var _day = _date.getDay();
// console.log('_date.getDay()', _date.getDay());
console.log('_day', _day);
// 取得今天是星期幾 0 -> 週日



/*----------  輸出畫面  ----------*/
// document.querySelector('.js-week').textContent = _date; // 最上方寫死的時間
document.querySelector('.js-week').innerHTML = _day;