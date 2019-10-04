const _ = require('lodash');

let bookCount = 10;
let tradeCount = 5;
let batchRate = 100;
let batchSize = 100;

const now = new Date();
const date = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();
const startDt = new Date(year, month, date, 0, 0, 0).getTime();

const PRODUCTS = [
  'Palm Oil',
  'Rubber',
  'Wool',
  'Amber',
  'Copper',
  'Lead',
  'Zinc',
  'Tin',
  'Aluminium',
  'Aluminium Alloy',
  'Nickel',
  'Cobalt',
  'Molybdenum',
  'Recycled Steel',
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Coca',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14'
]; //28

// add / remove portfolios to change the data set
const PORTFOLIOS = [
  'Aggressive',
  'Defensive',
  'Income',
  'Speculative',
  'Hybrid'
]; //5

// these are the list of columns that updates go to
const VALUE_FIELDS = [
  'current',
  'previous',
  'pl1',
  'pl2',
  'gainDx',
  'sxPx',
  '_99Out'
];

// a list of the data, that we modify as we go. if you are using an immutable
// data store (such as Redux) then this would be similar to your store of data.
let globalRowData;

// start the book id's and trade id's at some future random number,
// looks more realistic than starting them at 0
let nextBookId = 62472;
let nextTradeId = 24287;
let nextBatchId = 101;

function createRowData() {
  globalRowData = [];
  let thisBatch = nextBatchId++;
  for (let i = 0; i < PRODUCTS.length; i++) {
    let product = PRODUCTS[i];
    for (let j = 0; j < PORTFOLIOS.length; j++) {
      let portfolio = PORTFOLIOS[j];

      for (let k = 0; k < bookCount; k++) {
        let book = createBookName();
        for (var l = 0; l < tradeCount; l++) {
          let trade = createTradeRecord(product, portfolio, book, thisBatch);
          globalRowData.push(trade);
        }
      }
    }
  }
  console.log('Total number of records sent to grid = ' + globalRowData.length);
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAverage(trade) {
  return Math.floor(
    (trade.pl1 + trade.pl2 + trade.gainDx + trade.sxPx + trade._99Out) / 5
  );
}

function createTradeRecord(product, portfolio, book, batch) {
  const current = Math.floor(Math.random() * 100000) + 100;
  const previous = current + Math.floor(Math.random() * 10000) - 2000;
  const trade = {
    id: _.uniqueId(),
    product: product,
    portfolio: portfolio,
    book: book,
    trade: createTradeId(),
    submitterID: randomBetween(10, 1000),
    submitterDealID: randomBetween(10, 1000),
    dealType: Math.random() < 0.2 ? 'Physical' : 'Financial',
    bidFlag: Math.random() < 0.5 ? 'Buy' : 'Sell',
    current: current,
    previous: previous,
    pl1: randomBetween(100, 100000),
    pl2: randomBetween(100, 100000),
    gainDx: randomBetween(100, 100000),
    sxPx: randomBetween(100, 100000),
    _99Out: randomBetween(100, 100000),
    batch: batch,
    updateDt: startDt + randomBetween(1, 86400000)
  };
  trade.average = getAverage(trade);
  return trade;
}

function createBookName() {
  nextBookId++;
  return 'GL-' + nextBookId;
}

function createTradeId() {
  nextTradeId++;
  return nextTradeId;
}

function updateSomeItems(updateCount) {
  const itemsToUpdate = [];
  for (let k = 0; k < updateCount; k++) {
    if (globalRowData.length === 0) {
      continue;
    }
    const indexToUpdate = Math.floor(Math.random() * globalRowData.length);
    const itemToUpdate = globalRowData[indexToUpdate];

    // make a copy of the item, and make some changes, so we are behaving
    // similar to how the
    const field = VALUE_FIELDS[Math.floor(Math.random() * VALUE_FIELDS.length)];
    itemToUpdate[field] = Math.floor(Math.random() * 100000);
    itemToUpdate.updateDt =
      itemToUpdate.updateDt + randomBetween(60000, 900000);

    itemToUpdate.average = getAverage(itemToUpdate);

    itemsToUpdate.push(itemToUpdate);
  }
  return itemsToUpdate;
}

function getGlobalRowData() {
  return globalRowData;
}

function getBookCount() {
  return bookCount;
}

function setBookCount(count) {
  bookCount = count;
  createRowData();
  return bookCount;
}

function getTradeCount() {
  return tradeCount;
}

function setTradeCount(count) {
  tradeCount = count;
  createRowData();
  return tradeCount;
}

function getBatchRate() {
  return batchRate;
}

function setBatchRate(rate) {
  batchRate = rate;
  return batchRate;
}

function getBatchSize() {
  return batchSize;
}

function setBatchSize(size) {
  batchSize = size;
  return batchSize;
}

createRowData();

module.exports = {
  updateSomeItems,
  createRowData,
  getGlobalRowData,
  getBookCount,
  setBookCount,
  getTradeCount,
  setTradeCount,
  getBatchRate,
  setBatchRate,
  getBatchSize,
  setBatchSize
};
