import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'; // ✅ 위치 권한


export default function SettingScreen() {
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [gpsEnabled, setGpsEnabled] = useState(false); // ✅ GPS 상태

  const togglePush = () => setPushEnabled(prev => !prev);

  const toggleGPS = async () => {
    if (!gpsEnabled) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 거부', '위치 권한이 필요합니다.');
        return;
      }
    }
    setGpsEnabled(prev => !prev);
  };

  const handlePress = (title) => {
    Alert.alert(title, `${title} 기능은 아직 연결되지 않았습니다.`);
  };

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로 가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* 계정 */}
      <Text style={styles.sectionTitle}>계정</Text>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ResetPassword')}>
      <Text style={styles.label}>비밀번호 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('로그아웃')}>
        <Text style={styles.label}>로그아웃</Text>
      </TouchableOpacity>

      {/* 알림 */}
      <Text style={styles.sectionTitle}>알림</Text>
      <View style={styles.item}>
        <Text style={styles.label}>푸시 알림 받기</Text>
        <Switch
          value={pushEnabled}
          onValueChange={togglePush}
          thumbColor={pushEnabled ? '#4169e1' : '#ccc'}
        />
      </View>

      {/* ✅ GPS 기능 */}
      <View style={styles.item}>
        <Text style={styles.label}>GPS 기능</Text>
        <Switch
          value={gpsEnabled}
          onValueChange={toggleGPS}
          thumbColor={gpsEnabled ? '#4169e1' : '#ccc'}
        />
      </View>

      {/* 앱 정보 */}
      <Text style={styles.sectionTitle}>앱 정보</Text>
      <View style={styles.item}>
        <Text style={styles.label}>버전</Text>
        <Text style={styles.version}>1.0.0</Text>
      </View>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('개인정보처리방침')}>
        <Text style={styles.label}>개인정보처리방침 보기</Text>
      </TouchableOpacity>

      {/* 기타 */}
      <Text style={styles.sectionTitle}>기타</Text>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('문의하기')}>
        <Text style={styles.label}>문의하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('회원 탈퇴')}>
        <Text style={[styles.label, { color: '#e63946' }]}>회원 탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf8',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40, // ← 약간 내려줌
    left: 16,
    zIndex: 1,
  },
  backText: {
    fontSize: 24,
    color: '#1a40a3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: '#333',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#111',
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
});
