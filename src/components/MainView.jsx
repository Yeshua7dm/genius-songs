import React from "react";
import { db } from "../fireBaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import axios from "axios";

const INTERVAL = Number(process.env.REACT_APP_INTERVAL);

const MainView = ({ allArtists, PageBreak, getRecordCount, getLastSong }) => {
  const [artists, setArtists] = useState([]);
  const [artiste, setArtiste] = useState(null);
  const [check, setCheck] = useState(true);
  const [checkInterval, setCheckInterval] = useState(true);

  /***
   * Get the Artists in the DB
   * if no artist, add artists
   * Get the Artist with the least count
   * get the number of songs in the DB
   * select the last one based on the time added
   * get recordCount, lastSong for the App.jsx
   *
   */
  useEffect(() => {
    const addArtist = async (one_artist) => {
      try {
        await addDoc(collection(db, "artists"), one_artist);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    // get all the artists and create them if they do not exist
    const getArtists = async () => {
      const querySnapshot = await getDocs(collection(db, "artists"));
      if (!querySnapshot.empty) {
        let artists = [];

        querySnapshot.forEach((doc) => {
          artists.push({ ...doc.data(), id: doc.id });
        });
        setArtists(artists);
        artists.sort((a, b) => a.count - b.count);
        setArtiste(artists[0]);
      } else {
        allArtists.forEach((artist) => {
          addArtist(artist);
        });
        getArtists();
      }
    };

    const checkForSongs = async () => {
      const allSongs = await getDocs(collection(db, "songs"));
      if (allSongs.empty) {
        setCheck(false);
      } else {
        let songs = [];
        allSongs.forEach((song) => {
          songs.push({ id: song.id, ...song.data() });
        });
        songs.sort((a, b) => new Date(a.added_at) - new Date(b.added_at));
        getRecordCount(songs.length);
        setCheck(true);
        getLastSong(songs[songs.length - 1]);
      }
    };

    // run the function
    if (checkInterval) {
      setCheckInterval(false);
      getArtists();
      checkForSongs();
    }
  });

  /**
   * get a new song
   * add it to the db
   * update count for the artist
   */
  useEffect(() => {
    const addNewSong = async (song) => {
      try {
        await addDoc(collection(db, "songs"), song);
        getLastSong(song);
        const allSongs = await getDocs(collection(db, "songs"));
        getRecordCount(allSongs.size);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    const updateArtist = async () => {
      const artistDoc = doc(db, "artists", artiste.id);
      const toUpdate = { count: artiste.count + 1 };
      await updateDoc(artistDoc, toUpdate);
    };

    const NewSong = async () => {
      let page, index, chosen;

      const artistID = artiste.artist_id;
      const count = artiste.count;
      if (count === 0 || count % PageBreak === 0) {
        index = 0;
        page = count === 0 ? 1 : count / PageBreak + 1;
      } else if (count % PageBreak !== 0) {
        page = Math.floor(count / PageBreak) + 1;
        index = count % PageBreak;
      }

      await axios
        .get(
          `https://${process.env.REACT_APP_RAPID_HOST}/artists/${artistID}/songs`,
          {
            params: {
              page: page,
              per_page: PageBreak,
            },
            headers: {
              "X-RapidAPI-Host": process.env.REACT_APP_RAPID_HOST,
              "X-RapidAPI-Key": process.env.REACT_APP_RAPID_KEY,
            },
          }
        )
        .then((resp) => {
          const song = resp.data.response.songs[index];
          chosen = {
            artist_id: artistID,
            song_id: song.id,
            full_title: song.full_title,
            artist_name: song.artist_names,
            added_at: Date(),
            image: song.header_image_thumbnail_url,
            page_reviews: song.stats.pageviews,
          };

          addNewSong(chosen);
          console.log(chosen);
          updateArtist();
          setTimeout(() => {
            setCheckInterval(true);
          }, INTERVAL);
        });
    };

    if (!checkInterval) {
      NewSong();
    }
  }, [artiste]);

  return <>{!check && <p>No songs found</p>}</>;
};

export default MainView;
