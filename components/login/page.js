'use client'

import React, { useState } from 'react';
import Modal from 'react-modal';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebaseのログイン
import {app} from '../../firebaseConfig'

const loginModal = () => {
    return(<>ログイン</>)
}

export default loginModal