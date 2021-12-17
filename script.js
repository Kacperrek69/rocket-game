window.history.replaceState(null, null, "?Autor=Kacper_Drobik");

var zycia = 3;
var punkty = 0; 

var serca = document.getElementById("serca");

function checkZycia (x, y){
    if(zycia == 1){
        serca.innerHTML = "<img src='img/serce.png' width='30%'>";
    }
    if(zycia == 2){
        serca.innerHTML = "<img src='img/serce.png' width='30%'><img src='img/serce.png' width='30%'>";
    }
    if(zycia == 3){
        serca.innerHTML = "<img src='img/serce.png' width='30%'><img src='img/serce.png' width='30%'><img src='img/serce.png' width='30%'>";
    }
    if(zycia <= 0){
        serca.innerHTML = "<br><br>";
        smierc(x, y);
    }
}

function punkty_nav() {
    var ele_punkty = document.getElementById("punkty");
    ele_punkty.innerHTML = "Punkty: " + punkty;  }



var timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    setInterval(() => {
        if (stoptime == false) {
        sec = parseInt(sec, 10);
        min = parseInt(min, 10);
        hr = parseInt(hr, 10);

        sec = sec + 1;

        if (sec == 60) {
        min = min + 1;
        sec = 0;
        }
        if (min == 60) {
        hr = hr + 1;
        min = 0;
        sec = 0;
        }

        if (sec < 10 || sec == 0) {
        sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
        min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
        hr = '0' + hr;
        }

        timer.innerHTML = hr + ':' + min + ':' + sec; }

    }, 1000);
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
}









var Rakieta = function(x, y){
    this.x = x;
    this.y = y; 
    this.width = window.innerWidth / 17; 
    this.height = window.innerHeight / 10 * 3; 
};

Rakieta.prototype.display = function() {
    if (output == "1"){
        var rhtml = "<img id='img' src='img/rakieta-img.png'>"; }
    if (output == "2"){
        var rhtml = "<img id='img' src='img/rakieta2-img.png'>";}
    if (output == "3"){
        var rhtml = "<img id='img' src='img/rakieta3-img.png'>";} 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

};

Rakieta.prototype.right = function(){
    if(this.x >= window.innerWidth - window.innerWidth / 9){
        this.x += 0;
    }
    else {
        this.x += 15;
    }
    this.element.css({
        left: this.x, 
        top: this.y
    });
};

Rakieta.prototype.left = function(){
    if(this.x <= window.innerWidth / 10){
        this.x -= 0;
    }
    else {
        this.x -= 15;
    }

    this.element.css({
        left: this.x, 
        top: this.y
    });
};

Rakieta.prototype.top = function(){
    if(this.y <= window.innerHeight / 10){
        this.y -= 0;
    }
    else {
        this.y -= 7;
    }

    this.element.css({
        left: this.x, 
        top: this.y
    });
};

Rakieta.prototype.bottom = function(){
    if(this.y >= window.innerHeight - window.innerHeight / 3){
        this.y -= 0;
    }
    else {
        this.y += 7;
    }

    this.element.css({
        left: this.x, 
        top: this.y
    });
};






var Pocisk = function(x, y){
    this.x = x;
    this.y = y; 
    this.width = window.innerWidth / 100; 
    this.height = window.innerHeight / 30; 
};

Pocisk.prototype.display = function() {
    var rhtml = "<img height='3%' src='img/laser.png'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    var interval = setInterval(() => {
        this.y -= 2;
        this.element.css({
            top: this.y
        });
        if (this.y <= -200) {
            this.y = -200; 
            $(this.element).remove();
            clearInterval(interval);
        }

        for (var i = 0; i < tab_m.length; i++){
            var m = tab_m[i]; 
            if(!(r == (undefined)) && isCollide(m, this)){
                console.log("Kolizja pocisku z meteorytem"); 

                var w = new Wybuch (this.x - window.innerWidth / 20, this.y - window.innerHeight / 10);
                w.display();

                this.y = -200;
                this.x = -200;
                this.element.css({
                    top: this.y,
                    left: this.x 
                });
                $(this.element).remove();

                clearInterval(interval);

                punkty += 1;
                punkty_nav(); 

                m.y = window.innerHeight * 2; 
                m.element.css({
                    top: m.y
                });
                $(m.element).remove();
 
            }
        }

        for (var i = 0; i < tab_h_m.length; i++){
            var m = tab_h_m[i]; 
            if(!(r == (undefined)) && isCollide(m, this)){
                console.log("Kolizja pocisku z meteorytem"); 

                var w = new Wybuch (this.x - window.innerWidth / 20, this.y - window.innerHeight / 10);
                w.display();

                this.y = -200;
                this.x = -200;
                this.element.css({
                    top: this.y,
                    left: this.x 
                });
                $(this.element).remove();

                clearInterval(interval);

                punkty += 1;
                punkty_nav(); 

                m.hp -= 1;
            }
        }

    }, 1);

};

function pocisk_start(){
    var p = new Pocisk(r.x + window.innerHeight / 17, r.y);
    p.display();
}









var Meteoryt = function(x, y){
    this.width = window.innerWidth / 20;
    this.height = window.innerHeight / 17; 

    this.x = x;
    this.y = y - this.height; 
};

Meteoryt.prototype.display = function() {
    var rhtml = "<img width='5%' src='img/meteor.png'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    var speed = Math.random() * (1.5 - 0.8) + 0.8;

    var interval = setInterval(() => {
        this.y += speed;
        this.element.css({
            top: this.y
        });
        if (this.y >= window.innerHeight * 2) {
            this.y = window.innerHeight * 2; 
            clearInterval(interval); 
            $(this.element).remove();
        }

        if(!(r == (undefined)) && isCollide(r, this)){
            Kolizja(this.x, this.y, 1);
            this.y = window.innerHeight * 2; 
            $(this.element).remove();
        }
    }, 1);
};



