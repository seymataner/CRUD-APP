<template>
  <div class="q-pa-sm">
    <div>
      <q-btn
        label=""
        color="primary"
        circle
        @click="dialog = true"
        class="float-right absolute-bottom"
        icon="supervisor_account"
      >
        <q-tooltip content-class="bg-primary">Kullanıcı Ekle</q-tooltip>
      </q-btn>

      <q-dialog v-model="dialog" class="absolute-center">
        <q-card class="q-pa-md">
          <q-card-section class="bg-primary">
            <h4 class="text-h6 text-white q-my-xs">Kullanıcı Ekle</h4>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input
              square
              clearable
              v-model="username"
              type="text"
              label="Kullanıcı Adı"
            />
            <q-input
              square
              clearable
              v-model="email"
              type="email"
              label="Eposta"
            />
            <q-select
              multiple
			  clearable
              label="Departman"
              v-model="department_id"
              :options="departments"
            />
            <q-select
              multiple
			  clearable
              type="text"
              label="Firmaları"
              v-model="firm_id"
              :options="firms"
            />
            <q-input
              square
              clearable
              v-model="password"
              type="password"
              label="Şifre"
            />
            <q-btn
              v-close-popup
              label="Kaydet"
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
  name: "Login",
  data() {
    return {
      email: null,
      username: null,
      password: null,
      department_id: null,
      firm_id: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("firms", ["fetchFirms"]),
    clearData() {
      (this.username = null),
        (this.email = null),
        (this.password = null),
        (this.department_id = null),
        (this.firm_id = null);
    },
    onAdd() {
      const userData = {
        user_name: this.username,
        user_password: this.password,
        user_email: this.email,
        department_id: this.department_id.value,
        firm_id: [this.firm_id.value],
        company_id: localStorage.getItem("company_id"),
      };
      console.log(userData);
      console.log(this.firm_id);
    },
  },
  computed: {
    ...mapGetters("departments", ["departments"]),
    ...mapGetters("firms", ["firms"]),
  },

  created() {
    this.fetchDepartments(localStorage.getItem("company_id"));
    this.fetchFirms(localStorage.getItem("company_id"));
  },
};
</script>
<style lang="scss">
.q-card {
  width: 400px;
}
</style>
