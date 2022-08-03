const { response } = require('express');
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const port = 3000;
// app.get('/', (req, res) => {
//   // All apps about request and response
//   //   res.status(200).send('Hello From the server side'); // Send a response with the status code
//   res
//     .status(200)
//     .json({ message: 'Hello From the other side', app: 'natours' }); // Send JSON file to the server.
// }); // Http Method --> GET

// app.post('/', (req, res) => { // POST method
//   res.send('You can post to this endpoint ');
// });
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});

// Top level code
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);



app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'faild',
        message: 'Invalid ID',
      });
    }
  
    res.status(202).json({
      status: 'success',
      data: {
        tour: '<Updated tour here..>',
      },
    });
      
  }); // We need to update the data
  
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Route with var
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // Convert from string to number
  const tour = tours.find((el) => el.id === id); // req.params == last elememt in the url
  console.log(tour);
  if (!tour) {
    res.status(404).json({
      status: 'faild',
      data: {
        tours: tour,
      },
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tours: tour,
      },
    });
  }
});
app.post('/api/v1/tours', (req, res) => {
  // Post using request, to request the data from the server
  // middleware  to have data available we should use middle ware
  // if i don't middleWare the post route will not working --> app.use(express.json());
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1; // Create a new id for the last object "tour"
  const newTour = Object.assign({ id: newId }, req.body); // Make a new object by merging to an existing object.
  tours.push(newTour); //Push a new tour to a tour array.

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      }); // 201 --> Created a new object to file
    }
  ); //save this tour to the file
});
// WE need to define a route like we done in http before
// CRUD Operations:
// POST --> Create
// GET  --> Read
// PUT  --> Update
// PATCH-->
// DELETE --> DELETE

// Handling DELETEING  requests.

app.delete('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'faild',
        message: 'Invalid ID',
      });
    }
  
    res.status(204).json({ // 204 --> There's no data, the data is deleted and return null to the client
      status: 'success',
      data: null
    });
      
  }); // We need to update the data
  
