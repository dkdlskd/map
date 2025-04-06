import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const categoryData = [
  { label: '전체', image: require('../assets/images/Vector.png') },
  { label: '한식', image: require('../assets/images/rice.png') },
  { label: '중식', image: require('../assets/images/jungsig.png') },
  { label: '일식', image: require('../assets/images/ilsig.png') },
  { label: '양식', image: require('../assets/images/yangsig.png') },
  { label: '가성비', image: require('../assets/images/seongneungbi.png') },
  { label: '카페', image: require('../assets/images/dessert.png') },
  { label: '더보기', image: require('../assets/images/the.png') },
];

const dummyPlaces = [    
  { name: '맛사랑', category: '한식', latitude: 37.451198, longitude: 126.657763 },
  { name: '청년밥상빨라우', category: '한식', latitude: 37.452069, longitude: 126.657070 },





   
  { name: '취엔', category: '중식', latitude: 37.451544, longitude: 126.656779 },
  { name: '인하반점', category: '중식', latitude: 37.451050, longitude: 126.657730 },
  { name: '인하각', category: '중식', latitude: 37.451020, longitude: 126.658006 },
  { name: '인하성', category: '중식', latitude: 37.451002, longitude: 126.658190 },



  { name: '백소정', category: '일식', latitude: 37.451455, longitude: 126.656605 },
  { name: '가메이', category: '일식', latitude: 37.451730, longitude: 126.656862 },

   
  { name: '미식당', category: '양식', latitude: 37.451950, longitude: 126.656090 },

   
  { name: '탐앤탐스', category: '카페', latitude: 37.451169, longitude: 126.657296 },


  { name: '아직정하지못함', category: '가성비', latitude: 37.448, longitude: 126.659 },



];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filterByDistance = (places, center, maxDistanceKm = 1.5) => {
    const toRad = (value) => (value * Math.PI) / 180;
    return places.filter((place) => {
      const R = 6371;
      const dLat = toRad(place.latitude - center.latitude);
      const dLon = toRad(place.longitude - center.longitude);
      const lat1 = toRad(center.latitude);
      const lat2 = toRad(place.latitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d <= maxDistanceKm;
    });
  };

  const center = {
    latitude: 37.448258,
    longitude: 126.656874,
  };

  const filteredPlaces = filterByDistance(
    selectedCategory === '전체'
      ? dummyPlaces
      : dummyPlaces.filter((p) => p.category === selectedCategory),
    center
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={require('../assets/images/image19.png')}
          style={styles.logo}
        />
        <TextInput
          placeholder="가게 정보를 입력해주세요."
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>카테고리를 눌러 맛있는 가게를 찾아보세요!</Text>

      <View style={styles.map}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          {filteredPlaces.map((place, i) => (
            <Marker
              key={`${place.name}-${i}`}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
            />
          ))}
        </MapView>
      </View>

      <View style={styles.categoryBox}>
        {categoryData.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.categoryBtn,
              selectedCategory === item.label && { backgroundColor: '#002288' },
            ]}
            onPress={() => setSelectedCategory(item.label)}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Image source={require('../assets/images/back.png')} style={styles.tabIconImage} />
          <Text style={styles.tabLabel}>최근기록</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Setting')}
        >
          <Image source={require('../assets/images/set.png')} style={styles.tabIconImage} />
          <Text style={styles.tabLabel}>설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Image source={require('../assets/images/home.png')} style={styles.tabIconImage} />
          <Text style={styles.tabLabel}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('MyPage')}
        >
          <Image source={require('../assets/images/mypage.png')} style={styles.tabIconImage} />
          <Text style={styles.tabLabel}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf8',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#1a40a3',
    padding: 8,
    borderRadius: 8,
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  map: {
    flex: 1,
    backgroundColor: '#dde6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  categoryBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBtn: {
    width: '24%',
    backgroundColor: '#1a40a3',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 28,
    height: 28,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  categoryText: {
    color: 'white',
    fontSize: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#1a40a3',
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    color: 'white',
  },
  tabLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
});