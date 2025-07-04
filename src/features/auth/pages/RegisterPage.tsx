import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { api } from "~/utils/api";
import { RegisterFormInner } from "../components/RegisterFormInner";
import { registerFormSchema, type RegisterFormSchema } from "../forms/register";
import { GuestRoute } from "~/components/layout/GuestRoute";

const RegisterPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: registerUser, isPending: registerUserIsPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        toast("Akun kamu berhasil dibuat!");
        form.setValue("email", "");
        form.setValue("password", "");
      },
      onError: () => {
        toast.error("Terjadi kesalahan!, coba beberapa saat lagi!");
      },
    });

  const handleRegisterSubmit = (values: RegisterFormSchema) => {
    registerUser(values);
  };

  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
          padded
          minFullscreen
          className="justify-center"
        >
          <Card className="w-full max-w-[480px] self-center">
            <CardHeader className="flex flex-col items-center justify-center">
              {/* LOGO */}
              <h1 className="text-primary text-3xl font-bold">Buat Akun</h1>
              <p className="text-muted-foreground">
                Kepoin kreator favorite kamu
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  isLoading={registerUserIsPending}
                  onRegisterSubmit={handleRegisterSubmit}
                  showPassword
                />
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between gap-x-4">
                <div className="h-[2px] w-full border-t-2" />
                <p className="text-muted-foreground flex-1 text-sm text-nowrap">
                  Atau lanjut dengan
                </p>
                <div className="h-[2px] w-full border-t-2" />
              </div>

              <Button className="w-full" size="lg" variant="secondary">
                <FcGoogle />
                Buat Akun dengan Google
              </Button>

              <p>
                Sudah punya akun{" "}
                <Link className="font-bold text-blue-600" href="/login">
                  Login
                </Link>{" "}
              </p>
            </CardFooter>
          </Card>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
};

export default RegisterPage;
