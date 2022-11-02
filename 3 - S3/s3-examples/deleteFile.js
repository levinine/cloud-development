import AWS from 'aws-sdk'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const imagePath = './text.txt'

const deletedImage = await s3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: path.basename(imagePath)
}).promise()

console.log('Image successfully deleted', deletedImage)