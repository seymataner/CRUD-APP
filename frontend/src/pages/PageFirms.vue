<template>
  <q-page padding>
    <div>
      <div class="q-pa-md">
        <q-list v-for="item in allFirms" :key="item.id" class="q-pa-md">
          <q-expansion-item
            group="somegroup"
            :label="item.firm_name"
            default-closed
            header-class=" text-white bg-secondary"
            class="shadow-1 overflow-hidden full-width"
            style="border-radius: 15px"
          >

            <q-card class="full-width shadow-up-6">
              <q-card-section>
                <q-btn
                  rounded
                  color="secondary"
                  size="sm"
                  icon="delete"
                  @click="deleteSelectedFirm(item._id)"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: "",
    };
  },
  components: {},
  computed: {
    ...mapGetters("firms", ["allFirms"]),
  },

  methods: {
    ...mapActions("firms", ["fetchAllFirms"]),
    ...mapActions("firms", ["deleteFirm"]),

    deleteSelectedFirm(item) {
      this.deleteFirm(item);
    },
  },

  created() {
    this.fetchAllFirms(localStorage.getItem("company_id"));
  },
};
</script>

<style lang="scss">
</style>