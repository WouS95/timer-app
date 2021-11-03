<template>
  <div class="home">
    <h1>All timers</h1>
    <Timers />
  </div>
</template>

<script>
import Timers from "../components/Timers.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Timers,
  },
};
</script>
