import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from "vue-router";
import router from "../router";
export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const authUser = ref(null);
    const routerKey = useRouter();
    const errorMSG = ref('');
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/email-already-in-use': 'email en uso',
        'auth/invalid-credential': 'Credenciales invalidas',
    };
    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user;
            }
        });
    });
    const login = ({ email, password }) => {

        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            authUser.value = user;
            router.push({ name: 'admin-propiedades' });
        }
        ).catch((error) => {
            errorMSG.value = errorCodes[error.code];
        });
    }
    const logout = () => {
        console.log('logout');
        signOut(auth).then(() => {
            authUser.value = null;
            router.push({ name: 'login' });
        }).catch((error) => {
            errorMSG.value = errorCodes[error.code];
        });
    }
    const hasError = computed(() => errorMSG.value !== '');
    const isAuth = computed(() => authUser.value);
    return {
        login,
        errorMSG,
        hasError,
        isAuth,
        logout,
    }

});