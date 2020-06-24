var isPlaying=false;
var score=0;
var action;
var timelef=0;
var temp;
var pos =100;

document.getElementById("startreset").onclick=function(){
    if(isPlaying==true){
        location.reload();
    }
    else{
        chupJa("gameover");
        isPlaying=true;
        score=0;
        document.getElementById("value").innerHTML=score;
        document.getElementById("startreset").innerHTML="Reset Game";
        timelef=temp;
        startCountdown();
        chalu();
        chupJa("correct");
        chupJa("wrong");
    }
}

function startCountdown(){
    document.getElementById("time").innerHTML=timelef;
    action=setInterval(function(){
        timelef--;
        document.getElementById("time").innerHTML=timelef ;
        if(timelef<=0){
            clearInterval(action);
            pos=100;
            document.getElementById("one").innerHTML=`GAME OVER!<br><br>YOUR SCORE IS ${score}<br>`;
            document.getElementById("two").innerHTML=``;
            aaja("gameover");
            chupJa("timerem");
            chupJa("correct");
            chupJa("wrong");
            isPlaying=false;
            document.getElementById("startreset").innerHTML="Start Game Again";
        } 
    },1000)
    
}

document.getElementById("set").onclick=function(){
    timelef=document.getElementById("timereq").value;
    temp=timelef;
    if(timelef<=0){
        location.reload();
        aaja("wrong");
    }
    else{
        document.getElementById("time").innerHTML=timelef ;
        aaja("timerem");
    }
}

document.getElementById("timereq")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("set").click();
    }
});

function chupJa(id){
    document.getElementById(id).style.display="none";
}

function aaja(id){
    document.getElementById(id).style.display="block";
}

function chalu(){
    var x=Math.round(9*Math.random())+1;
    var y=Math.round(9*Math.random())+1;
    pos=Math.round(3*Math.random())+1;
    document.getElementById("question").innerHTML=`${x} * ${y}`;
    var lis=[];
    lis.push(x*y);
    for(var i=1;i<=4;i++){
        if(i==pos){
            document.getElementById(`box${i}`).innerHTML=x*y;
        }
        else{
            var kuchbhi =(Math.round(9*Math.random())+1)*(Math.round(9*Math.random())+1);
            while(lis.includes(kuchbhi))
            {
                kuchbhi =(Math.round(9*Math.random())+1)*(Math.round(9*Math.random())+1);
            }
            lis.push(kuchbhi);
            document.getElementById(`box${i}`).innerHTML=kuchbhi;
        }
    } 
    if(isPlaying==true){
        for(var i=1;i<=4;i++){
            if(i===pos){
                document.getElementById(`box${i}`).onclick=function(){
                    aaja("correct");
                    score++;
                    setTimeout(function(){chupJa("correct");},700);
                    document.getElementById("value").innerHTML=score;
                    chalu();
                }
            }
            else{
                document.getElementById(`box${i}`).onclick=function(){
                    aaja("wrong");
                    setTimeout(function(){chupJa("wrong");},700);
                }
            }
        }
    }
}