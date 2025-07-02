import { BrasaCard } from "../Account/components/BrasaCard";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const body = {
      email: data.get("email") as string,
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      password: data.get("password") as string,
    };

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let msg = "Unexpected error";
        try {
          const err = await res.json();
          msg = err.error ?? msg;
        } catch {}
        throw new Error(msg);
      }

      alert("User registered successfully");
      return (
        <BrasaCard
          email={body.email}
          firstName={body.firstName}
          lastName={body.lastName}
        />
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  return <RegisterPageView handleSubmit={handleSubmit} />;
};
