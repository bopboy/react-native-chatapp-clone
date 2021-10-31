import { initializeApp } from 'firebase/app'
import config from '../firebase.json'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, signOut } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const app = initializeApp(config)
const auth = getAuth()
const storage = getStorage(app)
export const db = getFirestore()

export const signin = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
}

const uploadImage = async uri => {
    if (uri.startsWith('https')) return uri
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () { resolve(xhr.response) }
        xhr.onerror = function () { reject(new TypeError('Network request failed')) }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
    })
    const user = auth.currentUser
    const imageRef = ref(storage, `/profile/${user.uid}/photo.png`)
    const snapshot = await uploadBytes(imageRef, blob, { contentType: 'image/png' })
    blob.close()
    return await getDownloadURL(snapshot.ref)
}
export const signup = async ({ name, email, password, photo }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const photoURL = await uploadImage(photo)
    await updateProfile(user, { displayName: name, photoURL })
    return user
}
export const getCurrentUser = () => {
    const { uid, displayName, email, photoURL } = auth.currentUser
    return { uid, name: displayName, email, photo: photoURL }
}
export const updateUserInfo = async photo => {
    const photoURL = await uploadImage(photo)
    await updateProfile(auth.currentUser, { photoURL })
    console.log(auth.currentUser)
    return photoURL
}
export const signout = async () => {
    await signOut(auth)
    return {}
}
export const createChannel = async ({ title, desc }) => {
    const newChannel = await addDoc(collection(db, '/channels'), {
        title, description: desc, createdAt: Date.now()
    })
    return newChannel.id
}