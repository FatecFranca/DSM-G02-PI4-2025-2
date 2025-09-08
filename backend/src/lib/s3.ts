import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const BUCKET = process.env.AWS_BUCKET_NAME!

export async function uploadToS3(fileBuffer: Buffer, fileName: string, mimetype: string): Promise<string> {
  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
    ACL: 'public-read',
  }
  await s3.putObject(params).promise()
  return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
} 