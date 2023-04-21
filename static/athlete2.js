
// ------- ATHLETES DATA ------- //

// Read the data files
const offense = "./data-json/offense.json";
const defense = "./data-json/defense.json";
const special = "./data-json/special.json";
const files = [offense, defense, special];
let promises = [];
let athletes_dataset;


// ATHLETE HEIGHT VS. WEIGHT
// Create a function to get athlete's height and weight information
fetch(files)
  .then(response => response.json())
  .then(data => {

    files.forEach((url) => promises.push(d3.json(url)));
    Promise.all(promises).then(function (data) {
    
    let offense = data[0];
    let defense = data[1];
    let special = data[2];

      [offense, defense, special].forEach(athletes_dataset => {
      athletes_dataset.forEach(player => {

        let layout = ({
            colors: ['rgba(5,141,199,0.5)', 'rgba(80,180,50,0.5)', 'rgba(237,86,27,0.5)']
        });

        const series = [{
            name: 'Offense',
            id: 'offense',
            marker: {
                symbol: 'circle'
            }},
            {name: 'Defense',
            id: 'defense',
            marker: {
                symbol: 'triangle'
            }},
            {name: 'Special',
            id: 'specialTeam',
            marker: {
                symbol: 'square'
            }}
        ];

        getData().then(data => {
            const getData = playerType => {
                const temp = [];
                data.forEach(player => {
                    if (player.type === playerType && player.weight > 0 && player.height > 0) {
                        temp.push([player.height, player.weight]);
                    }
                });
                return temp;
            };
            series.forEach(s => {
                s.data = getData(s.id);
            });
        
        
            
          // Create the chart options object
    const options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Athletes by height and weight',
            align: 'left'
        },
        xAxis: {
            title: {
                text: 'Height'
            },
            labels: {
                format: '{value} inches'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight'
            },
            labels: {
                format: '{value} lbs'
            }
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 2.5,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        tooltip: {
            pointFormat: 'Height: {point.x} inches <br/> Weight: {point.y} lbs'
        },
        series,
        turboThreshold: 10000000
    };


    // Create the chart
    Highcharts.chart('container', options, layout);
  })
  .catch(error => console.error(error));
      
          });
        })})});
