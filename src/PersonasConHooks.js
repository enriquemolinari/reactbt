import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function PersonasConHooks(props) {
  const [personas, setPersonas] = useState({ personas: [] });

  useEffect(() => {
    listarPersonas(props.inputValue);
  }, [props.inputValue]);

  function listarPersonas(inputValue) {
    fetch("http://localhost:1234/personas?apellido=" + inputValue)
      .then((resp) => resp.json())
      .then((json) => {
        setPersonas(() => ({
          personas: json.personas,
          resultado: json.result,
        }));
      });
  }

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
          {personas.personas.map((p, index) => (
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
