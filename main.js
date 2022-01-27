nadiyon_paar="";
bijli="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
song_nadiyon_paar = "";
song_bijli = "";

function preload(){
    nadiyon_paar = loadSound("music1.mp3");
    bijli        = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(500,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,500,380);
    
    fill("#00CBFF");
    stroke("#FFFFFF");

    song_nadiyon_paar = nadiyon_paar.isPlaying();
    console.log(song_nadiyon_paar);

    song_bijli = bijli.isPlaying();
    console.log(song_bijli);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        bijli.stop();
        if(song_nadiyon_paar == false){
            nadiyon_paar.play();
        }
        else{
            console.log("Song Name: Nadiyon Paar Song");
            document.getElementById("song_id").innerHTML = "Song Name: Nadiyon Paar Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        nadiyon_paar.stop();
        if(song_bijli == false){
            bijli.play();
        }
        else{
            console.log("Song Name: Bijli Song");
            document.getElementById("song_id").innerHTML = "Song Name: Bijli Song";
        }
    }
}


function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
  
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}