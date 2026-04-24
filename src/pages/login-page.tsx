import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { loginRequest } from "../api/auth-api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setAuthSession } from "../store/auth-slice";

interface ILoginFormValues {
  username: string;
  password: string;
}

const loginValidationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required."),
  password: Yup.string().trim().required("Password is required."),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginForm = useFormik<ILoginFormValues>({
    initialValues: {
      username: "", // emilys
      password: "", // emilyspass
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginRequest(values);
        dispatch(
          setAuthSession({
            token: response.accessToken,
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              gender: response.gender,
              image: response.image,
            },
          }),
        );
        navigate("/products", { replace: true });
      } catch (submitError) {
        toast.error(
          submitError instanceof Error
            ? submitError?.message
            : "An error occurred during login. Please try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = loginForm;

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <form
        className="grid w-full max-w-105 gap-1 rounded-card border border-stroke bg-surface p-6 shadow-card"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-2xl font-semibold text-center text-success">
          Login
        </h1>
        <label htmlFor="username" className="text-base font-semibold mt-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="rounded-control border border-stroke bg-surface px-3 py-2.5 text-base outline-none ring-success/80 transition focus:ring-2"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="username"
        />
        {touched.username && errors.username ? (
          <p role="alert" className="text-sm text-danger">
            {errors.username}
          </p>
        ) : null}

        <label htmlFor="password" className="text-base font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="rounded-control border border-stroke bg-surface px-3 py-2.5 text-base outline-none ring-success/80 transition focus:ring-2"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="current-password"
        />
        {touched.password && errors.password ? (
          <p role="alert" className="text-sm text-danger">
            {errors.password}
          </p>
        ) : null}

        <button
          type="submit"
          className="cursor-pointer mt-4 rounded-control bg-success px-4 py-3 font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
};
