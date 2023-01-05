<script setup lang="ts">
  const emit = defineEmits(['toggle'])
</script>

<template>
  <nav>
    <ul>
      <li>
        <a href="/">
          <h4>NOT<span>ER</span></h4>
        </a>
      </li>
      <li>
        <i class="bi bi-sun-fill" id="icon" @click="emit('toggle')"></i>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import '../../public/Navbar.scss';
</style>
