import { Box, Button, Text, createStyles } from "@mantine/core";

import { IconPointerSearch } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  demoBtn: {
    borderColor: theme.colors.Neutral[2],
    color: theme.colors.Neutral[6],
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 21,
  },

  demoText: {
    fontWeight: 400,
    fontSize: 16,
    color: theme.colors.Neutral[6],
  },
}));

type DemoSearchProps = {
  handleDemoSearch: (query: string) => void;
};

export default function DemoSearch({ handleDemoSearch }: DemoSearchProps) {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Text className={classes.demoText}>Try this:</Text>
      <Button
        variant="outline"
        color="Primary.2"
        radius={"lg"}
        leftIcon={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleDemoSearch("อยากแต่งสวน")}
      >
        อยากแต่งสวน
      </Button>
      <Button
        variant="outline"
        radius={"lg"}
        color="Primary.2"
        leftIcon={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleDemoSearch("พรมสำหรับห้องนั่งเล่น")}
      >
        พรมสำหรับห้องนั่งเล่น
      </Button>
      <Button
        variant="outline"
        color="Primary.2"
        radius={"lg"}
        leftIcon={<IconPointerSearch size={"1.3rem"} />}
        className={classes.demoBtn}
        onClick={() => handleDemoSearch("โซฟาห้องนั่งเล่น")}
      >
        โซฟาห้องนั่งเล่น
      </Button>
    </Box>
  );
}
