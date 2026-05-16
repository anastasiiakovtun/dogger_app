# Dogger

A Vue 3 application that displays dog breeds and allows users to explore each breed with a random image.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the app:
   ```
   npm run dev
   ```

## Features

- Browse all dog breeds on the overview page
- Click a breed to navigate to its detail page
- Detail page shows the breed name and a random image
- Loading and error states on every page
- Smooth fade transitions between pages
- Breed list is cached with TanStack Query
- Revisiting a breed shows the same image (same session)
- Smooth image fade-in on the detail page

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- TanStack Query (caching)
- Axios (API calls)
- PrimeVue (UI components)
- Vite (build tool)

## API

Uses the [Dog CEO API](https://dog.ceo/dog-api/)
