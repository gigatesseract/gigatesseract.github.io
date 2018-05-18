
var header = document.getElementById("header");
header.onmouseover = function(){

  header.style.background = "rgba(239,138,138,1)";
}
header.onmouseout = function(){

  header.style.background = "rgba(239,138,138,0.85)";
}
var project = document.getElementById('project');
var beam = document.getElementById('beam');
var wb = document.getElementById('wordbuilding');
var bingo = document.getElementById('bingo');
function func(){
  var img1 = document.createElement('img');
  img1.src = "/continuous-beam.jpg";
  img1.alt = "Civil project sem1";
  img1.className = "image";
  project.appendChild(img1);
  console.log("hello");
}
wb.onmouseover = function(){
  var img1 = document.createElement('img');
  img1.src = "/wordbuilding.jpg";
  img1.alt = "wordbuilding";
  img1.className = "image";
  project.appendChild(img1);
  console.log("hello");
}
bingo.onmouseover = function(){
  var img1 = document.createElement('img');
  img1.src = "/bingo.jpg";
  img1.alt = "bingo project";
  img1.className = "image";
  project.appendChild(img1);
  console.log("hello");
}
function func4(){
  var img1 = document.createElement('img');
  img1.src = "/123.jpg";
  img1.alt = "fallback";
  img1.className = "image";
  project.appendChild(img1);
  console.log("hello");
}
beam.addEventListener("mouseover", func);
// wb.addEventListener("mouseout", func4);
// beam.addEventListener("mouseout", func4);
// bingo.addEventListener("mouseout", func4);
