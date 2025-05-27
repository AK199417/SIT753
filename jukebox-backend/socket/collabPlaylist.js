// socket/collabPlaylist.js
const playlists = {}; // Shared across connections
const userMap = {};

module.exports = (io, socket) => {
  const email = socket.handshake.query.email;
  if (email) {
    userMap[socket.id] = email;
    console.log(`User connected: ${email}`);
  }

  console.log('⚡ Handling playlist events for', socket.id);

  socket.emit('welcome', '👋 Welcome to the Jukebox socket server!');

  socket.on('joinPlaylist', ({ playlistId, username, playlistName }) => {
    socket.join(`playlist-${playlistId}`);
    userMap[socket.id] = username || email;
    console.log(`⚡ User ${userMap[socket.id]} joined playlist - ${playlistName}`);
    
    socket.to(`playlist-${playlistId}`).emit('userJoined', {
      userId: socket.id,
      username: userMap[socket.id],
      message: `A user joined playlist-${playlistId}`
    });

    if (playlists[playlistId]) {
      socket.emit('updatePlaylist', playlists[playlistId]);
    }
  });

  socket.on('songAdded', ({ playlistId, song }) => {
    socket.join(`playlist-${playlistId}`);
    userMap[socket.id] = song.addedBy?.username || email;
    console.log(`⚡ ${song.title} added by ${userMap[socket.id]}`);
    
    io.to(`playlist-${playlistId}`).emit('songAdded', { playlistId, song });
  });

  socket.on('leavePlaylist', ({ playlistId, username, playlistName }) => {
    socket.leave(`playlist-${playlistId}`);
    userMap[socket.id] = username || email;
    console.log(`❌ User ${userMap[socket.id]} left playlist - ${playlistName}`);
  });

  socket.on('disconnect', () => {
    const username = userMap[socket.id];
    console.log(`🚪 Socket disconnected: ${socket.id} (${username || 'Unknown user'})`);
    delete userMap[socket.id];
  });
};
