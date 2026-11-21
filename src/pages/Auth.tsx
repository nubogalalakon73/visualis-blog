import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/studio",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center border-2 border-paper bg-lime font-display text-lg leading-none text-ink">
        v
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[26px] font-semibold italic tracking-[-0.02em] text-paper">
          visualis
        </span>
        <span className="label mt-1 text-[8px] tracking-[0.3em] text-paper/50">
          Design journal
        </span>
      </span>
    </Link>
  );
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Failed to sign in as guest: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
      setIsLoading(false);
    }
  };

  const fieldClass =
    "w-full border-2 border-ink bg-paper px-3.5 py-2.5 font-sans text-sm outline-none transition-shadow placeholder:text-muted-foreground/60 focus:shadow-brutal-sm";

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      {/* Editorial panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r-2 border-ink bg-ink p-10 text-paper lg:flex">
        <div className="pattern-rule pointer-events-none absolute -right-10 top-0 h-full w-32 opacity-15" />
        <div className="relative">
          <Wordmark />
        </div>

        <div className="relative max-w-md">
          <p className="label text-[9px] text-lime">Studio access</p>
          <blockquote className="mt-5 font-serif text-[38px] italic leading-[1.1]">
            “Publish the work, not the performance.”
          </blockquote>
          <p className="label mt-6 text-[9px] text-paper/50">
            The Visualis editorial desk
          </p>

          <ul className="mt-10 space-y-3 border-t border-paper/20 pt-6">
            {[
              "Draft essays and save them privately",
              "Publish straight to the journal",
              "Download every file on the members' shelf",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-serif text-lg text-paper/75"
              >
                <span className="mt-2 block size-2 shrink-0 bg-lime" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-between border-t border-paper/20 pt-5">
          <a
            href="https://visualis.id"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-[9px] text-paper/60 transition-colors hover:text-lime"
          >
            visualis.id
          </a>
          <span className="label text-[9px] text-paper/40">Jakarta, ID</span>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="label flex items-center gap-1.5 text-[9px] text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="size-3" />
            Back to journal
          </Link>
          <span className="label text-[9px] text-muted-foreground">
            Studio — Sign in
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-8">
              {step === "signIn" ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center border-2 border-ink bg-lime">
                      <Mail className="size-4" />
                    </span>
                    <p className="label text-[9px] text-muted-foreground">
                      Editorial desk
                    </p>
                  </div>

                  <h1 className="mt-5 font-display text-[34px] leading-[1] sm:text-[38px]">
                    Sign in to write.
                  </h1>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
                    Enter your email and we will send a one-time code. New here?
                    The same code creates your account and unlocks the members'
                    shelf.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="mt-7">
                    <label htmlFor="email" className="label text-[8px]">
                      Email
                    </label>
                    <div className="mt-2 flex items-stretch gap-2">
                      <div className="relative flex-1">
                        <Mail className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                        <input
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                          type="email"
                          className={`${fieldClass} pl-9`}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        aria-label="Send sign-in code"
                        className="grid w-12 shrink-0 place-items-center border-2 border-ink bg-ink text-paper transition-colors hover:bg-lime hover:text-ink disabled:opacity-60"
                      >
                        {isLoading ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ArrowRight className="size-4" />
                        )}
                      </button>
                    </div>

                    {error && (
                      <p className="mt-3 border-2 border-ink bg-coral px-3 py-2 font-sans text-sm">
                        {error}
                      </p>
                    )}

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t-2 border-ink/15" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="label bg-card px-2 text-[8px] text-muted-foreground">
                          or
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGuestLogin}
                      disabled={isLoading}
                      className="label flex w-full items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3.5 text-[9px] transition-colors hover:bg-lime disabled:opacity-60"
                    >
                      Continue as a guest
                      <ArrowRight className="size-3.5" />
                    </button>
                    <p className="mt-3 font-serif text-sm italic leading-relaxed text-muted-foreground">
                      Guest access keeps a temporary account so you can try the
                      studio without an email.
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("signIn");
                      setOtp("");
                      setError(null);
                    }}
                    className="label flex items-center gap-1.5 text-[8px] text-muted-foreground hover:text-ink"
                  >
                    <ArrowLeft className="size-3" />
                    Change email
                  </button>

                  <h1 className="mt-5 font-display text-[34px] leading-[1] sm:text-[38px]">
                    Check your inbox.
                  </h1>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
                    We sent a six-digit code to{" "}
                    <span className="font-semibold text-ink">{step.email}</span>.
                    It expires in fifteen minutes.
                  </p>

                  <form onSubmit={handleOtpSubmit} className="mt-7">
                    <input type="hidden" name="email" value={step.email} />
                    <input type="hidden" name="code" value={otp} />

                    <div className="flex justify-center border-2 border-ink bg-paper px-3 py-5">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        disabled={isLoading}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            otp.length === 6 &&
                            !isLoading
                          ) {
                            const form = (event.target as HTMLElement).closest(
                              "form",
                            );
                            if (form) form.requestSubmit();
                          }
                        }}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {error && (
                      <p className="mt-3 border-2 border-ink bg-coral px-3 py-2 font-sans text-sm">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="label mt-5 flex w-full items-center justify-center gap-2 border-2 border-ink bg-lime px-4 py-3.5 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Verifying…
                        </>
                      ) : (
                        <>
                          Verify and enter
                          <ArrowRight className="size-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("signIn");
                        setOtp("");
                        setError(null);
                      }}
                      disabled={isLoading}
                      className="label mt-3 w-full py-2 text-[8px] text-muted-foreground underline underline-offset-4 hover:text-ink"
                    >
                      Use a different email
                    </button>
                  </form>
                </>
              )}
            </div>

            <p className="mt-5 text-center font-serif text-sm italic text-muted-foreground">
              Secured by{" "}
              <a
                href="https://freebuff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-ink"
              >
                freebuff.com
              </a>{" "}
              — your code is never shared with the studio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
