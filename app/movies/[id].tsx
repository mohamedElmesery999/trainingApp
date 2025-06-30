import { TMDB_CONFIG } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

const fetchMovieDetails = async (id: string | string[]) => {
  const movieId = Array.isArray(id) ? id[0] : id;
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.HEADERS,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id));

  if (loading) {
    return <View className="flex-1 justify-center items-center bg-primary"><ActivityIndicator size="large" color="#ab8bff" /></View>;
  }
  if (error) {
    return <View className="flex-1 justify-center items-center bg-primary"><Text className="text-red-500">Error: {error.message}</Text></View>;
  }
  if (!movie) {
    return null;
  }

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-10">
      <View className="mb-4">
        <Text
          className="text-accent text-base font-bold mb-2"
          onPress={() => router.back()}
          style={{alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 16, backgroundColor: '#221f3d', borderRadius: 8, overflow: 'hidden'}}
        >
          ← Back
        </Text>
      </View>
      <Image
        source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png' }}
        className="w-full h-96 rounded-lg mb-5"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold text-white mb-2">{movie.title}</Text>
      <Text className="text-base text-gray-300 mb-2">{movie.release_date?.split('-')[0]} • {movie.runtime} min</Text>
      <Text className="text-base text-accent font-semibold mb-2">Rating: {movie.vote_average?.toFixed(1)} / 10</Text>
      <Text className="text-base text-white mb-4">{movie.overview}</Text>
      {movie.genres && (
        <View className="flex-row flex-wrap mb-4">
          {movie.genres.map((genre: any) => (
            <Text key={genre.id} className="text-xs text-accent bg-dark-100 px-2 py-1 rounded-full mr-2 mb-2">{genre.name}</Text>
          ))}
        </View>
      )}
      <Text className="text-xs text-gray-400 mb-2">Status: {movie.status}</Text>
      {movie.tagline && <Text className="italic text-accent mb-2">"{movie.tagline}"</Text>}
    </ScrollView>
  );
};

export default MovieDetails;
