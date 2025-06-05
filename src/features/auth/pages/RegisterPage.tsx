import { useForm } from "react-hook-form";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const RegisterPage = () => {
  const form = useForm();

  return (
    <PageContainer>
      <SectionContainer padded minFullscreen className="mx-auto justify-center">
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
              <form className="flex flex-col gap-y-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Label className="flex items-center gap-2">
                  <Checkbox />
                  Show Password
                </Label>

                <Button className="w-full mt-4">Buat Akun</Button>
              </form>
            </Form>

            
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};

export default RegisterPage;
