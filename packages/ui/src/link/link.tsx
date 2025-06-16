import { forwardRef } from "react";
import { Platform, Pressable, Text } from "react-native";
import NextLink from "next/link";
import { router } from "expo-router";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  hrefAttrs?: {
    target?: string;
    rel?: string;
  };
}

export const Link = forwardRef<React.ElementRef<typeof Pressable>, LinkProps>(
  ({ href, children, className, target, hrefAttrs, ...props }, ref) => {
    if (Platform.OS === "web") {
      return (
        <NextLink
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={className}
          target={target}
          {...hrefAttrs}
          {...props}
        >
          {children}
        </NextLink>
      );
    }

    return (
      <Pressable
        ref={ref}
        className={className}
        onPress={() => router.push(href)}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className={className}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);

Link.displayName = "Link";
