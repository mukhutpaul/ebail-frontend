'use client'
import { AuthService } from "@/lib/services";
import Link from "next/link";
import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from "react-icons/fi";
 const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    noms: "",
    username: "",
  });
  interface Errors {
    email?: string;
    password?: string;
    password2?: string;
    username?: string;
    noms?: string;
    general?: string;
  }
  const [errors, setErrors] = useState<Errors>({});

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [returnEmail,setReturnEmail] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof Errors]) {
      setErrors((prev: Errors) => ({ ...prev, [name as keyof Errors]: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.username.trim())
      newErrors.username = "Nom utilisataire est obligatoire";

    if (!formData.noms.trim())
      newErrors.noms = "Noms est obligatoire";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "password  must be at least 8 characters";
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = "Mots de passe non similaires";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await AuthService.register(formData);
      if (res) {
        setReturnEmail(res.email);
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
        password2: "",
        username: "",
        noms: "",
      });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  if (success) {
    return (
      <div className=" min-h-screen bg-gradient-to-bl from-indigo-50 via-sky-100 to-blue-200 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <div className=" w-full flex justify-center">
                    <FiCheck className="text-green-500 text-4xl mb-4 font-black" />
            </div>    
          <h2 className="text-2xl font-bold text-neutral-800">
            Registration Successful
          </h2>
          <p className="text-gray-600 mt-2 mb-5">
            Please check your email for verification instructions.
          </p>
          <span className=" text-neutral-800 font-semibold text-sm">
            If you don't see the email, please check your spam folder.
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen bg-gradient-to-bl from-indigo-50 via-sky-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-neutral-800">Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" mb-4 w-full flex gap-3">
            <div className=" w-full">
              <label
                htmlFor="noms"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Noms
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiUser />
                </span>
                <input
                  id="noms"
                  name="noms"
                  type="text"
                  value={formData.noms}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full border ${
                    errors.noms ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="John"
                />
              </div>
              {errors.noms && (
                <p className="mt-1 text-sm text-red-600">{errors.noms}</p>
              )}
            </div>

            <div className=" w-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom utilisateur
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiUser />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Doe"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </div>
          <div className=" mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adresse Mail
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FiMail />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 pr-4 py-2 w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className=" mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FiLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 pr-4 py-2 w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="At least 8 characters"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className=" mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmer mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FiLock />
              </span>
              <input
                id="password2"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                className={`pl-10 pr-4 py-2 w-full border ${
                  errors.password2 ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.password2 && (
              <p className="mt-1 text-sm text-red-600">{errors.password2}</p>
            )}
          </div>

          <div className=" w-full relative">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white
               font-medium py-2.5 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all 
                flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
        <div className=" mt-6 text-center text-gray-700">
          <p className="text-sm">
            Already have an account?{" "}
            <span className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;