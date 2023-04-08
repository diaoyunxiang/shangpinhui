<template>
  <div id="app">
    <Header/> 
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Home from "./pages/Home"
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      response: "",
    };
  },
   mounted() {
    this.$store.dispatch("home/categoryList");
  },
  
  components: {
    Header,
    Home,
    Footer,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
