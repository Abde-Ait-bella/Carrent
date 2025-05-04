import { NextResponse } from 'next/server'
// import Cookies from "cookies"; // Assure-toi que "cookies" est installé via npm

export function middleware(req) {
  // 🔹 Accéder aux cookies dans la requête (côté serveur)
  const role = req.cookies.get('user_role')?.value 
  
  // Si aucun rôle n'est défini, rediriger vers la page de connexion
  if (!role) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 🔹 Définir les routes protégées
  const adminRoutes = ['/dashboard', '/dashboard/reservations', '/dashboard/cars']
  const userRoutes = ['/user-dashboard']

  // 🔹 Vérification pour les pages admin
  if (adminRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url)) // Redirection si le rôle n'est pas admin
  }

  // 🔹 Vérification pour les pages utilisateurs
  if (userRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && role !== 'user') {
    return NextResponse.redirect(new URL('/', req.url)) // Redirection si le rôle n'est pas user
  }

  // 🔹 Si tout est bon, laisser passer la requête
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/user-dashboard/:path*'] // Appliquer aux routes dashboard et user-dashboard
}
