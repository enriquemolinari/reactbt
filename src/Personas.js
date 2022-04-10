import React, { Component } from "react";
import Table from "react-bootstrap/Table";

export default class ListarPersonas extends Component {
  constructor(props) {
    super(props);
    this.limpiar = this.limpiar.bind(this);
    this.listarPersonas = this.listarPersonas.bind(this);

    this.state = {
      personas: [],
    };
  }

  listarPersonas(inputValue) {
    fetch("http://localhost:1234/personas?apellido=" + inputValue)
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          personas: json.personas,
          resultado: json.result,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue)
      this.listarPersonas(this.props.inputValue);
  }

  componentDidMount() {
    this.listarPersonas(this.props.inputValue);
  }

  limpiar() {
    this.setState({
      personas: [],
    });
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>nombre</th>
              <th>apellido</th>
              <th>direccion</th>
              <th>telefonos</th>
            </tr>
          </thead>
          <tbody>
            {this.state.personas.map((p, index) => (
              <tr key={index}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.direccion && p.direccion.direccion}</td>
                <td>{p.telefonos && p.telefonos[0].numero}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
