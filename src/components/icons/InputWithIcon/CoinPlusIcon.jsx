import React from 'react'
import { CoinsIcon } from '../CoinsIcon'
const styles = {
  coin__plus__icon: {
    position: 'relative',
  },
  plus: {
    position: 'absolute',
    top: "-1rem",
    left: "-.5rem",
    fontWeight: "bold",
  }
}
export const CoinPlusIcon = (props) => {
  const simbol = props.simbol || "+"
  return (
    <div {...props} style={styles.coin__plus__icon}>
      <CoinsIcon simbol={simbol} />
      <span style={styles.plus}>{simbol}</span>
    </div>
  )
}
