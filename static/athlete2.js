
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


    files.forEach((url) => promises.push(d3.json(url)));
    Promise.all(promises).then(function (data) {
    
    let offense = data[0];
    let defense = data[1];
    let special = data[2];

    console.log(offense);

      [offense, defense, special].forEach(athletes_dataset => {
      athletes_dataset.forEach(player => {

        let layout = ({
            colors: ['rgba(5,141,199,0.5)', 'rgba(80,180,50,0.5)', 'rgba(237,86,27,0.5)']
        });




        let series = []

          // Determine which dataset the player is in based on their name
        if (player.type === 'offense') {
            console.log(player.type)
            series.push(
            type= 'Offense',
            id= 'offense',
            marker= {
            symbol: 'circle'
            },
            height=player.height,
            weight=player.weight
            )
        } 
        else if (player.type === 'defense') {
            series.push(
            type= 'Defense',
            id= 'defense',
            marker= {
            symbol: 'triangle'
            },
            height=player.height,
            weight=player.weight
            )
        } 
        else if (player.type === 'specialTeam') {
            series.push(
            type= 'Special',
            id= 'specialTeam',
            marker= {
            symbol: 'square'
            },
            height=player.height,
            weight=player.weight
            )
        } 
        else {
            // Handle the case where the player isn't found in any dataset
            console.error(`Player "${playerName}" not found.`);
            return;
        }

        console.log(series)
        //     ,
        //     {name: 'Defense',
        //     id: 'defense',
        //     marker: {
        //         symbol: 'triangle'
        //     }},
        //     {name: 'Special',
        //     id: 'specialTeam',
        //     marker: {
        //         symbol: 'square'
        //     }}
        // ];
        
        // if (player.type === 'offense'){
        //     series['offense'].push([player.height, player.weight])
        // }
        // console.log(series)


        // let temp = [];
        // if (player.type === playerType && player.weight > 0 && player.height > 0) {
        //                 temp.push([player.height, player.weight]);

        //             }




//     async function getData() {
//     const response = await fetch(
//         'https://cdn.jsdelivr.net/gh/highcharts/highcharts@24912efc85/samples/data/olympic2012.json'
//     );
//     return response.json();
// }

        // getData().then(data => {
            // const getData = playerType => {
            //     const temp = [];
            //     data.forEach(player => {
            //         if (player.type === playerType && player.weight > 0 && player.height > 0) {
            //             temp.push([player.height, player.weight]);
            //         }
            //     });
            //     return temp;
            // };
            // series.forEach(s => {
            //     s.data = getData(s.id);
            // });
            //                 console.log(getData)
        
        
            
//           // Create the chart options object
//     const options = {
//         chart: {
//             type: 'scatter',
//             zoomType: 'xy'
//         },
//         title: {
//             text: 'Athletes by height and weight',
//             align: 'left'
//         },
//         xAxis: {
//             title: {
//                 text: 'Height'
//             },
//             labels: {
//                 format: '{value} inches'
//             },
//             startOnTick: true,
//             endOnTick: true,
//             showLastLabel: true
//         },
//         yAxis: {
//             title: {
//                 text: 'Weight'
//             },
//             labels: {
//                 format: '{value} lbs'
//             }
//         },
//         legend: {
//             enabled: true
//         },
//         plotOptions: {
//             scatter: {
//                 marker: {
//                     radius: 2.5,
//                     symbol: 'circle',
//                     states: {
//                         hover: {
//                             enabled: true,
//                             lineColor: 'rgb(100,100,100)'
//                         }
//                     }
//                 },
//                 states: {
//                     hover: {
//                         marker: {
//                             enabled: false
//                         }
//                     }
//                 }
//             }
//         },
//         tooltip: {
//             pointFormat: 'Height: {point.x} inches <br/> Weight: {point.y} lbs'
//         },
//         series,
//         turboThreshold: 10000000
//     };


//     // Create the chart
//     Highcharts.chart('player-chart3', options, layout);
//   })
//   .catch(error => console.error(error));
      
      });
      })})
    ;
