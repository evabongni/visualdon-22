// Rectangle - On click


function changeColor(){

    console.log("afv");
    
    if (document.getElementById("rectangle").getAttribute("fill") === "blue") {
        
        document.getElementById("rectangle").setAttribute("fill", "red");

    } else {
        document.getElementById("rectangle").setAttribute("fill", "blue");
    }
  
}

// Donut - On hover

document.getElementById("donutExt").addEventListener("mouseover", mouseOver);
document.getElementById("donutExt").addEventListener("mouseout", mouseOut);

function mouseOver() {
  document.getElementById("donutExt").setAttribute("r", "62")
  console.log("in")
}

function mouseOut() {
  document.getElementById("donutExt").setAttribute("r", "60")
  console.log("out")
}
