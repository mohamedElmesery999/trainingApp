import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar'; // Ensure path is correct
import MovieCard from '@/components/MovieCard'; // Ensure path is correct
import { fetchMovies } from '../../services/api';
import useFetch from '../../services/useFetch';

export default function Index() {
  const router = useRouter();

  // Fetch movies using custom hook, passing empty query for popular movies
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() =>
    fetchMovies({ query: '' })
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full h-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, minHeight: '100%' }}
      >
        {/* Logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="text-white text-center mt-10">
            Error: { moviesError?.message }
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Search Bar */}
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push('/search')}
            />


            {/* Latest Movies Section */}
            <Text className="text-white text-lg font-semibold mt-5 mb-3">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <MovieCard 
                {...item}/>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}