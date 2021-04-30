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
        {!user?.result && <h4 className="info">Login to check your habits</h4>}
        {habits.map((habit) => (
          <>
            {(user?.result?.googleId == habit?.creator ||
              user?.result?._id == habit?.creator) && (
              <Grid key={habit._id} item xs={12} sm={6} md={6} lg={4}>
                <Habit habit={habit} setCurrentId={setCurrentId} />
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </div>
  );
}

export default Habits;
