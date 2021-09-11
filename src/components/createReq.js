import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import useForm from "./hooks/form";
import cookie from "react-cookies";
import Auth from "./auth/auth";
import {AuthContext} from "../context/authContext";

const API_SERVER = "https://info-graph-server.herokuapp.com";


const Create = () => {
  const [handleSubmit, handleChange] = useForm(callback);
  const history = useHistory();
  const context = useContext(AuthContext)

  function callback(data) {
    let obj = {
        houseLocation: data.houseLocation,
      description: data.description,
      price: data.price
    };
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/api/create-request`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj),
    }).then(async (req) => {
      history.push('/')
    })
  }

  return (
    <Auth cond={context.user.role == 'houseOwner'}>
      <React.Fragment>
        <section className="section backgroundOne">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="card backgroundOne">
                  
                  <Form className="formstyle" onSubmit={handleSubmit}>
                      <h3 className="main-heading">Create request</h3>
                    <br />
                    <TextField
                      name="houseLocation"
                      type="text"
                      className="form-input"
                      label="House Location"
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                      name="description"
                      type="text"
                      className="form-input-des"
                      label="description"
                      multiline
                      rows={6}
                      defaultValue="Enter the course description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                      name="price"
                      type="number"
                      className="form-input-des"
                      label="Price In $$"
                      defaultValue="0"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <Button
                      type="submit"
                      className="form-button"
                      variant="contained"
                    >
                      submit
                    </Button>
                    <br />
                    <br />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </Auth>
  );
};

export default Create;
