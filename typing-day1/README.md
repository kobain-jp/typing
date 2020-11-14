### 初期ファイルを作成する。(前回の復習＋１)

```
-typing-day1
--index.html
--app.js
--app.css
```

index.html

1. index.htmlはindexとうち、html:5
2. body tagの最終行でapp.jsを読み込むためにscriptとうち、script:srcして、srcにapp.js
3. head tag内でapp.cssを読み込むためにlinkとうち、link:cssして、srcにapp.css


app.js

1. app.jsには読み込み確認のために、`console.log('hello');`を記載


app.css 

1. app.cssには読み込み確認のために、以下を記載

```
body{
    background-color: pink;
}
```

index.htmlを選択して、右クリックOpen With Live Server

ピンクの画面で開く　-> css読み込みOK
F12 consoleでhello world　-> js読み込みOK

とでていればOK　でてない場合はおそらくファイル名とsrc/hrefの指定がマッチしていないはず

### タイピングしたキーをconsoleに出そう。

app.jsに以下を追加

```

document.addEventListener("keypress", solve);

function solve(e) {
    console.log(e.target);
    console.log(e.key);
}

```

F12 > consoleで結果をみよう

e.target -> body 

e.key -> 打ったキー


addEventListenerの第2引数のlistnerにセットされた関数には実行時にeventオブジェクトが渡される

https://developer.mozilla.org/ja/docs/Web/API/Event

ちなみにkeydownとkeypressの違い

http://amaraimusi.sakura.ne.jp/sample/js/jq_keydown/jq_keydown.html

今回大文字にするためのキーを押下した際はイベントを発火する必要がないため、keypressを採用する


### 課題を表示しよう

課題でタイピングが完了した箇所、未完了の箇所を色分けしよう


index.html

```

<body>
    <span class="typed">He</span>
    <span class="untyped">llo</span>
    <script src="app.js"></script>
</body>

```

app.cssに以下を追加

```
.typed{
    color:black;
}

.untyped{
    color: grey;
}

```

https://developer.mozilla.org/ja/docs/Web/CSS/Class_selectors

課題の文字を大きくして、中央によせよう

index.html

```

+　　<div class="quote">
        <span class="typed">He</span>
        <span class="untyped">llo</span>
        <script src="app.js"></script>
+    </div>

```

app.css

```

.quote{
    font-size: 80px;
    text-align: center;
    margin-top: 100px;
}

```

F12 > Elements タグで好きな文字の大きさ、位置に調整しよう


### solveロジックを実装しよう

最初の課題:helloをセットしよう

index.html

```

<body>
    <div class="quote">
 U       <span class="typed"></span>
 U       <span class="untyped">hello</span>
        <script src="app.js"></script>
    </div>
</body>

```

app.js


まず日本語でロジックを考えてみよう

```
function solve(e) {
    console.log(e.target);
    console.log(e.key);

//入力されたkeyの値を取得する
//untypedの1文字目を取得する

//keyの値とuntypedの1文字目が

//マッチすれば、
//typedに正解したkeyを追加する
//untypedの最初の文字列を削る

//マッチしない
//何もしない
}

```

なので、まずuntyped,typedのタグをjsから操作できるようにしよう


index.htmlにのspanタグにidを付与する

```

<body>
    <div class="quote">
 U       <span id="typed" class="typed"></span>
 U       <span id="untyped" class="untyped">hello</span>
        <script src="app.js"></script>
    </div>
</body>

```

app.jsで変数にセットする（使う時に取得するのではなく、初期ロード時にエレメントは変数にセットしてつかう、その方が毎回取得するより速いし、コードが短くなって読みやすいから）

```

const untypedElement = document.getElementById('untyped');
const typedElement = document.getElementById('typed');


```

以下のメソッドを使ってロジックを実装しよう

tag内の文字烈を取得する　Element.innerHTML
https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML

特定のインデックスの文字列を取得する。 String.charAt;
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charAt

特定のインデックスから特定の文字のインデックスより前の文字烈を取得する。 String.substring;
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/substring

新しいメソッドを知ったらConsoleでとりあえず動きをみよう。

```

function solve(e) {
    console.log(e.target);
    console.log(e.key);

    //入力されたkeyの値を取得する
    const inputChar = e.key;
    //untypedの1文字目を取得する
    const targetChar = untypedElement.innerHTML.charAt(0);

    //keyの値とuntypedの1文字目がマッチすれば、
    if (inputChar === targetChar) {

        //typedに正解したkeyを追加する
        typedElement.innerHTML = typedElement.innerHTML + inputChar;

        //untypedの1文字目を取り除く
        untypedElement.innerHTML = untypedElement.innerHTML.substring(1, untypedElement.innerHTML.length);

    }

}

```

長い文字列でためしてみよう

```

<body>
    <div class="quote">
        <span class="typed"></span>
        <span class="untyped">Done is better than perfect.</span>
        <script src="app.js"></script>
    </div>
</body>

```

お疲れ様でした！！

今日学んだこと
- cssのインクルードの仕方 
- classタグ
- css property font-size text-align color margin-top
- keydonw eventオブジェクト
- string charAt substring
