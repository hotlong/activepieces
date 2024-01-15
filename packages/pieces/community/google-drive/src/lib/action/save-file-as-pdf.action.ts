/* eslint-disable @typescript-eslint/no-explicit-any */

import { googleDriveAuth } from '../../index';
import { Property, createAction } from '@activepieces/pieces-framework';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Stream } from 'stream';

export const saveFileAsPdf = createAction({
  displayName: 'Save file as PDF',
  auth: googleDriveAuth,
  name: 'save_file_as_pdf',
  description: 'Save a file as PDF in a Google Drive folder',
  props: {
    documentId: Property.ShortText({
      displayName: 'Document ID',
      description: 'The ID of the document to export',
      required: true,
    }),
    folderId: Property.ShortText({
      displayName: 'Folder ID',
      description: 'The ID of the folder where the file will be exported',
      required: true,
    }),
    name: Property.ShortText({
      displayName: 'Name',
      description: 'The name of the new file (do not include the extension)',
      required: true,
    }),
  },
  async run(context) {
    const authClient = new OAuth2Client();
    authClient.setCredentials(context.auth);

    const documentId = context.propsValue.documentId;
    const folderId = context.propsValue.folderId;
    const nameForNewFile = context.propsValue.name;

    const drive = google.drive({ version: 'v3', auth: authClient });

    const result = await drive.files.export(
      {
        fileId: documentId,
        mimeType: 'application/pdf',
      },
      { responseType: 'arraybuffer' }
    );

    const requestBody = {
      name: nameForNewFile + '.pdf',
      parents: [folderId],
    };
    const templateBuffer = Buffer.from(result.data as any, 'base64');

    const streamm = new Stream.PassThrough().end(templateBuffer);

    const media = {
      mimeType: 'application/pdf',
      body: streamm,
    };

    const file = await drive.files.create({
      requestBody,
      media: media,
    });

    return file.data;
  },
});
