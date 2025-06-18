export function AppFooter() {
  return (
    <footer className="bg-muted border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SharePlate. All rights reserved. Reducing food waste, together.
        </p>
      </div>
    </footer>
  );
}
