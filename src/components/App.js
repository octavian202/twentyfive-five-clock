import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRedo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import * as appStyles from '../styles/app.module.scss'
import LabelTime from './LabelTime'
import Timer from './Timer'

let timerId = null

const App = () => {
  const [sessionLength, setSessionLength] = useState(25 * 60)
  const [breakLength, setBreakLength] = useState(5 * 60)
  const [currentLength, setCurrentLength] = useState(sessionLength)
  const [currentLabel, setCurrentLabel] = useState('Session')

  const startTimer = () => {
    timerId = setInterval(() => {
      setCurrentLength((prevLength) => prevLength - 1)
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timerId)
    timerId = null
  }

  useEffect(() => {
    setCurrentLength(sessionLength)
  }, [sessionLength])

  useEffect(() => {
    if (currentLength <= 0) {
      stopTimer()

      setTimeout(() => {
        // *play audio*

        if (currentLabel === 'Session') {
          setCurrentLength(breakLength)
        } else {
          setCurrentLength(sessionLength)
        }

        setCurrentLabel((prevLabel) =>
          prevLabel === 'Session' ? 'Break' : 'Session'
        )

        startTimer()
      }, 3000)
    }
  }, [currentLength])

  const onStartStopClick = () => {
    if (timerId) {
      stopTimer()
      return
    }
    startTimer()
  }

  const reset = () => {
    stopTimer()
    setCurrentLength(sessionLength)
    setCurrentLabel('Session')
    return
  }

  return (
    <div className={appStyles.app}>
      <main>
        <h1>25 + 5 Clock</h1>
        <div className={appStyles.lengths}>
          <LabelTime
            timeIsTicking={!!timerId}
            lengthFor='Session'
            length={sessionLength}
            setLength={setSessionLength}
          />
          <LabelTime
            timeIsTicking={!!timerId}
            lengthFor='Break'
            length={breakLength}
            setLength={setBreakLength}
          />
        </div>
        <Timer activeCounter={currentLabel} time={currentLength} />
        <div className={appStyles.icons}>
          <FontAwesomeIcon icon={faPlay} onClick={onStartStopClick} />
          <FontAwesomeIcon icon={faRedo} onClick={reset} />
        </div>
      </main>
    </div>
  )
}

export default App
