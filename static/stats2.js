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
        // type: 'line',
        zoomType: 'x'
        },
        title: {
            text: 'Passing Yards vs. Rushing Yards'
        },
        subtitle: {
            text: "2002 - 2023"
        },
        xAxis: {
            categories: filteredData.map(row => row.date)
        },
        yAxis: {
            title: {
                text: 'Attempts'
            }
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                enableMouseTracking: true,
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Passing Yards Away',
            data: filteredData.map(row => row.passing_yards_away)
            }, 
            {
            type: 'area',
            name: 'Passing Yards Home',
            data: filteredData.map(row => row.passing_yards_home)
            },
            {
            type: 'area',
            name: 'Rushing Yards Away',
            data: filteredData.map(row => row.rushing_yards_away)
            }, 
            {
            type: 'area',
            name: 'Rushing Yards Home',
            data: filteredData.map(row => row.rushing_yards_home)
            }
        ],
    };
    
    // Create the chart
    Highcharts.chart('container', options);
  })
  .catch(error => console.error(error));
              