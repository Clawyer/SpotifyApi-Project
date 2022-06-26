import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import PlayerStyle from "../styles/style_component/Player.module.scss";
import { BiRewind, BiShuffle, BiSkipNext, BiVolumeMute } from "react-icons/bi";
import { FiRepeat, FiPlay, FiPause, FiVolume2 } from "react-icons/fi";
import { GiTechnoHeart } from "react-icons/gi";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);
      });
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [session, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  const handleChange = (e) => {
    const input = e.target;
    setVolume(Number(input.value));
    const value = input.value;
    input.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`;
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch( (e) => console.log(e));
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);
  return (
    <div className={PlayerStyle["player"]}>
      {/* LEFT PANEL */}
      <div>
        <img
          className={PlayerStyle["player--cover"]}
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        <GiTechnoHeart className={PlayerStyle.controls} />
      </div>
      {/* CENTER PANEL */}
      <div className={PlayerStyle["player--center"]}>
        <BiShuffle className={PlayerStyle.controls} />
        <BiRewind className={PlayerStyle.controls} />

        {isPlaying ? (
          <FiPause
            onClick={handlePlayPause}
            className={`${PlayerStyle.controls} ${PlayerStyle.play}`}
          />
        ) : (
          <FiPlay
            onClick={handlePlayPause}
            className={`${PlayerStyle.controls} ${PlayerStyle.play}`}
          />
        )}
        <BiSkipNext className={PlayerStyle.controls} />
        <FiRepeat className={PlayerStyle.controls} />
      </div>
      {/* RIGHT PANEL */}
      <div className={PlayerStyle["player--volume--controls"]}>
        <BiVolumeMute
          className={PlayerStyle.controls}
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          className={PlayerStyle.progress}
          onChange={handleChange}
        />
        <FiVolume2
          className={PlayerStyle.controls}
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
