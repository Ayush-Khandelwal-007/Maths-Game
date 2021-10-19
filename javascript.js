var isPlaying = false;
var score = 0;
var highScore={score:0,time:'inf'};
var action;
var timelef = 0;
var temp;
var pos = 100;

document.getElementById("startreset").onclick = function () {
    if (isPlaying == true) {
        location.reload();
    }
    else {
        getHighScore();
        chupJa("gameover");
        dikhja("score");
        var x = document.getElementsByClassName("box");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.visibility = "visible";
        }
        dikhja("question");
        dikhja("instruction");
        isPlaying = true;
        score = 0;
        document.getElementById("value").innerHTML = score;
        document.getElementById("startreset").innerHTML = "Reset Game";
        timelef = temp;
        startCountdown();
        chalu();
        chupJa("correct");
        chupJa("wrong");
    }
}

function getHighScore() {
    var dbRef = db.ref().child("scores");
    console.log('called');
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if(data!=null){
            highScore=data;
            document.getElementById("hvalue").innerHTML = data.score;
        }
    });
}

function startCountdown() {
    document.getElementById("time").innerHTML = timelef;
    action = setInterval(function () {
        timelef--;
        document.getElementById("time").innerHTML = timelef;
        if (timelef <= 0) {
            clearInterval(action);
            dikhmat("startreset");
            document.getElementById("one").innerHTML = `<br><br>GAME OVER!<br><br>YOUR SCORE IS ${score} in ${temp} second.<br>`;
            document.getElementById("two").innerHTML = `<br><br>Your score per second is ${score/temp}`;
            getHighScore();
            if(score/temp>highScore.score){
                db.ref('scores').set({
                    score:score/temp,
                    time:temp,
                  });
                document.getElementById("two").innerHTML = `<br><br>YOU MADE A NEW HIGH SCORE`;
                document.getElementById("hvalue").innerHTML = score/temp;
            }
            aaja("gameover");
            chupJa("timerem");
            chupJa("correct");
            chupJa("wrong");
            isPlaying = false;
            document.getElementById("startreset").innerHTML = "Start Game Again";
            var x = document.getElementsByClassName("box");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.visibility = "hidden";
                dikhmat("question");
                dikhmat("instruction");
            }
        }
    }, 1000)

}

document.getElementById("set").onclick = function () {
    timelef = document.getElementById("timereq").value;
    dikhja("startreset");
    temp = timelef;
    if (timelef <= 0) {
        location.reload();
        aaja("wrong");
    }
    else {
        document.getElementById("time").innerHTML = timelef;
        aaja("timerem");
    }
}

document.getElementById("timereq")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("set").click();
        }
    });

function chupJa(id) {
    document.getElementById(id).style.display = "none";
}

function dikhmat(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function aaja(id) {
    document.getElementById(id).style.display = "block";
}

function dikhja(id) {
    document.getElementById(id).style.visibility = "visible";
}

function chalu() {
    var x = Math.round(9 * Math.random()) + 1;
    var y = Math.round(9 * Math.random()) + 1;
    pos = Math.round(3 * Math.random()) + 1;
    document.getElementById("question").innerHTML = `${x} * ${y}`;
    var lis = [];
    lis.push(x * y);
    for (var i = 1; i <= 4; i++) {
        if (i == pos) {
            document.getElementById(`box${i}`).innerHTML = x * y;
        }
        else {
            var kuchbhi = (Math.round(9 * Math.random()) + 1) * (Math.round(9 * Math.random()) + 1);
            while (lis.includes(kuchbhi)) {
                kuchbhi = (Math.round(9 * Math.random()) + 1) * (Math.round(9 * Math.random()) + 1);
            }
            lis.push(kuchbhi);
            document.getElementById(`box${i}`).innerHTML = kuchbhi;
        }
    }
    if (isPlaying == true) {
        for (var i = 1; i <= 4; i++) {
            if (i === pos) {
                document.getElementById(`box${i}`).onclick = function () {
                    aaja("correct");
                    score++;
                    setTimeout(function () { chupJa("correct"); }, 700);
                    document.getElementById("value").innerHTML = score;
                    chalu();
                }
            }
            else {
                document.getElementById(`box${i}`).onclick = function () {
                    aaja("wrong");
                    setTimeout(function () { chupJa("wrong"); }, 700);
                }
            }
        }
    }
}