<template>
  <q-page>
    <div>
      <q-table
        :data="allRooms"
        row-key="_id"
        :columns="getColumns"
        :filter="filter"
        class="q-pa-md"
        grid
        :hide-header="$q.screen.lt.sm"
      >
        <template v-slot:top-right>
          <q-input
            debounce="10"
            v-model="filter"
            placeholder="Ara"
            class="full-width"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-12 ">
			  
            <q-card class="full-width shadow-up-6">
              <q-item
                dense
                v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                :key="col.name"
              >
                <template v-if="col.name !== 'actions'">
                  <q-item-section>
                    <q-item-label class ="text-weight-light">{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <q-item-section v-else>
                  <div class="row justify-end q-gutter-sm">
                    <q-btn
                      rounded
                      color="secondary"
                      size="sm"
                      icon="delete"
                      @click="deleteItem(props.row._id)"
                    >
                    </q-btn>
                    <q-btn
                      rounded
                      color="primary"
                      size="sm"
                      icon="read_more"
                      @click="detailItem(props.row)"
                    >
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    ...mapActions("rooms", ["fetchAllRooms"]),
    ...mapActions("rooms", ["deleteRoom"]),

    resetFilter() {
      this.filter = "";
    },

    detailItem(row) {
      this.$router.push("/messages/" + row._id);
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteRoom(item);
    },
  },
  computed: {
    ...mapGetters("rooms", ["allRooms"]),

    getColumns() {
      return [
        {
          name: "title",
          label: "Konu",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "body",
          label: "Detay",
          align: "left",
          field: (row) => row.body,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "created_At",
          label: "Tarih",
          align: "left",
          field: (row) => date.formatDate(row.created_at, "DD/MM/YYYY"),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          label: "",
          name: "actions",
          field: "actions",
        },
      ];
    },
  },

  created() {
    this.fetchAllRooms(localStorage.getItem("user_id"));
  },
};
</script>

<style lang="sass">
</style>