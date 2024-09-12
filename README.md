# Spotify-Vote

# A web application that allows guests to suggest songs to play on Spotify and vote on them. This app uses the Spotify API for authentication, song search, and adding songs to the playback queue.

## Features

- **Login with Spotify:** Allows the host to log in using their Spotify account.
- **Song Search:** Guests can search for songs from Spotify's library.
- **Add to Queue:** Guests can add songs to the playback queue with a click.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Spotify API:** For song search, queue management, and playback control

## Getting Started

### Prerequisites

- Node.js and npm installed
- A Spotify account
- Spotify Developer credentials (Client ID, Client Secret)

**To allow guests to access the web application from their devices:**

1. **Find Local IP Address**

   - **On Windows:**
     1. Open Command Prompt.
     2. Type the following command and press Enter:
        ```bash
        ipconfig
        ```
     3. Look for the "IPv4 Address" under the relevant network adapter (e.g., `192.168.x.x`).**Connect to the Host's Network**

   - Ensure that phone is connected to the same Wi-Fi network as the SpotVote's host's computer where the application is running.

2. **Update the Application to Listen on All Network Interfaces**

   Make sure SpotVote is set to accept connections from all network interfaces. In the Express server configuration (`index.js`), adjust the `app.listen()` function:

   ```javascript
   app.listen(3000, '0.0.0.0', () => {
     console.log('Server running on http://0.0.0.0:3000');
   });
   
3. **Share the IP Address with Guests**

   Provide IP address and port number to guests.
   ```
   http://<local_ip_address>:3000
