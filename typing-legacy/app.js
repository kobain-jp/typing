// html elements
const untypedElement = document.getElementById('untyped');
const typedElement = document.getElementById('typed');

// model
let quotes = [];
// data for elements
const currentQuote = { untyped: "", typed: "" };

let typeCount = 0;
let correctTypeCount = 0;

document.addEventListener("keypress", solve);

//controller 
function solve(e) {

    typeCount++;

    //keyが正しい場合は
    if (e.key == currentQuote.untyped.charAt(0)) {

        correctTypeCount++;

        //最後の文字列だったら次の問題
        if (currentQuote.untyped.length == 1) {

            nextQuote();

        } else {

            nextCharacter();
        }

    }


}


// controller
function nextQuote() {

    //問題がなければクリアと表示してリロード
    if (quotes.length == 0) {

        showScoreAndReload();

    } else {

        const quote = quotes.shift();
        currentQuote.typed = ""
        currentQuote.untyped = quote;

        renderQuote();
    }

}

// controller
function nextCharacter() {

    currentQuote.typed = currentQuote.typed + currentQuote.untyped.substring(0, 1);
    currentQuote.untyped = currentQuote.untyped.substring(1, currentQuote.untyped.length);

    renderQuote();
}

// controller
function showScoreAndReload() {

    const accuracyRate = Math.floor((correctTypeCount / typeCount) * 100);
    const template = 'Your percentage of correct answers is {{accuracyRate}}%';

    window.alert(template.replace("{{accuracyRate}}", accuracyRate));

    window.location.reload();
}

function showTemporarilyUnavailable() {
    typedElement.innerHTML = "temporarily unavailable"
}

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

//view
function renderQuote() {
    typedElement.innerText = currentQuote.typed;
    untypedElement.innerText = currentQuote.untyped;

}


loadQuotes(nextQuote, showTemporarilyUnavailable);














