import { Box } from "@chakra-ui/react";
import { ReactNode, memo } from "react";

const CustomChip = memo(
  ({
    label,
    children,
    chipColor = "#E35D85",
    borderColor = "white",
    position = { top: "-6px", right: "-6px" },
  }: {
    label: string | number;
    children: ReactNode;
    chipColor?: string;
    borderColor?: string;
    position?: { top: string; right: string };
  }) => {
    const containerStyle = {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const badgeStyle = {
      position: "absolute" as const,
      top: position.top,
      right: position.right,
      bgColor: chipColor,
      borderRadius: "100%",
      zIndex: 2,
      color: "white",
      fontSize: "10px",
      height: "14px",
      width: "14px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      border: `1px solid ${borderColor}`,
    };

    return (
      <Box {...containerStyle}>
        {children}
        <Box {...badgeStyle}>{label}</Box>
      </Box>
    );
  }
);

CustomChip.displayName = "CustomChip";

export default CustomChip;
