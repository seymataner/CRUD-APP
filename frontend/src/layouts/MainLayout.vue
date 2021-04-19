<template>
  <q-layout view="hHh LpR fFf" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="absolute-center"></q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="power_settings_new" @click="logOut()"
          >Çıkış</q-btn
        >
      </q-toolbar>
      <div class="q-px-md q-pt-xs q-mb-xs text-italic">
        <div class="text-h5 text-weight-light q-py-xs">XYZ Company</div>
        <div class="text-subtitle2 text-italic text-weight-thin q-py-xs">
          {{ todaysDate }}
        </div>
      </div>

      <q-img src="../icons/work.jpg" class="header-image absolute-top"> </q-img>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="600"
      :width="250"
      bordered
      content-class="bg-accent"
      elevated
    >
      <q-list class="text-italic" v-if="user.is_admin">
        <EssentialLink
          v-for="link in linksAdmin"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list class="text-italic" v-if="user.is_employee">
        <EssentialLink
          v-for="link in linksEmployee"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list class="text-italic" v-if="user.is_customer">
        <EssentialLink
          v-for="link in linksCustomer"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer class="bg-primary">
      <q-tabs v-if="user.is_admin">
        <q-route-tab          
          v-for="link in linksAdmin"
          :key="link.label"
          :to="link.to"
          :icon="link.icon"
        />
      </q-tabs>
      <q-tabs v-if="user.is_employee">
        <q-route-tab
          v-for="link in linksEmployee"
          :key="link.label"
          :to="link.to"
          :icon="link.icon"
        />
      </q-tabs>

      <q-tabs v-if="user.is_customer">
        <q-route-tab
          v-for="link in linksCustomer"
          :key="link.label"
          :to="link.to"
          :icon="link.icon"
        />
      </q-tabs>
    </q-footer>

    <q-page-container style="background: linear-gradient(#8e9eab, #eef2f3)">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

const linksDataAdmin = [
  {
    label: "Hesap",
    icon: "account_box",
    to: "/account",
  },
  {
    label: "Talepler",
    icon: "add_task",
    to: "/rooms",
  },
  {
    label: "Departmanlar",
    icon: "work",
    to: "/departments", 
  },
  {
    label: "Kullanıcılar",
    icon: "supervisor_account",
    to: "/users",
  },
  {
    label: "Firmalar",
    icon: "business",
    to: "/firms",
  },
  {
    label: "Analizler",
    icon: "bar_chart",
    to: "/analysis",
  },
];

const linksDataEmployee = [
  {
    label: "Hesap",
    icon: "account_box",
    to: "/account",
  },
  {
    label: "Talepler",
    icon: "add_task",
    to: "/rooms",
  },
  {
    label: "Firmalar",
    icon: "business",
    to: "/firms",
  },
];
const linksDataCustomer = [
  {
    label: "Hesap",
    icon: "account_box",
    to: "/account",
  },
  {
    label: "Talepler",
    icon: "add_task",
    to: "/requests",
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: this.$q.screen.width < 1023 ? false : true,
      linksAdmin: linksDataAdmin,
      linksEmployee: linksDataEmployee,
      linksCustomer: linksDataCustomer,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("users", ["fetchUser"]),

    logOut() {
      this.logout()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    ...mapGetters("users", ["user"]),
    todaysDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "DD / MM / YYYY HH:mm");
    },
  },
  created() {
    this.fetchUser(localStorage.getItem("user_id"));
  },
};
</script>

<style lang="scss">
.q-btn {
  position: relative;
}
.header-image {
  height: 70%;
  z-index: -1;
  opacity: 0.7;
}
</style>

