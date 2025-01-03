export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Excaliown. All rights reserved.
      </div>
    </footer>
  )
}
