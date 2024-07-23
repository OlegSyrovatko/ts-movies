import { useState, ChangeEvent, FormEvent, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../../store";

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
export default function ForgotPwd() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
    }
  };

  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     dispatch(authOperations.ForgotPWD({ email }));
  //     setEmail("");
  //     };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authOperations.ForgotPWD({ email }));
    setEmail("");
  };

  return (
    <div>
      <h1>Forgot Password Page</h1>

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

        <Button variant="contained" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
