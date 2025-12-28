<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)

const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}
</script>

<template>
  <h1>You did it!</h1>
  <p>
    <button @click="increment">+</button>
    <span>{{ counter }}</span>
    <button @click="decrement">-</button>
  </p>
</template>

<style scoped></style>
