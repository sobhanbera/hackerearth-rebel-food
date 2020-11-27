import React, { Component } from "react";
import "./MainApp.css";
import ChildErrorBoundary from "./ErrorBoundary/ChildErrorBoundary";
import SearchBox from "./SearchBox/SearchBox";
import BeerCard from "./BeerCard/BeerCard";

class MainApp extends Component {
	constructor() {
		super();
		this.state = {
			searchVal: "",
			searchPlaceholder: "Search By Style",
			imagesData: [],
			beerData: [],
			images: [""],
			names: [""],
			abv: [""],
			ounce: [""],
			style: [""],
			ibu: [""],
			id: [""],
			showIndex: [0, 19],
		};
	}

	componentDidMount() {
		fetch(
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json"
		)
			.then((response) => response.json())
			.then((response) => {
				var storeRes = [];
				for (let i = 0; i < response.length; ++i) {
					storeRes.push(response[i]);
				}
				this.setState({
					beerData: storeRes,
				});
				// console.log(this.state.beerData);
			});

		fetch(
			"https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json"
		)
			.then((response) => response.json())
			.then((response) => {
				var storeRes = [];
				for (let i = 0; i < response.length; ++i) {
					storeRes.push(response[i].image);
				}

				this.setState({
					imagesData: storeRes,
				});
			});

		const setData = setInterval(() => {
			if (this.state.beerData && this.state.imagesData) {
				let tempData = this.state.beerData;
				let tempImage = this.state.imagesData;
				let i = 0;
				for (let data in tempData) {
					tempData[data].image = tempImage[i];
					i++;
					if (i > 4) {
						i = 0;
					}
				}
				let images = [];
				let names = [];
				let abv = [];
				let ounce = [];
				let style = [];
				let id = [];
				let ibu = [];
				for (let i in tempData) {
					images.push(tempData[i].image);
					names.push(tempData[i].name);
					abv.push(tempData[i].abv);
					ounce.push(tempData[i].ounce);
					style.push(tempData[i].style);
					id.push(tempData[i].id);
					ibu.push(tempData[i].ibu);
				}
				this.setState({
					images: images,
					names: names,
					abv: abv,
					ounce: ounce,
					style: style,
					id: id,
				});
				console.log("NAME", this.state.style);
				clearInterval(setData);
			}
		}, 1000);
	}

	handleChange = (event) => {
		this.setState({
			searchVal: event.target.value,
		});
	};

	prevPage = () => {
		if (this.state.showIndex[0] > 0) {
			this.setState((prev) => {
				return {
					showIndex: [prev.showIndex[0] - 20, prev.showIndex[1] - 20],
				};
			});
		}
	};

	nextPage = () => {
		if (this.state.showIndex[0] < 2400) {
			this.setState((prev) => {
				return {
					showIndex: [prev.showIndex[0] + 20, prev.showIndex[1] + 20],
				};
			});
		}
	};

	render() {
		let cards = [];
		if (this.state.beerData && this.state.imagesData) {
			for (
				let i = this.state.showIndex[0];
				i <= this.state.showIndex[1];
				++i
			) {
				cards.push(
					<BeerCard
						key={this.state.id[i]}
						image={this.state.images[i]}
						name={this.state.names[i]}
						style={this.state.style[i]}
						abv={this.state.abv[i]}
						ounce={this.state.ounce[i]}
						ibu={this.state.ibu[i]}
					/>
				);
			}
		}

		return (
			<ChildErrorBoundary>
				<div className='App'>
					<SearchBox
						searchVal={this.state.searchVal}
						searchPlaceholder={this.state.searchPlaceholder}
						handleChange={this.handleChange}
						handleClick={this.handleClick}
					/>
					<div className='main-content'>{cards}</div>
					<div className='change-page'>
						<button onClick={this.prevPage}>Prev</button>
						<button onClick={this.nextPage}>Next</button>
					</div>
				</div>
			</ChildErrorBoundary>
		);
	}
}

export default MainApp;
