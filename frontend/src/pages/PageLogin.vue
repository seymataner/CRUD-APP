<template>
  <q-page class="row justify-center items-center" padding>
    <q-card class="shadow-20">
      <q-card-section class="bg-primary">
        <h4 class="text-h5 text-white q-my-xs">Sistem Girişi</h4>
      </q-card-section>

      <q-card-section>
        <q-form class="q-px-xs q-pt-md" @keyup.enter="onLogin">
          <q-input
            square
            clearable
            v-model="username"
            type="text"
            label="Kullanıcı Adı"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="password"
            type="password"
            label="Parola"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          size="md"
          color="primary"
          class="full-width text-white"
          label="Giriş Yap"
          type="submit"
          @click="onLogin()"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-sm">
        <p class="text-grey-6">Şifrenizi Unuttunuz mu?</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    onLogin() {
      const userData = {
        user_name: this.username,
        user_password: this.password,
      };
      this.login(userData);
    },
  },

  created() {
	  
  },
};
</script>
<style lang="scss">
.q-card {
  width: 400px;
}
</style>
