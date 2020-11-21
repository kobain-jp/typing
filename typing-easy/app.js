console.log('hello');

document.addEventListener("keydown", solve);

const untypedElement = document.getElementById('untyped');
const typedElement = document.getElementById('typed');

function solve(e) {
    console.log(e.target);
    console.log(e.key);

    //keyの値を取得する
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