import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { url: string; title: string }
>(({ className, title, children, url, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={url}
          className={cn(
            "block select-none space-y-1 bg-zinc-50 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
