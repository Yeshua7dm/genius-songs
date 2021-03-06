import { allArtists } from "./artists";
import MainView from "./components/MainView";
import { useState } from "react";

const BREAKER = 20;
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
        {!lastCheck && <p>No records in the DB yet</p>}
      </header>
      {lastRetrieved && (
        <main>
          <h2>Last Retrieved Record</h2>
          <div>
            <section>
              <img src={lastRetrieved.image} alt={lastRetrieved.full_title} />
            </section>
            <section className="song_details">
              <p>
                <span className="label">Full Title</span>
                <span className="detail">{lastRetrieved.full_title}</span>
              </p>
              <p>
                <span className="label">Artist</span>
                <span className="detail">{lastRetrieved.artist_name}</span>
              </p>
              <p>
                <span className="label">Page Reviews</span>
                <span className="detail">
                  {lastRetrieved.page_reviews} reviews
                </span>
              </p>
            </section>
          </div>
        </main>
      )}
      {lastRetrieved && (
        <nav>
          <p>
            <span className="nav_label">Last Update @</span>
            <span className="nav_detail">{lastCheck}</span>
          </p>

          <p>
            <span className="nav_label">Number of Records</span>
            <span className="nav_detail">{records}</span>
          </p>
        </nav>
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
