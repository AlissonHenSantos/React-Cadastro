import React from "react";
import { Link } from "react-router-dom";


export default function(props) {

return    <Link to={props.link}>
                <i className={`fa fa-${props.icon}`}></i> {props.caminho}
            </Link>
}