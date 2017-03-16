import React, { Component } from 'react'
import BookThumbnail from 'components/BookThumbnail'
import { Row, Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'

let DailyForm = (props) => {
  // console.log(props.form, props.initialValues.currentPage);
  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <InputGroup>
          <span className="input-group-addon" id="basic-addon1">p.</span>
            <Field
              name='currentPage'
              className='form-control'
              component='input'
              type='number'
              aria-describedby="basic-addon1"
              placeholder="0"
              required
              />
        </InputGroup>
      </FormGroup>
      <Button type="submit" bsStyle="primary">Submit</Button>
    </Form>
  )
}

DailyForm = reduxForm()(DailyForm)

class Daily extends Component {
  componentWillMount () {
    // Initial load
    this.props.fetchBooksByDay(this.props.date)
  }
  componentWillReceiveProps(nextProps) {
    // If component current date changes, fetch again.
    if (nextProps.routeParams.date !== this.props.routeParams.date) {
      this.props.fetchBooksByDay(nextProps.date)
    }
  }

  render () {
    // Next up:
    // 2) dailies:
    // from both /daily and /progress, user can CRUD dailies
    return (
      <div>
         <h2>{moment.utc(this.props.date).format('MMMM Do, YYYY')}</h2>
           <Row>
             {
               this.props.dailiesMatch.map((daily) => {
                 return (
                   <BookThumbnail
                     title={daily.title}
                     authors={daily.authors}
                     thumbnailUrl={daily.thumbnailUrl}
                     linkTo={`/book/id/${daily.book_id}/progress`}
                     key={daily.daily_id}>
                    <DailyForm
                      initialValues={
                        {
                          date: this.props.date,
                          dailyId: daily.daily_id,
                          bookId: daily.book_id,
                          currentPage: daily.currentPage
                        }
                      }
                      form={daily.daily_id}
                      onSubmit={this.props.handleSubmit}
                      />
                   </BookThumbnail>
                 )
               })
             }
           </Row>
           <Row>
             <ul>
             {
               this.props.dailiesRange.map((daily, key) => {
                 const formattedDate = moment(daily.date).format('YYYY-MM-DD')
                 return (
                     <li key={key}>
                       <span>
                         <Link to={`/daily/${formattedDate}`}>{formattedDate}</Link>
                       </span>
                       <span>
                           - <Link to={`/book/id/${daily.book_id}/progress`}>{daily.title}</Link>
                       </span>
                       <span> - {daily.currentPage}</span>
                     </li>
                 )
               })
             }
           </ul>
           </Row>
       </div>
    )
  }
}

Daily.propTypes = {
  fetchBooksByDay: React.PropTypes.func.isRequired
}

export default Daily
