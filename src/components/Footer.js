import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className='d-flex justify-content-around align-items-center realFoot' >
        <div className='footTopDiv'>
          <h1
            style={{ fontSize: 80 }}
            className="text-center w-50 m-0 text-black font-weight-bold font-italic footLogo"
          >
            UniShop
          </h1>
          <p>
            <Link to='/termsConditions' style={{ color: "blue", textDecorationLine: 'underline' }}>Pogoji poslovanja</Link>
          </p>
        </div>
        {/* <h1>
        <Link to="/admin">Admin</Link>
      </h1> */}
        <div className='companyInfo'>
          <p>
            Proizvodnja kovinskih izdelkov in spletna prodaja, Miha Andraz
            Flajs, s.p.
          </p>
          <p>Nevem naslova 22</p>
          <p>1000 Ljubljana</p>
          <p>Maticna: 0000000000</p>
          <p>Davcna: 0000000000</p>
        </div>
      </div>
    </div>
  );
}
