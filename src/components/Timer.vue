<template>
  <div class="timerItem">
    <h5>{{ timer.name }}</h5>
    <h1 class="time">
      <span @click="changeMinutes" class="minutes"> {{ timer.minutes }} </span
      >:<span @click="changeMinutes" class="seconds">{{ timer.seconds }} </span>
    </h1>

    <button @click="deleteTimer">delete</button>
    <button v-if="!timerStarted" @click="startTimer">Start</button>
    <button v-else @click="toggleTimer">Pauzeer timer</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";
export default {
  props: ["timer"],
  setup(props, context) {
    let timerStarted = ref(false);
    let intervalTimer = null;
    const uri = "http://localhost:3000/timers/" + props.timer.id;
    const timerStartTime = {
      minutes: props.timer.minutes,
      seconds: props.timer.seconds,
    };
    const changeMinutes = () => {
      console.log("clicked");
    };

    const deleteTimer = async () => {
      clearInterval(intervalTimer);
      await projectFirestore
        .collection("timers")
        .doc(props.timer.id)
        .delete()
        .then(() => context.emit("delete", props.timer.id))
        .catch((err) => console.log(err));
    };

    const resetTimer = () => {
      timerStarted.value = false;
      props.timer.minutes = timerStartTime.minutes;
      props.timer.seconds = timerStartTime.seconds;
    };

    const startTimer = () => {
      timerStarted.value = true;
      console.log(props.timer.id);
      clearInterval(intervalTimer);
      intervalTimer = setInterval(() => {
        if (timerStarted.value) {
          if (props.timer.seconds <= 0 && props.timer.minutes <= 0) {
            resetTimer();
            alert("timer stopped");
          } else if (props.timer.seconds > 0) {
            props.timer.seconds--;
          } else {
            props.timer.minutes--;
            props.timer.seconds = 59;
          }
        }
      }, 1000);
    };

    const toggleTimer = () => {
      timerStarted.value = !timerStarted.value;
    };
    return {
      uri,
      deleteTimer,
      startTimer,
      toggleTimer,
      timerStarted,
      changeMinutes,
    };
  },
};
</script>

<style>
.timerItem {
  /* width: 400px;
  height: 350px; */
  background-color: #333;
  padding: 20px;
  border-radius: 20px;
  color: white;
  margin: 10px;
}
.timerItem button {
  padding: 5px 10px;
  margin: 10px;
  font-size: 150%;
}
.timerItem h1 {
  font-weight: 100;
  font-size: 400%;
}
</style>