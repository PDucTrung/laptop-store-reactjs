import ProviderContext from '../src/app/ContextGlobal/index';
import MainPage from './features/Components/MainPage';
function App() {
	return (
		<div className="App">
			<ProviderContext>
				<MainPage/>
			</ProviderContext>
		</div>
	);
}

export default App;
