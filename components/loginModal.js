'use client'

import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; // Firebaseのログイン機能をインポート
import {app} from '../firebaseConfig'

export const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app)
Modal.setAppElement('body')

// モーダルのスタイルを設定
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // メールアドレスとパスワードでログイン
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onRequestClose();  // ログイン成功後にモーダルを閉じる
    } catch (error) {
      setError('ログインに失敗しました: ' + error.message);
    }
  };

  // Googleアカウントでログイン
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onRequestClose();  // ログイン成功後にモーダルを閉じる
    } catch (error) {
      setError('Googleでのログインに失敗しました: ' + error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <h2>ログイン</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleEmailLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">メールアドレスでログイン</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleGoogleLogin}>Googleでログイン</button>
      </div>
    </Modal>
  );
};

export default LoginModal;