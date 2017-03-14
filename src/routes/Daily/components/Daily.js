import React, { Component } from 'react'
import BookThumbnail from 'components/BookThumbnail'
import { Row, Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'

let DailyForm = (props) => {
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

DailyForm = reduxForm({
  form: 'daily' // a unique identifier for this form
})(DailyForm)

class Daily extends Component {
  componentWillMount () {
    this.props.fetchBooksByDay(this.props.params.date)
  }

  render () {
    // console.log(this.props);
    // 1) BOOKS PROGRESS ENTRY
    // dailies/:date
      // get all entries where entry.date matches params.date
        // if no entries (ie. date has not been logged)
          // books = user.books.current
        // if entries exists for params.date (ie. date has been logged previously)
          // books = entries.forEach(book)
      // (always provide option to add an outside book to today's entry...)



    // 2) PROGRESS View
      // load last 30 days of entries
        // when user clicks on a day,
          // push to dailies:/date
    return (
      <div>
         <h2>{moment(new Date(this.props.params.date)).format('MMMM Do, YYYY')}</h2>
           <Row>
             {
               this.props.dailiesMatch.map((daily, key) => {
                 return (
                   <BookThumbnail
                     title={daily.title}
                     authors={daily.authors}
                     thumbnailUrl={daily.thumbnailUrl}
                     linkTo={`/book/id/${daily.book_id}/progress`}
                     key={key}>
                    <DailyForm
                      initialValues={
                        {
                          date: this.props.params.date,
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
                 return (
                     <li key={key}>
                       <span>{daily.currentPage} | </span>
                       <span>{ daily.title } | </span>
                       <span>{daily.date}</span>
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
