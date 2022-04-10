import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default class CrearPersona extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        localidad: "",
      },
      resultado: "",
      errors: {},
      show: false,
      localidades: [],
    };
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/personas", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        direccion: this.state.form.direccion,
        telefonos: [this.state.form.telefono],
        localidad: this.state.form.localidad,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
            errors: json.errors,
            show: false,
          });
          return;
        }
        this.setState({
          resultado: "La persona fue creada con éxito!",
          errors: {},
          show: true,
        });
      });
  }

  componentDidMount() {
    fetch("http://localhost:1234/localidades", {
      //credentials: "include",
    })
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          localidades: json.localidades,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.show && (
          <Alert variant="success" onClose={this.handleClose} dismissible>
            <Alert.Heading>{this.state.resultado}</Alert.Heading>
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              name="localidad"
              onChange={this.handleChange}
              as="select"
            >
              {this.state.localidades.map((l) => (
                <option value={l.id}>{l.localidad}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              onChange={this.handleChange}
              value={this.state.form.nombre}
              isInvalid={this.state.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              onChange={this.handleChange}
              value={this.state.form.apellido}
              isInvalid={this.state.errors.apellido}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.apellido}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              onChange={this.handleChange}
              value={this.state.form.direccion}
              isInvalid={this.state.errors.direccion}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              onChange={this.handleChange}
              value={this.state.form.telefono}
              isInvalid={this.state.errors.telefonos}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.telefonos}
            </Form.Control.Feedback>
          </Form.Group>
          <Button onClick={this.handleSubmit} type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}
