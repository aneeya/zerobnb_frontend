import { QueryClient } from "@tanstack/react-query";

export default function useData(qery: QueryClient) {
  const user = qery.getQueryData(['@user']) as any
  const userEmail = user[0].email
  const userName = user[0].name

  return { userEmail, userName}
}