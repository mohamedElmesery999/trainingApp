import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const mockUser = {
  name: 'M.Elmesery',
  email: 'moElmesery@email.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  savedCount: 3,
  watchedCount: 12,
}

const Profile = () => {
  const [user] = useState(mockUser)
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#151312' }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16, borderWidth: 2, borderColor: '#ab8bff' }}
      />
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>{user.name}</Text>
      <Text style={{ color: '#a8b5db', fontSize: 16, marginBottom: 16 }}>{user.email}</Text>
      <View style={{ flexDirection: 'row', gap: 24, marginBottom: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#ab8bff', fontSize: 20, fontWeight: 'bold' }}>{user.savedCount}</Text>
          <Text style={{ color: '#a8b5db', fontSize: 14 }}>Saved</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#ab8bff', fontSize: 20, fontWeight: 'bold' }}>{user.watchedCount}</Text>
          <Text style={{ color: '#a8b5db', fontSize: 14 }}>Watched</Text>
        </View>
      </View>
      <TouchableOpacity style={{ backgroundColor: '#ab8bff', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 16, marginTop: 24 }}>
        <TouchableOpacity style={{ backgroundColor: '#22223d', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#22223d', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 }} onPress={() => router.replace('/') }>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile