import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void; // For non-editable tap-to-search bar
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  const isInteractive = !!onPress && !onChangeText;

  if (isInteractive) {
    // Pressable version for Home page
    return (
      <TouchableOpacity
        className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 shadow-md"
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Image
          source={icons.search}
          className="size-4"
          resizeMode="contain"
          tintColor="#ab8bff"
        />
        <TextInput
          editable={false}
          pointerEvents="none"
          placeholder={placeholder}
          placeholderTextColor="#a8b5db"
          className="flex-1 text-white ml-2"
        />
      </TouchableOpacity>
    );
  }

  // Editable version for search page
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4 shadow-md">
      <Image
        source={icons.search}
        className="size-4"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-2"
      />
    </View>
  );
};

export default SearchBar;
