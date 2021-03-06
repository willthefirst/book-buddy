import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "react-router";
import { browserHistory } from "react-router";

class Welcome extends Component {
  render() {
    return (
      <div className="full-width text-center">
      { (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://assets.gfycat.com/gfycat.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'gfycat-js'))}
        <Row>
          <Col xs={12} className="lead">
            <h1><strong>BookBuddy</strong> helps you read <u className='text-success'>better</u>.</h1>
            <p className='lead'>This project helps you maintain good reading habits, by encouraging you to read more regularly and efficiently.<br/>Track your daily progress, take notes, and plan what you're reading next.</p>
          </Col>
        </Row>
        <Row className='bottom-space'>
          <Col xs={12} className="lead">
            <Link to="/auth/register">
              <Button bsStyle="success" bsSize="large">Get Started</Button>
            </Link>
          </Col>
          <Col xs>
            <span>
              Already a user? <Link to="/auth/login">Log in here.</Link>
          </span>
          </Col>
        </Row>
        <Row center="xs">
          <Col xs={12} className="lead">
            <h3 className='text-muted'>Focus on reading every day</h3>
            <div className='gfyitem' data-id='RegalFittingCoyote'></div>
          </Col>
        </Row>

        <Row className='bottom-space'>
          <Col sm={6}>
            <h3 className='text-muted'>Write down your thoughts</h3>
            <br/>
            <div className='gfyitem' data-id='ObeseBlandBarnowl'></div>
          </Col>
          <Col sm={6}>
            <h3 className='text-muted'>Know what you're reading next</h3>
            <br/>
            <div className='gfyitem' data-id='MeanFoolishHuia'></div>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Link to="/auth/register">
              <Button bsStyle="success" bsSize="large">Get Started</Button>
            </Link>
            <br />
            <br />
            <span>
              Already a user? <Link to="/auth/login">Log in here.</Link>
          </span>
          </Col>
        </Row>
      </div>
    )
  }
}

Welcome.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired
}

export default Welcome;
