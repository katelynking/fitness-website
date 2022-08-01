const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const cors = require('cors');
app.use(cors());
const http = require("http");
const {Server} = require("socket.io");
const serverio = http.createServer(app);
const io = new Server(serverio, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message", (data)  => {
    socket.broadcast.emit("receive_message", data)
  })
});

serverio.listen(3002, () => {
  console.log("SERVERIO IS RUNNING ON PORT 3002")
});
startApolloServer(typeDefs, resolvers);
