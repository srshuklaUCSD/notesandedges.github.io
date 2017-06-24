//things to do: figure out how to incorporate tags, include about and search pages (figure out how to add them to website), add web to stuff matters post


var w = 680,
    h=400;
var circleWidth = 5;

var palette = {
    "white": "#ffffff",
    "llgray": "#f6f6f6",
    "dlgray": "#dadada",
    "lightgray": "#819090",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",

    "darkblue": "#0A2933",
    "darkerblue": "#042029",

    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "#2176C7",
    "green": "#259286",
    "yellowgreen": "#738A05"
}
var nodes = [
    {name: "Colloquium mentum", target:[3,4,7,8,11],href: "posts/stuffmatters.html", width: 5}, //0
    {name: "July 2016", target:[3,4,6,7,8,9,11],href: "posts/july2016.html", width: 7}, //1
    {name: "Making Shrikhand", target:[7],href: "posts/makingshrikhand.html", width: 5},//2
    {name: "August 2016", target:[5,0,1,4,6,7,8,9,11,12,13],href: "posts/august2016.html", width: 11},//3
    {name: "September 2016", target:[5,0,1,4,6,7,8,9,11,12,13],href: "posts/sept2016.html", width: 11},//4
    {name: "Adventures of a Non-Music Major", target:[3,4,7,8,9,11,13,14],href: "posts/adventures1.html", width: 8},//5
    {name: "October 2016", target:[1,3,4,9,11],href: "posts/oct2016.html", width: 5},//6
    {name: "Nov/Dec 2016", target:[5,0,1,3,4,8,911,12,13,14],href: "posts/novdec2016.html", width: 11},//7
    {name: "January 2017", target:[5,0,1,3,4,7,9,11,13],href: "posts/jan2017.html", width: 9},//8
    {name: "March 2017", target:[5,1,3,4,6,7,8,11,13],href: "posts/march2017.html", width: 9},//9
    {name: "April 2017", target:[3],href: "posts/april2017.html", width: 5},//10
    {name: "Am I Insane?", target:[5,0,1,3,4,6,7,8,9,13],href: "posts/amiinsane.html", width: 10},//11
    {name: "The 47 ronin and ZDT", target: [3,4,7,13,14], href: "posts/fortysevenronin.html", width: 5},//12
    {name: "June 2017", target:[5,3,4,7,8,9,11,12],href: "posts/june2017.html", width: 8},//13
    {name: "Meeting with Prof. Okazaki", target:[5,7,12],href: "posts/okazaki.html", width: 5}//14
]
var links = [];
for(var i=0; i<nodes.length; i++){
    if(nodes[i].target !==undefined){
        for(var x=0; x<nodes[i].target.length; x++){

                links.push({
                    source: nodes[i],
                    target: nodes[nodes[i].target[x]]
                })
        }
    }
}


var tempColor;
var myChart = d3.select('#chart')
    .append('svg')
    .attr('width', (w*2))
    .attr('height', h)
var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(.3)
    .charge(-1000)
    .size([w,h])
var d=0;
var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', palette.dlgray)

var node = myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag)
    .on('mouseover', function(d){
        tempColor = this.style.fill;
        d3.select(this)
            .style(
                'fill', palette.yellow
            )
    })
    .on('mouseout', function(d){
        d3.select(this)
            .style(
                'fill', tempColor
            )
    })
    .on('dblclick', function(d,i){
        d3.select(this)
        window.open(d.href)
    })


node.append('circle')
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;})
    .attr('r', function(d){return d.width;})
    .attr('fill', '#551A8B')




node.append('text')
    .text(function(d){return d.name})
    //.style("font",function(d){return d.width})

force.on('tick', function(e){
    node.attr('transform', function(d,i){
        return 'translate('+d.x+', '+d.y+')'
    })
    link
        .attr('x1', function(d){return d.source.x})
        .attr('y1', function(d){return d.source.y})
        .attr('x2', function(d){return d.target.x})
        .attr('y2', function(d){return d.target.y})
})




force.start();
