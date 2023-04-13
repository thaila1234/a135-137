var objects = [ ];
var video = " ";
var status = " ";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(500, 350);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 450, 450);
    if (status != " "){
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("qtdObjetos").innerHTML = "Quantidade de objetos detectados: "+objects.length;

            fill("#FF0000")        
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#b91313");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function iniciar(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded(){
    console.log("Modelo Carregado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}