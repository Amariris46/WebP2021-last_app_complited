// グローバル
// div要素を格納
var cards = [];
// 開始時間
var startTime;
// 経過秒数用 タイマーID
var timer;
// カードめくり用 タイマーID
var backTimer;
// 最初かどうか
var first = false;
// 撃ちぬいた数
var count = 0;
// スコア
var score = 0;
// 周回数
var turn = 1;

window.onload = Main();

function Main(){
    // 開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    Setup();
}

function Setup(){
    // 文字格納 一時配列
    var arr = [];
    
    for (var i = 0; i < 10; i++){
        arr.push("王");
    }
    for (var i = 0; i < 30; i++){
        arr.push("玉");
    }
    
    // シャッフル
    shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 40; i++){
        var div = document.createElement('div');
        div.className = 'card';
        div.index = i;
        div.figure = arr[i];
        div.innerHTML = div.figure;
        div.onclick = check;
        panel.appendChild(div);
        cards.push(div);
    }
}

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// クリック時の処理
function check(e){
    
    var div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 王をクリックした場合は背景を赤にする
    if (div.className == 'card'){
        if(div.figure == "王"){
            div.className = 'card attack';
            score += 100*turn;
            count++;
        } else {
            score += -100;
        }
    }else{
        // 既に撃たれている場合は return
        return;
    }

    if(count == 10){
        if(!first){
            first = true;
        }
        for(i=0; i<100; i++){
            cards.className = 'card';
        }
        count = 0;
        turn++;
        cards = [];
        Setup();
    }
}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// タイム＆スコア表示
function showSecond(){

    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    if(elapsedTime >= 90){
        elapsedTime = 90;
    }
    var str = '経過秒数: ' + (90-elapsedTime) + '秒, ' + turn + '周目, 残り王: ' + (10-count) + '体, SCORE: ' + score;
    if(elapsedTime == 90){
        panel.remove();
    }

    var re = document.getElementById('result');
    re.innerHTML = str;
}