"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, FileText, Link as LinkIcon } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { ALLOWED_DOCUMENT_TYPES, MAX_UPLOAD_SIZE } from "@/lib/upload-config";

export interface UploadedFile {
  url: string;
  name: string;
}

interface FileUploaderProps {
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  multiple?: boolean;
  label?: string;
}

export function FileUploader({
  value,
  onChange,
  multiple = false,
  label = "PDF Document",
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null);

      const fileArray = Array.from(files);

      for (const file of fileArray) {
        const ext = ALLOWED_DOCUMENT_TYPES[file.type];
        if (!ext) {
          setError(`Invalid file type: ${file.name}. Only PDF is allowed`);
          return;
        }
        if (file.size > MAX_UPLOAD_SIZE) {
          setError(`File too large: ${file.name}. Max size: 25MB`);
          return;
        }
      }

      setUploading(true);

      try {
        const blobs = await Promise.all(
          fileArray.map((file) =>
            upload(`uploads/${crypto.randomUUID()}.${ALLOWED_DOCUMENT_TYPES[file.type]}`, file, {
              access: "public",
              handleUploadUrl: "/api/upload",
              contentType: file.type,
            })
          )
        );
        const uploaded = blobs.map((blob, i) => ({ url: blob.url, name: fileArray[i].name }));

        if (multiple) {
          onChange([...value, ...uploaded]);
        } else {
          onChange(uploaded.slice(0, 1));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Upload failed. Please try again."
        );
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        uploadFiles(e.target.files);
      }
      e.target.value = "";
    },
    [uploadFiles]
  );

  const addUrl = useCallback(() => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
      setError("Invalid URL. Must start with https://, http://, or /");
      return;
    }
    setError(null);
    const file = { url: trimmed, name: trimmed.split("/").pop() || trimmed };
    if (multiple) {
      onChange([...value, file]);
    } else {
      onChange([file]);
    }
    setUrlInput("");
    setShowUrlInput(false);
  }, [urlInput, value, onChange, multiple]);

  const removeFile = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  const showDropZone = multiple || value.length === 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#0072BB] hover:text-[#0090ee] flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Hide URL input" : "Add by URL"}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/document.pdf"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-4 py-2.5 bg-[#0072BB] hover:bg-[#005a94] text-white text-sm font-medium rounded-xl transition-all"
          >
            Add
          </button>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.url}-${index}`}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0072BB]/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#0072BB]" />
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white truncate block hover:text-[#0072BB] transition-colors"
                >
                  {file.name}
                </a>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="w-7 h-7 shrink-0 bg-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showDropZone && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
            ${
              dragOver
                ? "border-[#0072BB] bg-[#0072BB]/10 scale-[1.01]"
                : "border-white/15 hover:border-white/30 hover:bg-white/5"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#0072BB] animate-spin" />
              <p className="text-sm text-gray-400">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  Drop {multiple ? "PDFs" : "a PDF"} here or <span className="text-[#0072BB]">browse</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF — Max 25MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
