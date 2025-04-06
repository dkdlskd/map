import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FindPasswordScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFindPassword = () => {
    if (userId && phone) {
      // 실제 서비스에서는 서버로 요청
      setSuccess(true);
    } else {
      Alert.alert('입력 오류', '아이디와 전화번호를 모두 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로가기 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>비밀번호 찾기</Text>

      {/* 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.findButton} onPress={handleFindPassword}>
        <Text style={styles.findText}>비밀번호 찾기</Text>
      </TouchableOpacity>

      {success && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            입력하신 정보로{" "}
            <Text style={styles.resultStrong}>임시 비밀번호</Text>를 전송했습니다.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf8',
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 30,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#111',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  findButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  findText: {
    color: '#fff',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#eef3ff',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  resultStrong: {
    fontWeight: 'bold',
    color: '#1a40a3',
  },
});
