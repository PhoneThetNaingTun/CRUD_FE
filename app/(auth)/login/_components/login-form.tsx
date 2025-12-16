"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { showToast } from "@/components/toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/schema/loginSchema";
import { useLoginMutation } from "@/store/Api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginform = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [handleLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = async (value: LoginSchema) => {
    try {
      const data = await handleLogin(value).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      router.replace("/");
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message,
          type: "error",
        });
      } else {
        showToast({
          title: "An unexpected error occurred",
          type: "error",
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <Field>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <span className="text-2xl font-semibold">Login.</span>
            </a>
          </div>
        </Field>
        <Form {...loginform}>
          <form onSubmit={loginform.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <FormField
                  control={loginform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FormField
                  control={loginform.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              className="pr-10"
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <IconEyeOff className="h-5 w-5" />
                              ) : (
                                <IconEye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  Login
                </Button>
              </Field>
              <Field className="text-center">
                <p>
                  Don't have an account?
                  <Link href={"/sign-up"} className="underline">
                    SignUp
                  </Link>
                </p>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </FieldGroup>
    </div>
  );
}
