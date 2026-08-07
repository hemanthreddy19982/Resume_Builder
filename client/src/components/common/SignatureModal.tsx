import React, { useRef, useState } from 'react';
import { FileSignature, Eraser, Upload, X, Check } from 'lucide-react';
import { api } from '../../services/api';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignatureSaved: (url: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSignatureSaved }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'draw' | 'upload'>('draw');

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E293B';

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  const handleSave = async () => {
    if (activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas || !hasDrawn) return;
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureSaved(dataUrl);
      onClose();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const res = await api.uploadSignature(file);
        if (res.success && res.url) {
          onSignatureSaved(res.url);
          onClose();
          return;
        }
      } catch {
        // fallback
      }
      onSignatureSaved(URL.createObjectURL(file));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-slate-800">Add Digital Signature</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('draw')}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'draw' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500'
              }`}
            >
              Draw Signature
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'upload' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500'
              }`}
            >
              Upload Image
            </button>
          </div>

          {activeTab === 'draw' ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full h-44 border-2 border-slate-300 rounded-xl bg-slate-50 overflow-hidden cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={176}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full"
                />
                {!hasDrawn && (
                  <p className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none">
                    Sign here with mouse or touch screen...
                  </p>
                )}
              </div>
              <div className="flex justify-between w-full">
                <button
                  onClick={clearCanvas}
                  type="button"
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 font-medium transition-colors"
                >
                  <Eraser className="w-4 h-4" /> Clear Canvas
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-3">
              <Upload className="w-8 h-8 text-purple-500" />
              <p className="text-sm font-medium text-slate-600">Select signature image (PNG transparent background recommended)</p>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="sig-upload-input" />
              <label
                htmlFor="sig-upload-input"
                className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
              >
                Browse Files
              </label>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200/60 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          {activeTab === 'draw' && (
            <button
              type="button"
              disabled={!hasDrawn}
              onClick={handleSave}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all"
            >
              <Check className="w-4 h-4" /> Save Signature
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
