<template>
  <q-page padding>
    <div class="row float-right">
      <AddRoom v-if="user.is_customer" />
      <AddUser v-if="user.is_admin" />
      <AddFirm v-if="user.is_admin" />
      <AddDeparment v-if="user.is_admin" />
    </div>
  </q-page>
</template>

<script>
import AddRoom from "components/AddRoom.vue";
import AddUser from "components/AddUser.vue";
import AddFirm from "components/AddFirm.vue";
import AddDeparment from "components/AddDepartment.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { AddRoom, AddUser, AddFirm , AddDeparment},

  methods: {
    ...mapActions("users", ["fetchUser"]),
  },
  computed: {
    ...mapGetters("users", ["user"]),
  },
  created() {
    this.fetchUser(localStorage.getItem("user_id"));
  },
};
</script>

<style lang="scss">
</style>