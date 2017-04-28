import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { Row, Col } from 'react-flexbox-grid'
import { Table } from 'react-bootstrap'
import Modal from 'components/Modal'
import './Heatmap.scss'
import classNames from 'classnames'

const Day = (props) => {
  let dayContainerClass = classNames({
    'day__container': true,
    'complete': (props.day.dailies.length !== 0)
  })

  return (
    <td className={`${dayContainerClass}`}>
      <Link
        to={`/daily/${props.day.date.format('YYYY-MM-DD')}`}>
        <div className="content">
          <span className='day__num'>{props.day.date.format('DD')}</span>
          {
            props.day.dailies.map((daily, key) => {
              return (
                <img className='day__thumb' key={key} src={daily.thumbnailUrl} alt='' />
              )
            })
          }
        </div>
      </Link>

    </td>
  )
}




Day.propTypes = {
  day: React.PropTypes.object.isRequired
}

const Heatmap = (props) => {
  let weeks = []
  let numWeeks = 5 // number of weeks to render

  const today = moment(props.currentDate)

  // Creates 'weeks' starting back from Monday of today's week
  for (let i = 0; i < numWeeks; i++) {
    // Set monday as first day of given week
    let monday = moment(today).add(-i, 'weeks').day('Monday')
    let weekArray = []

    // Starting from Monday, push days to week, adding dailies when they exist
    for (let j = 0; j < 7; j++) {
      const dateObj = {}
      const curr = moment(monday).add(j, 'days')

      // Set day daily and date props
      dateObj.date = curr
      dateObj.dailies = props.dailiesRange.filter((daily) => {
        return daily.date === curr.format('YYYY-MM-DD')
      })
      weekArray.push(dateObj)
    }

    // Add the week array to main dates array
    weeks.push(weekArray)
  }

  return (
    <table className='heatmap'>
      <thead>
        <tr>
          <th colSpan={7}>_MONTH_ 2017</th>
        </tr>
        <tr>
          <th>Mon</th>
          <th>Tues</th>
          <th>Wed</th>
          <th>Thur</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        {
          weeks.map((week, key) => {
            return (
              <tr key={key}>
                {
                  week.map((day, key) => {
                    return (
                      <Day day={day} key={key} />
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

Heatmap.propTypes = {
  dailiesRange: React.PropTypes.array.isRequired,
  currentDate: React.PropTypes.string
}

export default Heatmap
