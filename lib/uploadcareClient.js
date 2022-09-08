import {
  listOfFiles,
  fileInfo,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
  secretKey: process.env.UPLOADCARE_SECRET_KEY,
});

export const listFiles = () =>
  listOfFiles({}, { authSchema: uploadcareSimpleAuthSchema });

export const getFile = (uuid) =>
  fileInfo({ uuid }, { authSchema: uploadcareSimpleAuthSchema });
