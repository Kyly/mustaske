var graphDataFormat = {
  labels: ['A', 'B', 'C', 'D','E'],
  datasets: [
    {
      label: 'My First dataset',
      fillColor: 'rgba(32,89,127,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: [20, 70, 10, 40,30]
    }
  ]
};

/**
 * Contains definition of the graph class for pulls
 */
function Graph(canvas) {
  this.graph = {};
  this.canvas = canvas;
  this.createGraph(canvas);
}

Graph.prototype.createGraph = function (canvas) {
  var options = {
    responsive: true,
    maintainAspectRatio: false
  };
  this.graph = new Chart(canvas).Bar(graphDataFormat, options);
}

Graph.prototype.update = function () {
  this.graph.update();
}

Graph.prototype.updateValue = function (key, value) {
  var labels = graphDataFormat.labels;
  var index = labels.indexOf(key);
  if (index > labels.length)
    return;

  this.graph.datasets[0].bars[key].value = value;
  this.graph.update();
}

Graph.prototype.graph = function () { return this.graph; }
Graph.prototype.canvas = function () { return this.canvas; }