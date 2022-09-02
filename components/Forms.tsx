import emailjs from 'emailjs-com';
import style from "../styles/styles.module.css";

import { Formsmodel } from '../models/Formsmodel';
import Button from '../node_modules/react-bootstrap/esm/Button';
import Form from '../node_modules/react-bootstrap/esm/Form';
import Link from '../node_modules/next/link';
import Images from './Images';

const Forms=(props:Formsmodel)=>{

  function enviarEmail(e){
    e.preventDefault();
    emailjs
      .sendForm(
        "service_24z6hdc",
        "template_ocqequz",
        e.target,
        "ZX2hCZ55pcM9PJ_W8"
      )
      .then((res) => {
        alert("Enviado Correctamente");
      });
  }
    return (
      <div
        className=" d-flex row col-12 "
        style={{
          color: "white",
          backgroundColor: "rgb(22, 25, 28)",
          margin: "0px",
          paddingTop: "20px",
        }}
      >
        <div
          className="col-md-5 row col-12"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className="col-12">
            <h2 style={{ marginTop: "30px", fontSize: "40px" }}>
              {props.title1}
            </h2>
          </div>
          <div className="col-8" style={{ margin: "15px" }}>
            <Form
              className="container"
              style={{ textAlign: "start", padding: "5px", height: "250px" }}
              onSubmit={enviarEmail}
            >
              <Form.Group className="mb-3">
                <Form.Label>{props.form1}</Form.Label>
                <Form.Control
                  type="email" required
                  id="from_name"
                  name="from_name"
                  style={{
                    width: "150px",
                    backgroundColor: "#30373e",
                    border: "none",
                    color: "white",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3 " id="message">
                <Form.Label>{props.form2}</Form.Label>
                <Form.Control
                  as="textarea"
                  id="message"
                  name="message"
                  style={{
                    backgroundColor: "#30373e",
                    border: "none",
                    color: "white",
                  }}
                />
              </Form.Group>
              <div
                className="col-12 row "
                style={{ justifyContent: "end", margin: "0px", padding: "0px" }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {props.button}
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-md-2 col-12">
          <h2 style={{ marginTop: "30px", fontSize: "40px" }}>
            {props.title2}
          </h2>
        </div>
        <div className="col-md-5 col-12  " style={{ marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "40px", marginTop: "30px" }}>
              {props.title3}
            </h1>
            <br />
            <div style={{ fontSize: "20px" }}>{props.text2}</div>
          </div>
          <div
            className="col-12 d-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            <div
              className="col-12 d-row justify-content-center"
            
            >
                <div
                  className="col-12 d-flex"
                  style={{ height: "80px", justifyContent: "center" }}
                >
                  <div>
                    <a href="https://www.linkedin.com/in/lucas-castro-7b4003219/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={style.logos1}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a href="https://github.com/lucascastro29">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={style.logos2}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
export default Forms
