// 云函数入口文件
const cloud = require('wx-server-sdk')

const MAX_LIMIT = 100

cloud.init({
  env: 'xiaomei-txhost'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event.id)
  return await db.collection('history').where({
    _id: event.id
  }).get()
}

