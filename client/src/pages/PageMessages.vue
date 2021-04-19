<template>
  <q-page>
    <div class="q-pa-md full-width">
      <q-card style="width: 100%" class="shadow-up-9 bg-accent">
        <q-btn
          dense
          flat
          outlined
          color="primary"
          rounded
          icon="arrow_back"
          size="lg"
          @click="backPage()"
        />
        <q-card-section>
          <q-scroll-area style="height: 600px; width: 100%">
            <q-table
              :data="allMessages"
              row-key="_id"
              :columns="getColumns"
              :filter="filter"
              class="q-pa-md"
              grid
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
            >
              <!--
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

			   ARAMA BUTONU -->

              <template v-slot:item="props">
                <div class="q-pa-sm col-12">
                  <q-card class="full-width shadow-up-2">
                    <q-item
                      dense
                      v-for="col in props.cols"
                      :key="col.name"
                      :style="
                        col.value == user_id
                          ? 'background-color: #a9bcd0'
                          : 'background-color:#d6e2e9'
                      "
                    >
                      <q-item-section v-if="col.name !== 'user_id'">
                        <q-item-label>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card>
                </div>
              </template>
            </q-table>
          </q-scroll-area>
        </q-card-section>
        <q-card-section class="full-width q-pa-md bottom">
          <q-input
            bg-color="white"
            outlined
            rounded
            v-model="body"
            label="Mesaj"
            dense
            @keyup.enter="addMessage()"
          >
            <template v-slot:after>
              <q-btn
                outlined
                rounded
                color="primary"
                label="Gönder"
                @click="addMessage()"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      room_id: null,
      body: null,
      filter: null,
      user_id: null,
      pagination: {
        rowsPerPage: 1000,
      },
    };
  },
  methods: {
    ...mapActions("messages", ["fetchAllMessages"]),
    ...mapActions("messages", ["pushMessage"]),

    addMessage() {
      const newData = {
        room_id: this.room_id,
        body: this.body,
        user_id: this.user_id,
      };
      this.pushMessage(newData);
      this.body = null;
    },
    backPage() {
		debugger;
      if (localStorage.getItem('is_admin') || localStorage.getItem('is_employee')) {
		  this.$router.push("/rooms");
	  }
      else { 
	 	 this.$router.push("/requests");
	  }
    },
  },
  computed: {
    ...mapGetters("messages", ["allMessages"]),

    getColumns() {
      return [
        {
          name: "body",
          label: "Mesaj",
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
          name: "user_id",
          label: "Gönderen",
          align: "left",
          field: (row) => row.user_id,
          format: (val) => `${val}`,
          sortable: true,
          hide: true,
        },
      ];
    },
  },

  mounted() {},
  beforeUpdate() {},

  created() {
    this.room_id = this.$route.params.roomId;
    this.fetchAllMessages(this.room_id);
    this.user_id = localStorage.getItem("user_id");
  },
  beforeCreate() {
    //this.fetchAllMessages(this.room_id);
  },
};
</script>

<style lang="">
</style>