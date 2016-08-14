//things to do: figure out how to incorporate tags, include about and search pages (figure out how to add them to website), add web to stuff matters post


var w = 680,
    h=400;
var circleWidth = 5;

var palette = {
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
    {name: "Colloquium mentum: 7 min", target:[1],href: "posts/stuffmatters.html"},
    {name: "July 2016: 3 min", target:[0],href: "posts/july2016.html"},
    {name: "Making Shrikhand: 3 min", target:[1],href: "posts/makingshrikhand.html"}
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
    .attr('stroke', palette.gray)

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
    .attr('r', circleWidth)
    .attr('fill', palette.pink)




node.append('text')
    .text(function(d){return d.name})

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
