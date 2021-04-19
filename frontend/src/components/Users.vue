<template>
  <q-table
    :data="allUsers"
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
          <q-list dense>
            <q-item
              v-for="col in props.cols.filter((col) => col.name !== 'desc')"
              :key="col.name"
            >
              <template v-if="col.name !== 'actions'">
                <q-item-section>
                  <q-item-label class="text-grey-8">{{
                    col.value
                  }}</q-item-label>
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
</template> 

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: "",
    };
  },

  methods: {
    ...mapActions("users", ["fetchAllUsers"]),
  },

  computed: {
    ...mapGetters("users", ["allUsers"]),

    getColumns() {
      return [
        {
          name: "user_name",
          label: "Kullanıcı Adı",
          align: "left",
          field: (row) => row.user_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "user_email",
          label: "Kullanıcı Eposta",
          align: "left",
          field: (row) => row.user_email,
          format: (val) => `${val}`,
          sortable: true,
        },
      ];
    },
  },

  created() {
    this.fetchAllUsers(localStorage.getItem("company_id"));
  },
};
</script>


<style lang="">
</style>