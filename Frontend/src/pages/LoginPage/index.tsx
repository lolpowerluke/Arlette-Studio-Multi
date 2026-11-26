import { useState, type SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SegmentedControl from "@/components/SegmentedControl";
import s from "./style.module.css";

export default function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"admin" | "vrijwilliger">("admin");

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <div className={s.loginMain}>
      <div className={s.fixedLogo}>
        <img src="/assets/ArletteLogo.svg" />
      </div>
      <form onSubmit={handleSubmit}>
        <SegmentedControl
          value={role}
          onChange={setRole}
          options={[
            { value: "admin", label: "Admin" },
            { value: "vrijwilliger", label: "Vrijwilliger" },
          ]}
        />
        <div className={s.marketingText}>
          <h1>Log in</h1>
          <span>Creëer een nieuwe ervaring</span>
        </div>
        <div className={s.textInputs}>
          {role == "admin" &&
            <>
              <div>
                <span>Naam</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <span>Wachtwoord</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </>
            ||
            <div>
              <span>Code</span>
              <input type="number" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
          }
        </div>
        <button className={`btn ${s.loginBtn}`} type="submit">Inloggen</button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <img src="/assets/loginBuggy.svg" />
      </div>
    </div>
  );
}
