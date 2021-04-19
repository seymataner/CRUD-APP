<template>
  <div class="q-pa-sm">
    <div>
      <q-btn
        label=""
        color="primary"
        circle
        @click="dialog = true"
        class="float-right absolute-bottom"
        icon="add_task"
      >
        <q-tooltip content-class="bg-primary">Soru Sor</q-tooltip>
      </q-btn>
      <q-dialog v-model="dialog" class="absolute-center" >
        <q-card class="q-pa-md q-gutter-xs">
          <q-card-section class="bg-primary">
            <h4 class="text-h6 text-white q-my-xs">Soru Sor</h4>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-select
              label="Departman"
              v-model="department_id"
              :options="departments"
            />
            <q-input type="input" label="Konu" clearable v-model="title" />
            <q-input
              type="textarea"
              label="Sorunuz Nedir?"
              clearable
              v-model="body"
            />
            <q-btn
              v-close-popup
              label="Gönder"
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
      title: null,
      body: null,
      department_id: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("users", ["fetchUser"]),
	...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("rooms", ["pushRoom"]),

    onAdd() { // departman,konu,body alanlarının dolu olup olmaması kontrol edilecek.
      const roomData = {
        title: this.title,
        body: this.body,
        user_id: localStorage.getItem('user_id'),
        department_id: this.department_id.value,
        company_id: localStorage.getItem('company_id'),
        firm_id: localStorage.getItem('firm_id'),
        status: "Cevap Bekleniyor",
      };
      this.pushRoom(roomData);
      this.clearData();
    },
    clearData() {
      this.title = null;
      this.body = null;
      this.department_id = null;
    },
  },
  computed: {
    ...mapGetters("departments", ["departments"]),
    ...mapGetters("users", ["user"]),
  },
  created() {
    this.fetchUser(localStorage.getItem("user_id"));
    this.fetchDepartments(localStorage.getItem("company_id")); // user_id ile almaya çalış
  },
};
</script>

<style lang="css">
</style>