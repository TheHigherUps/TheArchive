import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import {getFirestore, doc, getDoc} from 'firebase/firestore'
import {
    getStorage,
    ref,
    listAll,
    getDownloadURL,
    uploadBytes,
    uploadBytesResumable,
    getMetadata,
} from 'firebase/storage'
const {initializeAppCheck, ReCaptchaV3Provider} = require('firebase/app-check')
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
const storage = getStorage()
const storageRef = ref(storage, 'archive')
const db = getFirestore(app)
const siteKey = '6LdPnEsgAAAAAMJeffsdvV93ZSogm6rVrE2ET3z5'
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
})
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userName = auth.currentUser.displayName
        const userNameDisplay = document.querySelector('#display')
        const singInButton = document.querySelector('.siButton')
        const signOutButton = document.querySelector('.suButton')
        const accountDataDisplaty = document.querySelector('#accountData')
        const accountDataDisplatTwo = document.querySelector('thu-account-data')
        const uid = user.uid
        accountDataDisplaty.setAttribute('ups-data', uid)
        accountDataDisplatTwo.innerText = uid
        singInButton.remove()
        signOutButton.style.display = 'block'
        userNameDisplay.innerText = 'Welcome, ' + userName
        const imageGrid = document.querySelector('.imageGrid')
        listAll(storageRef).then((res) => {
            res.items.forEach((imgRef) => {
                const image = document.createElement('img')
                const downloadButton = document.createElement('a')
                const imageDisplay = document.createElement('div')
                const br = document.createElement('br')
                imageDisplay.classList.add('imageDisplay')
                getDownloadURL(imgRef).then((url) => {
                    image.src = url
                    downloadButton.setAttribute('href', url)
                })

                imageGrid.appendChild(imageDisplay)
                imageDisplay.appendChild(downloadButton)
                downloadButton.appendChild(image)
                downloadButton.appendChild(br)
            })
        })
        getDoc(doc(db, 'users', auth.currentUser.uid)).then((docsnap) => {
            if (docsnap.data().userStatus == 'verified') {
                const badge = document.createElement('span')
                badge.classList.add('material-icons')
                badge.title = 'Your Account Is Verifed'
                badge.innerText = 'verified'
                userNameDisplay.appendChild(badge)
            }
            if (docsnap.data().archiveAccess != true) {
                signOut(auth).then(() => {
                    location = '/no-access.html'
                })
            }
        })
    } else {
        location = '/sign-in.html'
    }
})
const signOutUser = document.querySelector('.suButton')
const mobileSignOut = document.querySelector('.mobile-sign-out')
signOutUser.addEventListener('click', () => {
    signOut(auth).then(() => {
        location = '/sign-in.html'
    })
})
mobileSignOut.addEventListener('click', () => {
    signOut(auth).then(() => {
        location = '/sign-in.html'
    })
})
const uploadFile = document.querySelector('.imageUpload')
uploadFile.addEventListener('change', (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i]
        uploadSelectedFiles(imageFile)
    }
})
function uploadSelectedFiles(imageFile) {
    const photoRef = ref(storage, 'archive/' + imageFile.name)
    const metadata = {
        contentType: imageFile.type,
        size: imageFile.size,
    }
    const uploadTask = uploadBytesResumable(photoRef, imageFile, metadata)
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const calcProgress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            const progress = Math.round(calcProgress)
            document.querySelector('.upload').innerText = ''
            document.querySelector('.upload-percent').innerText = progress + '%'
            switch (snapshot.state) {
                case 'paused':
                    document.querySelector('.upload').innerText = 'pause_circle'
                    document.querySelector('.upload-percent').innerText = ''
                    break
                case 'running':
                    break
            }
        },
        (error) => {
            document.querySelector('.upload').innerText = 'error_outline'
            document.querySelector('.upload-percent').innerText = ''
            setTimeout(() => {
                document.querySelector('.upload').innerText = 'file_upload'
            }, 3500)
        },
        () => {
            document.querySelector('.upload-percent').innerText = ''
            document.querySelector('.upload').innerText = 'done'
            setTimeout(() => {
                document.querySelector('.upload').innerText = 'file_upload'
            }, 2000)
        }
    )
    //OLD UPLOAD CODE
    // uploadBytes(photoRef, imageFile, metadata).then(() => {
    //     document.querySelector('.upload').innerText = 'done'
    //     setTimeout(() => {
    //         document.querySelector('.upload').innerText = 'file_upload'
    //     }, 1000)
    // }).catch((err) => {
    //     document.querySelector('.upload').innerText = 'warning'
    //     setTimeout(() => {
    //         document.querySelector('.upload').innerText = 'file_upload'
    //     }, 3000)
    //     console.log(err)
    // })
}
