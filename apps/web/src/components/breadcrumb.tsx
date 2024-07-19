import React from "react";
import {
  BreadcrumbShad,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface BreadcrumbOption {
  name: string;
  link: string;
}

interface BreadcrumbProps {
  options: BreadcrumbOption[];
}

export function Breadcrumb({ options }: BreadcrumbProps) {
  return (
    <BreadcrumbShad className="mb-4">
      <BreadcrumbList>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < options.length - 1 ? (
                <BreadcrumbLink href={option.link}>
                  {option.name}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{option.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < options.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbShad>
  );
}
