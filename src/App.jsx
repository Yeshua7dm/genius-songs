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
      <header>
        <div>
          <h1>Genius Artists Retrieval</h1>
        </div>
        <nav>
          <p>
            <span>Last Update @</span>
            <span>{lastCheck}</span>
          </p>
          <p>
            <span>Number of Records</span>
            <span>{records}</span>
          </p>
        </nav>
      </header>
      {lastRetrieved && (
        <main>
          <h2>Last Retrieved Record</h2>
          <div>
            <section>
              <img src={lastRetrieved.image} alt={lastRetrieved.full_title} />
            </section>
            <section class="song_details">
              <p>
                <span class="label">Full Title</span>
                <span class="detail">{lastRetrieved.full_title}</span>
              </p>
              <p>
                <span class="label">Artist</span>
                <span class="detail">{lastRetrieved.artist_name}</span>
              </p>
              <p>
                <span class="label">Page Reviews</span>
                <span class="detail">{lastRetrieved.page_reviews} reviews</span>
              </p>
            </section>
          </div>
        </main>
      )}

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
