import React, { useState, useEffect } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { createHabit, updateHabit } from "../../actions/habits";
import { subscribe } from "../../actions/notification";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { useHistory } from "react-router-dom";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Paper, TextField, Button } from "@material-ui/core";

function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const notify = () => {
  //   const publicVapidKey =
  //     "BN-aM9XMZRGBFK140RiriUB3EsqHISMEBmY401UcBdwOIPA40_wXIt3sg6_gENTdkOi8MfnTm386tOjY97_tF2I";

  //   //check for service worker
  //   if ("serviceWorker" in navigator) {
  //     send().catch((err) => console.log("line 15", err));
  //   }
  //   //register service worker,push , send push
  //   async function send() {
  //     console.log("registering service worker");
  //     const register = await navigator.serviceWorker.register("/worker.js", {
  //       scope: "/",
  //     });

  //     //register push
  //     console.log("Registering push", register);
  //     const subscription = await register.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  //     });
  //     console.log("Push Registered", subscription);

  //     dispatch(subscribe(subscription));
  //   }

  //   function urlBase64ToUint8Array(base64String) {
  //     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //     const base64 = (base64String + padding)
  //       .replace(/-/g, "+")
  //       .replace(/_/g, "/");

  //     const rawData = window.atob(base64);
  //     const outputArray = new Uint8Array(rawData.length);

  //     for (let i = 0; i < rawData.length; ++i) {
  //       outputArray[i] = rawData.charCodeAt(i);
  //     }
  //     return outputArray;
  //   }
  // };

  const user = JSON.parse(localStorage.getItem("profile"));

  const habit = useSelector((state) =>
    currentId ? state.habits.find((p) => p._id == currentId) : null
  );
  const [habits, setHabits] = useState({
    habit: "",
    time: new Date(),
    completed: false,
  });

  useEffect(() => {
    if (habit) {
      setHabits(habit);
    }
  }, [habit]);

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateHabit(currentId, habits));
    }
    if (habits.habit !== "") {
      dispatch(createHabit(habits));
    }
    clear();
    history.push("/home/habits");
  };

  const clear = () => {
    setCurrentId(null);
    setHabits({ habit: "", completed: false });
  };

  return (
    <Paper class="form">
      <form action="">
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Enter Habit"
          name="habit"
          value={habits.habit}
          onChange={(e) => setHabits({ ...habits, habit: e.target.value })}
          type="text"
          className="todo-input"
        />

        <div className="dt">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <div
            style={{ marginLeft: "250px", paddingTop: "20px", width: "200px" }}
          >
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              variant="static"
            />
          </div> */}
            <div
              style={{
                width: "200px",
                paddingTop: "20px",
              }}
            >
              <TimePicker
                label="Enter Time"
                className="timePicker"
                name="time"
                value={habits.time}
                onChange={(time) => setHabits({ ...habits, time: time })}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <Button
          id="button"
          variant="outlined"
          color="primary"
          size="large"
          onClick={submitTodoHandler}
          className="form_button"
          disabled={!user?.result}
        >
          Add
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
