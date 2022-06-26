import { signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import {
  BiHome,
  BiSearch,
  BiLibrary,
  BiPlusCircle,
  BiRss,
  BiLike,
  BiHeart,
  BiLogOutCircle,
} from "react-icons/bi";
import sideBarStyles from "../styles/style_component/Sidebar.module.scss";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists(session.user.id).then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className={sideBarStyles["sidebar"]}>
      <div className={sideBarStyles["sidebar--menu"]}>
        <button className={sideBarStyles["btn-icon"]}>
          <BiHome />
          <p>Home</p>
        </button>
        <button className={sideBarStyles["btn-icon"]}>
          <BiSearch />
          <p>Rechercher</p>
        </button>
        <button className={sideBarStyles["btn-icon"]}>
          <BiLibrary />
          <p>Bibliothèque</p>
        </button>
        <hr className={sideBarStyles["sidebar--separator"]} />
        <button className={sideBarStyles["btn-icon"]}>
          <BiPlusCircle />
          <p>Créer une Playlist</p>
        </button>
        <button className={sideBarStyles["btn-icon"]}>
          <BiHeart />
          <p>Vos Chansons Préférées</p>
        </button>
        <button className={sideBarStyles["btn-icon"]}>
          <BiRss />
          <p>Vos Podcast</p>
        </button>
        <hr className={sideBarStyles["sidebar--separator"]} />

        {/* PLAYLIST */}
        {playlists.map((playlist) => (
          console.log(playlist),
          <button
            key={playlist.id}
            className={sideBarStyles.playlist}
            onClick={() => setPlaylistId(playlist.id)}
          >
            <p>{playlist.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
