<script setup>
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import ProgressSpinner from 'primevue/progressspinner'
import { ref, computed } from 'vue'

const search = ref('')

const { data, isLoading, isError } = useQuery({
  queryKey: ['breeds'],
  queryFn: async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    return Object.keys(response.data.message)
  },
  staleTime: Infinity
})

const filtered = computed(() => {
  if (!data.value) return []
  return data.value.filter(breed => breed.includes(search.value.toLowerCase().trim()))
})
</script>

<template>
  <div class="page">
    <header class="hero">
      <h1>Dog Breeds</h1>
      <p class="subtitle">Explore {{ data?.length ?? '—' }} breeds from around the world</p>
      <input v-model="search" class="search" placeholder="Search breeds..." />
    </header>

    <main class="content">
      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" class="centered" key="loading">
          <ProgressSpinner />
          <p>Loading breeds...</p>
        </div>

        <div v-else-if="isError" class="centered error" key="error">
          <p>Failed to load breeds. Please try again.</p>
        </div>

        <div v-else key="data">
          <p class="count">{{ filtered.length }} breeds found</p>
          <div class="grid">
            <div
              v-for="breed in filtered"
              :key="breed"
              class="card"
              @click="$router.push(`/breed/${breed}`)"
            >
              <span class="card-name">{{ breed }}</span>
              <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.page {
  min-height: 100vh;
  background: #0f0f13;
  color: #fff;
}

.hero {
  padding: 80px 40px 60px;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -2px;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #fff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.1rem;
  margin: 0 0 32px;
}

.search {
  width: 100%;
  max-width: 480px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.search::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.search:focus {
  border-color: #a78bfa;
  background: rgba(167, 139, 250, 0.08);
}

.content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.count {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  text-transform: capitalize;
}

.card:hover {
  background: rgba(167, 139, 250, 0.12);
  border-color: #a78bfa;
  transform: translateY(-2px);
}

.card-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.arrow {
  color: #a78bfa;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s, transform 0.2s;
}

.card:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
  color: rgba(255, 255, 255, 0.4);
}

.error {
  color: #f87171;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .hero {
    padding: 60px 20px 40px;
  }

  .content {
    padding: 24px 16px;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>
