<template>
  <q-page>
    <div class="q-pa-md">
      <q-list v-for="item in allDepartments" :key="item.id" class="q-pa-md">
        <q-expansion-item
          group="somegroup"
          :label="item.department_name"
          default-closed
          header-class="text-accent bg-secondary"
          class="shadow-3 overflow-hidden col-12"
          style="border-radius: 15px"
          @before-show="getDepRooms(item._id)"
        >
          <q-table
            :data="allRooms"
            row-key="_id"
            :columns="getColumns"
            :filter="filter"
            class="q-pa-lg"
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
              <div class="q-pa-xs col-12">
                <q-card class="full-width">
                  <q-list dense >
                    <q-item
                      v-for="col in props.cols.filter(
                        (col) => col.name !== 'desc'
                      )"
                      :key="col.name"

                    >
                      <template v-if="col.name !== 'actions'">
                        <q-item-section>
                          <q-item-label class="text-grey-8">{{ col.value}}</q-item-label>
                        </q-item-section>
                      </template>
                      <q-item-section v-else>
                        <div class="row justify-end q-gutter-xs q-pa-md">
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
                  </q-list>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: "",
      user_id: null,
      room_id: null,
      body: null,
      show_table: false,
      depRooms: [],
    };
  },

  methods: {
    ...mapActions("departments", ["fetchAllDepartments"]),
    ...mapActions("rooms", ["fetchAllDepRooms"]),
    ...mapActions("rooms", ["deleteRoom"]),
    ...mapActions("messages", ["fetchAllMessages"]),
    ...mapActions("messages", ["pushMessage"]),
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
    getDepRooms(item) {
      this.fetchAllDepRooms(item);
    },
  },
  computed: {
    ...mapGetters("departments", ["allDepartments"]),
    ...mapGetters("rooms", ["allRooms"]),
    ...mapGetters("messages", ["allMessages"]),
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
          label: "",
          name: "actions",
          field: "actions",
        },
      ];
    },
  },

  created() {
    this.fetchAllDepartments(localStorage.getItem("company_id"));
  },
};
</script>

<style >
.q-item__label {
  line-height: 1.75rem;
}
</style>