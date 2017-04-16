import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "react-router";
import Logo from "assets/logo_1.svg";
import Isvg from "react-inlinesvg";
import { browserHistory } from "react-router";

class Welcome extends Component {
  componentWillMount() {
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      browserHistory.push('/daily')
    }
  }

  render() {
    return (
      <div className="full-width text-center">
        <Isvg src={Logo} alt="logo" />
        <h1><strong>Book Buddy</strong> helps you read <u>better</u>.</h1>
        <Row center="xs">
          <Col xs className="lead">
            <ul
              style={{ maxWidth: 500, margin: "auto", listStyleType: "none" }}
            >
              <li>Get motivational emails to stay on track</li>
              <li>Visualize your reading habits</li>
              <li>Take notes on each book you read</li>
            </ul>
          </Col>
        </Row>
        <Link to="/auth/register">
          <Button bsStyle="success" bsSize="large">Get Started</Button>
        </Link>
        <br />
        <br />
        <span>
          Already a user? <Link to="/auth/login">Log in here.</Link>
        </span>
      </div>
    )
  }
}

Welcome.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired
}

export default Welcome;
