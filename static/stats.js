// ------- STATISTICS DATA ------- //
// Get the data
const stats = "./data-json/stats.json";

// Fetch the JSON file
fetch(stats)
  .then(response => response.json())
  .then(data => {

    // Filter the data by the home team
    const filteredData = data.filter(obj => obj.home === 'Giants');

    // Create the chart options object
    const options = {
        chart: {
        type: 'line'
        },
        title: {
            text: 'Scores Away vs. Scores Home'
        },
        subtitle: {
            text: "2002 - 2022"
        },
        xAxis: {
            categories: filteredData.map(row => row.date)
        },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Scores Away',
            data: filteredData.map(row => row.score_away)
        }, {
            name: 'Scores Home',
            data: filteredData.map(row => row.score_home)
        }],
        turboThreshold: 10000000
    };
    
    // Create the chart
    Highcharts.chart('container', options);
  })
  .catch(error => console.error(error));
              