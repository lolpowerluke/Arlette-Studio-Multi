import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SegmentedControl from "@/components/SegmentedControl";
import s from "./style.module.css";

export default function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"admin" | "vrijwilliger">("admin");

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={s.loginMain}>
      <form onSubmit={handleSubmit}>
        <SegmentedControl
          value={role}
          onChange={setRole}
          options={[
            { value: "admin", label: "Admin" },
            { value: "vrijwilliger", label: "Vrijwilliger" },
          ]}
        />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <img src="/assets/loginBuggy.svg" />
      </div>
    </div>
  );
}
