<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
    .node {
      fill: steelblue;
      stroke: #fff;
    }
  </style>
</head>
<body>
  <svg width="500" height="200"></svg>
  <script>
    var data = [
      {x: 100, y: 50, name: "one"},
      {x: 400, y: 150, name: "two"}
    ];
    var svg = d3.select("svg");
    var node = svg.selectAll(".node")
      .data(data)
      .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 20);
    var fisheye = d3.fisheye.circular()
      .radius(120)
      .distortion(2);
    svg.on("mousemove", function() {
      fisheye.focus(d3.mouse(this));
      node.each(function(d) { d.fisheye = fisheye(d); })
        .attr("cx", function(d) { return d.fisheye.x; })
        .attr("cy", function(d) { return d.fisheye.y; })
        .attr("r", function(d) { return d.fisheye.z * 20; });
    });
  </script>
</body>
</html>
