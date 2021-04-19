<template>
  <div class="q-pa-sm">
    <div>
      <q-btn
        label=""
        color="primary"
        circle
        @click="dialog = true"
        class="float-right absolute-bottom"
        icon="work"
      >
	   <q-tooltip content-class="bg-primary">Departman Ekle</q-tooltip>
	   </q-btn>
      <q-dialog v-model="dialog" class="absolute-center">
        <q-card class="q-pa-md q-gutter-xs">
          <q-card-section class="bg-primary">
            <h4 class="text-h6 text-white q-my-xs">Departman Ekle</h4>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              type="input"
              label="Departman Adı"
              clearable
              v-model="department_name"
            />
            <q-input
              type="input"
              label="Departman Kodu"
              clearable
              v-model="department_code"
            />
            <q-btn
              v-close-popup
              label="Ekle"
              color="secondary"
              @click="onAdd()"
            />
            <q-btn
              v-close-popup
              label="Vazgeç"
              color="primary"
              @click="clearData()"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      department_name: null,
      department_code: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("departments", ["pushDepartment"]),

    onAdd() {
      const pushData = {
        department_name: this.department_name,
        department_code: this.department_code,
        company_id: localStorage.getItem("company_id"),
      };
      this.pushDepartment(pushData);
      this.clearData();
    },
    clearData() {
      this.department_name = null;
      this.department_code = null;
    },
  },
  computed: {
    ...mapGetters("departments", ["departments"]),
  },
  created() {},
};
</script>

<style lang="css">
</style>