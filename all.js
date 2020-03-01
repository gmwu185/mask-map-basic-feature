

/* 口罩與藥局 JSON 資料
-------------------------------------------------- */

// var data2 = data.features

/* End of 口罩與藥局 JSON 資料
-------------------------------------------------- */



/* 判斷日期
-------------------------------------------------- */

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

var _date = new Date();
var _day = _date.getDay();
var _chineseDay = judgeDayChinese (_day);

/* End of 判斷日期
-------------------------------------------------- */


/* 判斷週期數單、雙、週日元素初始化
-------------------------------------------------- */

var oddEL = document.querySelector('.odd');
var evenEL = document.querySelector('.even');
var sundayEL = document.querySelector('.sunday');

oddEL.style.display = 'none';
evenEL.style.display = 'none';
sundayEL.style.display = 'none';

/* End of 判斷週期數單、雙、週日元素初始化
-------------------------------------------------- */


/* 月份與日期單位數前面加 '0' 後存於變數中
-------------------------------------------------- */

var _thisDay__Year = _date.getFullYear();
var _thisDay__Month = addZeroStr(_date.getMonth()+1); // 一月由 0 開始要加 1
var _thisDay__Date = addZeroStr(_date.getDate());

/* End of 月份與日期單位數前面加 '0' 後存於變數中
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

function judgeOndEvenDay() {
    /* 判斷週期數單、雙、週日
  -------------------------------------------------- */

  // if ( _day == 1 || _day == 3 || _day == 5 ) {
  //   oddEL.style.display = 'block';
  // } 
  // if ( _day == 2 || _day == 4 || _day == 6 ) {
  //   evenEL.style.display = 'block';
  // } 
  // if ( _day == 0 ) {
  //   sundayEL.style.display = 'block';
  // }

  _day == 1 || _day == 3 || _day == 5 ? oddEL.style.display = 'block' : 
  _day == 2 || _day == 4 || _day == 6 ? evenEL.style.display = 'block' : sundayEL.style.display = 'block'
  
  /* End of 判斷週期數單、雙、週日
  -------------------------------------------------- */
}

function renderDay () {
  /* 輸出畫面
  -------------------------------------------------- */
  document.querySelector('.js-week span').innerHTML = _chineseDay;
  document.querySelector('.js-day').innerHTML = _thisDay__Year + '-' + _thisDay__Month + '-' + _thisDay__Date;
  judgeOndEvenDay();
  /* End of 輸出畫面
  -------------------------------------------------- */
}

var jsonDate;
function getData() {
  var xhr = new XMLHttpRequest();
  // xhr.open('get', 'points.json'); //本地端存的資料
  xhr.open('get', "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
  xhr.send();
  xhr.onload = function (){
    jsonDate = JSON.parse(xhr.responseText);
    renderList();
    // 建立市區選單
    renderAreaSelect();
  }
}

function renderList (CounttyName) {
  var dataArr = jsonDate.features;
  console.log('dataArr', dataArr);
  var dataStr = '';
  for (var i=0; i<dataArr.length; i++){
    if( CounttyName == dataArr[i].properties.county){      
      // ES 5 組字串
      // dataStr += '<li>' + dataArr[i].properties.name + '：' + '成人口罩' + dataArr[i].properties.mask_adult + '個' + '，' + '小孩口罩' + dataArr[i].properties.mask_child + '個' + '</li>';
      
      // ES 6 組字串
      dataStr += `
        <li>${dataArr[i].properties.county}
          <ul>
            <li>${dataArr[i].properties.name}</li>
            <li>地址：${dataArr[i].properties.address}</li>
            <li>成人口罩 ${dataArr[i].properties.mask_adult} 個</li>
            <li>小孩口罩 ${dataArr[i].properties.mask_child} 個</li>
          </ul>
        </li>
      `;
    }
  };
  
  document.querySelector('.js-list').innerHTML = dataStr;
}


// 初始化執行
function init() {
  // 執行函式
  renderDay();
  getData();
}
init();

var areaEL = document.querySelector('.js-area');
areaEL.addEventListener('change', function (e) {
  // console.log('e.target.value', e.target.value);
  renderList(e.target.value);
})

function renderAreaSelect() {
  var newCountyArr = [];
  for (var item of jsonDate.features){
    if(newCountyArr.indexOf(item.properties.county) == -1) {
      newCountyArr.push(item.properties.county);
      var newOption = document.createElement("option");
      newOption.textContent = item.properties.county;
      areaEL.appendChild(newOption);
    }
  }
}
