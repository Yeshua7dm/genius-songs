import { allArtists } from "./artists";
import MainView from "./components/MainView";
import { useState } from "react";

const BREAKER = 25;
function App() {
  const [lastCheck, setLastCheck] = useState("");
  const [records, setRecords] = useState(0);
  const [lastRetrieved, setLastRetrieved] = useState(null);

  const getRecordCount = (count) => {
    setRecords(count);
    console.log(count);
  };
  const getLastSong = (lastSong) => {
    setLastCheck(lastSong.added_at);
    setLastRetrieved(lastSong);
  };
  return (
    <div className="App">
      <div>
        <h2>Genius Artists Application</h2>
        <article>
          <p>
            <span>Time of Last Check</span> <span>{lastCheck}</span>
          </p>
          <p>
            <span>Number of Records</span> <span>{records}</span>
          </p>
          <p>
            <span>Last Retrieved Value</span>{" "}
            <span>{JSON.stringify(lastRetrieved)}</span>
          </p>
        </article>
      </div>
      <MainView
        allArtists={allArtists}
        PageBreak={BREAKER}
        getLastSong={getLastSong}
        getRecordCount={getRecordCount}
      />
    </div>
  );
}

export default App;
