// ------- TEAMS DATA ------- //
// Get the data
const teams = "./data-json/teams.json";

// Fetch the JSON data and console log it
d3.json(teams).then(function(teams_data) {
    // console.log(teams_data[0]);
  });

  // INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init() {

    // Use D3 to select the dropdown menu  
    let dropdownMenu = d3.select("#selTeam");

    // Get the team names and populate the dropdown options
    d3.json(teams).then((teams_data) => {
        
        // Add team names to the dropdown menu
        teams_data.forEach((team) => {

            // console.log(team);

            dropdownMenu.append("option").text(team['shortDisplayName']).property("value", team['shortDisplayName']);
        });

        // Get the first team
        let firstTeam = teams_data[0]['shortDisplayName'];

        // Console log the first team details
        // console.log(firstTeam);

        // Create the initial plots and demographic info
        teamCharts(firstTeam);
        teamDemoInfo(firstTeam);
    });
    };
// INIT ENDS HERE



// UPDATE THE CHARTS AND DEMOGRAPHIC INFO 
// Change the charts and demographic info box based on dropdown selection
function teamOptionChanged(newTeam) {
    teamCharts(newTeam);
    teamDemoInfo(newTeam);
    };

// BUILD THE CHARTS
// Create a function to build the charts
function teamCharts(teamName) {

    // Use D3 to retrieve all data
    d3.json(teams).then((teams_data) => {

    // Filter team data by name
    let filteredTeam = teams_data.filter(team => team['shortDisplayName'] == teamName);

        // console.log(filteredTeam);

    // Get the first team
    let firstTeam = filteredTeam[0];

        console.log(firstTeam);

    // Create a win-loss chart
    // let winLossData = [{ x: ['Wins', 'Losses'], 
    //                     y: [firstTeam['wins'], firstTeam['losses']], 
    //                     type: 'bar',
    //                     marker: {
    //                         color: '#003366',
    //                         line: {
    //                             color: '#CC0000',
    //                             width: 1.5
    //                           },
    //                         opacity: 0.9,
    //                       }}];

    // Create the chart options object
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Result Metrics<br>2022',
            align: 'center',
            verticalAlign: 'middle',
            y: -60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -30,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            },
            enableMouseTracking: true
        },
        series: [{
            type: 'pie',
            name: 'Result percentage',
            innerSize: '50%',
            data: [
                ['Win', firstTeam.wins],
                ['Loss', firstTeam.losses],
                ['Ties', firstTeam.ties],
                {
                    dataLabels: {
                        enabled: true
                    }
                }
            ]
        }]
    };
    
    // Create the chart
    Highcharts.chart('team-chart2', options);






    // Create an average points chart
    // let avgPointsData = [
    // {
    //     x: [firstTeam.avgPointsAgainst],
    //     y: [firstTeam.avgPointsFor],
    //     mode: 'markers',
    //     type: 'scatter',
    //     name: 'Avg Points'
    // }
    // ];

    // let avgPointsLayout = {
    // xaxis: { title: 'Average Points Against' },
    // yaxis: { title: 'Average Points For' }
    // };

    // // Create a games played chart
    // let gamesPlayedData = [
    // { x: ['Losses', 'Ties', 'Wins'], 
    //     y: [firstTeam.losses, firstTeam.ties, firstTeam.wins], 
    //     type: 'bar',
    //     marker: {
    //         color: '#003366',
    //         line: {
    //             color: '#CC0000',
    //             width: 1.5
    //           },
    //         opacity: 0.9,
    //       } }
    // ];

        // Render the plot to the div tag with the relevant ids
        // Plotly.newPlot('team-chart1', winLossData);
        Plotly.newPlot('team-chart2', avgPointsData, avgPointsLayout);
        // Plotly.newPlot('team-chart1', gamesPlayedData);
        
    });
};
// .catch(error => console.error(error));


// TEAM INFORMATION
// Create a function to get team's Information
function teamDemoInfo(teamName) {

    // Use D3 to retrieve all data
    d3.json(teams).then((teams_data) => {

    // Filter team data by name
        let filteredTeam = teams_data.filter(teams_data => teams_data.shortDisplayName == teamName);
        
        // Retrieve all required information
        let team_info = {
            'Team Name': filteredTeam[0]['displayName'], 
            'Location': filteredTeam[0]['location'],
            'Games Played': filteredTeam[0]['gamesPlayed'],
            'Win Percent': filteredTeam[0]['winPercent'], 
            'Points': filteredTeam[0]['points']
        };

        // let obj = filteredTeam[0]

         // Fecht Team Logos
        d3.select("#team-logo").html("");
        d3.select("#team-logo").append('img').attr('src', filteredTeam[0]['logos']).attr('alt', filteredTeam[0]['shortDisplayName']).attr('height', 150)


        console.log(filteredTeam[0]['logos'])

        d3.select("#team-metadata").html("");
         let entries = Object.entries(team_info);
         entries.forEach(([key,value]) => {
            d3.select("#team-metadata").append("h5").text(`${key}: ${value}`);
        });
  });
};

// Call the initialization function
init();










