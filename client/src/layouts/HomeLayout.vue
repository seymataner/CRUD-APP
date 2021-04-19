<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> </q-toolbar-title>
        <q-space />
      </q-toolbar>
      <div class="q-px-md q-pt-xs q-mb-xs text-italic">
        <div class="text-h5 text-weight-light q-py-xs">XYZ Company</div>
        <div class="text-subtitle2 text-italic text-weight-thin q-py-xs">
          Monday 4 November
        </div>
      </div>
      <q-img src="../icons/work.jpg" class="header-image absolute-top"> </q-img>
    </q-header>
    <q-page-container style="background: linear-gradient(#8e9eab, #eef2f3)">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.
//

export default {
  data() {
    return {};
  },
  computed: {
    /*
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/login") return "Login Form";
      else if (currentPath == "/register") return "Register Form";
    },
	*/
  },
  //
};
</script>


 <style lang="scss">
.header-image {
  height: 70%;
  z-index: -1;
  opacity: 0.7;
}
</style>

