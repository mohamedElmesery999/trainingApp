import MovieCard from '@/components/MovieCard'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

// This is a mock for demonstration. In a real app, you would lift this state up or use context.
const initialSavedMovies = [
  {
    id: 1,
    title: 'Inception',
    adult: false,
    backdrop_path: '',
    genre_ids: [28, 878],
    original_language: 'en',
    original_title: 'Inception',
    overview: 'A thief who steals corporate secrets...',
    popularity: 100,
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    release_date: '2010-07-16',
    video: false,
    vote_average: 8.3,
    vote_count: 30000,
  },
  {
    id: 2,
    title: 'Interstellar',
    adult: false,
    backdrop_path: '',
    genre_ids: [12, 18, 878],
    original_language: 'en',
    original_title: 'Interstellar',
    overview: 'A team of explorers travel...',
    popularity: 90,
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-07',
    video: false,
    vote_average: 8.6,
    vote_count: 25000,
  },
]

// Example movie list for demonstration (replace with your real movie list)
const allMovies = [
  ...initialSavedMovies,
  {
    id: 3,
    title: 'The Matrix',
    adult: false,
    backdrop_path: '',
    genre_ids: [28, 878],
    original_language: 'en',
    original_title: 'The Matrix',
    overview: 'A computer hacker learns...',
    popularity: 80,
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    release_date: '1999-03-31',
    video: false,
    vote_average: 8.7,
    vote_count: 20000,
  },
]

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>(initialSavedMovies)

  const isMovieSaved = useCallback((id: number) => savedMovies.some((m) => m.id === id), [savedMovies])

  const handleSave = (movie: Movie) => {
    if (!isMovieSaved(movie.id)) {
      setSavedMovies((prev) => [...prev, movie])
    }
  }

  const removeMovie = (id: number) => {
    setSavedMovies((prev) => prev.filter((m) => m.id !== id))
  }

  if (!savedMovies.length) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white text-lg">No saved movies yet.</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary px-5 pt-10">
      <Text className="text-2xl font-bold text-white mb-4">Saved Movies</Text>
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => (
          <View className="mb-4">
            <MovieCard {...item} isSaved={true} onSave={() => {}} />
            <TouchableOpacity
              className="mt-2 bg-red-600 rounded px-3 py-1 self-start"
              onPress={() => removeMovie(item.id)}
            >
              <Text className="text-white text-xs">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Text className="text-xl font-bold text-white mt-10 mb-2">All Movies (Demo)</Text>
      <FlatList
        data={allMovies.filter((m) => !isMovieSaved(m.id))}
        renderItem={({ item }) => (
          <View className="mb-4">
            <MovieCard {...item} isSaved={isMovieSaved(item.id)} onSave={() => handleSave(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}

export default Saved