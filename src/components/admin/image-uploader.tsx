"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_SIZE } from "@/lib/upload-config";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = "Images",
}: ImageUploaderProps) {
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
        const ext = ALLOWED_UPLOAD_TYPES[file.type];
        if (!ext) {
          setError(
            `Invalid file type: ${file.name}. Allowed: JPEG, PNG, WebP, GIF, SVG`
          );
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
            upload(
              `uploads/${crypto.randomUUID()}.${ALLOWED_UPLOAD_TYPES[file.type]}`,
              file,
              {
                access: "public",
                handleUploadUrl: "/api/upload",
                contentType: file.type,
              }
            )
          )
        );
        const urls = blobs.map((blob) => blob.url);

        if (multiple) {
          onChange([...value, ...urls]);
        } else {
          onChange(urls.slice(0, 1));
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
    if (multiple) {
      onChange([...value, trimmed]);
    } else {
      onChange([trimmed]);
    }
    setUrlInput("");
    setShowUrlInput(false);
  }, [urlInput, value, onChange, multiple]);

  const removeImage = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#0072BB] hover:text-[#0090ee] flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Hide URL input" : "Add by URL"}
        </button>
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/image.jpg"
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

      {/* Drop Zone */}
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
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
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
                Drop {multiple ? "images" : "an image"} here or{" "}
                <span className="text-[#0072BB]">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, WebP, GIF, SVG — Max 25MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      {/* Preview Grid */}
      {value.length > 0 && (
        <div className={`grid gap-3 ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="relative aspect-video">
                {url.startsWith("/") || url.startsWith("http") ? (
                  <Image
                    src={url}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="px-3 py-2">
                <p className="text-xs text-gray-500 truncate">{url}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
