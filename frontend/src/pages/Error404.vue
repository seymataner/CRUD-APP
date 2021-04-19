<template>
  <div
    class="fullscreen bg-grey text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/login"
        label="Go Home"
        no-caps
        @click="deleteStorage()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    deleteStorage() {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-id");
      localStorage.removeItem("is_admin");
      localStorage.removeItem("is_employee");
      localStorage.removeItem("is_customer");
      localStorage.removeItem("company_id");
      localStorage.removeItem("firm_id");
    },
  },
};
</script>
