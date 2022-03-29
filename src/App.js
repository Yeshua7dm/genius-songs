import { allArtists } from "./artists";
import MainView from "./components/MainView";

const BREAKER = 25;

function App() {
  return (
    <div className="App">
      <MainView allArtists={allArtists} PageBreak={BREAKER} />
    </div>
  );
}

export default App;
