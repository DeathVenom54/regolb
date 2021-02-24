<template>
  <div class="login">
    <q-form class="form" @submit.prevent="handleSubmit">
      <h4>Welcome back!</h4>
      <p>Log in to continue</p>
      <q-input
        label="Email"
        type="email"
        :rules="[
          val => val.length || 'Please enter your email',
          val =>
            val.match(
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ) || 'Invalid email'
        ]"
        lazy-rules
        v-model="email"
      ></q-input>
      <q-input
        label="Password"
        type="password"
        :rules="[val => val.length || 'Please enter your password']"
        lazy-rules
        v-model="password"
      ></q-input>
      <q-btn class="submit" :loading="loading" type="submit" label="log in" />
      <p class="login-link">
        Don't have an account?
        <router-link to="/signup">Sign up</router-link> instead
      </p>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
export default defineComponent({
  name: 'Login',
  setup() {
    // data
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    // methods
    const handleSubmit = () => {
      console.log('submit yeet');
      loading.value = true;
    };

    return { email, password, loading, handleSubmit };
  }
});
</script>

<style lang="scss">
$pBlue: #0093e9;
$pTurquoise: #80d0c7;

.login {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, $pBlue 6%, $pTurquoise 100%);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 600px;
    background-color: #fff;
    text-align: center;
    padding: 10px 35px;
    border-radius: 20px;
    box-shadow: 3px 3px 15px rgba($color: #000, $alpha: 0.3);

    h4 {
      margin: 10px;
    }
    p {
      font-size: 22px;
    }
    .submit {
      background: $pBlue;
      color: #fff;
      font-size: 20px;
      padding: 0px 5px;
    }
  }
}
</style>
