import useSpotify from "../hooks/useSpotify";
import SongStyle from "../styles/style_component/Song.module.scss";
import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
        uris: [track.track.uri],
    })
  };

  return (
    <div className={SongStyle["song--container"]} onClick={playSong}>
      <div className={SongStyle["song--left"]}>
        <p>{order + 1}</p>
        <img
          className={SongStyle.cover}
          src={track.track.album.images[0].url}
          alt={track.track.Song}
        />
        <div className={SongStyle.song}>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className={SongStyle["song--right"]}>
        <p>{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
