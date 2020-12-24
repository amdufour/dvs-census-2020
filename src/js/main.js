// Variables
const overviewWidth = 350;
const overviewHeight = 600;
const padding = 3;
const radiusMin = 2;
const radiusMax = 15;

// Colors
const bronze = '#998675';
const bronzePale = '#E9E4E1';

console.log(responses);

// Scales
const datavizExperienceScale = d3.scaleLinear()
  .domain([0, 28])
  .range([Math.PI * Math.pow(radiusMin, 2), Math.PI * Math.pow(radiusMax, 2)]);

// A first test for Analysts
let responses_analysts = [];
let responses_designers = [];
responses.forEach(response => {
  if ((response.main_employed_activity && response.main_employed_activity === 'Analyst') || (response.main_freelance_activity && response.main_freelance_activity === 'Analyst')) {
    responses_analysts.push(response);
  } else if ((response.main_employed_activity && response.main_employed_activity === 'Designer') || (response.main_freelance_activity && response.main_freelance_activity === 'Designer')) {
    responses_designers.push(response);
  }
});

// Append svg
const overviewAnalysts = d3.select('.overviews').append('div')
  .attr('class', 'overview overview-analysts');
const svgAnalysts = overviewAnalysts.append('svg')
  .attr('width', overviewWidth)
  .attr('height', overviewHeight)
  .style('background-color', bronzePale);
overviewAnalysts.append('h2')
  .text('Analysts');

const overviewDesigners = d3.select('.overviews').append('div')
  .attr('class', 'overview overview-designers');
const svgDesigners = overviewDesigners.append('svg')
  .attr('width', overviewWidth)
  .attr('height', overviewHeight)
  .style('background-color', bronzePale);
overviewDesigners.append('h2')
  .text('Designers');

// Append arches
const archesAnalysts = svgAnalysts.append('g')
  .attr('class', 'arches')
  .attr('stroke', 'white')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
const archesDesigners = svgDesigners.append('g')
  .attr('class', 'arches')
  .attr('stroke', 'white')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const archesData = [
  {class: 'arch_0-5', height: 300},
  {class: 'arch_6-10', height: 350},
  {class: 'arch_11-15', height: 400},
  {class: 'arch_16-20', height: 450},
  {class: 'arch_21-25', height: 500},
  {class: 'arch_26-30', height: 550}
];
archesData.forEach(arch => {
  archesAnalysts.append('path')
    .attr('class', arch.class)
    .attr('d', `M0,${overviewHeight} C35,${overviewHeight} ${(overviewWidth / 2) - 100},${overviewHeight - arch.height} ${overviewWidth / 2},${overviewHeight - arch.height} ${(overviewWidth / 2) + 100},${overviewHeight - arch.height} ${overviewWidth - 35},${overviewHeight} ${overviewWidth},${overviewHeight}`);
  archesDesigners.append('path')
    .attr('class', arch.class)
    .attr('d', `M0,${overviewHeight} C35,${overviewHeight} ${(overviewWidth / 2) - 100},${overviewHeight - arch.height} ${overviewWidth / 2},${overviewHeight - arch.height} ${(overviewWidth / 2) + 100},${overviewHeight - arch.height} ${overviewWidth - 35},${overviewHeight} ${overviewWidth},${overviewHeight}`);
});

// Append nodes
responses_analysts.forEach(response => {
  let archPath;
  switch (response.years_professional_experience) {
    case '5 or less':
      archPath = d3.select('.arch_0-5').node();
      break;
    case '5-10':
      archPath = d3.select('.arch_6-10').node();
      break;
    case '11-15':
      archPath = d3.select('.arch_11-15').node();
      break;
    case '16-20':
      archPath = d3.select('.arch_16-20').node();
      break;
    case '21-25':
      archPath = d3.select('.arch_21-25').node();
      break;
    case '26-30':
      archPath = d3.select('.arch_26-30').node();
      break;
  }
  const positionAlongPath = archPath.getPointAtLength(archPath.getTotalLength() * Math.random());
  response.overview_position = positionAlongPath;
});
console.log(responses_analysts);

let simulationAnalysts = d3.forceSimulation(responses_analysts)
  .force('x', d3.forceX(d => d.overview_position.x))
  .force('y', d3.forceY(d => d.overview_position.y))
  .force('collide', d3.forceCollide(d => Math.sqrt(datavizExperienceScale(d.years_dataviz_experience) / Math.PI) + padding))
  .stop();

const nodesGroup = svgAnalysts.append('g')
  .attr('class', 'nodes')
  .attr('fill', bronze)
  .attr('fill-opacity', 0.6)
  .attr('stroke', bronze);

let nodesAnalysts = nodesGroup.selectAll('circle')
  .data(responses_analysts, d => d.uid)
  .join('circle')
  .attr('r', d => Math.sqrt(datavizExperienceScale(d.years_dataviz_experience) / Math.PI))
  .attr('cx', d => d.overview_position.x)
  .attr('cy', d => d.overview_position.y);

simulationAnalysts.on('tick', () => {
  nodesAnalysts
    .attr('cx', d => d.overview_position.x)
    .attr('cy', d => d.overview_position.y);
});

responses_designers.forEach(response => {
  let archPath;
  switch (response.years_professional_experience) {
    case '5 or less':
      archPath = d3.select('.arch_0-5').node();
      break;
    case '5-10':
      archPath = d3.select('.arch_6-10').node();
      break;
    case '11-15':
      archPath = d3.select('.arch_11-15').node();
      break;
    case '16-20':
      archPath = d3.select('.arch_16-20').node();
      break;
    case '21-25':
      archPath = d3.select('.arch_21-25').node();
      break;
    case '26-30':
      archPath = d3.select('.arch_26-30').node();
      break;
  }
  const positionAlongPath = archPath.getPointAtLength(archPath.getTotalLength() * Math.random());
  response.overview_position = positionAlongPath;
});
console.log(responses_designers);

let simulationDesigners = d3.forceSimulation(responses_designers)
  .force('x', d3.forceX(d => d.overview_position.x))
  .force('y', d3.forceY(d => d.overview_position.y))
  .force('collide', d3.forceCollide(d => Math.sqrt(datavizExperienceScale(d.years_dataviz_experience) / Math.PI) + padding))
  .stop();

const nodesGroupDesigners = svgDesigners.append('g')
  .attr('class', 'nodes')
  .attr('fill', bronze)
  .attr('fill-opacity', 0.6)
  .attr('stroke', bronze);

let nodesDesigners = nodesGroupDesigners.selectAll('circle')
  .data(responses_designers, d => d.uid)
  .join('circle')
  .attr('r', d => Math.sqrt(datavizExperienceScale(d.years_dataviz_experience) / Math.PI))
  .attr('cx', d => d.overview_position.x)
  .attr('cy', d => d.overview_position.y);

simulationDesigners.on('tick', () => {
  nodesDesigners
    .attr('cx', d => d.overview_position.x)
    .attr('cy', d => d.overview_position.y);
});
