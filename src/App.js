import logo from "./logo.svg";
import "./App.css";
import MainApp from "./components/MainApp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<MainApp />
		</ErrorBoundary>
	);
}

export default App;
