export function sendChatMessage(socket, from_email, message) {
  socket.on('chat', (data) => {
    console.log(data);
    socket.emit(from_email, { my: message });
  });
  
}