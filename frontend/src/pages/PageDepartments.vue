<template>
  <q-page>
    <div class="q-pa-md">
      <q-list v-for="item in allDepartments" :key="item.id" class="q-pa-md">
        <q-expansion-item
          group="somegroup"
          :label="item.department_name"
          default-closed
          header-class="text-white bg-secondary"
          class="shadow-3 overflow-hidden full-width"
          style="border-radius: 15px"
        >
          <Users />
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddDeparment from "components/AddDepartment.vue";
import Users from "components/Users.vue";
//import { date } from "quasar";

export default {
  data() {
    return {
      filter: "",
    };
  },
  components: { AddDeparment, Users },
  methods: {
    ...mapActions("departments", ["fetchAllDepartments"]),
  },

  computed: {
    ...mapGetters("departments", ["allDepartments"]),
  },
  created() {
    this.fetchAllDepartments(localStorage.getItem("company_id"));
  },
};
</script>
<style lang="">
</style>
