const data = [
    { x: 10, y: 20 },
    { x: 40, y: 60 },
    { x: 50, y: 55 },
    // ... more data points
  ];

  // Select the chart container div
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 300);

  // Add margins 
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = svg.attr("width") - margin.left - margin.right;
  const height = svg.attr("height") - margin.top - margin.bottom;

  // Scales
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)]) 
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)]) 
    .range([height, 0]); 

  // Axes
  svg.append("g")
    .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`) 
    .call(d3.axisLeft(yScale));

  // Data points (circles)
  svg.append("g") 
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x)) 
    .attr("cy", d => yScale(d.y))
    .attr("r", 5) 
    .attr("fill", "steelblue"); 