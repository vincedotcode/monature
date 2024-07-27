"use client";

import React, { useState } from 'react';
import Camera from "@/components/ui/camera/camera";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "lucide-react";
import { uploadImage } from "@/services/image";
import Loader from "@/components/loader";
import { Card } from "@/components/ui/card";

interface UploadProfilePictureProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onImageUpload }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCapturedImages = async (images: string[]) => {
    if (images.length > 0) {
      const base64Image = images[0];
      const byteString = atob(base64Image.split(',')[1]);
      const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const imageFile = new File([blob], "captured-image.jpg", { type: mimeString });

      try {
        setIsUploading(true);
        const response = await uploadImage(imageFile);
        setProfileImageUrl(response.imageUrl);
        onImageUpload(response.imageUrl);
        setIsUploading(false);
        setShowDialog(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsUploading(false);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const response = await uploadImage(file);
        setProfileImageUrl(response.imageUrl);
        onImageUpload(response.imageUrl);
        setIsUploading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="upload-profile-picture-container">
      <h2 className="text-lg font-medium mb-4">Upload Profile Picture</h2>
      <div className="profile-image-container mb-4 flex justify-center">
        <Card className='p-5'>
          {profileImageUrl ? (
            <div className='flex justify-center items-center'>
              <img src={profileImageUrl} alt="Profile" className="profile-image" />
            </div>
          ) : (
            <div className="placeholder-image">
              <CameraIcon className="h-24 w-24 text-gray-400" />
              <p className="text-gray-400">No image uploaded</p>
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CameraIcon className="mr-2 h-5 w-5" />
                  Capture Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="h-svh w-svw max-w-full p-0">
                <Camera
                  onClosed={() => setShowDialog(false)}
                  onCapturedImages={handleCapturedImages}
                />
              </DialogContent>
            </Dialog>
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <Button variant="outline">
                <UploadIcon className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </Card>
      </div>
      {isUploading && <Loader />}
    </div>
  );
};

export default UploadProfilePicture;
