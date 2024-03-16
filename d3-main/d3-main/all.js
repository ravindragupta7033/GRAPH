
const margin = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30
  };
  
  // Dimensions: 400 x 400
  // used for the initial rendering
  // width to height proportion 
  // its preserved as the chart is resized
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  const data = [15, 33, 20];
  
  const xScale = d3.scaleBand().
  padding(0.2).
  domain(data).
  range([0, width]);
  
  const yScale = d3.scaleLinear().
  domain([0, 100]).
  range([height, 0]);
  
  const svg = d3.select('#chart').
  append('svg').
  attr('width', width + margin.left + margin.right).
  attr('height', height + margin.top + margin.bottom).
  call(responsivefy) // Call responsivefy to make the chart responsive
    .append('g').
  attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  svg.selectAll('rect').
  data(data).
  enter().
  append('rect').
  attr('x', d => xScale(d)).
  attr('y', d => yScale(d)).
  attr('width', d => xScale.bandwidth()).
  attr('height', d => height - yScale(d));
  
  svg.append('g').call(d3.axisLeft(yScale));
  
  svg.append('g').
  attr('transform', `translate(0, ${height})`).
  call(d3.axisBottom(xScale));
  
  function responsivefy(svg) {
     
    // Container is the DOM element, svg is appended.
    // Then we measure the container and find its
    // aspect ratio.
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;
         
    // Add viewBox attribute to set the value to initial size
    // add preserveAspectRatio attribute to specify how to scale 
    // and call resize so that svg resizes on page load
    svg.attr('viewBox', `0 0 ${width} ${height}`).
    attr('preserveAspectRatio', 'xMinYMid').
    call(resize);
     
    d3.select(window).on('resize.' + container.attr('id'), resize);
  
    function resize() {
        const targetWidth = parseInt(container.style('width'));
        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth / aspect));
    }
  }
  
  
  
  
  
  
  
  
  
  // ---- Data ----
const data1 = [15, 33, 20, 90, 10, 55, 60, 75, 58, 12];

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

const arcs = pieGenerator(data1);

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
