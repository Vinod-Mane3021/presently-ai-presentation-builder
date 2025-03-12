"use client"

import { FaCaretRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Loader } from "@/components/loader"
import { PasswordInput } from "@/components/password-input"
import { useSignInWithProviderMutation } from "@/hooks/api/use-signin-with-provider-mutation"
import { AlertMessage } from "@/components/alert-message"
import type { BuiltInProviderType } from "next-auth/providers"
import { OauthProviderContainer } from "@/components/oauth-provider-container"
import { useSignUpMutation } from "@/hooks/api/use-signup-mutation"
import { signUpSchema } from "@/schemas/user"
import { useRouter } from "next/navigation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useEffect } from "react"

const formSchema = signUpSchema

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
  const signInWithProviderMutation = useSignInWithProviderMutation()
  const signUpMutation = useSignUpMutation()

  const message =
    signUpMutation.data?.message || 
    signUpMutation.data?.errors?.toString() || 
    signUpMutation.error?.message || 
    signInWithProviderMutation.data?.message || 
    signInWithProviderMutation.error?.message
  
  const isPending = signInWithProviderMutation.isPending || signUpMutation.isPending
  const isSuccess = signInWithProviderMutation.isSuccess || signUpMutation.isSuccess

  const router = useRouter()

  const signInWithOauthProvider = async (provider: BuiltInProviderType) => {
    signInWithProviderMutation.mutate(
      { provider },
      {
        onSuccess: (json) => {
          console.log({
            signInWithOauthProvider: json,
          })
        },
      },
    )
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signin = () => {
      signInWithProviderMutation.mutate(
        {
          provider: "credentials",
          values: {
            identifier: values.email,
            password: values.password,
          },
        },
        {
          onSuccess: () => {
            router.push(DEFAULT_LOGIN_REDIRECT)
          },
        },
      )
    }

    signUpMutation.mutate(values, {
      onSuccess: () => signin(),
    })
  }

  useEffect(() => {
    console.log({message: signUpMutation.error})
  }, [signUpMutation.error])

  return (
    <>
      <div className="w-[400px] mb-2">{message && (<AlertMessage message={message} type={isSuccess ? "success" : "warning"} />)}</div>
      
      <div className="bg-muted shadow-lg rounded-xl border">
        <div className="bg-card w-[400px] shadow-sm px-5 py-5 rounded-xl flex flex-col gap-2 border text-card-foreground">
          <>
            <p className="font-semibold text-xl text-center tracking-tight">Create your account</p>
            <p className="text-sm font-medium text-center text-muted-foreground">
              Welcome! Please fill in the details to get started.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="john" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john123@gmail.com" {...field} />
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
                        <PasswordInput placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit" className="mt-5">
                  {isPending && <Loader />}
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
            Already have an account?{" "}
            <Link href="/sign-in" className="hover:underline text-primary cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
