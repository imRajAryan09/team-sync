import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col items-center gap-4">
        <span className="text-7xl font-bold text-muted-foreground">404</span>
        <h1 className="text-2xl md:text-3xl font-semibold">Page Not Found</h1>
        <p className="text-center text-muted-foreground max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-4 px-6 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
