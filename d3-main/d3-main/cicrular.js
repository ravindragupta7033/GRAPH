// ---- Data ----
const data = [15, 33, 20, 90, 10, 55, 60, 75, 58, 12];

// ---- Paragraph Elements ---- (You can remove this too if not needed)
d3.select('body')
  .selectAll('p')
  .enter()
  .append('p')
  .text(d => d);

// ------- Circular Graph (Pie Chart) -------
const pieChartWidth = 600;  // Adjust as needed
const pieChartHeight = 300; 
const radius = Math.min(pieChartWidth, pieChartHeight) / 2;

const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius - 20);

const pieGenerator = d3.pie()
  .value(d => d); 

const arcs = pieGenerator(data);

const pieChartSvg = d3.select('#chart') 
  .append('svg')
  .attr('width', pieChartWidth) 
  .attr('height', pieChartHeight)
  .append('g')
  .attr('transform', `translate(${pieChartWidth / 2}, ${pieChartHeight / 2})`); 

pieChartSvg.selectAll('path')
  .data(arcs)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('fill', (d, i) => d3.schemeCategory10[i]); 
