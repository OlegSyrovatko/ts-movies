import React, { ChangeEvent, FormEvent, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

const styles: { form: CSSProperties; label: CSSProperties } = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: 15,
  },
};

export default function RegisterView() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authOperations.register({ name, email, password }))
      .unwrap()
      .then((result) => {
        console.log("Registration successful:", result);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Sign-Up page</h1>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          <TextField
            required
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

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
          Sign-up
        </Button>
      </form>
    </div>
  );
}
