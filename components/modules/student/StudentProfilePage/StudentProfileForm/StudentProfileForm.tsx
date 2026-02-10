"use client";

import { useEffect, useState } from "react";
import {
  StudentProfilePayload,
  studentProfileService,
} from "@/services/student/StudentProfileService";
import Image from "next/image";
import { User, Mail, Image as ImageIcon, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  token: string;
}

// Extend the StudentProfilePayload to include createdAt if needed
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Student Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card - Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  {profile?.image ? (
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                      <Image
                        src={profile.image}
                        alt="Profile"
                        width={144}
                        height={144}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-lg">
                      <User className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full shadow-lg">
                    <User className="w-5 h-5" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile?.name || "No Name Provided"}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm md:text-base">{profile?.email}</p>
                </div>

                <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Status
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Member Since
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                      {profile?.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image URL Help Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Profile Image Tips
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Use a direct image URL from services like Imgur, Cloudinary,
                    or GitHub. Ensure the image is square (1:1 ratio) for best
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Profile Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Update your personal details and account preferences
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Image URL Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <ImageIcon className="w-4 h-4" />
                    Profile Image URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="image"
                      value={formData.image || ""}
                      onChange={handleChange}
                      className="w-full p-4 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com/your-image.jpg"
                    />
                    <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-4 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Update Profile
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: profile?.name || "",
                        email: profile?.email || "",
                        image: profile?.image || "",
                      });
                    }}
                    className="py-4 px-8 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Reset Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Current Image Preview */}
            {formData.image && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Image Preview
                </h3>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                      {formData.image}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      This is how your profile image will appear
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
