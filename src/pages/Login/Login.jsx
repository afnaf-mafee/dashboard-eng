import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      console.log("Login Data:", values);

      // ==========================================
      // Add your login API here
      // ==========================================

      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Login successful!");
    } catch (error) {
      message.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4f2fb] px-4 py-8 !font-urbanist sm:px-6 ">
      {/* ==========================================
          Premium Light Background
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Purple Glow */}
        <div
          className="
            absolute
            -left-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-purple-300/20
            blur-[120px]
          "
        />

        {/* Top Right Indigo Glow */}
        <div
          className="
            absolute
            -right-32
            top-10
            h-[380px]
            w-[380px]
            rounded-full
            bg-indigo-300/20
            blur-[120px]
          "
        />

        {/* Bottom Purple Glow */}
        <div
          className="
            absolute
            -bottom-40
            left-1/2
            h-[450px]
            w-[450px]
            -translate-x-1/2
            rounded-full
            bg-violet-300/15
            blur-[130px]
          "
        />

        {/* Decorative Text */}
        <div
          className="
            absolute
            left-[5%]
            top-[18%]
            select-none
            font-urbanist
            text-[70px]
            font-black
            tracking-tight
            text-purple-900/[0.025]
            sm:text-[100px]
          "
        >
          LOGIN
        </div>

        <div
          className="
            absolute
            bottom-[12%]
            right-[4%]
            select-none
            font-urbanist
            text-[60px]
            font-black
            tracking-tight
            text-indigo-900/[0.025]
            sm:text-[90px]
          "
        >
          WELCOME
        </div>

        {/* Decorative Dots */}
        <div className="absolute left-[12%] top-[30%] h-2 w-2 rounded-full bg-brand-primary/20 shadow-[0_0_15px_rgba(124,58,237,0.3)]" />

        <div className="absolute right-[14%] top-[25%] h-3 w-3 rounded-full bg-indigo-400/20 shadow-[0_0_18px_rgba(99,102,241,0.3)]" />

        <div className="absolute bottom-[25%] left-[10%] h-3 w-3 rounded-full bg-purple-400/20 shadow-[0_0_18px_rgba(124,58,237,0.3)]" />

        {/* Subtle Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(#6d28d9_1px,transparent_1px),linear-gradient(90deg,#6d28d9_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />
      </div>

      {/* ==========================================
          Login Wrapper
      ========================================== */}
      <div className="relative z-10 w-full max-w-md">
        {/* Neon Outer Glow */}
        <div
          className="
            absolute
            -inset-[1px]
            rounded-[30px]
            bg-gradient-to-r
            from-brand-primary/30
            via-purple-400/20
            to-brand-secondary/30
            opacity-70
            blur-sm
          "
        />

        {/* ==========================================
            Glass Login Card
        ========================================== */}
        <div
          className="
            relative
            rounded-[28px]
            border
            border-white/80
            bg-white/55
            p-5
            shadow-[0_20px_70px_rgba(91,33,182,0.12)]
            backdrop-blur-2xl
            sm:p-8
          "
        >
          {/* Header */}
          <div className="mb-8 text-center">
            {/* Neon Logo */}
            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-purple-200
                bg-gradient-to-br
                from-brand-primary
                to-brand-secondary
                text-white
                shadow-[0_8px_30px_rgba(124,58,237,0.35)]
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_10px_40px_rgba(124,58,237,0.45)]
              "
            >
              <LoginOutlined className="text-2xl" />
            </div>

            <h1 className="font-urbanist text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back
            </h1>

            <p className="mt-2 font-urbanist text-sm text-gray-500">
              Login to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            className="font-urbanist"
          >
            {/* Email */}
            <Form.Item
              label={
                <span className="font-urbanist font-medium text-gray-700">
                  Email
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <MailOutlined className="mr-1 text-brand-primary/70" />
                }
                placeholder="Enter your email"
                className="
                  !h-12
                  !rounded-xl
                  !border-purple-100
                  !bg-white/60
                  !font-urbanist
                  !text-gray-800
                  !shadow-[0_4px_20px_rgba(91,33,182,0.04)]
                  placeholder:!text-gray-400
                  hover:!border-brand-primary/40
                  focus:!border-brand-primary
                  focus:!bg-white/80
                  focus:!shadow-[0_0_0_3px_rgba(124,58,237,0.08)]
                "
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={
                <span className="font-urbanist font-medium text-gray-700">
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={
                  <LockOutlined className="mr-1 text-brand-primary/70" />
                }
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined className="text-gray-400 transition hover:text-brand-primary" />
                  ) : (
                    <EyeInvisibleOutlined className="text-gray-400 transition hover:text-brand-primary" />
                  )
                }
                className="
                  !h-12
                  !rounded-xl
                  !border-purple-100
                  !bg-white/60
                  !font-urbanist
                  !text-gray-800
                  !shadow-[0_4px_20px_rgba(91,33,182,0.04)]
                  placeholder:!text-gray-400
                  hover:!border-brand-primary/40
                  focus:!border-brand-primary
                  focus:!bg-white/80
                  focus:!shadow-[0_0_0_3px_rgba(124,58,237,0.08)]
                "
              />
            </Form.Item>

            {/* Login Button */}
            <Button
              htmlType="submit"
              loading={loading}
              block
              size="large"
              icon={!loading && <LoginOutlined />}
              className="
                !mt-3
                !h-12
                !rounded-xl
                !border-0
                !bg-gradient-to-r
                !from-brand-primary
                !to-brand-secondary
                !font-urbanist
                !text-[15px]
                !font-bold
                !text-white
                !shadow-[0_8px_25px_rgba(124,58,237,0.28)]
                !transition-all
                !duration-300
                hover:!scale-[1.02]
                hover:!brightness-110
                hover:!shadow-[0_10px_35px_rgba(124,58,237,0.40)]
                active:!scale-[0.98]
              "
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          {/* Bottom Neon Line */}
          <div className="mx-auto mt-7 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

            <div className="mx-2 h-1 w-1 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]" />

            <div className="h-px w-16 bg-gradient-to-r from-brand-primary/50 via-transparent to-transparent" />
          </div>

          <p className="mt-4 text-center font-urbanist text-xs text-gray-400">
            Secure login · Your information is protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;