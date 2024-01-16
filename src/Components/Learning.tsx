import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utlis/Feature";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slice";
import Loading from "./Loading";

const Learning = () => {
  const [count, setCount] = useState<number>(0);

  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);

  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );
  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSrc(data);
      console.log("data=>", data);
    }
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFail(err)));

    if (error) {
      alert(error);
      dispatch(ClearState());
    }
  }, []);

  if (loading) return <Loading />;
  console.log(audioSrc, audioRef);

  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}

      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>

      <Typography m={"2rem 0"}>Learning Made Easy...</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h5">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h5">
          : {words[count]?.meaning}
        </Typography>
        <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "TEST" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
