const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();

exports.getRecentPosts = functions.https.onRequest(async (req, res) => {
  try {
    const postsRef = db.ref('posts');
    
    // Retrieve the 10 most recent posts
    const snapshot = await postsRef.limitToLast(10).once('value');

    // Convert the snapshot to an array of posts
    const posts = [];
    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();
      posts.push(post);
    });

    // Return the posts as JSON
    return res.json(posts);
  } catch (error) {
    console.error('Error retrieving recent posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