var huge_Meteoryt = function(x, y){
    this.width = window.innerWidth / 10;
    this.height = this.width * 2.6120218; 

    this.x = x;
    this.y = y - this.height; 

    this.hp = getRandomInt(3, 4); 
};

huge_Meteoryt.prototype.display = function() {
    var rhtml = "<img width='10%' src='img/wielki_meteor.png'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y,
        zIndex: 2
    });

    $("body").append(this.element); 

    var speed = Math.random() * (1 - 0.7) + 0.7;
    var q = 1;

    var interval = setInterval(() => {
        this.y += speed;
        this.element.css({
            top: this.y
        });
        if (this.y >= window.innerHeight * 2 || this.hp <= 0) {
            this.y = window.innerHeight * 2; 
            clearInterval(interval); 
            $(this.element).remove();
        }
        
        if(!(r == (undefined)) && isCollide(r, this) && q==1){
            Kolizja(this.x, this.y, 2);
            q = 0;

            if(zycia > 0) {
                this.y = window.innerHeight * 2; 
                $(this.element).remove();
            }
        }
    }, 1);
};







function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

var tab_m = []; 
var tab_h_m = [];

function meteoryty(){
    var d = 0;
    var s = 2150; 
    function resp_m(){
        var interval = setInterval(() => {
            var m = new Meteoryt (getRandomInt(window.innerWidth/9, window.innerWidth - window.innerWidth/9), -20);
            tab_m.push(m);
            m.display();
            
            if (tab_m.length > 20){
                tab_m.shift(); 
            }
            
            d += 1;
            if(d > 10 && s > 500){
                s -= 150; 
                d = 0;
                resp_m(); 
                clearInterval(interval); 
            }

        }, s); 
    }
    resp_m(); 

    setInterval(() => {
        var huge_m = new huge_Meteoryt(getRandomInt(window.innerWidth/9, window.innerWidth - window.innerWidth/9), -20);
        huge_m.display();

        tab_h_m.push(huge_m);

        if(tab_h_m.length > 2){
            tab_h_m.shift(); 
        }
    }, 10000);
}









var Wybuch = function(x, y){
    this.x = x;
    this.y = y; 
};

Wybuch.prototype.display = function() {
    var rhtml = "<img height='20%' style='z-index:2;'src='img/wybuch.gif'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 

    setTimeout(() => {
        this.y = window.innerHeight * 2; 
        this.element.css({
            top: this.y
        });
        $(this.element).remove();
    }, 1000);

};



function Kolizja(x, y, hp){
    console.log("Kolizja rakiety z meteorytem");
    var w = new Wybuch (x, y);
    w.display();
    zycia -= hp; 
    checkZycia(x, y); 
}







var hugeWybuch = function(x, y){
    this.x = x;
    this.y = y; 
};

hugeWybuch.prototype.display = function() {
    var rhtml = "<img height='100%' style='z-index:2;'src='img/wielki_wybuch.gif'>"; 

    this.element = $(rhtml); 

    this.element.css({
        position: 'absolute',
        left: this.x,
        top: this.y
    });

    $("body").append(this.element); 


};



function smierc(x, y){
    console.log("smierc")
    var w_w = new hugeWybuch(x, y - window.innerHeight / 2);
    w_w.display();
    stopTimer();

    r = undefined; 


    newOkno = document.createElement("div");
    document.body.appendChild(newOkno);

    newOkno.style.position = "absolute"; 
    newOkno.style.zIndex = "3";
    newOkno.style.width = "40%";
    newOkno.style.height = "60%";
    newOkno.style.left = "30%";
    newOkno.style.top = "20%";
    newOkno.style.borderRadius = "10px";
    newOkno.style.backgroundColor = "rgb(255, 80, 80)";
    newOkno.style.textAlign = "center";
    newOkno.style.fontSize = "xx-large";
    newOkno.innerHTML = "<h1 style='margin-top:10%; text-shadow: 5px 4px 4px #CE0000;'>Przegrałeś</h1><br><button class='button' style='margin-top: 10%;' type='submit' onclick='window.location.reload(true);'>Restart</button>";
}






function isCollide (entity1,entity2) {
    return !(entity1.x + entity1.width < entity2.x ||
             entity2.x + entity2.width < entity1.x ||
             entity1.y + entity1.height < entity2.y ||
             entity2.y + entity2.height < entity1.y);
}


window.addEventListener('keydown',
    function(event) {
            switch (event.keyCode) {
                case 38: r.top() ; break;
                case 40: r.bottom() ; break;  
                case 32: pocisk_start(); break;                 
            }
            }, false);


window.addEventListener('keydown',
function(event) {
        switch (event.keyCode) {
            case 37: r.left() ; break;
            case 39: r.right() ; break;                
        }
        }, false);    
        
        


const sound = new Audio('img/sound.mp3');
/* window.addEventListener('keydown', () => sound.play()); */



var r = new Rakieta(window.innerWidth / 2 - 50, window.innerHeight / 2 - 50);



function start_game(){
    if(output == 0){
        output = 2;
    }
    okn.remove(); 
    ikon.remove(); 
    r.display();
    checkZycia(); 
    punkty_nav();
    meteoryty(); 
    startTimer();
}




var form = document.querySelector("form");
var output = 0;

function clickk() {
  var data = new FormData(form);
  for (const entry of data) {
    output =  entry[1] ;
  };
  console.log("Wybrałeś rakiete nr: " + output);
}
var okn = document.querySelector("#okno");
var ikon = document.querySelector("#ikon");
var btn = document.querySelector("button");

btn.addEventListener("click", e => {
    start_game();
});
