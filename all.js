

/* 判斷日期
-------------------------------------------------- */
/*----------  時間日期資料  ----------*/
var _date = new Date();
var _day = _date.getDay();
var _chineseDay = judgeDayChinese(_day);
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


/** 將月份與日期單位數補 0 變成雙位
 * @param num 月份與日期的數值
 * 
 */
function addZeroStr(num) {
  var zero = '0'; // 判斷月份是如大於雙數，單位數前面要加 '0'
  /*----------  if 判斷式寫法  ----------*/
  // if ( num < 10 ) {
  //   return zero + num; 
  // } else {
  //   return String(num);
  // };
  /*----------  條件 (三元) 運算子  ----------*/
  return num < 10 ? zero + num : String(num)
}


/** 將週期數值轉換成中文字串
 * @param day 傳入週期數值判斷轉換中文字元
 * 
 */
function judgeDayChinese(day) {
  /*----------  if 判斷式寫法  ----------*/
  // if (day == 0) { return '日' }
  // if (day == 1) { return '一' }
  // if (day == 2) { return '二' }
  // if (day == 3) { return '三' }
  // if (day == 4) { return '四' }
  // if (day == 5) { return '五' }
  // if (day == 6) { return '六' }
  
  /*----------  條件 (三元) 運算子  ----------*/
  return  day == 0 ? '日' : 
          day == 1 ? '一' : 
          day == 2 ? '二' : 
          day == 3 ? '三' : 
          day == 4 ? '四' : 
          day == 5 ? '五' : 
          day == 6 ? '六' : 
          '資料不正確'

  /*----------  switch 寫法  ----------*/
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
}


/** 判斷週期數值單、雙、週日後判斷要顯示的元素對象
 */
function judgeOndEvenDay() {
  
  /*----------  if 判斷式寫法  ----------*/
  // if ( _day == 1 || _day == 3 || _day == 5 ) {
  //   oddEL.style.display = 'block';
  // } 
  // if ( _day == 2 || _day == 4 || _day == 6 ) {
  //   evenEL.style.display = 'block';
  // } 
  // if ( _day == 0 ) {
  //   sundayEL.style.display = 'block';
  // }
  /*----------  條件 (三元) 運算子  ----------*/
  _day == 1 || _day == 3 || _day == 5 ? oddEL.style.display = 'block' : 
  _day == 2 || _day == 4 || _day == 6 ? evenEL.style.display = 'block' : sundayEL.style.display = 'block'
}

/** 週期與日期輸出畫面
 * 
 */
function renderDay() {
  document.querySelector('.js-week span').innerHTML = _chineseDay;
  document.querySelector('.js-day').innerHTML = _thisDay__Year + '-' + _thisDay__Month + '-' + _thisDay__Date;
  judgeOndEvenDay();
}

var jsonDate;
/** AJAX xhr 取得遠端資料事件後，執行全域函式
 * 
 */
function getData() {
  var xhr = new XMLHttpRequest();
  // xhr.open('get', 'points.json'); //本地端存的資料
  xhr.open('get', "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json");
  xhr.send();
  xhr.onload = function (){
    jsonDate = JSON.parse(xhr.responseText); // 在取得 JSON 資料時，將參數 '全部' 做為預設處理與輸出的內容先顯示在畫面上。
    renderList('全部'); // 需設字串 '全部' 建立市區選單
    renderAreaSelect();
  }
}


/** 資料處理與組字串模版輸出內容到畫面上
 * @param CounttyName 透過 .js-area 切換選單後取得字串轉入比對資料
 * 
 */
function renderList(CounttyName) {
  var dataArr = jsonDate.features;
  console.log('dataArr', dataArr);
  var dataStr = '';
  for (var i=0; i<dataArr.length; i++){
    
    
    /*----------  字串模版  ----------*/
    var strTemplate = 
      // ES 5 組字串
      // '<li>' + dataArr[i].properties.name + 
      //   '<ul>' + 
      //     '<li>' + '地址：' + dataArr[i].properties.address + '</li>' +
      //     '<li>' + '成人口罩：' + dataArr[i].properties.mask_adult + ' 個' + '</li>' +
      //     '<li>' + '小孩口罩：' + dataArr[i].properties.mask_child + ' 個' + '</li>' +
      //   '</ul>' + 
      // '</li>';

      // ES 6 組字串
      ` <li>${dataArr[i].properties.county}
          <ul>
            <li>${dataArr[i].properties.name}</li>
            <li>地址：${dataArr[i].properties.address}</li>
            <li>成人口罩：${dataArr[i].properties.mask_adult} 個</li>
            <li>小孩口罩：${dataArr[i].properties.mask_child} 個</li>
          </ul>
        </li>
      `;
      
    /*----------  選地名判斷  ----------*/
    // 比對點按縣市名，過濾出不為 '' 完整縣市名
    if(CounttyName == dataArr[i].properties.county){ 
      if (CounttyName !== ''){
        dataStr += strTemplate;
      }
    } 
    // 選到 '全部' 後，過濾出不為 '' 完整縣市名
    if (CounttyName == '全部') {
      if (CounttyName !== ''){
        dataStr += strTemplate;
      }
    }
    // 選到 '其他' 後，'' 為沒有完整縣市名
    if (CounttyName == '其他') {
      if ( '' == dataArr[i].properties.county) {
        dataStr += strTemplate;
      }
    }
  };
  document.querySelector('.js-list').innerHTML = dataStr;
}



var areaEL = document.querySelector('.js-area');
/** 市區選單比對重復名後輸出建立 option 選單
 * 
 */
function renderAreaSelect() {
  var newCountyArr = [];
  for (var item of jsonDate.features){
    if (item.properties.county !== '') {
      if(newCountyArr.indexOf(item.properties.county) == -1) {
      
        var newOption = document.createElement("option");
        newCountyArr.push(item.properties.county);
        newOption.textContent = item.properties.county;
        areaEL.appendChild(newOption);
      };
    };
  };
  // 專取用縣市或地址資料有缺類別為其他放在最後
  for (var item of jsonDate.features){
    if (item.properties.county == '') {
      newCountyArr.push('其他');
      newOption.textContent = '其他';
      areaEL.appendChild(newOption);
    };
  }
}



/** 初始化執行函式集合
 * 
 */
function init() {
  // 執行函式
  renderDay();
  getData();
  areaEL.addEventListener('change', function (e) {
    // console.log('e.target.value', e.target.value);
    renderList(e.target.value);
  })
}
init();


