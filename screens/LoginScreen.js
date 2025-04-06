// screens/LoginScreen.js

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* 로고 */}
      <Image
        source={require('../assets/images/image19.png')}
        style={styles.logo}
      />

      {/* 로그인 입력 영역 */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="아이디"
          style={styles.input}
          placeholderTextColor="#555"
        />
        <TextInput
          placeholder="비밀번호"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#555"
        />
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      {/* 하단 링크 */}
      <View style={styles.bottomLinks}>
  <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
    <Text style={styles.linkText}>아이디 찾기</Text>
  </TouchableOpacity>
  <Text style={{ marginHorizontal: 6 }}>|</Text>
  <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
    <Text style={styles.linkText}>비밀번호 찾기</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#444',
  },
});