const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { PubSub } = require('apollo-server');

const typeDefs = require('./schema');

const {
  getGlobalRowData,
  updateSomeItems,
  getBookCount,
  setBookCount,
  getTradeCount,
  setTradeCount,
  getBatchRate,
  setBatchRate,
  getBatchSize,
  setBatchSize
} = require('./data');

let isRunning = false;
let runningInterval = null;

const pubsub = new PubSub();

const pubsubRowsUpdate = updatedRows =>
  pubsub.publish('ROWS_UPDATED', { rowsUpdated: updatedRows });

const pubsubOptionsUpdated = () =>
  pubsub.publish('OPTIONS_UPDATED', { optionsUpdated: getGlobalRowData() });

const resolvers = {
  Subscription: {
    rowsUpdated: {
      subscribe: () => pubsub.asyncIterator(['ROWS_UPDATED'])
    },
    optionsUpdated: {
      subscribe: () => pubsub.asyncIterator(['OPTIONS_UPDATED'])
    }
  },
  Query: {
    rows: () => getGlobalRowData(),
    bookCount: () => getBookCount(),
    tradeCount: () => getTradeCount(),
    batchRate: () => getBatchRate(),
    batchSize: () => getBatchSize(),
    running: () => isRunning
  },

  Mutation: {
    updateBookCount: (root, { count }) => {
      setBookCount(count);
      pubsubOptionsUpdated();
      return count;
    },
    updateTradeCount: (root, { count }) => {
      setTradeCount(count);
      pubsubOptionsUpdated();
      return count;
    },
    updateBatchRate: (root, { rate }) => {
      setBatchRate(rate);
      return rate;
    },
    updateBatchSize: (root, { size }) => {
      setBatchSize(size);
      return size;
    },
    updateRunning: () => {
      isRunning = !isRunning;

      if (isRunning) {
        runningInterval = setInterval(() => {
          const updatedRows = updateSomeItems(getBatchSize());
          pubsubRowsUpdate(updatedRows);
        }, getBatchRate());
      } else {
        clearInterval(runningInterval);
      }
      return isRunning;
    }
  }
};

const PORT = 4000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
