song = "";
wristX = 0;
wristY = 0;
rwristX = 0;
rwristY = 0;
scorerightwrist = 0;
scoreleftwrist = 0;
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke('#FF0000');

    if (scorerightwrist > 0.2) {
    circle(rwristX, rwristY,20);

    if (rwristY > 0 && rwristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } else if(rwristY > 100 && rwristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    } else if(rwristY > 200 && rwristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }else if(rwristY > 300 && rwristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }else if(rwristY > 400 && rwristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }

    if (scoreleftwrist > 0.2) {
    circle(wristX,wristY,20);
    inNumberLWristY = Number(wristY);
    remove_decimals=floor(inNumberLWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
}
function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {console.info("Pose Net is loaded");}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightwrist = results[0].pose.keypoints[10].score
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLW = ", scoreleftwrist, "| scoreRW = ", scorerightwrist);
        console.log("score left wrist = " , scoreleftwrist);
        wristX = results[0].pose.leftWrist.x;
        wristY = results[0].pose.leftWrist.y;
        console.log(" Left: Xpos:",wristX,'   Ypos:',wristY);
        rwristX = results[0].pose.rightWrist.x;
        rwristY = results[0].pose.rightWrist.y;
        console.log(" Right: Xpos", rwristX," Ypos:",rwristY);
        
    }
}