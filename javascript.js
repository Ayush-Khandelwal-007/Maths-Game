var isPlaying=false;
var score=0;
var action;
var timelef;
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
        aaja("timerem");
        timelef=10;
        document.getElementById("startreset").innerHTML="Reset Game";
        startCountdown();
        chalu();
        chupJa("correct");
        chupJa("wrong");
    }
}

function startCountdown(){
    document.getElementById("time").innerHTML=timelef
    action=setInterval(function(){
        timelef--;
        document.getElementById("time").innerHTML=timelef ;
        if(timelef==0){
            clearInterval(action);
            pos=100;
            aaja("gameover");
            document.getElementById("gameover").style.fontSize="45px";
            document.getElementById("gameover").style.lineHeight="40px"
            document.getElementById("gameover").innerHTML=`GAME OVER!<br><br><br>YOUR SCORE IS ${score}`;
            chupJa("timerem");
            chupJa("correct");
            chupJa("wrong");
            isPlaying=false;
            document.getElementById("startreset").innerHTML="Start Game Again";
        } 
    },1000)
    
}

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
    for(var i=1;i<=4;i++){
        if(i==pos){
            document.getElementById(`box${i}`).innerHTML=x*y;
            lis.push(x*y);
        }
        else{
            var kuchbhi =(Math.round(99*Math.random())+1);
            while(lis.includes(kuchbhi))
            {
                kuchbhi =(Math.round(99*Math.random())+1);
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
                    setTimeout(function(){chupJa("correct");},1000);
                    document.getElementById("value").innerHTML=score;
                    chalu();
                }
            }
            else{
                document.getElementById(`box${i}`).onclick=function(){
                    aaja("wrong");
                    setTimeout(function(){chupJa("wrong");},1000);
                }
            }
        }
    }
}