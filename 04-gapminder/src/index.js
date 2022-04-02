/* import * as d3 from 'd3'
// Pour importer les données
// import file from '../data/data.csv'
import dataPib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv' 
import dataEspérance from '../data/life_expectancy_years.csv'
import dataPop from '../data/population_total.csv' */
/* import file from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import file from '../data/life_expectancy_years.csv'
import file from '../data/population_total.csv' */


/* Vous aurez sur l'axe X les données de PIB par habitant et sur l'axe Y l'espérance de vie. La taille des cercles devra être proportionnelle à la population du pays. 
data/income_per_person_gdp_percapita.csv        : PIB par habitant par pays et pour chaque année depuis 1800
data/life_expectancy_years.csv                  : espérance de vie par pays et pour chaque année depuis 1800
data/population_total.csv                       : population depuis 1800
*/




import * as d3 from 'd3'

import dataPib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import dataEsperance from '../data/life_expectancy_years.csv'
import dataPop from '../data/population_total.csv'


/* for (let i = 0; i < dataPop.length; i++) {
    console.log(cleanData(dataPop[i]["2021"]));
} */


const maxGDP = d3.max(dataPib, function(d) { return cleanData(d[2021]); });
const minGDP = d3.min(dataPib, function(d) { return cleanData(d[2021]); });
const maxExpectancy = d3.max(dataEsperance, function(d) { return cleanData(d[2021]); })
const minExpectancy = d3.min(dataEsperance, function(d){return cleanData(d[2021]); })
const maxPop = d3.max(dataPop, function(d) { return cleanData(d[2021]); })
const minPop = d3.min(dataPop, function(d){return cleanData(d[2021]); })

console.log(maxExpectancy)

const margin = {
        top: 50,
        right: 10,
        bottom: 0,
        left: 100
    },
    width = window.innerWidth * 0.7 - margin.left - margin.right,
    height = window.innerHeight * 0.9 - margin.top - margin.bottom;

const svgGraph = d3.select('body').append('svg').attr('class', 'graph');

svgGraph.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear()
    .domain([minGDP, maxGDP])
    .range([10, width]);

svgGraph.append('g')
    .attr("transform", "translate(5," + height + ")")
    .call(d3.axisTop(x).ticks(35).tickSize(10)).selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.6em")
    .attr("dy", "2.4em")
    .attr("transform", "rotate(-65)");


const y = d3.scalePow()
    .domain([0, maxExpectancy])
    .range([height, 0])
    .exponent(7);

svgGraph.append('g')
    .call(d3.axisRight(y).ticks(10)); 
    

const r = d3.scaleSqrt()
    .domain([minPop, maxPop])
    .range([0, 30]);


for (let i = 0; i < dataPop.length; i++) {
    if (dataPib[i]['2021'] && dataEsperance[i]['2021'] && dataPop[i]['2021'] && dataEsperance[i]['2021']>0) {
        svgGraph.append("circle")
        .attr("cx", x(cleanData(dataPib[i]["2021"]))).attr("cy", y(dataEsperance[i]["2021"])).attr("r", r(cleanData(dataPop[i]["2021"]))).attr('data-life', dataEsperance[i]['2021']).attr('data-country', dataEsperance[i]['country']).style("fill", "red");   
    }
}


function cleanData(data) {
    if (isNaN(data)) {
        if (data.includes("k")) {
            const n = data.split("k")[0];
            return Number.parseFloat(n) * 1000;
        } else if (data.includes("M")) {
            const n = data.split("M")[0];
            return Number.parseFloat(n) * 1000000;

        } else if (data.includes("B")) {
            const n = data.split("B")[0];
            return Number.parseFloat(n) * 1000000000;
        }
    }
    return data;
}