import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const isNicknameValid = nickname.length >= 2 && nickname.length <= 10;
  const isUserIdValid = userId.length >= 6;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isPasswordMatch = password === passwordConfirm;

  const canSubmit =
    isNicknameValid &&
    isUserIdValid &&
    isPasswordValid &&
    isPasswordMatch &&
    isVerified;

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              console.log('reCAPTCHA solved');
            },
          },
          auth
        );
      }
    }
  }, []);

  const sendVerification = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('전화번호를 정확히 입력해주세요.');
      return;
    }

    const formatted = phone.startsWith('+82')
      ? phone
      : '+82' + phone.replace(/^0/, '');

    try {
      let result;

      if (Platform.OS === 'web') {
        result = await signInWithPhoneNumber(
          auth,
          formatted,
          window.recaptchaVerifier
        );
      } else {
        result = await signInWithPhoneNumber(auth, formatted);
      }

      setConfirmResult(result);
      Alert.alert('인증번호가 발송되었습니다.');
    } catch (e) {
      console.error('❌ Firebase 인증 에러:', e);
      Alert.alert('인증번호 발송 실패', e.message || '알 수 없는 오류');
    }
  };

  const confirmCode = async () => {
    if (!verificationCode) {
      Alert.alert('인증번호를 입력해주세요.');
      return;
    }

    try {
      await confirmResult.confirm(verificationCode);
      setIsVerified(true);
      Alert.alert('인증 성공!');
    } catch (e) {
      console.error('❌ 인증 실패:', e);
      Alert.alert('인증 실패', e.message || '코드를 다시 확인해주세요.');
    }
  };

  const handleSignup = () => {
    Alert.alert('회원가입 완료!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {Platform.OS === 'web' && <View id="recaptcha-container" />}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>회원가입</Text>
          <TouchableOpacity disabled>
            <Text style={styles.done}>완료</Text>
          </TouchableOpacity>
        </View>

        {/* 닉네임 */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <TextInput
              placeholder="닉네임"
              value={nickname}
              onChangeText={setNickname}
              style={[
                styles.input,
                !isNicknameValid && nickname !== '' && styles.inputError,
              ]}
            />
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.hintText,
              !isNicknameValid && nickname !== '' && styles.errorText,
            ]}
          >
            {nickname === ''
              ? '2~10자 사이로 입력해주세요.'
              : isNicknameValid
              ? ''
              : '닉네임은 2~10자 사이여야 합니다.'}
          </Text>
        </View>

        {/* 아이디 */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <TextInput
              placeholder="아이디"
              value={userId}
              onChangeText={setUserId}
              style={[
                styles.input,
                !isUserIdValid && userId !== '' && styles.inputError,
              ]}
            />
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.hintText,
              !isUserIdValid && userId !== '' && styles.errorText,
            ]}
          >
            {userId === ''
              ? '6~20자 / 영문, 숫자 조합 권장'
              : isUserIdValid
              ? ''
              : '아이디는 6자 이상이어야 합니다.'}
          </Text>
        </View>

        {/* 비밀번호 */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[
              styles.inputOnly,
              password !== '' && !isPasswordValid && styles.inputError,
            ]}
          />
          <Text
            style={[
              styles.hintText,
              password !== '' && !isPasswordValid && styles.errorText,
            ]}
          >
            {password === ''
              ? '문자, 숫자, 특수문자 포함 8~20자'
              : isPasswordValid
              ? ''
              : '문자, 숫자, 특수문자 포함 8~20자로 입력해주세요.'}
          </Text>
        </View>

        {/* 비밀번호 확인 */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            style={[
              styles.inputOnly,
              passwordConfirm !== '' && !isPasswordMatch && styles.inputError,
            ]}
          />
          {passwordConfirm === '' && (
            <Text style={styles.hintText}>
              동일한 비밀번호를 입력해주세요.
            </Text>
          )}
          {passwordConfirm !== '' && !isPasswordMatch && (
            <Text style={[styles.hintText, styles.errorText]}>
              비밀번호가 일치하지 않습니다.
            </Text>
          )}
        </View>

        {/* 전화번호 + 인증 */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <TextInput
              placeholder="전화번호 (01012345678)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={[styles.input, { marginRight: 8 }]}
            />
            <TouchableOpacity
              style={styles.checkButton}
              onPress={sendVerification}
            >
              <Text style={styles.checkText}>인증번호 전송</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 인증번호 입력 */}
        {confirmResult && (
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <TextInput
                placeholder="인증번호 입력"
                keyboardType="numeric"
                value={verificationCode}
                onChangeText={setVerificationCode}
                style={[styles.input, { marginRight: 8 }]}
              />
              <TouchableOpacity
                style={styles.checkButton}
                onPress={confirmCode}
              >
                <Text style={styles.checkText}>확인</Text>
              </TouchableOpacity>
            </View>
            {isVerified && (
              <Text style={{ color: 'green', marginTop: 4, marginLeft: 2 }}>
                인증 완료 ✅
              </Text>
            )}
          </View>
        )}

        <Text style={styles.infoText}>
          * 아이디나 비밀번호 분실 시, 사용됩니다.
        </Text>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={[
            styles.checkButton,
            {
              marginTop: 30,
              backgroundColor: canSubmit ? '#4169e1' : '#ccc',
              alignSelf: 'center',
              paddingHorizontal: 30,
            },
          ]}
          disabled={!canSubmit}
          onPress={handleSignup}
        >
          <Text style={styles.checkText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fdfcf8' },
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backArrow: { fontSize: 24, color: '#000' },
  title: { fontSize: 18, fontWeight: 'bold' },
  done: { fontSize: 16, color: '#4169e1' },
  inputGroup: { marginBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  inputOnly: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
  },
  checkButton: {
    backgroundColor: '#4169e1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  checkText: { color: '#fff', fontSize: 14 },
  hintText: { fontSize: 12, color: '#999', marginTop: 4, marginLeft: 2 },
  errorText: { color: '#e63946' },
  inputError: { borderColor: '#e63946' },
  infoText: { marginTop: 10, fontSize: 13, color: '#777' },
});
