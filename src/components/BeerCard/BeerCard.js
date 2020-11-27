import React, { useEffect } from "react";

const BeerCard = (props) => {
	useEffect(() => {
		console.log(props);
	});

	return (
		<div className='main-card'>
			<img src={props.image} alt='beer' />
			<div className='card-content'>
				<h3 className='name'>{props.name}</h3>
				<h3 className='style'>{props.style}</h3>
				<p>{props.ibu ? `{IBU: ${props.ibu}` : null}</p>
				<p>ABV: {props.abv}</p>
				<p>Ounces: {props.ounces}</p>
			</div>
		</div>
	);
};

export default BeerCard;
