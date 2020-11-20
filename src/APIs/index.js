import { fAuth } from '../configs/firebase'

export let checkUser = fAuth.onAuthStateChanged(function (user) {
    if (user) {
        return true
    } else {
        return false
    }
});