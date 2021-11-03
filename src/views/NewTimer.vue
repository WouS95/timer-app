<template>
  <div id="addnew">
    <h1>Add new timer</h1>
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required />
      <div class="timesection">
        <div class="minutessection">
          <label>Min</label>
          <input v-model="minutes" required type="number" />
        </div>
        <div class="secondssection">
          <label>Sec</label>
          <input v-model="seconds" required max="60" type="number" />
        </div>
      </div>
      <button>Add timer</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { projectFirestore } from "../firebase/config";
export default {
  setup() {
    const router = useRouter();
    const title = ref("");
    const minutes = ref();
    const seconds = ref();
    const handleSubmit = async () => {
      let timer = {
        name: title.value,
        minutes: minutes.value,
        seconds: seconds.value,
      };
      const res = await projectFirestore
        .collection("timers")
        .add(timer)
        .then(() => {
          router.push("/");
        });
    };
    return { title, minutes, seconds, handleSubmit };
  },
};
</script>

<style>
#addnew {
  max-width: 300px;
  margin: 0 auto;
  text-align: left;
}
#addnew label {
  clear: both;
  display: block;
}
#addnew input {
  padding: 10px;
  width: 100%;
}
#addnew .timesection {
  width: 100%;
}
#addnew .minutessection,
#addnew .secondssection {
  width: 50%;
  width: calc(50% - 5px);
  float: left;
  margin-right: 10px;
  box-sizing: border-box;
}
#addnew .secondssection {
  margin-right: 0;
}
#addnew button {
  width: 50%;
  /* float: none; */
  padding: 15px;
  margin: 10px auto;
  border-radius: 10px;
  border: 2px solid grey;
  background: none;
  font-size: 120%;
}
#addnew button:hover {
  background: #eee;
  cursor: pointer;
}
</style>