const mongoose = require('mongoose')

function connectToDatabase(cb) {
  mongoose.connect(project.server_db);
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Failed to run task due to connection error:'));
  db.once('open', cb)
}

function seedBooks(req, res) {
  connectToDatabase(() => {
    const events = [
      { name: 'Basketball', description: 'Throwing into a basket.' },
      { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
      { name: 'Weightlifting', description: 'Lifting heavy things up' },
      { name: 'Ping Pong', description: 'Super fast paddles' }
    ];

    // use the Event model to insert/save
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }

    // seeded!
    res.send('Database seeded!');
  })
}


function seedUsers(req, res) {

}

export function clearBooks(req, res) {
  connectToDatabase(() => {
    console.log('here');
  }
}

function clearAll(req, res) {

}
