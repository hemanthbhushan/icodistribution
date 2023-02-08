import React from 'react'

const PairDetails = ({pairAddress,reserve0,reserve1,liqudityBalance,liquidityTokenSymbol}) => {
  return (
    <div>
        <div>
          <h3>PairAddress: {pairAddress}</h3>
        </div>

        <div>
       
          <h3>
            reserve0 Balance: {reserve0}

          </h3>
          <h3>
          reserve1 Balance: {reserve1}

          </h3>
          <span className="fas fa-key"></span>
          <h3> 
          liqudityBalance Balance: {liqudityBalance}
          </h3>
          <h3>

          liquidityTokenSymbol:{liquidityTokenSymbol}
             </h3>
    </div>
    </div>
  )
}

export default PairDetails