module.exports = function(app, db) {

var ObjectID = require('mongodb').ObjectID;

  app.post('/gslossers', (req, res) => {
	const contestant = { name: req.body.name, originalWeight: Number(req.body.originalWeight), currentWeight: Number(req.body.currentWeight), poundsLost: (req.body.originalWeight - req.body.currentWeight) };
	db.collection('gslossersdb').insert(contestant, (err, result) => {
	if (err){
		res.send({ 'error' : 'An error has occured' });
	} else {
	 res.send(result.ops[0]);
	}
   });
  });

  app.get('/gslossers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('gslossersdb').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

   app.put('/gslossers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('gslossersdb').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

  app.delete('/gslossers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('gslossersdb').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.get('/gslossers', (req, res) => {
    db.collection('gslossersdb').find().toArray(function(err, result) {
        if (err) {
            console.log(err);
        } else if (result.length > 0) {
            res.send(result);
        }
    });
  });
};
