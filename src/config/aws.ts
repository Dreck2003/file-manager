import fs from "fs";
import { CONFIG } from "./process";
import AWS from "aws-sdk/clients/s3";

const s3 = new AWS({
  accessKeyId: CONFIG.AWS.KEY,
  secretAccessKey: CONFIG.AWS.SECRET,
});

type File = {
  path: string;
  filename: string;
};

/**
 *
 * @param file is a Req.file (File)
 * @returns `Promise<AWS-S3>` return file object information
 */
export const UploadFile = (file: File | undefined) => {
  try {
    const fileStream = fs.createReadStream(file!.path);

    const uploadParams = {
      Bucket: CONFIG.AWS.BUCKET as string,
      Body: fileStream,
      Key: file!.filename,
    };

    return s3.upload(uploadParams).promise();
  } catch (error) {
    console.log("Error in UploadFile: ", file);
  }
};

export const getFileS3 = async (fileKey: string) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: CONFIG.AWS.BUCKET as string,
    };

    return s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    console.log("Error in getFileS3: ", error);
  }
};

// export const getListFilesAws = async () => {
//   try {
//     let response = await s3
//       .listObjectsV2({
//         Bucket: CONFIG.AWS.BUCKET as string,
//         Delimiter
//       })
//       .promise();
//   } catch (error) {
//     console.log("Error in getListFilesAws: ", error);
//   }
// };

// export const downloadAwsFile = async (fileKey: string) => {
//   try {
//     return s3
//       .getObject({
//         Key: fileKey,
//         Bucket: CONFIG.AWS.BUCKET as string,
//       })
//       .promise();

//     s3.putObject;
//   } catch (error) {
//     console.log("Error en downloadAwsFile: ", error);
//   }
// };
