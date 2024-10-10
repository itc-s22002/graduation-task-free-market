'use client'

import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebaseのログイン機能をインポート
import {app} from '../firebaseConfig'
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

  // Firebase Authenticationでログイン
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('ログイン成功:', userCredential.user);
      onRequestClose(); // ログイン成功後にモーダルを閉じる
    } catch (error) {
      setError('ログインに失敗しました: ' + error.message);
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
      <form onSubmit={handleLogin}>
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
        <button type="submit">ログイン</button>
        <button type="button" onClick={onRequestClose}>キャンセル</button>
      </form>
    </Modal>
  );
};

export default LoginModal;