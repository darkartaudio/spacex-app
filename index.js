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
            res.render('capsules', { message: '', capsules: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('capsules', { message: 'Data not found. Please try again later.', capsules: '', searchBy: '', searchVal: '' });
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
                    return res.render('capsules', { capsules: capsuleArray, message: 'Invalid key.', searchBy, searchVal });
                }
            }
            
            if (capsuleArray.length > 0) {
                // return res.json({ capsules: capsuleArray });
                res.render('capsules', { message: '', capsules: capsuleArray, searchBy, searchVal });
            } else {
                return res.render('capsules', { message: 'No matching capsules.', capsules: capsuleArray, searchBy, searchVal });
            }
        });
});

app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // handle success
            res.render('cores', { message: '', cores: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('cores', { message: 'Data not found. Please try again later.', cores: '', searchBy: '', searchVal: '' });
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
                    return res.render('cores', { message: 'Invalid key.', cores: coreArray, searchBy, searchVal });
                }
            }
            
            if (coreArray.length > 0) {
                return res.render('cores', { message: '', cores: coreArray, searchBy, searchVal });
            } else {
                return res.render('cores', { message: 'No matching cores.', cores: coreArray, searchBy, searchVal });
            }
        });
});

app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            res.render('crew', { message: '', crew: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('crew', { message: 'Data not found. Please try again later.', crew: '', searchBy: '', searchVal: '' });
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
                    return res.render('crew', { message: 'Invalid key.', crew: crewArray, searchBy, searchVal });
                }
            }
            
            if (crewArray.length > 0) {
                return res.render('crew', { message: '', crew: crewArray, searchBy, searchVal });
            } else {
                return res.render('crew', { message: 'No matching crew.', crew: crewArray, searchBy, searchVal });
            }
        });
});

app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // handle success
            res.render('dragons', { message: '', dragons: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('dragons', { message: 'Data not found. Please try again later.', dragons: '', searchBy: '', searchVal: '' });
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
                    return res.render('dragons', { message: 'Invalid key.', dragons: dragonArray, searchBy, searchVal });
                }
            }
            
            if (dragonArray.length > 0) {
                return res.render('dragons', { message: '', dragons: dragonArray, searchBy, searchVal });
            } else {
                return res.render('dragons', { message: 'No matching dragons.', dragons: dragonArray, searchBy, searchVal });
            }
        });
});

app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            // handle success
            res.render('history', { message: '', history: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('history', { message: 'Data not found. Please try again later.', history: '', searchBy: '', searchVal: '' });
        });
});

app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // handle success
            res.render('landpads', { message: '', landpads: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('landpads', { message: 'Data not found. Please try again later.', landpads: '', searchBy: '', searchVal: '' });
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
                    return res.render('landpads', { message: 'Invalid key.', landpads: landpadArray, searchBy, searchVal });
                }
            }
            
            if (landpadArray.length > 0) {
                return res.render('landpads', { message: '', landpads: landpadArray, searchBy, searchVal });
            } else {
                return res.render('landpads', { message: 'No matching landpads.', landpads: landpadArray, searchBy, searchVal });
            }
        });
});

app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v5/launches')
        .then(function (response) {
            // handle success
            res.render('launches', { message: '', launches: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('launches', { message: 'Data not found. Please try again later.', launches: '', searchBy: '', searchVal: '' });
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
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const launchArray = [];
            for (let i in response.data) {
                let launch = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(launch.name.toUpperCase() === searchVal.toUpperCase()) {
                        launchArray.push(launch);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(launch.id.toUpperCase() === searchVal.toUpperCase()) {
                        launchArray.push(launch);
                    }
                } else if (searchBy.toLowerCase() === 'flight_number') { // search by flight_number
                    let flightNumber = parseInt(searchVal);
                    if (launch.flight_number === flightNumber) {
                        launchArray.push(launch);
                    }
                } else if (searchBy.toLowerCase() === 'success') { // search by success
                    if ((launch.success === true && searchVal.toLowerCase() === 'true') || (launch.success === false && userRequest[1].toLowerCase() === 'false')) {
                        launchArray.push(launch);
                    }
                } else {
                    return res.render('launches', { message: 'Invalid key.', launches: launchArray, searchBy, searchVal });
                }
            }
            
            if (launchArray.length > 0) {
                res.render('launches', { message: '', launches: launchArray, searchBy, searchVal });
            } else {
                return res.render('launches', { message: 'No matching launches.', launches: launchArray, searchBy, searchVal });
            }
        });
});

