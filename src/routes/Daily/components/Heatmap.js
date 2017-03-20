import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { Grid, Row, Col } from 'react-flexbox-grid';

const Day = (props) => {
  const styles = {
    col: {
      textAlign: 'center',
      overflow: 'scroll'
    },
    main: {
      backgroundColor: '#e5f0ff',
      height: 200,
    },
    thumb: {
      width: '100%',
      height: 'auto'
    }
  }

  if (props.day.dailies.length !== 0) {
    styles.main.backgroundColor = "#a9ff99"
  }

  return (
    <Col xs={12} sm style={styles.col}>
      <div style={styles.main}>
        <h4>
          <Link to={`/daily/${props.day.date.format('YYYY-MM-DD')}`}>{props.day.date.format('MM/DD')}</Link>
        </h4>
        <Grid fluid>
          <Row>
            {
              props.day.dailies.map((daily, key) => {
                return (
                  <Col xs={6}>
                    <small>p. {daily.currentPage}</small>
                    <img style={styles.thumb} src={daily.thumbnailUrl} alt=""/>
                  </Col>
                )
              })
            }
          </Row>
        </Grid>
      </div>
    </Col>
  )
}

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
  console.log(weeks);

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
