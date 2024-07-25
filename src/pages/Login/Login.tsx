import { useState, ChangeEvent, FormEvent, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../../store";
import { Link } from "./Login.styled";

const styles: {
  form: CSSProperties;
  label: CSSProperties;
  link: CSSProperties;
} = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
  link: {
    color: "#0d47a1",
    textDecoration: "none",
    display: "block",
    marginTop: -30,
    textAlign: "center",
    marginLeft: 20,
  },
};

export default function LoginView() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          <TextField
            required
            label="E-mail"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label style={styles.label}>
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <Button variant="contained" type="submit">
          Log-in
        </Button>
        <Link to="/forgotpwd">Forgot password?</Link>
        <br />
      </form>
    </div>
  );
}
