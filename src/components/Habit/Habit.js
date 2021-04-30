import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteHabit } from "../../actions/habits";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActions,
} from "@material-ui/core";
import "./habit.css";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { habitStreak } from "../../actions/habits";
import { date } from "date-fns/locale/af";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxHeight: 400,
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

function Habit({ habit, setCurrentId }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const history = useHistory();

  const checkClicked = (habit) => {
    if (!habit.completed) {
      habit.completed = true;
      dispatch(habitStreak(habit));
      history.push("/habits");
      console.log(habit);
    }
  };

  const editClicked = (habit) => {
    history.push("/form");
    setCurrentId(habit._id);
  };

  useEffect(() => {
    if (habit.completed) {
      const date = moment(habit.streakDate);
      const todaysDate = moment();
      const diffDate = todaysDate - date;
      const TOTAL_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
      console.log(Math.floor(diffDate / TOTAL_MILLISECONDS_IN_A_DAY));
      // console.log(
      //   Math.floor(diffDate / TOTAL_MILLISECONDS_IN_A_DAY),
      //   "useEffect"
      // );
      if (Math.floor(diffDate / TOTAL_MILLISECONDS_IN_A_DAY) >= 1) {
        habit.completed = false;
        dispatch(habitStreak(habit, habit.completed));
        history.push("/habits");
      }
    }
  }, [habit]);

  return (
    <div className="habit-container">
      <Card className={classes.root}>
        <CardContent>{habit.habit}</CardContent>
        <CardContent> {moment(habit.createdAt).format("ll")}</CardContent>
        <CardContent>Time:{moment(habit.time).format("LT")}</CardContent>
        <CardContent>Streak:{habit.streak}</CardContent>
        <CardContent>
          <div class="container">
            <svg width="350" height="250" class="chart-container">
              <circle
                cx="100"
                cy="100"
                r="70"
                class="back"
                fill="none"
                class="back"
              />
              <circle cx="98" cy="109" r="70" class="front" fill="none" />
              <g class="text">
                <text
                  x="100"
                  y="100"
                  alignment-baseline="central"
                  text-anchor="middle"
                  id="percentage"
                >
                  70%
                </text>
              </g>
            </svg>
          </div>
        </CardContent>
        <CardActions className="btn-wrap">
          <IconButton className="check-btn">
            {habit.completed ? (
              <CheckCircleIcon />
            ) : (
              <CheckCircleOutlinedIcon onClick={() => checkClicked(habit)} />
            )}
          </IconButton>
          <IconButton className="notif-btn">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton className="del-btn">
            <CreateOutlinedIcon onClick={() => editClicked(habit)} />
          </IconButton>
          <IconButton className="del-btn">
            <DeleteOutlineOutlinedIcon
              onClick={() => dispatch(deleteHabit(habit._id))}
              {...classes.ButtonChange}
            />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Habit;
