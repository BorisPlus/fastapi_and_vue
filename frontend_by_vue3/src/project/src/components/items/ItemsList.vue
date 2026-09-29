<script setup lang="ts">
import { useReadItemsItemsGet } from '@/api/generated/api'

const { data, isLoading, isError, error, refetch } = useReadItemsItemsGet({
  query: {
    select: (response) => response.data,
  },
})
</script>

<template>
  <div class="items-container">
    <h2>Список элементов</h2>

    <div v-if="isLoading" class="loading-state">Загрузка данных...</div>

    <div v-else-if="isError" class="error-message">
      <p>❌ Произошла ошибка при загрузке</p>
      <button @click="() => refetch()" class="retry-btn">Повторить</button>
    </div>

    <div v-else-if="data" class="data-display">
      <ul v-if="Array.isArray(data)">
        <li v-for="(item, index) in data" :key="index">{{ item.name }} - {{ item.price }} ₽</li>
      </ul>
      <pre v-else>{{ data }}</pre>
    </div>

    <button
      @click="() => refetch()"
      :disabled="isLoading"
      class="action-btn"
      style="margin-top: 15px"
    >
      Обновить список
    </button>
  </div>
</template>

<style scoped>
.items-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 500px;
}
.loading-state {
  color: #666;
  font-style: italic;
  padding: 10px;
}
.error-message {
  margin-top: 15px;
  color: #e74c3c;
  background: #fdecea;
  padding: 10px;
  border-radius: 4px;
}
.retry-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.data-display {
  margin-top: 20px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}
.action-btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.action-btn:disabled {
  background-color: #a0d8c1;
  cursor: not-allowed;
}
</style>
