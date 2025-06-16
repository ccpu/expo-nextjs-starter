import React from "react";
import { Text } from "react-native";

import { Link } from "../link";

// Individual navigation buttons for more control
export const HomeNavButton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Link
    className={`rounded-lg bg-primary px-4 py-2 ${className ?? ""}`}
    href="/"
  >
    <Text className="font-medium text-primary-foreground">Home</Text>
  </Link>
);

export const AboutNavButton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Link
    className={`rounded-lg bg-primary px-4 py-2 ${className ?? ""}`}
    href="/about"
  >
    <Text className="font-medium text-primary-foreground">About</Text>
  </Link>
);
