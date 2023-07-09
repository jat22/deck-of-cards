import React from "react";
import "./Card.css"

const Card = ({ img, code }) => (
	<div className="card">
		<img src={img} alt={code}/>
	</div>
)

export default Card