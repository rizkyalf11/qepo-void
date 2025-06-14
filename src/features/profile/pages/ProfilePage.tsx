/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthRoute } from "~/components/layout/AuthRoute";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { api } from "~/utils/api";
import { EditProfileFormInner } from "../components/editProfileFormInner";
import {
  editProfileFormSchema,
  type EditProfileFormSchema,
} from "../forms/editProfile";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null | undefined>(
    null,
  );

  const apiUtils = api.useUtils();

  const updateProfilePicture = api.profile.updateProfilePicture.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil ganti poto profile");
      setSelectedImage(null);
      await apiUtils.profile.getProfile.invalidate();
    },
    onError: () => {
      toast.error("ada kesalahan");
    },
  });

  const [selectedImagePreview, setSelectedImagePreview] = useState("");

  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
  });

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil update profile");
    },
    onError: (err) => {
      if (err.data?.code === "UNPROCESSABLE_CONTENT") {
        toast.error("Username sudah digunakan");
        form.setError("username", {
          message: "username sudah digunakan",
        });
      } else {
        toast.error("Gagal update profile");
      }
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = (values: EditProfileFormSchema) => {
    const payload: { username?: string; bio?: string } = {};

    if (values.username != getProfileData?.username) {
      payload.username = values.username;
    }

    if (values.bio !== getProfileData?.bio) {
      payload.bio = values.bio;
    }

    updateProfile.mutate(payload);
  };

  const handleOpenFileExplorel = () => {
    inputFileRef.current?.click();
  };

  const onPickProfilePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const selectedProfilePicturePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
  }, [selectedImage]);

  const handleRemoveSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleUpdateProfilePicture = async () => {
    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const result = reader.result as string;
        const imageBase64 = result.substring(result.indexOf(",") + 1);

        updateProfilePicture.mutate(imageBase64);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    if (getProfileData) {
      form.setValue("username", getProfileData.username ?? "");
      form.setValue("bio", getProfileData.bio ?? "");
    }
  }, [getProfileData]);

  return (
    <AuthRoute>
      <PageContainer>
        <SectionContainer padded minFullscreen className="gap-y-6 py-8">
          <h1 className="text-3xl font-semibold">Profile Settings</h1>

          <Card className="">
            <CardContent className="flex gap-6 pt-6">
              <div className="flex flex-col gap-4">
                <Avatar className="size-24">
                  <AvatarFallback>VC</AvatarFallback>
                  <AvatarImage
                    src={
                      selectedProfilePicturePreview ??
                      getProfileData?.profilePictureUrl ??
                      ""
                    }
                  />
                </Avatar>
                <Button onClick={handleOpenFileExplorel} size="sm">
                  Ganti Foto
                </Button>
                {!!selectedImage && (
                  <>
                    <Button
                      onClick={handleRemoveSelectedImage}
                      variant="destructive"
                      size="sm"
                    >
                      Hapus
                    </Button>
                    <Button onClick={handleUpdateProfilePicture} size="sm">
                      Simpan
                    </Button>
                  </>
                )}
                <input
                  accept="image/*"
                  onChange={onPickProfilePicture}
                  className="hidden"
                  type="file"
                  ref={inputFileRef}
                />
              </div>

              <div className="grid flex-1 grid-cols-2 gap-y-4">
                {getProfileData && (
                  <Form {...form}>
                    <EditProfileFormInner />
                  </Form>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              disabled={!form.formState.isDirty}
              onClick={form.handleSubmit(handleUpdateProfile)}
            >
              Simpan
            </Button>
          </div>
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default ProfilePage;