app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            res.render('launchpads', { message: '', launchpads: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('launchpads', { message: 'Data not found. Please try again later.', launchpads: '', searchBy: '', searchVal: '' });
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
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const launchpadArray = [];
            for (let i in response.data) {
                let launchpad = response.data[i];
                
                if(searchBy.toLowerCase() === 'full_name') { // search by full_name
                    if(launchpad.full_name.toUpperCase() === searchVal.toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(launchpad.id.toUpperCase() === searchVal.toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if(searchBy.toLowerCase() === 'region') { // search by region
                    if(launchpad.region.toUpperCase() === searchVal.toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if (searchBy.toLowerCase() === 'launch_attempts') { // search by launch_attempts
                    let launchAttempts = parseInt(searchVal);
                    if (launchpad.launch_attempts === launchAttempts) {
                        launchpadArray.push(launchpad);
                    }
                } else if (searchBy.toLowerCase() === 'status') { // search by status
                    if (launchpad.status.toUpperCase() === searchVal.toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.render('launchpads', { message: 'Invalid key.', launchpads: launchpadArray, searchBy, searchVal });
                }
            }
            
            if (launchpadArray.length > 0) {
                res.render('launchpads', { message: '', launchpads: launchpadArray, searchBy, searchVal });
            } else {
                res.render('launchpads', { message: 'No matching launchpads.', launchpads: launchpadArray, searchBy, searchVal });
            }
        });
});

app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            res.render('payloads', { message: '', payloads: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('payloads', { message: 'Data not found. Please try again later.', payloads: '', searchBy: '', searchVal: '' });
        });
});

// Return a single payload by ID
// app.get('/payloads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/payloads')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let payload = response.data[i];

//                 if (payload.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Payload does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });
app.get('/payloads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const payloadArray = [];
            for (let i in response.data) {
                let payload = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(payload.name.toUpperCase() === searchVal.toUpperCase()) {
                        payloadArray.push(payload);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(payload.id.toUpperCase() === searchVal.toUpperCase()) {
                        payloadArray.push(payload);
                    }
                } else if (searchBy.toLowerCase() === 'lifespan_years') { // search by lifespan_years
                    let lifespan = parseInt(searchVal);
                    if (payload.lifespan_years === lifespan) {
                        payloadArray.push(payload);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (payload.type.toUpperCase() === searchVal.toUpperCase()) {
                        payloadArray.push(payload);
                    }
                } else if (searchBy.toLowerCase() === 'orbit') { // search by orbit
                    if (payload.orbit) {
                        if (payload.orbit.toUpperCase() === searchVal.toUpperCase()) {
                            payloadArray.push(payload);
                        }
                    }
                } else {
                    return res.render('payloads', { message: 'Invalid key.', payloads: payloadArray, searchBy: '', searchVal: '' });
                }
            }
            
            if (payloadArray.length > 0) {
                return res.render('payloads', { message: '', payloads: payloadArray, searchBy, searchVal });
            } else {
                return res.render('payloads', { message: 'No matching payloads.', payloads: payloadArray, searchBy, searchVal });
            }
        });
});


app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            // handle success
            res.render('roadster', { message: '', roadster: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('roadster', { message: 'Data not found. Please try again later.', searchBy: '', searchVal: '' });
        });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            res.render('rockets', { message: '', rockets: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('rockets', { message: 'Data not found. Please try again later.', rockets: '', searchBy: '', searchVal: '' });
        });
});

// Return a rocket by Name
// app.get('/rockets/:name', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/rockets')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let rocket = response.data[i];

