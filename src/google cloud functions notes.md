# Gen:
* For now, I'm trying to have 4 cloud functions to make this project secure.
* update db permissions, grant to these functions then limit the rest

# Recent feed:
* make a premission that is read only to my db, give this permission to 

# Following:
* pass in a uid, return everyone they follow, prep to let them view that user's profile...
* then we can also let users view somone else's profile from the main page

# All post of a user:
* pass in a uid and return all their posts (or x recent posts...)
* can be used for a user or for viewing all the posts from someone else...



# Simple test func:
const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', (req, res) => {
  const name = req.query.name || req.body.name || 'El todo mundo';

  const response = {
    name: name
  };

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'content-type')
  res.send(JSON.stringify(response));
});
