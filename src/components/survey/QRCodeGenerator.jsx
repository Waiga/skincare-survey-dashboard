import React from 'react';
import QRCode from 'qrcode.react';
import { Card, CardContent, CardHeader } from "../../components/ui/card";

export default function QRCodeGenerator({ surveyUrl }) {
  const handleDownload = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'skincare-survey-qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Share Survey</h3>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCode
            id="qr-code"
            value={surveyUrl}
            size={200}
            level="H"
            includeMargin={true}
            className="mx-auto"
          />
        </div>
        <div className="space-y-2 w-full">
          <p className="text-sm text-center text-muted-foreground">
            Scan QR code or use the link below
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={surveyUrl}
              readOnly
              className="flex-1 px-3 py-2 border rounded-md text-sm bg-muted"
            />
            <button
              onClick={() => navigator.clipboard.writeText(surveyUrl)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
              Copy
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Download QR Code
          </button>
        </div>
      </CardContent>
    </Card>
  );
} 