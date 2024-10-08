"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form as HookForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "../@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ja } from "date-fns/locale";
import { SignUp } from "@/action/Signup";
import { getSession, signIn } from "next-auth/react";

const LoginSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(6),
});

const SignUpSchema = z
  .object({
    UserName: z.string(),
    Email: z.string().email(),
    FirstPassword: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります"),
    SecondPassword: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります"),
    birthday: z.date(),
  })
  .refine((data) => data.FirstPassword === data.SecondPassword, {
    message: "パスワードが一致しません",
    path: ["SecondPassword"],
  });

export type LoginFormSchema = z.infer<typeof LoginSchema>;
export type SignUpFormSchema = z.infer<typeof SignUpSchema>;

type Variant = "LogIn" | "SignUp";

const Form = () => {
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant>("LogIn");
  const [BirthdayCalendarMonth, setbirthdayCalendarMonth] = useState<Date>(
    new Date()
  );
  const router = useRouter();

  const Loginform = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const SignUpform = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      UserName: "",
      Email: "",
      FirstPassword: "",
      SecondPassword: "",
      birthday: new Date(),
    },
  });

  function onLoginSubmit(values: LoginFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handlevariant = () => {
    if (variant === "LogIn") {
      Loginform.reset();
      setVariant("SignUp");
      toast.success("新規登録に変更");
    }

    if (variant === "SignUp") {
      SignUpform.reset();
      setVariant("LogIn");
      toast.success("ログインに変更");
    }
  };

  //サインアップの記入欄が定義したものに合っていた場合に実行される関数
  const handleSignUp = async (value: SignUpFormSchema) => {
    try {
      //FirstpasswordとSeccondpasswordの検証
      if (value.FirstPassword === value.SecondPassword) {
        //同じであればSignUp()サーバーアクション
        const result = await SignUp(value);
        console.log(result);

        if (!result.success) {
          return null;
        }

        console.log(result.data);
        toast.success("新規登録に成功");

        SignUpform.reset();
        setVariant("LogIn");
      }
    } catch (error) {
      console.error(error, "新規登録エラー");
    }
  };

  //ログインの記入欄が定義したものに合っていた場合に実行される関数
  const handleLogIn = async (value: LoginFormSchema) => {
    try {
      const result = await signIn("credentials", {
        email: value.Email,
        password: value.Password,
        redirect: false,
      });

      if (result?.error) {
        setError("ログインに失敗しました");
      } else {
        // セッション情報を取得
        toast.success("ログインに成功！！！");
        const session = await getSession();
        if (session?.user?.id) {
          router.push(`/${session.user.id}/board`);
        } else {
          setError("ユーザーIDが取得できませんでした");
        }
      }
    } catch (error) {
      setError("エラーが発生しました");
    }
  };

  return (
    <>
      <div className="bg-green-400 bg-opacity-25 rounded-lg shadow-lg  w-full mx-14 md:w-1/2 py-4 px-12 space-y-3">
        {variant === "LogIn" && (
          <>
            <h2 className="text-center text-2xl font-bold">ログイン</h2>
            <HookForm {...Loginform} key={variant}>
              <form
                onSubmit={Loginform.handleSubmit(handleLogIn)}
                className="space-y-6 flex flex-col"
              >
                <FormField
                  control={Loginform.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">メールアドレス</FormLabel>
                      <FormControl>
                        <Input placeholder="・・・@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Loginform.control}
                  name="Password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">パスワード</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="6文字以上"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="self-center">
                  ログイン
                </Button>
              </form>
            </HookForm>
          </>
        )}
        {variant === "SignUp" && (
          <>
            <h2 className="text-center text-2xl font-bold">新規登録</h2>
            <HookForm {...SignUpform}>
              <form
                onSubmit={SignUpform.handleSubmit(handleSignUp)}
                className="space-y-4 flex flex-col"
              >
                <FormField
                  control={SignUpform.control}
                  name="UserName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">名前</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ゆうと"
                          {...field}
                          className="shadow-custom-shadow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={SignUpform.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">メールアドレス</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="・・・@gmail.com"
                          {...field}
                          className="shadow-custom-shadow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={SignUpform.control}
                  name="FirstPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">パスワード</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="6文字以上"
                          {...field}
                          className="shadow-custom-shadow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={SignUpform.control}
                  name="SecondPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">パスワード2回目</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="6文字以上"
                          {...field}
                          className="shadow-custom-shadow "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={SignUpform.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="items-center w-full relative">
                      <FormLabel className="text-xl">誕生日</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="w-full shadow-custom-shadow">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-white hover:bg-gray-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy年MM月dd日")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            locale={ja}
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="rounded-md border shadow-custom-shadow p-3"
                            month={BirthdayCalendarMonth}
                            onMonthChange={setbirthdayCalendarMonth}
                            formatters={{
                              formatCaption: (date, options) => {
                                return (
                                  <>
                                    <div className="flex justify-center items-center space-x-2">
                                      <select
                                        value={date.getFullYear()}
                                        onChange={(e) => {
                                          const year = parseInt(e.target.value);
                                          const newDate = new Date(
                                            BirthdayCalendarMonth
                                          );
                                          newDate.setFullYear(year);
                                          setbirthdayCalendarMonth(newDate);
                                        }}
                                      >
                                        {Array.from(
                                          { length: 201 },
                                          (_, i) => i + 1900
                                        ).map((year) => (
                                          <option key={year} value={year}>
                                            {year}年
                                          </option>
                                        ))}
                                      </select>
                                      <select
                                        value={date.getMonth()}
                                        onChange={(e) => {
                                          const month = parseInt(
                                            e.target.value
                                          );
                                          const newDate = new Date(
                                            BirthdayCalendarMonth
                                          );
                                          newDate.setMonth(month);
                                          setbirthdayCalendarMonth(newDate);
                                        }}
                                      >
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <option key={i} value={i}>
                                            {options.locale.localize?.month(
                                              i as
                                                | 0
                                                | 1
                                                | 2
                                                | 3
                                                | 4
                                                | 5
                                                | 6
                                                | 7
                                                | 8
                                                | 9
                                                | 10
                                                | 11
                                            )}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </>
                                );
                              },
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="self-center">
                  新規登録
                </Button>
              </form>
            </HookForm>
          </>
        )}
        <p
          onClick={handlevariant}
          className="text-center cursor-pointer underline text-gray-700"
        >
          {variant === "LogIn" ? "新規登録へ" : "ログインへ"}
        </p>
      </div>
    </>
  );
};

export default Form;
