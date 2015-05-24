var graphData = {
  labels: ['A', 'B', 'C', 'D','E'],
  datasets: [
    {
      label: 'My First dataset',
      fillColor: 'rgba(32,89,127,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: [0, 0, 0, 0, 0]
    }
  ]
};

/**
 * Contains definition of the graph class for pulls
 */
function Graph() {
  this.hasGraph = false;
}

Graph.prototype.createGraph = function (canvas) {

  this.canvas = canvas;
  var options = {
    responsive: true,
    maintainAspectRatio: false
  };

  this.graph = new Chart(canvas).Bar(graphData, options);
  this.hasGraph = true;
}

Graph.prototype.update = function () {
  if (this.hasGraph)
    this.graph.update();
}

Graph.prototype.updateData = function (data) {
  $.each(data, this.updateValue);
}

Graph.prototype.updateValue = function (key, value) {

  if (this.hasGraph)
    this.graph.datasets[0].bars[key].value = value;
  else
      var labels = graphData.labels;
      var index = labels.indexOf(key);
      graphData.datasets[0].data[index] = value;

}

Graph.prototype.graph = function () { return this.graph; }
Graph.prototype.canvas = function () { return this.canvas; }