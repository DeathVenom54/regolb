<template>
  <div class="home">
    <h1>Hello</h1>
    <h4 v-if="user">Current user: {{ user.displayName }}, {{ user.email }}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import getLoggedUser, { User } from '../composables/getLoggedUser';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // data
    const user = ref({} as User);
    const getUser = getLoggedUser();
    // get user on startup
    getUser()
      .then(res => (user.value = res.value))
      .catch(err => console.log(err));

    return { user };
  }
});
</script>
