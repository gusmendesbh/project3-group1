// Get the data
const teams = "./data-json/teams1.json";
const venue = "./data-json/team_venue.json"

// Fetch the JSON data and console log it
d3.json(teams).then(function(teams_data) {
    console.log(teams_data[0]);
  });

  // INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Get the sample names and populate the dropdown options
    d3.json(teams).then((teams_data) => {
        
        // Add sample names to the dropdown menu
        teams_data.forEach((team) => {

            console.log(team);

            dropdownMenu.append("option").text(team['shortDisplayName']).property("value", team['shortDisplayName']);
        });

        // Get the first sample
        let firstTeam = teams_data[0]['shortDisplayName'];

        // Console log the first sample details
        console.log(firstTeam);

        // Create the initial plots and demographic info
        charts(firstTeam);
        demoInfo(firstTeam);
    });
    };


// UPDATE THE CHARTS AND DEMOGRAPHIC INFO 
// Change the charts and demographic info box based on dropdown selection
function optionChanged(newTeam) {
    charts(newTeam);
    demoInfo(newTeam);
    };

// BUILD THE CHARTS
// Create a function to build the charts
function charts(teamName) {

    // Use D3 to retrieve all data
    d3.json(teams).then((teams_data) => {

    // Filter team data by name
    let filteredTeam = teams_data.filter(team => team.shortDisplayName == teamName);

    // Get the first team
    let firstTeam = filteredTeam[0]

    // Create a win-loss chart
    let winLossData = [{ x: ['Wins', 'Losses'], 
                        y: [firstTeam.wins, firstTeam.losses], 
                        type: 'bar'}];

    // Create an average points chart
    let avgPointsData = [
    {
        x: [firstTeam.avgPointsAgainst],
        y: [firstTeam.avgPointsFor],
        mode: 'markers',
        type: 'scatter',
        name: 'Avg Points'
    }
    ];

    let avgPointsLayout = {
    xaxis: { title: 'Average Points Against' },
    yaxis: { title: 'Average Points For' }
    };


    // Create a games played chart
    let gamesPlayedData = [
    { x: ['Games Played', 'Losses', 'Ties', 'Wins'], 
        y: [firstTeam.gamesPlayed, firstTeam.losses, firstTeam.ties, firstTeam.wins], 
        type: 'bar' }
    ];



        // Render the plot to the div tag with id "bar"
        Plotly.newPlot('win-loss-chart', winLossData);
        Plotly.newPlot('avg-points-chart', avgPointsData, avgPointsLayout);
        Plotly.newPlot('games-played-chart', gamesPlayedData);
        
    });
    };


// TEAM INFORMATION
// Create a function to get team's Information
function demoInfo(teamName) {

    // Use D3 to retrieve all data
    d3.json(teams).then((teams_data) => {

    // Filter team data by name
        let filteredTeam = teams_data.filter(teams_data => teams_data.shortDisplayName == teamName);
        
        // Retrieve all required information
        let team_info = {'Team Name':filteredTeam[0]['displayName'], 'Location':filteredTeam[0]['location'],'Win Percent':filteredTeam[0]['divisionWinPercent'], 'Points':filteredTeam[0]['points']};

        let obj = filteredTeam[0]

         // Fecht Team Logos
        d3.select("#sample-logo").html("");
        d3.select("#sample-logo").append('img').attr('src', filteredTeam[0]['logos']).attr('alt', filteredTeam[0]['shortDisplayName']).attr('height', 150)


        console.log(filteredTeam[0]['logos'])

        d3.select("#sample-metadata").html("");
         let entries = Object.entries(team_info);
         entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });


  });
};

// VENUE INFORMATION
function venue(teamName) {

    // Use D3 to retrieve all data
    d3.json(teams).then((teams_data) => {

    // Filter team data by name
        let filteredTeam = teams_data.filter(teams_data => teams_data.shortDisplayName == teamName);
        
        // Retrieve all required information
        let team_info = {'Team Name':filteredTeam[0]['displayName'], 'Location':filteredTeam[0]['location'],'Win Percent':filteredTeam[0]['divisionWinPercent'], 'Points':filteredTeam[0]['points']};

        let obj = filteredTeam[0]

         // Fecht Team Logos
        d3.select("#sample-logo").html("");
        d3.select("#sample-logo").append('img').attr('src', filteredTeam[0]['logos']).attr('alt', filteredTeam[0]['shortDisplayName']).attr('height', 150)


        console.log(filteredTeam[0]['logos'])

        d3.select("#sample-metadata").html("");
         let entries = Object.entries(team_info);
         entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });


  });
};


// Call the initialization function
init();
