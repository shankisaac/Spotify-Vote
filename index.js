const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Initialize the Spotify Web API wrapper with your credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

// Routes

// 1. Login Route
app.get('/login', (req, res) => {
  // Redirect the user to Spotify's authorization URL with required scopes
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// 2. Callback Route - Handles the OAuth callback from Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code; // Authorization code sent by Spotify

  try {
    // Retrieve an access token and a refresh token
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Set the access and refresh tokens on the Spotify API object
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    // Store access token in a cookie
    res.cookie('access_token', access_token, { httpOnly: true });
    // Redirect to the home page after successful login
    res.redirect('/');
  } catch (error) {
    console.error('Error during callback', error);
    // Redirect to an error page if the callback fails
    res.redirect('/error');
  }
});

// 3. Search Songs Route - Allows users to search for songs using Spotify's API
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Search query from the frontend
    const response = await spotifyApi.searchTracks(query); // Spotify API search
    res.json(response.body.tracks.items); // Send search results back to the frontend
  } catch (error) {
    console.error('Error searching tracks', error);
    res.status(500).json({ error: 'Failed to search tracks' }); // Send an error response
  }
});

// 4. Add to Queue Route - Adds a song to the Spotify playback queue
app.post('/add-to-queue', async (req, res) => {
  const { uri } = req.body; // The URI of the song to add to the queue

  try {
    await spotifyApi.addToQueue(uri); // Spotify API call to add the song to the queue
    res.sendStatus(200); // Send a success status
  } catch (error) {
    console.error('Error adding to queue', error);
    res.status(500).json({ error: 'Failed to add track to queue' }); // Send an error response
  }
});

const PORT = process.env.PORT || 3000; // Define the port the server will run on
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Start the server
});
