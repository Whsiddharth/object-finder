input="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(500,300);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects..";

    input=document.getElementById("input_text").value;
    console.log(input);
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function draw(){
    image(video,0,0,500,300);

    if (status != ""){
        objectDetector.detect(video, gotResult);

        for(var xyz=0; xyz<objects.length; xyz++){
            fill("aliceblue");
            percent=Math.floor(objects[xyz].confidence*100);
            console.log(percent);
            text(objects[xyz].label + " " + percent + "%", objects[xyz].x+5, objects[xyz].y+10);
            noFill();
            stroke("aliceblue");
            rect(objects[xyz].x, objects[xyz].y, objects[xyz].width, objects[xyz].height);
        }
        if (input == objects[0].label){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML=input+" found!";
        }
    }
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}