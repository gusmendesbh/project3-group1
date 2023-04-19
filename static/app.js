// ------- TEAMS DATA ------- //
// Get the data
const teams = "./data-json/teams1.json";

// Fetch the JSON data and console log it
d3.json(teams).then(function(teams_data) {
    console.log(teams_data[0]);
  });

  // INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init1() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Get the team names and populate the dropdown options
    d3.json(teams).then((teams_data) => {
        
        // Add team names to the dropdown menu
        teams_data.forEach((team) => {

            console.log(team);

            dropdownMenu.append("option").text(team['shortDisplayName']).property("value", team['shortDisplayName']);
        });

        // Get the first team
        let firstTeam = teams_data[0]['shortDisplayName'];

        // Console log the first team details
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

        // Render the plot to the div tag with the relevant ids
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
        let team_info = {
            'Team Name': filteredTeam[0]['displayName'], 
            'Location': filteredTeam[0]['location'],
            'Win Percent': filteredTeam[0]['divisionWinPercent'], 
            'Points': filteredTeam[0]['points']
        };

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
init1();



// ------- ATHLETES DATA ------- //

// Read the data files
const offense = "./data-json/offense.json";
const defense = "./data-json/defense.json";
const special = "./data-json/special.json";

// Get the dropdown element
const dropdown = document.getElementById('player-dropdown');


// Add the player names from each dataset to the dropdown
[offense, defense, special].forEach(athletes_dataset => {
    athletes_dataset.forEach(player => {
      const option = document.createElement('option');
      option.value = player.name;
      option.text = player.name;
      dropdown.add(option);
    });
  });

// Add an event listener to the dropdown
dropdown.addEventListener('change', function() {

  // Get the selected player name
  const playerName = dropdown.value;
  
  // Determine which dataset the player is in based on their name
  let athletes_dataset;
  if (offense.some(player => player.name === playerName)) {
    athletes_dataset = offense;
  } 
  else if (defense.some(player => player.name === playerName)) {
    athletes_dataset = defense;
  } 
  else if (special.some(player => player.name === playerName)) {
    athletes_dataset = special;
  } 
  else {
    // Handle the case where the player isn't found in any dataset
    console.error(`Player "${playerName}" not found.`);
  return;
  }
  
  // Do something with the selected dataset, such as display a chart using D3
  console.log(`Selected dataset for "${playerName}":`, athletes_dataset);
});



// Fetch the JSON data and console log it
d3.json(athletes_dataset).then(function(athletes_data) {
    console.log(athletes_data[0]);
  });

  // INITIALIZE THE DASHBOARD
// Create a function to initialize the details
function init2() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Get the athlete names and populate the dropdown options
    d3.json(athletes_dataset).then((athletes_data) => {

        // Get the first athlete
        let firstAthlete = athletes_data[0]['name'];

        // Console log the first athlete details
        console.log(firstAthlete);

        // Create the initial demographic info
        demoInfo(firstAthlete);
    });
    };


// ATHLETE INFORMATION
// Create a function to get athlete's Information
function demoInfo(athleteName) {

    // Use D3 to retrieve all data
    d3.json(athletes).then((athletes_data) => {

    // Filter athlete data by name
        let filteredAthlete = athletes_data.filter(athletes_data => athletes_data.offense_name == athleteName);
        
        // Retrieve all required information
        let athlete_info = {
            'Name': filteredAthlete[0]['name'], 
            'Weight': filteredAthlete[0]['weight'],
            'Height': filteredAthlete[0]['height'], 
            'Age': filteredAthlete[0]['age'],
            'Birth City': filteredAthlete[0]['birthCity'],
            'Birth Country':filteredAthlete[0]['birthCountry'], 
            'Position':filteredAthlete[0]['position'], 
            'Experience (in years)':filteredAthlete[0]['xp']
        };

        let obj = filteredAthlete[0]

         // Fecht Athlete Headshot
        d3.select("#sample-logo").html("");
        d3.select("#sample-logo").append('img').attr('src', filteredAthlete[0]['headshot']).attr('alt', filteredAthlete[0]['name']).attr('height', 150)

        console.log(filteredAthlete[0]['headshot'])

        d3.select("#sample-metadata").html("");
         let entries = Object.entries(athlete_info);
         entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
  });
};

// Call the initialization function
init2();
