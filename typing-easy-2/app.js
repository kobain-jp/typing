console.log("hello");

let quotes = [];

document.addEventListener("keydown", solve);

const untypedElement = document.getElementById("untyped");
const typedElement = document.getElementById("typed");

function solve(e) {
  console.log(e.target);
  console.log(e.key);

  //keyの値を取得する
  const inputChar = e.key;
  //untypedの1文字目を取得する
  const targetChar = untypedElement.innerHTML.charAt(0);

  //keyの値とuntypedの1文字目がマッチすれば、
  if (inputChar === targetChar) {
    if (untypedElement.innerHTML.length === 1) {
      nextQuote();
    } else {
      //typedに正解したkeyを追加する
      typedElement.innerHTML = typedElement.innerHTML + inputChar;

      //untypedの1文字目を取り除く
      untypedElement.innerHTML = untypedElement.innerHTML.substring(
        1,
        untypedElement.innerHTML.length
      );
    }
  }
}

function nextQuote() {

  const quote = quotes.shift();
  typedElement.innerHTML = "";
  untypedElement.innerHTML = quote;
  
}

function loadQuotes(onSuccededCallBack, onFailedCallback) {

  fetch("./data.json")
      .then((res) => {
          return res.json();
      }).then((data) => {
          quotes = data;
          onSuccededCallBack();
      })
      .catch((err) => {
          console.log(err);
          onFailedCallback();
      });

}

loadQuotes(nextQuote,undefined);