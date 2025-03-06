const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    // Allow connections from both localhost and Docker network
    origin: ["http://localhost:3000", "http://nextjs:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`)

    socket.on('message', (message) => {
        io.emit('message', message)
        console.log('message', message)
    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
})

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});