import React from "react";

const SearchBox = (props) => {
	return (
		<div className='search-input'>
			<input
				className='search-box'
				type='text'
				value={props.searchVal}
				placeholder={props.searchPlaceholder}
				onChange={props.handleChange}
			/>
			<button className='search-button' onClick={props.handleClick}>
				Search
			</button>
		</div>
	);
};

export default SearchBox;
