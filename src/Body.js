import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CrearPersona from "./CrearPersona";
import PersonasConHooks from "./PersonasConHooks";
import Welcome from "./Welcome";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="body">
        {this.props.itemClicked === 0 && <Welcome />}
        {this.props.itemClicked === 1 && <CrearPersona />}
        {this.props.itemClicked === 2 && (
          <PersonasConHooks inputValue={this.props.inputValue} />
        )}
      </Container>
    );
  }
}
