import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getHabits } from "../../actions/habits";
import Habits from "../Habit/Habits";

function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getHabits());
    console.log("okay home comp");
  }, [dispatch, currentId]);

  return (
    <div>
      <Switch>
        <Route
          path="/home/form"
          component={() => (
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          )}
        />
        <Route
          path="/home/habits"
          exact
          component={() => <Habits setCurrentId={setCurrentId} />}
        />
      </Switch>
    </div>
  );
}

export default Home;
