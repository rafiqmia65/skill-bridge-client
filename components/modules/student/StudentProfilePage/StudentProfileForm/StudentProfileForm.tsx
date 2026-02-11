"use client";

import { useEffect, useState } from "react";
import {
  StudentProfilePayload,
  studentProfileService,
} from "@/services/student/StudentProfileService";
import Image from "next/image";
import { FiUser, FiMail, FiImage, FiSave, FiCamera } from "react-icons/fi";
import toast from "react-hot-toast";

interface Props {
  token: string;
}

interface ExtendedStudentProfilePayload extends StudentProfilePayload {
  createdAt?: string;
}

export default function StudentProfileForm({ token }: Props) {
  const [profile, setProfile] = useState<ExtendedStudentProfilePayload | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<
    StudentProfilePayload & { password?: string }
  >({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await studentProfileService.getProfile(token);
        setProfile(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          image: data.image || "",
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch profile";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await studentProfileService.updateProfile(
        token,
        formData,
      );
      setProfile(updated);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      image: profile?.image || "",
    });
    toast.success("Changes reset");
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiUser className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Student Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  {profile?.image ? (
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-yellow-500">
                      <Image
                        src={profile.image}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-2 border-yellow-500">
                      <span className="text-3xl font-medium text-white">
                        {profile?.name?.charAt(0).toUpperCase() || "S"}
                      </span>
                    </div>
                  )}
                  <button className="absolute -bottom-1 -right-1 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full border-2 border-white dark:border-gray-900 transition-colors">
                    <FiCamera size={14} />
                  </button>
                </div>

                {/* Info */}
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
                  {profile?.name || "No Name"}
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <FiMail size={14} />
                  <span className="truncate">{profile?.email}</span>
                </div>

                {/* Status */}
                <div className="w-full pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Status
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Active
                    </span>
                  </div>
                  {profile?.createdAt && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        Member Since
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {new Date(profile.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 p-5">
            <div className="flex gap-3">
              <FiImage
                className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                size={18}
              />
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                  Profile Image Tips
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                  Use a square image URL from Imgur, Cloudinary, or GitHub for
                  best results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Form Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <FiUser
                  className="text-gray-500 dark:text-gray-400"
                  size={16}
                />
                <h2 className="font-medium text-gray-900 dark:text-white">
                  Edit Profile Information
                </h2>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <FiUser size={12} />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 pl-9 text-sm
                             bg-gray-50 dark:bg-gray-900 
                             border border-gray-200 dark:border-gray-800
                             rounded-md
                             focus:outline-none focus:border-yellow-500 
                             focus:ring-1 focus:ring-yellow-500
                             transition-colors"
                  />
                  <FiUser
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <FiMail size={12} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 pl-9 text-sm
                             bg-gray-50 dark:bg-gray-900 
                             border border-gray-200 dark:border-gray-800
                             rounded-md
                             focus:outline-none focus:border-yellow-500 
                             focus:ring-1 focus:ring-yellow-500
                             transition-colors"
                  />
                  <FiMail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />
                </div>
              </div>

              {/* Image URL Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <FiImage size={12} />
                  Profile Image URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="image"
                    value={formData.image || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 pl-9 text-sm
                             bg-gray-50 dark:bg-gray-900 
                             border border-gray-200 dark:border-gray-800
                             rounded-md
                             focus:outline-none focus:border-yellow-500 
                             focus:ring-1 focus:ring-yellow-500
                             transition-colors"
                  />
                  <FiImage
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image Preview
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 break-all">
                        {formData.image}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                           bg-yellow-500 hover:bg-yellow-600
                           text-white rounded-md
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={14} />
                      Update Profile
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium
                           text-gray-700 dark:text-gray-300
                           bg-gray-100 dark:bg-gray-800
                           hover:bg-gray-200 dark:hover:bg-gray-700
                           rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
