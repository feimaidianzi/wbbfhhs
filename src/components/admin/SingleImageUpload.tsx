import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface SingleImageUploadProps {
  image: string;
  onImageChange: (image: string) => void;
  bucket?: string;
  folder?: string;
}

const SingleImageUpload = ({ 
  image, 
  onImageChange, 
  bucket = 'product-images',
  folder = 'news'
}: SingleImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: '文件类型错误',
        description: '请选择有效的图片文件',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: '文件过大',
        description: '图片大小不能超过5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: '上传失败',
          description: uploadError.message,
          variant: 'destructive',
        });
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
      toast({ title: '上传成功' });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: '上传失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Image Preview */}
      {image && (
        <div className="relative inline-block">
          <div className="w-full max-w-xs aspect-video rounded-lg overflow-hidden bg-slate-700">
            <img
              src={image}
              alt="Cover"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Buttons */}
      {!image && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  上传图片
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              URL
            </Button>
          </div>

          {showUrlInput && (
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="输入图片URL"
                className="bg-slate-700 border-slate-600"
              />
              <Button
                type="button"
                onClick={handleAddUrl}
                disabled={!urlInput.trim()}
                className="bg-amber-500 hover:bg-amber-600"
              >
                确定
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Change Button when image exists */}
      {image && (
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-slate-700 border-slate-600 hover:bg-slate-600"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                更换图片
              </>
            )}
          </Button>
        </div>
      )}

      <p className="text-xs text-slate-500">
        支持 JPG、PNG、GIF 格式，图片不超过 5MB
      </p>
    </div>
  );
};

export default SingleImageUpload;
