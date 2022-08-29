import {initializeApp} from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from 'firebase/auth'
const firebaseConfig = {
    apiKey: 'AIzaSyDnTUk73OznQKMQl4hkJB0klLrjI3vuTjI',
    authDomain: 'thu-shop.firebaseapp.com',
    projectId: 'thu-shop',
    storageBucket: 'thu-shop.appspot.com',
    messagingSenderId: '231897879888',
    appId: '1:231897879888:web:21f214f0dbdb7c80b10855',
    measurementId: 'G-X9T0NQJKWK',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
onAuthStateChanged(auth, (user) => {
    if (user) {
        location = '/'
    }
})
const loginForm = document.querySelector('.login__form')
const emailValue = document.querySelector('#loginEmail')
const passwordValue = document.querySelector('#loginPassword')
const errText = document.querySelector('.error__text')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = emailValue.value
    const pass = passwordValue.value
    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            location = '/'
        })
        .catch((err) => {
            var errCode = err.code
            var errMsg
            switch (errCode) {
                case 'auth/internal-error':
                    errMsg =
                        'An Interal Error Has Occured, Please Try Again Later'
                    break
                case 'auth/wrong-password':
                    errMsg = 'The Password Entered Is Incorrect'
                    break
                case 'auth/too-many-requests':
                    errMsg = 'Account Temporarily Disabled. Try Again Later'
                    break
                case 'auth/user-not-found':
                    errMsg = 'This User Does Not Exist'
                    break
                case 'auth/user-disabled':
                    errMsg = 'This Account Is Currently Disabled'
                    break
                case 'auth/invalid-email':
                    errMsg = 'The Email Entered Is Not Vaild'
                    break
                default:
                    errMsg = 'An Error Has Occured'
            }
            createError(errMsg)
            errText.innerText = errMsg
            console.log(errCode)
            setTimeout(() => {
                errText.innerText = ''
            }, 3000)
        })
})
emailValue.addEventListener('paste', (e) => e.preventDefault())
passwordValue.addEventListener('paste', (e) => e.preventDefault())
document.addEventListener('copy', (e) => e.preventDefault())
function createError(errMsg) {
    Swal.fire({
        icon: 'error',
        title: errMsg,
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
        focusConfirm: false,
        allowOutsideClick: false,
    })
}
