"use client"

import { FaCaretRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { PasswordInput } from "@/components/password-input"
import { AlertMessage } from "@/components/alert-message"
import { useSignInWithProviderMutation } from "@/hooks/api/use-signin-with-provider-mutation"
import { Loader } from "@/components/loader"
import { OauthProviderContainer } from "@/components/oauth-provider-container"
import type { BuiltInProviderType } from "next-auth/providers"

const formSchema = z.object({
  identifier: z.string().min(1, { message: "Email or username required" }),
  password: z.string().min(1, { message: "Password required" }),
})

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })
  const signInWithProviderMutation = useSignInWithProviderMutation()

  const message = signInWithProviderMutation.data?.message ||  signInWithProviderMutation.error?.message

  const isPending = signInWithProviderMutation.isPending

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    signInWithProviderMutation.mutate({
      provider: "credentials",
      values,
    })
  }

  const signInWithOauthProvider = async (provider: BuiltInProviderType) => {
    signInWithProviderMutation.mutate({ provider })
  }

  return (
    <>
      <div className="w-[400px] mb-2">{message && <AlertMessage message={message} type="warning" />}</div>
      <div className="bg-muted shadow-lg rounded-xl border">
        <div className="bg-card w-[400px] shadow-sm px-5 py-5 rounded-xl flex flex-col gap-2 border text-card-foreground">
          <>
            <p className="font-semibold text-xl text-center tracking-tight">
              Sign in to{" "}
              <span className="bg-gradient-to-r bg-clip-text text-transparent from-primary to-primary/70">
                Presently
              </span>
            </p>
            <p className="text-sm font-medium text-center text-muted-foreground">
              Welcome back! Please sign in to continue
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input placeholder="john123@gmail.com or john" {...field} />
                      </FormControl>
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
                        <PasswordInput showPasswordFeature={true} placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit" className="mt-5">
                  {isPending && <Loader/>}
                  {!isPending && (
                    <>
                      <p>Continue</p> <FaCaretRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>

          {/* or */}
          <div className="flex w-full items-center justify-center gap-2 mt-3">
            <div className="w-[45%] border-t border-border" />
            <p className="text-muted-foreground text-sm font-light">or</p>
            <div className="w-[45%] border-t border-border" />
          </div>

          {/* providers */}
          <OauthProviderContainer isPending={isPending} onSignIn={signInWithOauthProvider} />
        </div>
        <div>
          <p className="text-sm font-medium py-4 text-center text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/sign-up" className="hover:underline text-primary cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignInPage
