<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  msg: string
}>()

const message = ref('')

const greet = (a: number, b: number) => {
  return a + b
}
// 模擬一個非同步操作，比如從服務器獲取數據
const handleClick = async () => {
  // 模擬延遲
  await new Promise((resolve) => setTimeout(resolve, 1000))
  message.value = 'Async operation complete'
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
      <button id="primary-button" @click="handleClick" >Click me</button>
      <p v-if="message">{{ message }}</p>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
