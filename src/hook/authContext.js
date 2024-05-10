import { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import instance auth dari Firebase Anda

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null); // Status pengguna yang sudah masuk

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user); // Perbarui status pengguna yang sudah masuk saat perubahan status otentikasi terjadi
        });

        // Unsubscribe dari listener ketika komponen dilepas
        return () => unsubscribe();
    }, []);

    return { currentUser };
};

export default useAuth;
