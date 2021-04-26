import * as labelStyles from '../styles/labelTime.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const LabelTime = ({ lengthFor, length, timeIsTicking, setLength }) => {
  const minutes = Math.floor(length / 60)

  const addToLength = (by) => {
    if (timeIsTicking) return

    if (length <= 1 * 60 && by < 0) return
    if (length >= 60 * 60 && by > 0) return

    setLength((prevLength) => prevLength + by * 60)
  }

  return (
    <div className={labelStyles.container}>
      <h2>{lengthFor} length</h2>
      <div className={labelStyles.cta}>
        <button className={labelStyles.btn} onClick={() => addToLength(1)}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h3>{minutes}:00</h3>
        <button className={labelStyles.btn} onClick={() => addToLength(-1)}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  )
}

export default LabelTime
