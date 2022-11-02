import AWS from 'aws-sdk'
import fs from 'fs';
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const imagePath = './text.txt'
const blob = fs.readFileSync(imagePath)


const uploadedImage = await s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: path.basename(imagePath),
    Body: blob,
}).promise()

console.log('Image uploaded successfully', uploadedImage)
