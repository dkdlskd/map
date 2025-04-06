import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyPageScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 뒤로 가기 버튼 */}
           <TouchableOpacity
             style={styles.backButton}
             onPress={() => navigation.goBack()}
           >
             <Text style={styles.backText}>←</Text>
           </TouchableOpacity>
     

      {/* 로고 이미지 */}
      <Image
        source={require('../assets/images/image19.png')}
        style={styles.logo}
      />

      {/* 문구 */}
      <View style={styles.textWrapper}>
      <View style={[styles.row, { alignSelf: 'flex-start', marginLeft: 60}]}>
          <Text style={styles.blueBold}>In</Text>
          <Text style={styles.normal}>하공전에서</Text>
        </View>
        <View style={[styles.row, { alignSelf: 'flex-end', marginRight: 50, marginTop: 10 }]}>
          <Text style={styles.blueBold}>밥</Text>
          <Text style={styles.normal}> 뭐 먹지?</Text>
        </View>
      </View>

      <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate('Login')} // ← 여기에 추가!
>
  <Text style={styles.loginText}>로그인하기</Text>
</TouchableOpacity>

      {/* 회원가입 안내 */}
      <View style={styles.signupWrapper}>
        <Text style={styles.normalSmall}>In밥이 처음이신가요? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.signupText}>회원가입</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fdfcf8',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    backText: {
      fontSize: 24,
      color: '#000',
    },
    logo: {
      width: 90,
      height: 90,
      marginBottom: 30,
    },
    textWrapper: {
      width: '100%',
      marginBottom: 40,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    blueBold: {
      color: '#1a40a3',
      fontSize: 36,
      fontWeight: 'bold',
      marginRight: 4,
      lineHeight: 50,
    },
    normal: {
      fontSize: 36,
      color: '#000',
      lineHeight: 50,
    },
    loginButton: {
      backgroundColor: '#4169e1',
      paddingVertical: 12,
      paddingHorizontal: 50,
      borderRadius: 8,
      marginBottom: 20,
    },
    loginText: {
      color: '#fff',
      fontSize: 18,
    },
    signupWrapper: {
      flexDirection: 'row',
    },
    normalSmall: {
      fontSize: 14,
      color: '#444',
    },
    signupText: {
      fontSize: 14,
      color: '#1a40a3',
      fontWeight: 'bold',
    },
  });
  