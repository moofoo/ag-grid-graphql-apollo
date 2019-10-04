import React from 'react';
import BookCount from './BookCount';
import TradeCount from './TradeCount';
import BatchRate from './BatchRate';
import BatchSize from './BatchSize';
import Running from './Running';

const Options = () => {
  return (
    <div>
      <BookCount />
      <TradeCount />
      <BatchRate />
      <BatchSize />
      <Running />
    </div>
  );
};

export default Options;
