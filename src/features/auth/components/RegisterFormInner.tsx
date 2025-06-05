import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { RegisterFormSchema } from "../forms/register";

type RegisterFormInnerProps = {
  onRegisterSubmit: (values: RegisterFormSchema) => void;
  isLoading: boolean;
};

export const RegisterFormInner = (props: RegisterFormInnerProps) => {
  const form = useFormContext<RegisterFormSchema>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form
      onSubmit={form.handleSubmit(props.onRegisterSubmit)}
      className="flex flex-col gap-y-1"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
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
              <Input type={!showPassword ? "password" : "text"} {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      <Label className="flex items-center gap-2">
        <Checkbox
          checked={showPassword}
          onCheckedChange={(val) => setShowPassword(!!val)}
        />
        Show Password
      </Label>

      <Button disabled={props.isLoading} className="mt-4 w-full">Buat Akun</Button>
    </form>
  );
};
