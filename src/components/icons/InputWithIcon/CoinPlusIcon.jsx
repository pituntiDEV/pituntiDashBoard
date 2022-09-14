import React from 'react'
import { CoinsIcon } from '../CoinsIcon'
const styles ={
    coin__plus__icon:{
        position: 'relative',	
    },
    plus:{
        position: 'absolute',
        top:"-1rem",
        left:"-.5rem",
        fontWeight:"bold",
    }
}
export const CoinPlusIcon = () => {
  return (
    <div style={styles.coin__plus__icon}>
        <CoinsIcon/>
        <span style={styles.plus}>+</span>
    </div>
  )
}
