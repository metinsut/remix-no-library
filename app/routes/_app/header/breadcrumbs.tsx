import { useMatches } from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => match.handle && typeof match.handle === "object" && "crumb" in match.handle)
    .map((match) => {
      const handle = match.handle as { crumb: (data: unknown) => string };
      return {
        title: handle.crumb(match.data),
        path: match.pathname,
        isLast: false,
      };
    });

  // Mark the last item
  if (crumbs.length > 0) {
    crumbs[crumbs.length - 1].isLast = true;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb) => (
          <BreadcrumbItem key={crumb.path} className="hidden md:block">
            {crumb.isLast ? (
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={crumb.path}>{crumb.title}</BreadcrumbLink>
            )}
            {!crumb.isLast && <BreadcrumbSeparator className="hidden md:block" />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
