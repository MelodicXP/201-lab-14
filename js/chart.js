'use strict';

let canvasElem = document.getElementById('chart')

// TODO: - Done - Instantiate a new AppState

// TODO: - Done - Use a method on that AppState to load vote data from localStorage.

// TODO: - Done - Create a data object for chart.js using your AppState's allProducts array.

// TODO: - Done - Combine the data object with configuration information for chart.js type, colors, etc

// TODO: - Done - Call chart.js with the configuration and the canvasElem

function renderChart() {
  let state = new AppState(); //contains allProducts[] empty array
  state.loadItems(); // loads data from local storage or creates new objects
  console.log('Items from state in renderChart >>>', state);

   // Prepare chart data
   let chartLabels = [];
   let chartViews =[];
   let chartVotes = [];

   console.log('Data in state.name>>> ', state.allProducts);

   for(let i = 0; i < state.allProducts.length; i++) {
    chartLabels.push(state.allProducts[i].name);
    chartViews.push(state.allProducts[i].timesShown);
    chartVotes.push(state.allProducts[i].timesClicked);
  }
  console.log('Data inside Chart Labels',chartLabels);
  console.log('Data inside Chart Views',chartViews);
  console.log('Data inside Chart Votes',chartVotes);

  let chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14 // set font size for chart legends
          }
        }
      }
    },
    // Set bar chart horizontally
    indexAxis: 'x',
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: true
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Configure chart datasets
  let chartDatasets = [
    {
      label: '# of Views',
      data: chartViews,
      borderWidth: 0.75,
      borderColor: '#000000',
      backgroundColor: '#7fffd4'
    },
    {
      label: '# of Votes',
      data: chartVotes,
      borderWidth: 0.75,
      borderColor: '#000000',
      backgroundColor: '#ffa07a'
    }
  ];

  // Create chart object
  let chartConfig = {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: chartDatasets
    },
    options: chartOptions
  };

  // Render chart
  new Chart(canvasElem, chartConfig);
}

renderChart();

