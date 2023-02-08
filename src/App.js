import React from 'react'
import RouterDetails from './RouterDetails'
import TokenDetails from './TokenDetails';
import TimerCard from './TimerCard';
import SwapToken from './SwapToken';

const App = () => {
  return (
    <div>
      <TokenDetails/>
      <TimerCard/>
      <SwapToken/>
      {/* <RouterDetails/> */}

    </div>
  )
}

export default App