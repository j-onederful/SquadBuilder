const bcrypt = require('bcryptjs')
const cryptoJS = require('crypto-js')

const testBcrypt = () => {
    const password = 'hello_1234'
    //turn this password string into a hash
    // when a user signs up, we will hash their pass and store it in our db
    const salt = 12
    const hash = bcrypt.hashSync(password, salt)
    console.log(hash)

    //when a user logs in we can use compare sync to match passwords to our db's hashed
    const compare = bcrypt.compareSync('wrong pass', hash)
    console.log('do they match?', compare)
}

// testBcrypt()

const testCrypto = () => {
    //this passphrase will be know only to the server admins
    const passphrase = '1234_hello'

    //this message will be in the cookie as the user's id
    const message = 'ayo'

    const encrypted = cryptoJS.AES.encrypt(message, passphrase).toString()
    console.log(encrypted)
    //in the middle we will decrypt
    const decrypted = cryptoJS.AES.decrypt(encrypted, passphrase).toString(cryptoJS.enc.Utf8)
    console.log(decrypted)
}
testCrypto()