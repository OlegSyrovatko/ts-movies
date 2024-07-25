import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../../redux/auth";
import { AppDispatch } from "../../store";
import { useParams, useNavigate } from "react-router-dom";

type Params = {
  token: string;
};

export default function VerifyEML() {
  const { token } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const result = await dispatch(authOperations.VerifyEML({ token }));

          if (authOperations.VerifyEML.fulfilled.match(result)) {
            navigate("/login");
          } else {
            // navigate("/error");
          }
        } catch (error) {
          //   navigate("/error");
        }
      }
    };

    verifyEmail();
  }, [token, dispatch, navigate]);

  return (
    <div>
      <h1>Verify Email Page</h1>
    </div>
  );
}
