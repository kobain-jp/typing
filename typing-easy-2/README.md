# 複数問題対応をしよう

### 問題完了時に完了!!と表示しよう

```
function solve(e) {
    console.log(e.target);
    console.log(e.key);

    //keyの値を取得する
    const inputChar = e.key;
    //untypedの1文字目を取得する
    const targetChar = untypedElement.innerHTML.charAt(0);

    //keyの値とuntypedの1文字目がマッチすれば、
    if (inputChar === targetChar) {

+       if(untypedElement.innerHTML.length === 1){
+            alert("finish");
+       }else{
            //typedに正解したkeyを追加する
           typedElement.innerHTML = typedElement.innerHTML + inputChar;

            //untypedの1文字目を取り除く
           untypedElement.innerHTML = untypedElement.innerHTML.substring(1, untypedElement.innerHTML.length);

+       }


    }

}

```

### 次の問題へを実装しよう

```
function nextQuote(){
 
    typedElement.innerHTML = "";
    untypedElement.innerHTML = "Hello world";

}


```

### jsonから読み込もう

```
[
    "It means that your future hasn't been written yet.",
    "No one's has.",
    "Your future is whatever you make it.",
    "So make it a good one.",
    "Both of ya!"
]
```

jsonをロードしよう

app.js

```
// model
let quotes = [];


//model
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
```

配列から問題を読み込もう

```
// controller
function nextQuote() {

    //問題がなければクリアと表示してリロード
    if (quotes.length == 0) {

        alert('clear');

    } else {

        const quote = quotes.shift();
   
        typedElement.innerHTML = "";
        untypedElement.innerHTML = quote;
        
    }

}

loadQuotes(nextQuote,undefined);
```




