"use client";

/**
 * Client-side auth helpers
 * JWT is stored in httpOnly cookie (set by server) AND localStorage (for
 * Authorization header fallback in client-side requests).
 */

export const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminToken", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken");
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getToken();
};
