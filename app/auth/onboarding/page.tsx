"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Bono",
  "Bono East",
  "Ahafo",
  "Savannah",
  "North East",
  "Oti",
  "Western North",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolPhone: "",
    schoolAddress: "",
    schoolRegion: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.schoolName) return setError("School name is required.");
    if (!form.schoolEmail) return setError("School email is required.");
    if (!form.schoolPhone) return setError("Phone is required.");
    if (!form.schoolAddress) return setError("Address is required.");
    if (!form.schoolRegion) return setError("Please select a region.");

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Something went wrong.");
        return;
      }
      console.log("Onboarding successful, redirecting to dashboard...");
      router.push("/protected");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
      router.push("/protected");
    }
  }

  // check if the user has already completed onboarding, if they have redirect to the dashboard by checking if they have a school_id in their profile, if they do redirect to the dashboard, if not show the onboarding form
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.school_id) {
      router.push("/protected");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl  font-bold">Set up your school</h1>
      <p>Tell us about your school to get started.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex flex-col">
        <label>School Name</label>
        <input
          name="schoolName"
          value={form.schoolName}
          onChange={handleChange}
          placeholder="e.g. Bright Future Academy"
        />
      </div>

      <div className="flex flex-col">
        <label>School Email</label>
        <input
          name="schoolEmail"
          type="email"
          value={form.schoolEmail}
          onChange={handleChange}
          placeholder="admin@school.edu.gh"
        />
      </div>

      <div className="flex flex-col">
        <label>Phone</label>
        <input
          name="schoolPhone"
          type="tel"
          value={form.schoolPhone}
          onChange={handleChange}
          placeholder="024 000 0000"
        />
      </div>

      <div className="flex flex-col">
        <label>Address</label>
        <input
          name="schoolAddress"
          value={form.schoolAddress}
          onChange={handleChange}
          placeholder="e.g. Spintex Road, Accra"
        />
      </div>

      <div className="flex flex-col">
        <label>Region</label>
        <select
          name="schoolRegion"
          value={form.schoolRegion}
          onChange={handleChange}
        >
          <option value="">Select region</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Setting up..." : "Complete Setup →"}
      </button>
    </div>
  );
}
