//曲一覧
var artists = ["米津玄師","Lisa","YOASOBI","レミオロメン","スキマスイッチ","ゆず","Official髭男dism","あいみょん","KinKi Kids","乃木坂46"];
var songs = ["Lemon","紅蓮華","夜に駆ける","3月9日","全力少年","栄光の架橋","Pretender","裸の心","硝子の少年","シンクロニシティ"];
//乱数
var artist_num;
var song_num;
//ゲーム
var message;
//スコア
var score = 0;
var combo = 0;
//時間系
var startTime;
var timer;
var backTimer;

window.onload = Main();

function Main(){
    startTime = new Date();
    startTimer();
    var answer = document.getElementById('answer');
    answer.style.textAlign = "center";
    Start();

    var correct = document.createElement('correct');
    correct.className = 'correct';
    correct.innerHTML = "合ってるやないかい!";
    correct.onclick = c_Check;
    answer.appendChild(correct);
    var fault = document.createElement('fault');
    fault.className = 'fault';
    fault.innerHTML = "違うやないかい!";
    fault.onclick = f_Check;
    answer.appendChild(fault);
}

function Start(){
    Setnumber();
    Setmessage();
    document.getElementById('question').innerHTML = message;
}

function Next(){
    Setnumber();
    Setmessage();
    document.getElementById('question').innerHTML = message;
}

function Setnumber(){
    artist_num = Math.floor(Math.random() * 10);
    song_num = Math.floor(Math.random() * 10);
}

function Setmessage(){
    message = "それでは聞いてください!「" + artists[artist_num] + "」で「" + songs[song_num] + "」!";
}

function c_Check(){
    if (backTimer) return;

    if(artist_num == song_num){
        combo++;
        score += 500*combo;
    } else {
        combo = 0;
        score += -500;
    }
    Next();
}

function f_Check(){
    if (backTimer) return;

    if(artist_num != song_num){
        combo++;
        score += 100*combo;
    } else {
        combo = 0;
        score += -200;
    }
    Next();
}

function startTimer(){
    timer = setInterval(showSecond, 1000);
}

function showSecond(){

    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    if(elapsedTime >= 90){
        elapsedTime = 90;
    }
    var str = '経過秒数: ' + (90-elapsedTime) + '秒, SCORE: ' + score;
    if(elapsedTime == 90){
        question.remove();
        answer.remove();
    }

    var re = document.getElementById('result');
    re.innerHTML = str;
}