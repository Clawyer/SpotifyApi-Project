import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";
import SongsStyle from "../styles/style_component/Songs.module.scss";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className={SongsStyle["songs--container"]} >
      {playlist?.tracks.items.map((track, i) => (
        // <div key={track.track.id}> {track.track.name}</div>
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
