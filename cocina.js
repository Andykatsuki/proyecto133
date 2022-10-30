status="";
results=[];

function preload()
{
    img=loadImage("cocina.jpg");
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="estatus: detectando objetos";
}
function modelLoaded()
{
    console.log("¡modelo cargado!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    object=results;
}

function draw()
{
    image(video,0,0,380,380);
    if (status != "")
    {

        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length; i++)
        {
            document.getElementById("status").innerHTML="estatus: objeto detectado";

            document.getElementById("numero_de_objetos").innerHTML = "Número de objetos detectados: "+ object.length;
            fill(r,g,b);
            porcentaje=floor(object[i].confidence*100);
            text(object[i].label+ " " + porcentaje + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].heigt);
        }
    }
}