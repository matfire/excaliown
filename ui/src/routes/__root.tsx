import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: RootComponent,
})

const TanStackRouterDevtools =
  import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )
const TanStackQueryDevtools =
  import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme='system' storageKey='theme'>
        <div className="flex flex-col h-full min-h-screen">
          <Header />
          <main className="h-full container mx-auto px-4 py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
      <TanStackRouterDevtools />
      <TanStackQueryDevtools />
    </React.Fragment>
  )
}
