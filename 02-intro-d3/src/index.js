import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

d3.select("body").append("div").attr("class", "CercleSvg").append("svg")
const svg = d3.select("svg").attr("height", "500").attr("width", "500")

// create circle

svg.append("circle").attr("class", "circles").attr("id", "circle1").attr("cx", "50").attr("cy", "50").attr("r", "40")
svg.append("circle").attr("class", "circles").attr("id", "circle2").attr("cx", "150").attr("cy", "150").attr("r", "40")
svg.append("circle").attr("class", "circles").attr("id", "circle3").attr("cx", "250").attr("cy", "250").attr("r", "40")

// change color and position Attributs

d3.select("#circle1").attr("cx", "100")
d3.select("#circle2").attr("fill", "pink").attr("cx", "200")

// appends

svg.append("text").text("Circle1").attr("x", "35").attr("y", "115");
svg.append("text").text("Circle2").attr("x", "185").attr("y", "215");
svg.append("text").text("Circle3").attr("x", "285").attr("y", "315");

// événements

const circles = d3.selectAll(".circles");

d3.select("#circle3").on("click", () => {
    circles.attr("cx", "150")
});

// données 

const data = [20, 5, 25, 8, 15]

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("width", "20")
.attr("height", d=>d)
.attr("y", d=>500-d)
.attr("x", (d,i)=>i*22+30)