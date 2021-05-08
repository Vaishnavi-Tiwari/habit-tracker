import React from "react";
import Habit from "./Habit";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
function Habits({ setCurrentId }) {
  const habits = useSelector((state) => state.habits);
  const user = JSON.parse(localStorage.getItem("profile"));
  return !habits.length ? (
    <CircularProgress />
  ) : (
    <div>
      <Grid container>
        {habits.map((habit) => (
          <Grid>
            {(user?.result?.googleId == habit?.creator ||
              user?.result?._id == habit?.creator) && (
              <div key={habit._id}>
                <Habit habit={habit} setCurrentId={setCurrentId} />
              </div>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Habits;
