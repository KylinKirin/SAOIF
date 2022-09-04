function throwpole(){
  var p_x = 2130;
  var p_y = 760;
  var color1 = "#ffbfe7e7"  // 1st color
  var temp = $images.captureScreen();
  sleep(500);
  var c = images.pixel(temp,p_x,p_y);
  if ($colors.isSimilar(color1,c,30)){

    click(p_x,p_y);
    sleep(100);
  }
  else{
    toastLog("Not fishing");
    exit();
  }
}

function ifeat(){
  var p_x = 2214;
  var p_y = 759;
  var temp;
  var color2 = "#fffbce51";  // 2nd color

  while(true){
    temp = $images.captureScreen();
    sleep(100);
    var c = images.pixel(temp,p_x,p_y);
    if ($colors.isSimilar($colors.parseColor(color2),c)){
      click(p_x,p_y);
      toastLog("Done!");
      return;
    }
    // else{
    //   toast($colors.toString(c));
    // }
  }
}

function hit(){
  var color3 = "#ffc8f29c";  //green 1640-1940
  var color4 = "#ffb3ffff";  //blue fish
  while(true){
    var temp1 = $images.clip(captureScreen(),1725,220,10,500);
    var temp2 = $images.clip(captureScreen(),1775,200,10,570);

    // var temp = $images.clip(captureScreen(),1685,200,50,570);

    // sleep(25);
    var green_bar = $images.findColor(temp1,color3,{threshold:10});
    var blue_fish = $images.findColor(temp2,color4,{threshold:5});
    // green_bar = $images.findMultiColors(temp,color3,[[0,80,color4]],{threshold:10});
    // toastLog("GREEN:"+green_bar);
    // toastLog("BLUE:"+blue_fish);
  if(green_bar&&blue_fish){
    // -10<=parseFloat($images.findColor(temp,color3).y)-parseFloat($images.findColor(temp,color4).y)<=10
    if(Math.abs(parseFloat(green_bar.y)-parseFloat(blue_fish.y))<5){
      click(2130,760);
      // sleep(100)
      // toastLog(parseFloat(green_bar.y)-parseFloat(blue_fish.y));
      sleep(2000);
    }
  }  
  else{
    // toastLog("green or blue was not found...");
    temp1.recycle();
    temp2.recycle();
    // temp.recycle();
    sleep(6000);
    var color5 = "#fff5f8fc"; //white
    // var dic1 = "/storage/emulated/0/DCIM/Screenshots/suc.jpg";
    // var pic1 = $images.clip($images.read(dic1),1520,265,120,80);
    // toastLog($colors.toString($images.pixel(captureScreen(),850,400)));
    if($colors.isSimilar(color5,$images.pixel(captureScreen(),850,400),20)){
      click(1609,322);
      // sleep(500);
      // pic1.recycle();
      sleep(100);
      return true;
    }
    else{
      // pic1.recycle();
      // toastLog("white was not found");
      sleep(100);
      return false;
    }
  }
  temp1.recycle();
  temp2.recycle();
  // temp.recycle();
  }
}

function sub(){

  var res = hit();
  if(res){
    main();
  }
  else{
    sub();
  }
}

function main(){
  if(count>1){
    sleep(150);
    toastLog("Completed "+count+" times");
    sleep(750);
  }
  toastLog("Start fishing...");
  sleep(500);
  throwpole();
  ifeat();
  sleep(1500);
  var res = hit();
  if(res){
    count++;
    main();
  }
  else{
    sleep(1500);
    sub();
  }

}
var count = 0;
var permission = $images.requestScreenCapture();
var saoif = app.getPackageName("SAOIF");
if(currentPackage!=saoif){
  launch(saoif);
}
waitForPackage(saoif);
if (permission){
  setScreenMetrics(1080,2340);
  sleep(1000);
  // console.show();
  // console.setPosition(0, 0);
  main();
}
else{
  toast("No permission")
  exit();
}

