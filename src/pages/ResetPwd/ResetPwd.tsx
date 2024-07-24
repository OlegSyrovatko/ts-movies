import { useState, ChangeEvent, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../../store";
import { useParams, useNavigate } from "react-router-dom";

type Params = {
  token: string;
};

const styles: { form: CSSProperties; label: CSSProperties } = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
};

export default function ResetPwd() {
  const { token } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>("");

  if (!token) {
    navigate("/error");
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      const result = await dispatch(
        authOperations.ResetPWD({ password, token })
      );
      if (authOperations.ResetPWD.fulfilled.match(result)) {
        navigate("/login");
      }
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Reset Password Page</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          <TextField
            required
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <Button variant="contained" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
