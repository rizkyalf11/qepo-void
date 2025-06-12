import { AvatarImage } from "@radix-ui/react-avatar";
import { useRef } from "react";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/utils/api";
import { EditProfileFormInner } from "../components/editProfileFormInner";
import { AuthRoute } from "~/components/layout/AuthRoute";

const ProfilePage = () => {
  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleOpenFileExplorel = () => {
    inputFileRef.current?.click();
  };

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
                  <AvatarImage />
                </Avatar>
                <Button onClick={handleOpenFileExplorel} size="sm">
                  Ganti Foto
                </Button>
                <input className="hidden" type="file" ref={inputFileRef} />
              </div>

              <div className="grid flex-1 grid-cols-2 gap-y-4">
                {getProfileData && (
                  <EditProfileFormInner
                    defaultValues={{
                      bio: getProfileData?.bio,
                      username: getProfileData?.username,
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button>Simpan</Button>
          </div>
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default ProfilePage;
