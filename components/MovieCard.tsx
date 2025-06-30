import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps extends Movie {
  isSaved?: boolean;
  onSave?: (movie: Movie) => void;
}

const MovieCard = ({ id, poster_path, title, vote_average, release_date, isSaved, onSave, ...rest }: MovieCardProps) => {
  return (
    <View className="w-[30%]">
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity>
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
            }}
            className='w-full h-52 rounded-lg'
            resizeMode='cover'
          />
        </TouchableOpacity>
      </Link>
      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-sm font-bold text-white flex-1" numberOfLines={1}>{title}</Text>
        {typeof isSaved !== 'undefined' && typeof onSave === 'function' && (
          <TouchableOpacity
            onPress={() => onSave({ id, poster_path, title, vote_average, release_date, ...rest } as Movie)}
            className="ml-2"
          >
            <Image
              source={icons.save}
              className="size-5"
              style={{ tintColor: isSaved ? '#ab8bff' : '#a8b5db' }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className='flex-row items-center justify-start gap-x-1'>
        <Image source={icons.star} className='size-4'/>
        <Text className='text-xs text-white font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
      </View>
      <View className='flex-row items-center justify-between'>
        <Text className='text-xs text-gray-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>

      </View>
      <Text className='text-xs text-gray-400 mt-1'>Click for details</Text>
    </View>
  )
}

export default MovieCard;