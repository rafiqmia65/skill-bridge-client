import RegisterForm from "./RegisterForm/RegisterForm";

export const metadata = {
  title: "Register | SkillBridge",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4">
      <RegisterForm />
    </div>
  );
}
