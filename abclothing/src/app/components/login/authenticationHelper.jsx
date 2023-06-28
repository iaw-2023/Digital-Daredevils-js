"use client";

import { showFailureMessage } from "../../components/alerts/alerts";

export const redirectIfNotAuthenticated = (isAuthenticated, router) => {
  if (!isAuthenticated) {
    router.push('/');
    showFailureMessage('Debes estar loggeado para ver tus pedidos');
  }
  console.log(isAuthenticated);
  return isAuthenticated;
}