import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // ✅

export default function MainScreen() {
  const navigation = useNavigation(); // ✅

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // ✅ 자동 전환
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={require('../assets/images/image19.png')}
        style={styles.image}
      />

      <Animatable.View
        animation="fadeInLeft"
        delay={600}
        style={[styles.row, { alignSelf: 'flex-start', marginLeft: 60 }]}
      >
        <Text style={styles.blueBold}>In</Text>
        <Text style={styles.normalText}>하공전에서</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInRight"
        delay={1000}
        style={[styles.row, { alignSelf: 'flex-end', marginRight: 50, marginTop: 10 }]}
      >
        <Text style={styles.blueBold}>밥</Text>
        <Text style={styles.normalText}> 뭐 먹지?</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  blueBold: {
    color: '#1a40a3',
    fontWeight: 'bold',
    fontSize: 50,
    marginRight: 4,
    lineHeight: 60,
  },
  normalText: {
    fontSize: 40,
    color: '#000',
    lineHeight: 60,
  },
});
