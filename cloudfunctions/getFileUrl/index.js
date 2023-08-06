const cloud = require('wx-server-sdk')
cloud.init({
  env: "cslg-sys-4gwkot7s23b09200"
})
exports.main = async (event, context) => {
  const fileList = event.fileList
  const result = await cloud.getTempFileURL({
    fileList: fileList,
  })
  return {fileList}
}