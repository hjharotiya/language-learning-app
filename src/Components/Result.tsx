import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ClearState } from "../redux/slice";
import { countMatchingElements } from "../utlis/Feature";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const resetHandler = (): void => {
    navigate("/");
    dispatch(ClearState());
  };

  const correctAns = countMatchingElements(
    result,
    words.map((i) => i.meaning)
  );
  const percentage = (correctAns / words.length) * 100;
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography m={"1rem"} variant="h6">
        you got {correctAns} right out of {words?.length}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            your Answer
          </Typography>
          <List>
            {result.map((i, idx) => (
              <ListItem key={idx}>
                {idx + 1}-{i}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            correct Ans
          </Typography>
          <List>
            {words.map((i, idx) => (
              <ListItem key={idx}>
                {idx + 1} -{i.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "green" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>
      <Button
        onClick={resetHandler}
        sx={{ margin: "1rem" }}
        variant="contained"
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
