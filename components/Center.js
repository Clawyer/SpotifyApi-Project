import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import CenterStyle from "../styles/style_component/Center.module.scss";

const image = "https://picsum.photos/100";
const colors = [
  "default",
  "bg1",
  "bg2",
  "bg3",
  "bg4",
  "bg5",
  "bg6",
  "bg7",
  "bg8",
  "bg9",
  "bg10",
];
function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className={CenterStyle.center}>
      <header className={CenterStyle.header}>
        <div className={CenterStyle.account} onClick={() => signOut()}>
          <img
            className={CenterStyle.profileImage}
            src={session?.user.image || image}
            alt={session?.user.name}
          />
          <h2>{session?.user.name}</h2>
          <BiChevronDown />
        </div>
      </header>
      <section
        className={`${CenterStyle["section--container"]}  ${CenterStyle[color]}`}
      >
        <img
          className={CenterStyle["playlist--image"]}
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className={CenterStyle["playlist--title"]}>{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
