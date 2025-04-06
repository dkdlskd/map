import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FindIdScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [foundId, setFoundId] = useState('');

  const handleFindId = () => {
    if (name && phone) {
      // 🔐 실제 서비스에서는 서버에서 조회해야 함
      setFoundId('sampleUser123'); // 임시 예시 아이디
    } else {
      Alert.alert('입력 오류', '이름과 전화번호를 모두 입력해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 뒤로 가기 버튼 */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>아이디 찾기</Text>

        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호 (숫자만 입력)"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.findButton} onPress={handleFindId}>
          <Text style={styles.findText}>아이디 찾기</Text>
        </TouchableOpacity>

        {foundId !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              찾은 아이디: <Text style={styles.resultId}>{foundId}</Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfcf8',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#1a40a3',
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
  resultId: {
    fontWeight: 'bold',
    color: '#1a40a3',
  },
});
