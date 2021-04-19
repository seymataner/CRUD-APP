<template>
  <div class="q-pa-sm">
    <div>
      <q-btn
        label=""
        color="primary"
        circle
        @click="dialog = true"
        class="float-right absolute-bottom"
        icon="business"
      >
        <q-tooltip content-class="bg-primary">Firma Ekle</q-tooltip>
      </q-btn>
      <q-dialog v-model="dialog" class="absolute-center">
        <q-card class="q-pa-md q-gutter-xs">
          <q-card-section class="bg-primary">
            <h4 class="text-h6 text-white q-my-xs">Firma Ekle</h4>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input
              type="input"
              label="Firma Adı"
              clearable
              v-model="firm_name"
            />
            <q-input
              type="email"
              label="Firma Epostası"
              clearable
              v-model="firm_email"
            />
            <q-input
              type="number"
              label="Firma Numarası"
              clearable
              v-model="firm_phone"
            />
            <q-input
              type="textarea"
              label="Adres"
              clearable
              v-model="firm_address"
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
//firmaya adres eklenecek. firma kodunun olup olmadığı kontrol edilecek.
import { mapActions } from "vuex";
export default {
  data() {
    return {
      firm_name: null,
      firm_phone: null,
      firm_email: null,
      firm_address: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("firms", ["pushFirm"]),

    onAdd() {
      const pushData = {
        firm_name: this.firm_name,
        firm_phone: this.firm_phone,
        firm_email: this.firm_email,
        firm_address: this.firm_address,
        company_id: localStorage.getItem("company_id"),
      };
      this.pushFirm(pushData);
      this.clearData();
    },
    clearData() {
      this.firm_name = null;
      this.firm_email = null;
      this.firm_phone = null;
      this.firm_address = null;
    },
  },
  computed: {},
  created() {},
};
</script>

<style lang="css">
</style>