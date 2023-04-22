// ------- STATISTICS DATA ------- //
// Get the data
const stats = "./data-json/stats.json";

// Fetch the JSON data and console log it
d3.json(stats).then(function(stats_data) {
    // console.log(teams_data[0]);
  });

  // INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init() {

    // Use D3 to select the dropdown menu  
    let dropdownMenu = d3.select("#selTeam");

    // Get the team names and populate the dropdown options
    d3.json(stats).then((stats_data) => {
        
        // // Add team names to the dropdown menu
        // stats_data.forEach((team) => {

        //     // console.log(team);

        //     dropdownMenu.append("option").text(team['shortDisplayName']).property("value", team['shortDisplayName']);
        // });

        // Get the first team
        let firstTeam = stats_data[0]['home'];

        // Console log the first team details
        // console.log(firstTeam);

        // Create the initial plots and demographic info
        teamCharts1(firstTeam);
        // teamDemoInfo(firstTeam);
    });
    };


// UPDATE THE CHARTS AND DEMOGRAPHIC INFO 
// Change the charts and demographic info box based on dropdown selection
function teamOptionChanged(newTeam) {
    teamCharts1(newTeam);
    // teamDemoInfo(newTeam);
    };



// BUILD THE CHARTS
// Create a function to build the charts
function teamCharts1(teamName) {

    // Use D3 to retrieve all data
    d3.json(stats).then((stats_data) => {

    // Filter team data by name
    let filteredTeam = stats_data.filter(team => team['home'] == teamName);

        // console.log(filteredTeam);

    // Get the first team
    let firstTeam = filteredTeam[0];

        console.log(firstTeam);

        // SCORES CHART
        // Create the chart options object
        const options1 = {
            chart: {
            type: 'line'
            },
            title: {
                text: 'Scores Away vs. Scores Home'
            },
            subtitle: {
                text: "2002 - 2023"
            },
            xAxis: {
                categories: filteredTeam.map(row => row.date)
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
                data: filteredTeam.map(row => row.score_away)
            }, {
                name: 'Scores Home',
                data: filteredTeam.map(row => row.score_home)
            }],
            turboThreshold: 10000000
        };


        // YARDS
        // Create the chart options object
        const options2 = {
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
                categories: filteredTeam.map(row => row.date)
            },
            yAxis: {
                title: {
                    text: 'Yards'
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
                data: filteredTeam.map(row => row.passing_yards_away)
                }, 
                {
                type: 'area',
                name: 'Passing Yards Home',
                data: filteredTeam.map(row => row.passing_yards_home)
                },
                {
                type: 'area',
                name: 'Rushing Yards Away',
                data: filteredTeam.map(row => row.rushing_yards_away)
                }, 
                {
                type: 'area',
                name: 'Rushing Yards Home',
                data: filteredTeam.map(row => row.rushing_yards_home)
                }
            ],
        };


    // Create the charts
    Highcharts.chart('team-chart3', options1);
    Highcharts.chart('team-chart4', options2);

    });       
};


// Call the initialization function
init();
