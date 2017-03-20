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
      height: 100,
    },
    thumb: {
      width: '100%',
      height: 'auto'
    }

  }

  console.log(props.day);
  if (props.day.dailies.length !== 0) {
    styles.main.backgroundColor = "#a9ff99"
  }

  return (
    <Col xs={2} style={styles.col}>
      <div style={styles.main}>
        <h4>
          <Link to={`/daily/${props.day.date.format('YYYY-MM-DD')}`}>{props.day.date.format('MM/DD')}</Link>
        </h4>
        <Row center="xs" >
          {
            props.day.dailies.map((daily) => {
              return (
                <Col xs={6}>
                  <small>p. {daily.currentPage}</small>
                  <img style={styles.thumb} src={daily.thumbnailUrl} alt=""/>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </Col>
  )
}

const Heatmap = (props) => {
  let dates = []
  let numDays = 30
  const today =  moment(props.currentDate)

  for (let i = 0; i < numDays; i++) {
    const dateObj = {}
    const curr = moment(today).add(-i, 'days')

    dateObj.date = moment(today).add(-i, 'days')
    dateObj.dailies = props.dailiesRange.filter((daily) => {
      return daily.date === curr.format('YYYY-MM-DD')
    })

    dates.push(dateObj)
  }

  // console.log(dates);


  return (
    <Row>
      {
        dates.map((day, key) => {
          return (
            <Day key={key} day={day}/>
          )
        })
      }
    </Row>
  )
}

Heatmap.propTypes = {
  dailiesRange: React.PropTypes.array.isRequired
}

export default Heatmap
