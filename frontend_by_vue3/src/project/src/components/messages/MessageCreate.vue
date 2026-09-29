<script setup lang="ts">
import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useCreateMessageMessagesPost } from '@/api/generated/api'
import type { Message, HTTPValidationError } from '@/api/generated/models'

const queryClient = useQueryClient()

const text = ref('')

const {
  mutate: createMessage,
  isPending,
  isError,
  error,
  isSuccess,
  reset,
} = useCreateMessageMessagesPost({
  mutation: {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      text.value = ''
      reset()
    },
    onError: (err) => {
      console.error(err)
    },
  },
})

const handleSubmit = () => {
  const payload: Message = {
    text: text.value,
  }
  createMessage({ data: payload })
}
</script>

<template>
  <div class="create-message-container">
    <h2>Создать новый элемент</h2>

    <div v-if="isSuccess" class="success-message">
      Элемент успешно создан! Список обновлен.
      <button @click="reset" class="link-btn">Создать еще один</button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="message-form">
      <div class="form-group">
        <label for="name">Название</label>
        <input
          id="text"
          v-model="text"
          type="text"
          placeholder="Введите text"
          required
          :disabled="isPending"
        />
      </div>

      <div v-if="isError" class="error-message">
        <p>❌ Не удалось создать элемент</p>

        <ul v-if="(error as HTTPValidationError)?.detail?.length" class="validation-errors">
          <li v-for="(err, index) in (error as HTTPValidationError).detail" :key="index">
            <strong>{{ err.loc?.join('.') }}:</strong> {{ err.msg }}
          </li>
        </ul>

        <p v-else class="fallback-error">Проверьте введенные данные и попробуйте снова.</p>
      </div>

      <button type="submit" class="submit-btn" :disabled="isPending">
        <span v-if="isPending">Создание...</span>
        <span v-else>Создать элемент</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.create-message-container {
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  max-width: 500px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}
.message-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}
.form-group input,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-group input:disabled,
.form-group textarea:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
.submit-btn {
  padding: 12px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s;
  margin-top: 8px;
}
.submit-btn:hover:not(:disabled) {
  background-color: #059669;
}
.submit-btn:disabled {
  background-color: #6ee7b7;
  cursor: not-allowed;
}
.success-message {
  padding: 16px;
  background-color: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 6px;
  color: #065f46;
  font-weight: 500;
}
.error-message {
  padding: 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #991b1b;
  font-size: 14px;
}
.validation-errors {
  margin-top: 8px;
  padding-left: 16px;
  font-size: 13px;
}
.link-btn {
  background: none;
  border: none;
  color: #065f46;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}
</style>
