
const sm2 = require('sm-crypto').sm2
// 获取密钥对
// let keypair = sm2.generateKeyPairHex()
// const publicKey = keypair.publicKey // 公钥
// const privateKey = keypair.privateKey // 私钥

// 和后端约定得密钥对公钥  如公钥字符串前面无04需加上04
const publicKey = '04c7d91feb3cb8a442a5046741a7bf512dbe27b08e630f5d7243cab035a5a15e8caa55bd9c515ce6eff82385f88f58b92392c9b6f41058ac161bd6f516f2113604'
const privateKey = '00f4f08aa2516992826a5bbf7c9fc69f18d363dbfc84b14cfe2b1f73a9ada04387'

// sm2 加密
export const encrypt = function (data) {
  const cipherMode = 1
  const result = sm2.doEncrypt(data, publicKey, cipherMode)
  return result
}

// sm-  解密
export const decrypt = function (data) {
  const cipherMode = 1
  const result = sm2.doDecrypt(data, privateKey, cipherMode)
  return result
}
