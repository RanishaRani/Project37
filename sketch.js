//Create variables here
var database , dog, dog1, happyDog, foodS, foodStock;
var feed, addFood, fedTime, lastFed,foodObj;
var foodl;
function preload()
{
dog1 = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(400,600,10,10);
  dog.scale = 0.4;
  database = firebase.database();
  dog.addImage(dog1);

  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  // console.log()
}


function draw() {  
background(46,139,87);
/* if (keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happyDog);}*/

feed = createButton("Feed Ronald!");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood  = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
food1.display();

fedTime  = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed =  data.val();
  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
text("Last Feed : "+ lastFed%12  + "PM",350,30);
  }else if(lastFed == 0 ){
    text("Last Feed : 12 AM",350,30);

  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }

});

  drawSprites();
  //add styles here
  textSize(15)
  text("Press Up Arrow Key to feed Ronald",0,10)
  stroke(3.5);
  textSize(20);
  fill("red");
  
text( "No. of milk bottles available: " + foodS, 300,30);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if (x <= 0){
  x= 0
}
else{
  x = x - 1
}
database.ref('/').update({
  food: x 
})
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}