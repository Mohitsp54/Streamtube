import { useState, useRef } from 'react';
import { Upload, X, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function VideoUpload() {
    const { uploadVideo } = useVideo();
    const { user } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleVideoSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoPreview(url);
        }
    };

    const handleThumbnailSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
            const url = URL.createObjectURL(file);
            setThumbnailPreview(url);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoPreview(url);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile || !title.trim()) return;

        setUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return prev;
                }
                return prev + 10;
            });
        }, 150);

        try {
            const formData = new FormData();
            formData.append('video', videoFile);
            formData.append('title', title.trim());
            formData.append('description', description.trim());

            if (thumbnailFile) {
                formData.append('thumbnail', thumbnailFile);
            }

            await uploadVideo(formData);
            setUploadProgress(100);

            setTimeout(() => {
                navigate('/profile');
            }, 500);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload video');
        } finally {
            clearInterval(progressInterval);
            setUploading(false);
        }
    };

    const resetForm = () => {
        setVideoFile(null);
        setVideoPreview(null);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setTitle('');
        setDescription('');
        setUploadProgress(0);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Upload Video</h1>

            {!videoFile ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                    <Film className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Select video to upload</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Or drag and drop a video file
                    </p>
                    <Button type="button" variant="default">
                        Select File
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoSelect}
                        className="hidden"
                    />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Video preview */}
                    <div className="relative">
                        <video
                            src={videoPreview}
                            controls
                            className="w-full aspect-video bg-black rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={resetForm}
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    {/* Upload progress */}
                    {uploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-semibold">
                            Title (required)
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add a title that describes your video"
                            required
                            disabled={uploading}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell viewers about your video"
                            rows={5}
                            disabled={uploading}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Thumbnail</label>
                        <div className="flex gap-4">
                            {thumbnailPreview && (
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="w-40 aspect-video object-cover rounded-lg"
                                />
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => thumbnailInputRef.current?.click()}
                                disabled={uploading}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Thumbnail
                            </Button>
                            <input
                                ref={thumbnailInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailSelect}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Submit buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={uploading || !title.trim()}>
                            {uploading ? 'Uploading...' : 'Upload Video'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
