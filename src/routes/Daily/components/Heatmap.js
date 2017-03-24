import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Panel } from 'react-bootstrap'
import "./Heatmap.scss"
import classNames from 'classnames'

const Day = (props) => {
  const styles = {
    main: {
      backgroundColor: '#e5f0ff',
      height: 200,
    },
    thumb: {
      width: '100%',
      height: 'auto'
    }
  }

  let dayContainerClass = classNames({
    'day__container': true,
    'panel-default': (props.day.dailies.length === 0),
    'panel-success': (props.day.dailies.length !== 0)
  });

  const panelHeader = <Link to={`/daily/${props.day.date.format('YYYY-MM-DD')}`}>{props.day.date.format('MM/DD')}</Link>

  return (
    <Col xs className="text-center">
      <Panel className={dayContainerClass} header={panelHeader}>
        <Grid fluid>
          <Row>
            {
              props.day.dailies.map((daily, key) => {
                return (
                  <Col xs={6} key={key}>
                    <img style={styles.thumb} src={daily.thumbnailUrl} alt=""/>
                  </Col>
                )
              })
            }
          </Row>
        </Grid>
      </Panel>
    </Col>
  )
}

// <small>p. {daily.currentPage}</small>


const Heatmap = (props) => {
  let weeks = []
  let numWeeks = 5 // number of weeks to render

  const today =  moment(props.currentDate)

  // Creates 'weeks' starting back from Monday of today's week
  for (let i = 0; i < numWeeks; i++) {
    // Set monday as first day of given week
    let monday = moment(today).add(-i, 'weeks').day("Monday");
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
    <div>
      {
        weeks.map((week, key) => {
          return (
            <Row key={key}>
              {
                week.map((day, key) => {
                  return(
                    <Day day={day} key={key} />
                  )
                })
              }
            </Row>
          )
        })
      }
    </div>
  )
}

Heatmap.propTypes = {
  dailiesRange: React.PropTypes.array.isRequired
}

export default Heatmap
