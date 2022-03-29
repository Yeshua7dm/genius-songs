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

const INTERVAL = process.env.REACT_APP_INTERVAL;

const MainView = ({ allArtists, PageBreak, getRecordCount, getLastSong }) => {
  const [artists, setArtists] = useState([]);
  const [artiste, setArtiste] = useState(null);
  const [check, setCheck] = useState(true);
  const [checkInterval, setCheckInterval] = useState(false);
  const [lastLatest, setLastLatest] = useState(null);
  const [currentLatest, setCurrentLatest] = useState(null);

  useEffect(() => {
    const addArtist = async (one_artist) => {
      try {
        const docRef = await addDoc(collection(db, "artists"), one_artist);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    // get all the artists and create them if they do not exist
    const getArtists = async () => {
      const querySnapshot = await getDocs(collection(db, "artists"));
      if (!querySnapshot.empty || querySnapshot.size === 3) {
        let artists = [];
        console.log(querySnapshot.docs);
        querySnapshot.forEach((doc) => {
          artists.push({ ...doc.data(), id: doc.id });
        });
        setArtists(artists);
        artists.sort((a, b) => a.count - b.count);
        setArtiste(artists[0]);
      } else {
        console.log("nothing found");
        allArtists.forEach((artist) => {
          addArtist(artist);
        });
        getArtists();
      }
    };

    const checkForSongs = async () => {
      const allSongs = await getDocs(collection(db, "songs"));
      if (allSongs.empty) {
        console.log("there are no songs in the DB yet");
        setCheck(false);
      } else {
        let songs = [];
        allSongs.forEach((song) => {
          songs.push({ id: song.id, ...song.data() });
        });
        console.log(songs);
        console.log(songs[songs.length - 1]);
        const song = songs[songs.length - 1];
        getRecordCount(songs.length);
        setLastLatest(song);
        setCheck(true);
        getLastSong(song);
        setCurrentLatest(null);
      }
    };

    // run the function
    getArtists();
    checkForSongs();
    setCheckInterval(false);
  }, [allArtists, checkInterval]);

  useEffect(() => {
    const addNewSong = async (song) => {
      try {
        const addSong = await addDoc(collection(db, "songs"), song);
        console.log("Document written: ", { id: addSong.id, ...song });
        setCurrentLatest(song);
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
      console.log(artists);

      const artistID = artiste.artist_id;
      const count = artiste.count;
      if (count === 0 || count % PageBreak === 0) {
        console.log(count);
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
          console.log(resp.data);
          const song = resp.data.response.songs[index];
          console.log(index, song, PageBreak, page);
          chosen = {
            artist_id: artistID,
            song_id: song.id,
            full_title: song.full_title,
            artist_name: artiste.name,
            added_at: Date(),
          };
          addNewSong(chosen);

          updateArtist();
          console.log(chosen);
        });
    };

    if (artiste && artists) {
      NewSong();
    }
  }, [PageBreak, artiste, artists]);

  return (
    <>
      {!check && <p>No songs found</p>}
      {currentLatest &&
        setInterval(() => {
          setCheckInterval(true);
        }, INTERVAL)}
    </>
  );
};

export default MainView;
