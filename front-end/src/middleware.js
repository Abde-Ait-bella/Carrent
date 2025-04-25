import { NextResponse } from 'next/server'
// import Cookies from "cookies"; // Assure-toi que "cookies" est installé via npm
// import Cookies from 'js-cookie';

export function middleware (req) {
  // 🔹 Accéder aux cookies dans la requête (côté serveur)
  const role = req.cookies.get('user_role')?.value

  // 🔹 Définir les routes protrdégées
  const adminRoutes = ['/dashboard', '/dashboard/reservations', '/dashboard/cars']
  // const userRoutes = ['/']

  // 🔹 Vérification pour les pages admin
  if (adminRoutes.includes(req.nextUrl.pathname) && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url)) // Redirection si le rôle n'est pas admin
  }

  // 🔹 Vérification pour les pages utilisateurs
  // if (userRoutes.includes(req.nextUrl.pathname) && role !== 'user') {
  //   return NextResponse.redirect(new URL('/', req.url)) // Redirection si le rôle n'est pas user
  // }

  // 🔹 Si tout est bon, laisser passer la requête
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'] // Appliquer à ces routes protégées
}
