<template>
  <div v-if="timers.length">
    <Timer
      @delete="handleDelete"
      v-for="timer in timers"
      :key="timer.id"
      :timer="timer"
      :ref="setRef"
    />
    <button @click="startTimers">Start all timers</button>
    <button @click="stopTimers">Pause all timers</button>
  </div>
  <div v-else>Geen timers</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Timer from "./Timer.vue";
import { projectFirestore } from "../firebase/config";

export default {
  components: { Timer },
  setup() {
    const timers = ref([]);
    const error = ref(null);
    const timer = [];
    let setRef = (el) => {
      timer.push(el);
    };
    let load = async () => {
      try {
        const res = await projectFirestore.collection("timers").get();
        console.log(res.docs);
        timers.value = res.docs.map((doc) => {
          console.log({ ...doc.data(), id: doc.id });
          return { ...doc.data(), id: doc.id };
        });
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };
    let startTimers = () => {
      // timer.value.startTimer();
      timer.forEach((item) => {
        if (item) {
          //wanneer een item is gedelete moet deze worden overgeslagen in de loop
          item.startTimer();
        }
      });
      // console.log(timer[0]);
    };

    let stopTimers = () => {
      // timer.value.startTimer();
      timer.forEach((item) => {
        if (item) {
          //wanneer een item is gedelete moet deze worden overgeslagen in de loop
          item.toggleTimer();
        }
      });
      // console.log(timer[0]);
    };
    const handleDelete = (id) => {
      timers.value = timers.value.filter((timer) => {
        return timer.id !== id;
      });
    };
    load();
    return {
      timers,
      error,
      load,
      handleDelete,
      timer,
      startTimers,
      stopTimers,
      setRef,
    };
  },
};
</script>

<style>
</style>