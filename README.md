# Portfolio — Lucas Castro

Portfolio personal de Lucas Castro, desarrollador web Front End. Sitio bilingüe (ES/EN) con secciones de presentación, experiencia, estudios, skills, proyectos y contacto.

🌐 **Producción:** https://portfolio-next-three-mu.vercel.app

## Stack

- **Framework:** Next.js 12 (Pages Router)
- **Lenguaje:** TypeScript
- **UI:** React 18, React-Bootstrap, Tailwind CSS, Flowbite
- **Animaciones:** AOS (Animate On Scroll), CSS transitions custom
- **Deploy:** Vercel (con Vercel Analytics + Speed Insights)
- **i18n:** JSON estático (`content/translations.json`)

## Estructura

```
portfolioNext/
├── components/         # UI reutilizable (Forms, Pajina, Skillsingular, etc.)
│   └── context/        # PortfolioContext (estado global)
├── containers/         # Secciones de página (Header, IndexComponent, PajinasContainer, Skills)
├── content/            # translations.json (textos ES/EN)
├── images/             # Assets locales (foto, screenshots de proyectos, flyers)
├── models/             # Interfaces TypeScript
├── pages/              # Rutas Next.js (index, 404, 500, _app)
├── public/             # Estáticos servidos en raíz (robots.txt, sitemap.xml, favicon)
└── styles/             # globals.css + styles.module.css (CSS variables y módulos)
```

## Setup local

Requisitos: **Node.js 24.x** y npm.

```bash
git clone https://github.com/lucascastro29/portfolioNext.git
cd portfolioNext
npm install --legacy-peer-deps
npm run dev
```

Abrí http://localhost:3000.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción |
| `npm start` | Servir el build de producción |
| `npm run lint` | Linter de Next.js |

## Deploy

El proyecto está conectado a Vercel. Cualquier deploy se hace con:

```bash
npx vercel deploy --prod
```

El email del commit author debe estar verificado en la cuenta de Vercel (`lucascastro2929@gmail.com`).

## Decisiones de diseño

- **Sin EmailJS:** el formulario de contacto abre el cliente de email del usuario via `mailto:` para evitar exponer credenciales en el cliente.
- **Bilingüe via JSON:** evita la complejidad de `next-i18next` para un sitio de una sola página.
- **CSS Variables:** colores y delays de animación están centralizados en `:root` (ver `styles/globals.css`).
- **Skills animadas con IntersectionObserver:** las barras se llenan una sola vez cuando entran al viewport, sin shimmer en loop.

## Autor

**Lucas Castro** — [LinkedIn](https://www.linkedin.com/in/lucas-castro-7b4003219/) · [GitHub](https://github.com/lucascastro29) · lucascastro2929@gmail.com
