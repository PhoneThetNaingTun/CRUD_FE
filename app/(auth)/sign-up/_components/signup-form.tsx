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
import { signUpSchema, SignUpSchema } from "@/schema/signUpSchema";
import { useRegisterMutation } from "@/store/Api/authApi";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.Auth);

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onBlur",
  });

  const [handleRegister, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (value: SignUpSchema) => {
    try {
      const data = await handleRegister(value).unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      router.replace("/login");
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

  useEffect(() => {
    if (token) {
      signUpForm.setValue("fcmToken", token);
    }
  }, [token]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <Field>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <span className="text-2xl font-semibold">Register</span>
            </a>
          </div>
        </Field>
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <FormField
                  control={signUpForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name </FormLabel>
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
                  control={signUpForm.control}
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
                  control={signUpForm.control}
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
                  SignUp
                </Button>
              </Field>
              <Field className="text-center">
                <p>
                  Already have an account?
                  <Link href={"/login"} className="underline">
                    Login
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
