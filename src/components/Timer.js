import * as timerStyles from '../styles/timer.module.scss'

const Timer = ({ activeCounter, time }) => {
  const minutes = Math.floor(time / 60)
  const seconds = (time % 60 < 10 && '0') + (time % 60)

  return (
    <div className={timerStyles.container}>
      <h3>{activeCounter}</h3>
      <h2>
        {minutes}:{seconds}
      </h2>
    </div>
  )
}

export default Timer