//                 if (rocket.name === req.params.name) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Rocket does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });
app.get('/rockets/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const rocketArray = [];
            for (let i in response.data) {
                let rocket = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(rocket.name.toUpperCase() === searchVal.toUpperCase()) {
                        rocketArray.push(rocket);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(rocket.id.toUpperCase() === searchVal.toUpperCase()) {
                        rocketArray.push(rocket);
                    }
                } else if (searchBy.toLowerCase() === 'stages') { // search by stages
                    let numStagers = parseInt(searchVal);
                    if (rocket.stages === numStages) {
                        rocketArray.push(rocket);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (rocket.type.toUpperCase() === searchVal.toUpperCase()) {
                        rocketArray.push(rocket);
                    }
                } else if (searchBy.toLowerCase() === 'active') { // search by active
                    if ((rocket.active === true && searchVal.toLowerCase() === 'true') || (rocket.active === false && searchVal.toLowerCase() === 'false')) {
                        rocketArray.push(rocket);
                    }
                } else {
                    return res.render('rockets', { message: 'Invalid key.', rockets: rocketArray, searchBy, searchVal });
                }
            }
            
            if (rocketArray.length > 0) {
                return res.render('rockets', { message: '', rockets: rocketArray, searchBy, searchVal });
            } else {
                return res.render('rockets', { message: 'No matching rockets.', rockets: rocketArray, searchBy, searchVal });
            }
        });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            res.render('ships', { message: '', ships: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('ships', { message: 'Data not found. Please try again later.', ships: '', searchBy: '', searchVal: '' });
        });
});

// Return a ship by Name
// app.get('/ships/:name', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/ships')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let ship = response.data[i];

//                 if (ship.name === req.params.name) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Ship does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });
app.get('/ships/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const shipArray = [];
            for (let i in response.data) {
                let ship = response.data[i];
                
                if(searchBy.toLowerCase() === 'name') { // search by name
                    if(ship.name.toUpperCase() === searchVal.toUpperCase()) {
                        shipArray.push(ship);
                    }
                } else if(searchBy.toLowerCase() === 'id') { // search by id
                    if(ship.id.toUpperCase() === searchVal.toUpperCase()) {
                        shipArray.push(ship);
                    }
                } else if (searchBy.toLowerCase() === 'type') { // search by type
                    if (ship.type.toUpperCase() === searchVal.toUpperCase()) {
                        shipArray.push(ship);
                    }
                } else if (searchBy.toLowerCase() === 'active') { // search by active
                    if ((ship.active === true && searchVal.toLowerCase() === 'true') || (ship.active === false && searchVal.toLowerCase() === 'false')) {
                        shipArray.push(ship);
                    }
                } else {
                    return res.render('ships', { message: 'Invalid key.', ships: shipArray, searchBy, searchVal });
                }
            }
            
            if (shipArray.length > 0) {
                return res.render('ships', { message: '', ships: shipArray, searchBy, searchVal });
            } else {
                return res.render('ships', { message: 'No matching ships.', ships: shipArray, searchBy, searchVal });
            }
        });
});

app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            res.render('starlink', { message: '', starlink: response.data, searchBy: '', searchVal: '' });
        })
        .catch(function (error) {
            res.render('starlink', { message: 'Data not found. Please try again later.', starlink: starlinkArray, searchBy: '', searchVal: '' });
        });
});

// Return a single payload by ID
// app.get('/starlink/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/starlink')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let satellite = response.data[i];

//                 if (satellite.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Satellite does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });
app.get('/starlink/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            let userRequest = req.params['0'].split('/');
            let searchBy = userRequest[0];
            let searchVal = userRequest[1];

            // run a for loop to search based on the key from req.params
            const starlinkArray = [];
            for (let i in response.data) {
                let starlink = response.data[i];
                
                if(searchBy.toLowerCase() === 'id') { // search by id
                    if(starlink.id.toUpperCase() === searchVal.toUpperCase()) {
                        starlinkArray.push(starlink);
                    }
                } else if (searchBy.toLowerCase() === 'version') { // search by version
                    if (starlink.version) {
                        if (starlink.version.toUpperCase() === searchVal.toUpperCase()) {
                            starlinkArray.push(starlink);
                        }
                    }
                } else if (searchBy.toLowerCase() === 'launch') { // search by launch
                    if (starlink.launch) {
                        if (starlink.launch.toUpperCase() === searchVal.toUpperCase()) {
                            starlinkArray.push(starlink);
                        }
                    }
                } else {
                    return res.render('starlink', { message: 'Invalid key.', starlink: starlinkArray, searchBy, searchVal });
                }
            }
            
            if (starlinkArray.length > 0) {
                return res.render('starlink', { message: '', starlink: starlinkArray, searchBy, searchVal });
            } else {
                return res.render('starlink', { message: 'No matching starlink.', starlink: starlinkArray, searchBy, searchVal });
            }
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
    res.render('error', { message: `There is no data for /${req.params.input}` });
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