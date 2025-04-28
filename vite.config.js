import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // ⭐ إضافة مهمة جداً
  },
  preview: {
    historyApiFallback: true, // ⭐ كمان هنا لو بتجرب ب vite preview
  }
})
