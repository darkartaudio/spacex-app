const express = require('express');
const axios = require('axios');
const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//     // res.json({ message: 'Welcome to our cool app!' });
//     res.sendFile(__dirname+'/views/index.html');
// });

app.get('/', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            // handle success
            res.render('index', { company: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname+'/views/about.html');
});

app.get('/blog', function (req, res) {
    res.sendFile(__dirname+'/views/blog-directory.html');
});

app.get('/capsules', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            res.render('capsules', { capsules: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single capsule
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let capsule = response.data[i];

//                 if (capsule.serial === req.params.serial.toUpperCase()) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Capsule does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return Capsules by Parameter
app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];
            const capsuleArray = [];

            // run a for loop to search based on the key from req.params
            for (let i in response.data) {
                let capsule = response.data[i];
                
                if(searchBy.toLowerCase() === 'serial') { // search by serial
                    if(capsule.serial.toUpperCase() === searchVal.toUpperCase()) {
                        // return res.json({ capsule });\
                        capsuleArray.push(capsule);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(capsule.id.toUpperCase() === searchVal.toUpperCase()) {
                        // return res.json({ capsule });
                        capsuleArray.push(capsule);
                    }
                } else if (searchBy.toLowerCase() === 'reuse_count') { // search by reuse_count
                    let countValue = parseInt(searchVal);
                    if (capsule.reuse_count === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (searchBy.toLowerCase() === 'water_landings') { // search by water_landings
                    let countValue = parseInt(searchVal);
                    if (capsule.water_landings === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (searchBy.toLowerCase() === 'last_update') { // search by last_update
                    if (capsule.last_update === searchVal) {
                        capsuleArray.push(capsule);
                    }
                } else if (searchBy.toLowerCase() === 'status') { // search by status
                    if (capsule.status.toUpperCase() === searchVal.toUpperCase()) {
                        capsuleArray.push(capsule);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (capsule.type.toUpperCase() === searchVal.toUpperCase()) {
                        capsuleArray.push(capsule);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (capsuleArray.length > 0) {
                // return res.json({ capsules: capsuleArray });
                res.render('capsules', { capsules: capsuleArray, searchBy, searchVal });
            } else {
                return res.json({ message: 'No matching capsules.' });
            }
        });
});

app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // handle success
            res.render('cores', { cores: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single core by Serial
// app.get('/cores/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/cores')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let core = response.data[i];

//                 if (core.serial === req.params.serial.toUpperCase()) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Core does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return cores by Parameter
app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];
            const coreArray = [];

            // run a for loop to search based on the key from req.params
            for (let i in response.data) {
                let core = response.data[i];
                
                if(searchBy.toLowerCase() === 'serial') { // search by serial
                    if(core.serial.toUpperCase() === searchVal.toUpperCase()) {
                        coreArray.push(core);
                    }
                } else if(searchBy.toLowerCase() === 'last_update') { // search by last_update
                    if(core.last_update === searchVal) {
                        coreArray.push(core);
                    }
                } else if (searchBy.toLowerCase() === 'reuse_count') { // search by reuse_count
                    let countValue = parseInt(searchVal);
                    if (core.reuse_count === countValue) {
                        coreArray.push(core);
                    }
                } else if (searchBy.toLowerCase() === 'rtls_landings') { // search by rtls_landings
                    let countValue = parseInt(searchVal);
                    if (core.rtls_landings === countValue) {
                        coreArray.push(core);
                    }
                } else if(searchBy.toLowerCase() === 'status') { // search by status
                    if(core.status === searchVal) {
                        coreArray.push(core);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (coreArray.length > 0) {
                return res.render('cores', { cores: coreArray, searchBy, searchVal });
            } else {
                return res.json({ message: 'No matching cores.' });
            }
        });
});

app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            res.render('crew', { crew: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a crew member by Name
// app.get('/crew/:name', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/crew')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let crewmem = response.data[i];
//                 // console.log(crewmem.name, req.params.name);

//                 if (crewmem.name === req.params.name) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Crew member does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return a single core by Serial
// app.get('/cores/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/cores')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let core = response.data[i];

//                 if (core.serial === req.params.serial.toUpperCase()) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Core does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return crew by Parameter
app.get('/crew/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];
            const crewArray = [];

            // run a for loop to search based on the key from req.params
            for (let i in response.data) {
                let crew = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(crew.name.toUpperCase() === searchVal.toUpperCase()) {
                        crewArray.push(crew);
                    }
                } else if(searchBy.toLowerCase() === 'agency') { // search by agency
                    if(crew.agency.toUpperCase() === searchVal.toUpperCase()) {
                        crewArray.push(crew);
                    }
                } else if (searchBy.toLowerCase() === 'status') { // search by status
                    if(crew.status.toUpperCase() === searchVal.toUpperCase()) {
                        crewArray.push(crew);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (crewArray.length > 0) {
                return res.render('crew', { crew: crewArray, searchBy, searchVal });
            } else {
                return res.json({ message: 'No matching crew.' });
            }
        });
});

app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // handle success
            res.render('dragons', { dragons: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single dragon by ID
// app.get('/dragons/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/dragons')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let dragon = response.data[i];

//                 if (dragon.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Dragon does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return dragons by Parameter
app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const dragonArray = [];
            for (let i in response.data) {
                let dragon = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(dragon.name.toUpperCase() === searchVal.toUpperCase()) {
                        dragonArray.push(dragon);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(dragon.id.toUpperCase() === searchVal.toUpperCase()) {
                        dragonArray.push(dragon);
                    }
                } else if (searchBy.toLowerCase() === 'crew_capacity') { // search by crew_capacity
                    let crewCap = parseInt(searchVal);
                    if (dragon.crew_capacity === crewCap) {
                        dragonArray.push(dragon);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (dragon.type === searchVal) {
                        dragonArray.push(dragon);
                    }
                } else if (searchBy.toLowerCase() === 'active') { // search by active
                    if ((dragon.active === true && searchVal.toLowerCase() === 'true') || (dragon.active === false && searchVal.toLowerCase() === 'false')) {
                        dragonArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (dragonArray.length > 0) {
                return res.render('dragons', { dragons: dragonArray, searchBy, searchVal });
            } else {
                return res.json({ message: 'No matching dragons.' });
            }
        });
});

app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            // handle success
            res.render('history', { history: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // handle success
            res.render('landpads', { landpads: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single landpad by ID
// app.get('/landpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/landpads')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let landpad = response.data[i];

//                 if (landpad.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Landpad does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return landpads by Parameter
app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const landpadArray = [];
            for (let i in response.data) {
                let landpad = response.data[i];
                
                if(searchBy.toLowerCase() === 'full_name') { // search by full_name
                    if(landpad.full_name.toUpperCase() === searchVal.toUpperCase()) {
                        landpadArray.push(landpad);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(landpad.id.toUpperCase() === searchVal.toUpperCase()) {
                        landpadArray.push(landpad);
                    }
                } else if(searchBy.toLowerCase() === 'region') { // search by region
                    if(landpad.region.toUpperCase() === searchVal.toUpperCase()) {
                        landpadArray.push(landpad);
                    }
                }else if (searchBy.toLowerCase() === 'landing_attempts') { // search by landing_attempts
                    let landAttempts = parseInt(searchVal);
                    if (landpad.landing_attempts === landAttempts) {
                        landpadArray.push(landpad);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (landpad.type === searchVal) {
                        landpadArray.push(landpad);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (landpadArray.length > 0) {
                return res.render('landpads', { landpads: landpadArray, searchBy, searchVal });
            } else {
                return res.json({ message: 'No matching landpads.' });
            }
        });
});

app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v5/launches')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single launch by ID
// app.get('/launches/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v5/launches')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let launch = response.data[i];

//                 if (launch.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Launch does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return launches by Parameter
app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of launches

            // run a for loop to search based on the key from req.params
            const launchArray = [];
            for (let i in response.data) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'name') { // search by name
                    if(launch.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(launch.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                    if(launch.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if (userRequest[0].toLowerCase() === 'flight_number') { // search by flight_number
                    let flightNumber = parseInt(userRequest[1]);
                    if (launch.flight_number === flightNumber) {
                        launchArray.push(launch);
                    }
                } else if (userRequest[0].toLowerCase() === 'success') { // search by success
                    if ((launch.success === true && userRequest[1].toLowerCase() === 'true') || (launch.success === false && userRequest[1].toLowerCase() === 'false')) {
                        launchArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (launchArray.length > 0) {
                return res.json({ launches: launchArray });
            } else {
                return res.json({ message: 'No matching launches.' });
            }
        });
});

app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single launchpad by ID
// app.get('/launchpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/launchpads')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let launchpad = response.data[i];

//                 if (launchpad.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Launchpad does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return launchpads by Parameter
app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of launchpads

            // run a for loop to search based on the key from req.params
            const launchpadArray = [];
            for (let i in response.data) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'full_name') { // search by full_name
                    if(launchpad.full_name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(launchpad.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                    if(launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                }else if (userRequest[0].toLowerCase() === 'launch_attempts') { // search by launch_attempts
                    let launchAttempts = parseInt(userRequest[1]);
                    if (launchpad.launch_attempts === launchAttempts) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0].toLowerCase() === 'status') { // search by status
                    if (launchpad.status.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (launchpadArray.length > 0) {
                return res.json({ launchpads: launchpadArray });
            } else {
                return res.json({ message: 'No matching launchpads.' });
            }
        });
});

app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single payload by ID
app.get('/payloads/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let payload = response.data[i];

                if (payload.id === req.params.id) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Payload does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a rocket by Name
app.get('/rockets/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let rocket = response.data[i];

                if (rocket.name === req.params.name) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Rocket does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a ship by Name
app.get('/ships/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let ship = response.data[i];

                if (ship.name === req.params.name) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Ship does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single payload by ID
app.get('/starlink/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let satellite = response.data[i];

                if (satellite.id === req.params.id) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Satellite does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/search', (req, res) => {
    // parse query string
    let item, searchBy, searchVal;
    
    for (let key in req.query) {
        switch (key) {
            case 'item':
                item = req.query[key];
                break;
            default:
                searchBy = key;
                searchVal = req.query[key];
                break;
        }
    }

    axios.get(`https://api.spacexdata.com/v4/${item}`)
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let loopItem = response.data[i];

                if (loopItem[searchBy] === searchVal) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ message: `No matching item found.` });
            }
        })
        .catch((error) => {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/:input', function (req, res) {
    // console.log('req.params', req.params);
    res.json({ message: `There is no data for /${req.params.input}` });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function () {
    console.log(`Server is running on PORT`, PORT);
});

module.exports = {
    server,
    app,
    PORT,
    axios
};