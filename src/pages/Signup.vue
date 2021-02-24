<template>
  <div class="login">
    <q-form class="form" @submit.prevent="handleSubmit">
      <h4>Don't have an account?</h4>
      <p>Sign up right here!</p>

      <q-input
        label="Display Name"
        type="text"
        :rules="[
          val => val.length || 'Please enter a valid name',
          val => val.length > 3 || 'Display name must be 4 characters or longer'
        ]"
        lazy-rules
        v-model="displayName"
      ></q-input>

      <q-input
        label="Email"
        type="email"
        :rules="[
          val => val.length || 'Please enter an email',
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
        :rules="[
          val => val.length || 'Please enter a password',
          val => val.length > 5 || 'Password must be 6 characters or longer'
        ]"
        lazy-rules
        v-model="password"
      ></q-input>
      <q-btn class="submit" :loading="loading" type="submit" label="sign up" />
      <p class="login-link">
        Already have an account?
        <router-link to="/login">Log in</router-link> instead
      </p>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { AuthResponse } from '../composables/getLoggedUser';

export default defineComponent({
  name: 'Login',
  setup() {
    // data
    const displayName = ref('');
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const backendUrl = 'http://localhost:3000/auth/signup';
    // methods
    const handleSubmit = async () => {
      loading.value = true;
      // send request to backend
      try {
        const signupRes = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            displayName: displayName.value
          })
        });
        const data = (await signupRes.json()) as AuthResponse;
        console.log(data);
        if (data.error) throw Error(data.error);
        else console.log('Successfully signed up!');
      } catch (err) {
        console.log(err);
      }
    };

    return { displayName, email, password, loading, handleSubmit };
  }
});
</script>

<style lang="scss">
$pBlue: #0093e9;
$darkerBlue: #0070b1;
$pTurquoise: #80d0c7;

.login {
  background-color: $pBlue;
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
    .login-link {
      font-size: 18px;
      margin-top: 15px;

      a {
        text-decoration: none;
        color: $darkerBlue;
      }
      a:hover {
        text-decoration: underline;
      }
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
