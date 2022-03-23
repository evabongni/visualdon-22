import * as d3 from 'd3'
import { csv, json } from 'd3-fetch'

/* let tabUsers = []

 fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => tabUsers.push(json))
  .then(tabUsers => console.info(tabUsers))  */

  

d3.select("body").append("div").attr("class","container");
d3.select(".container").append("strong").text("Posts par user : ");
 
const URL = "https://jsonplaceholder.typicode.com/";
let tabUsers = []
let tabPosts = []
let postFiltre
let maxLength=0
let userIdMaxLength
let tab=[]
let i=0
Promise.all([json(`${URL}users`), json(`${URL}posts`)]).then(
    ([users, posts]) => {
	
/* tabUsers.push(users)
console.log(tabUsers)
tabPosts.push(posts)
console.log(tabPosts) */
console.log([users, posts])



/////Nombre de post par user
users.forEach(user => {
    postFiltre = posts.filter(post=>post.userId === user.id)
    console.log(postFiltre)
        d3.select(".container").append("p").text(user.name+" : "+postFiltre.length+" posts")
      })

///// post le plus long

posts.forEach(post_index => {
      
    if (post_index.body.length>maxLength) {
        maxLength = post_index.body.length
        userIdMaxLength = post_index.userId;
      }
        
      })
      d3.select(".container").append("strong").text("post le plus long : ")
      d3.select(".container").append("p").text(users[userIdMaxLength].name+", post de "+maxLength+" caractères")


    

    ////////Dessiner avec les données 
    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg")
    d3.select(".mon-svg").append("svg")
    const myDiv2 = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
  

    users.forEach(user => {
      postFiltre = posts.filter(post=>post.userId === user.id)
      console.log("🚀 ~ file: index.js ~ line 25 ~ .then ~ postFiltre", postFiltre.length)
      tab[i]= postFiltre.length;
      i++;
    })

    //Create chart with precedent tab[]
    const widthRect = 30;
    myDiv2.selectAll("rect")
      .data(tab)
      .enter()
      .append("rect")
      .attr('x', (d,i) => (i*40+50))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');

      //https://jsfiddle.net/xfksm08b/10/
      var texts = myDiv2.selectAll("text")
	      .data(tab)
	      .enter()
	      .append("text");

      texts
      .attr('x', (d,i) => (i*40+55))
      .attr('y', d => 300+20)
	    .text(function(d){ return d});

})