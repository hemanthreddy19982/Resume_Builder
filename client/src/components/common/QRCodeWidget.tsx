import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeWidgetProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export const QRCodeWidget: React.FC<QRCodeWidgetProps> = ({
  value,
  size = 64,
  fgColor = '#0F172A',
  bgColor = '#FFFFFF',
}) => {
  if (!value || !value.trim()) return null;

  return (
    <div className="inline-block p-1 bg-white rounded-lg shadow-sm border border-slate-200">
      <QRCodeSVG value={value} size={size} fgColor={fgColor} bgColor={bgColor} level="M" includeMargin={false} />
    </div>
  );
};
