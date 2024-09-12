async function searchSongs() {
  const query = document.getElementById('searchInput').value;
  const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
  const songs = await response.json();
  const resultsList = document.getElementById('songResults');
  
  resultsList.innerHTML = '';
  songs.forEach(song => {
    const li = document.createElement('li');
    li.textContent = `${song.name} by ${song.artists.map(artist => artist.name).join(', ')}`;
    const button = document.createElement('button');
    button.textContent = 'Add to Queue';
    button.onclick = () => addToQueue(song.uri);
    li.appendChild(button);
    resultsList.appendChild(li);
  });
}

async function addToQueue(uri) {
  await fetch('/add-to-queue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uri }),
  });
  alert('Song added to queue!');
}
