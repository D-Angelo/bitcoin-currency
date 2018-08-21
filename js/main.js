var currency={ GBP:{ symbol : "£"},
               USD: {symbol: "$" ,rate: 1},
               EUR: {symbol: "€"},
               RUB: { symbol: "R"},
               percent:{ symbol: "%", rate:1}};
var coinValue={BTC:{},
LTC:{},
ETH:{}};

function getData(url, func){
    var request = new XMLHttpRequest();
    request.responseType="json";
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            func.call(request); // вызываем колбек
        }
    }
    request.open('GET', url);

    request.send();
    }
function  getCurrencyValue(){
    currency.GBP.rate = this.response.rates.GBP.rate;
    currency.EUR.rate = this.response.rates.EUR.rate;
    currency.RUB.rate = this.response.rates.RUB.rate;
   for(var key in coinValue) getCoinValue(key);
}


function  getCoinValue(id) {

    getData("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+id+"USD",
        function (){
        coinValue[id] = this.response;
        updateValue(id);
    });
}
function formatValue(elem,value,currency) {
    elem.innerHTML = (value*currency.rate).toFixed(2) +" "+ currency.symbol;
    if (value<0) {
        elem.style.color=" #c80e24";
    }
}
 function updateValue(id){
     var currentChoice;
     elem = document.getElementById(id);
     var percentSwitch;
         var switcher= elem.getElementsByClassName("coins-item__percent")[0];
         if(switcher.checked)
         {
             percentSwitch = coinValue[id].changes.percent;
             currentChoice = "percent";
         }
         else{
             percentSwitch = coinValue[id].changes.price;
             currentChoice  = currentMoney.value;
         }

         var valueElem= elem.getElementsByClassName("coins-item__statvalue");
        formatValue(valueElem[0],coinValue[id].last,currency[currentMoney.value]);
         formatValue(valueElem[1],percentSwitch.hour,currency[currentChoice]);
          formatValue(valueElem[2],percentSwitch.day,currency[currentChoice]);
          formatValue(valueElem[3],percentSwitch.week,currency[currentChoice]);
         formatValue(valueElem[4],percentSwitch.month,currency[currentChoice]);
     }


var currentMoney  = document.getElementById("currency");
currentMoney.onchange = function(){
    getData("https://apiv2.bitcoinaverage.com/constants/exchangerates/global",getCurrencyValue);
};

// Обновление данных при изменении checkbox
// var checkElem = document.getElementsByClassName('coins-item__percent');
// for (var i=0; i<checkElem.length; i++)
// {
//
//     checkElem[i].onchange = function(){getData("https://apiv2.bitcoinaverage.com/constants/exchangerates/global",getCurrencyValue);};
//
// }
window.onload = function(){
    getData("https://apiv2.bitcoinaverage.com/constants/exchangerates/global",getCurrencyValue);
    var switcher = document.getElementsByClassName('switcher');
    for(var i=0; i<switcher.length; i++){
        switcher[i].onclick = function(){
            var chkbox = this.previousElementSibling;
                chkbox.checked=!chkbox.checked;
        }

        }
    };



