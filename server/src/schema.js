const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Row {
    id: Int
    product: String
    portfolio: String
    book: String
    trade: String
    submitterID: Int
    submitterDealID: Int
    dealType: String
    bidFlag: String
    current: Int
    previous: Int
    pl1: Int
    pl2: Int
    gainDx: Int
    sxPx: Int
    _99Out: Int
    batch: Int
    updateDt: String
    average: Int
  }

  type Query {
    rows: [Row]!
    bookCount: Int
    tradeCount: Int
    batchSize: Int
    batchRate: Int
    running: Boolean
  }

  type Mutation {
    updateTradeCount(count: Int!): Int
    updateBookCount(count: Int!): Int
    updateBatchRate(rate: Int!): Int
    updateBatchSize(size: Int!): Int
    updateRunning(running: Boolean!): Boolean
  }

  type Subscription {
    rowsUpdated: [Row]
    optionsUpdated: [Row]
  }

  schema {
    query: Query
    subscription: Subscription
    mutation: Mutation
  }
`;

module.exports = typeDefs;
